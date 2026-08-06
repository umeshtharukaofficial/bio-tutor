// ===================================================
// BIO TUTOR — DEEPSEEK API INTEGRATION LAYER
// ===================================================

const DEEPSEEK_BASE_URL = 'https://api.deepseek.com';
const DEEPSEEK_MODEL = 'deepseek-chat';

// Biology-focused system prompt
const BIO_SYSTEM_PROMPT = `You are BioTutor AI — an expert A-Level Biology tutor specializing in the Sri Lanka National Curriculum (Grade 12 & 13).

Your role:
- Explain biology concepts clearly for exam success, following the Sri Lanka A/L curriculum units.
- You can respond in English or Sinhala (සිංහල), or mixed bilingual style (English terms with Sinhala explanations) as requested by the student.
- When responding in Sinhala, use accurate Sri Lanka A-Level Biology terminology (සම්මත සිංහල ජීව විද්‍යා පාරිභාෂික වචන).
- CRITICAL SINHALA SPELLING RULES:
  * Use proper Zero Width Joiner (ZWJ) conjunct characters where appropriate.
  * Nucleus must be spelled correctly as "න්‍යෂ්ටිය" (NOT "න්යෂ්ටිය").
  * Chromosome must be "ක්‍රෝමෝසෝමය" (NOT "ක්රෝමෝසෝමය").
  * Mitochondria must be "මයිටොකොන්ඩ්‍රියා" (NOT "මයිටොකොන්ඩ්රියා").
  * Cell must be "සෛලය" / "සෛල".
- Use structured answers: definition → explanation → examples → exam tips
- Reference specific units when relevant (e.g., "Unit 6: Genetics", "Unit 2: Biochemistry")
- Use bullet points and numbered lists to improve readability
- Bold key terms using **term** markdown syntax
- Keep responses structured, complete, and fully detailed — never cut off explanations prematurely
- Always finish all thoughts, bullet points, and summaries completely
- Generate MCQ questions when asked, always with 4 options (A, B, C, D) and clear explanations
- Always provide memory tips (mnemonics) where possible
- Be encouraging and motivating — use phrases like "Great question!", "Let's break this down"
- When generating MCQs, format them as: Question → Options A/B/C/D → Correct Answer → Explanation

Curriculum Units:
Grade 12: Unit 1 (Cell Biology), Unit 2 (Biochemistry), Unit 3 (Cell Division), Unit 4 (Plant Form & Function), Unit 5 (Animal Form & Function)
Grade 13: Unit 6 (Genetics), Unit 7 (Evolution), Unit 8 (Ecology), Unit 9 (Microbiology), Unit 10 (Biotechnology)`;

const DeepSeek = {
  // ─────────────────────────────────────────
  // Validate API Key format
  // ─────────────────────────────────────────
  isValidKey(key) {
    return typeof key === 'string' && key.startsWith('sk-') && key.length > 20;
  },

  // ─────────────────────────────────────────
  // Test API connection
  // ─────────────────────────────────────────
  async testConnection(apiKey) {
    try {
      const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: DEEPSEEK_MODEL,
          messages: [{ role: 'user', content: 'Hi' }],
          max_tokens: 5,
          stream: false,
        }),
      });

      if (response.status === 200) return { success: true };
      if (response.status === 401) return { success: false, error: 'Invalid API key' };
      if (response.status === 402) return { success: false, error: 'Insufficient balance' };
      return { success: false, error: `HTTP ${response.status}` };
    } catch (err) {
      return { success: false, error: 'Network error — check your connection' };
    }
  },

  // ─────────────────────────────────────────
  // Stream chat response (async generator)
  // ─────────────────────────────────────────
  async *streamChat(messages, apiKey, options = {}) {
    const {
      temperature = 0.7,
      maxTokens = 3500,
      topicContext = null,
    } = options;

    // Build system message
    let systemContent = BIO_SYSTEM_PROMPT;
    if (topicContext) {
      systemContent += `\n\nCurrent study topic: ${topicContext}. Focus your explanations on this topic unless the student asks otherwise.`;
    }

    const requestMessages = [
      { role: 'system', content: systemContent },
      ...messages,
    ];

    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: requestMessages,
        stream: true,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API Error: HTTP ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line in buffer

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;

        const dataStr = trimmed.slice(6);
        if (dataStr === '[DONE]') return;

        try {
          const parsed = JSON.parse(dataStr);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // skip malformed chunks
        }
      }
    }

    // Process leftover buffer content if any
    if (buffer.trim() && buffer.trim().startsWith('data: ')) {
      const dataStr = buffer.trim().slice(6);
      if (dataStr !== '[DONE]') {
        try {
          const parsed = JSON.parse(dataStr);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {}
      }
    }
  },

  // ─────────────────────────────────────────
  // Single (non-streaming) request
  // ─────────────────────────────────────────
  async ask(prompt, apiKey, systemOverride = null) {
    const response = await fetch(`${DEEPSEEK_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: DEEPSEEK_MODEL,
        messages: [
          { role: 'system', content: systemOverride || BIO_SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        stream: false,
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err?.error?.message || `API Error: HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  },

  // ─────────────────────────────────────────
  // Generate MCQ questions for a topic
  // ─────────────────────────────────────────
  async generateMCQs(topic, count = 5, apiKey) {
    const prompt = `Generate exactly ${count} A-Level Biology MCQ questions on the topic: "${topic}".

Format each question EXACTLY as JSON:
{
  "questions": [
    {
      "question": "Question text here?",
      "options": { "A": "...", "B": "...", "C": "...", "D": "..." },
      "answer": "A",
      "explanation": "Why A is correct...",
      "topic": "${topic}"
    }
  ]
}

Rules:
- Make questions exam-relevant for Sri Lanka A/L Biology
- Vary difficulty (2 easy, 2 medium, 1 hard per 5 questions)
- Plausible distractors for wrong options
- Clear, concise explanations
- Return ONLY valid JSON, no other text`;

    const raw = await this.ask(prompt, apiKey);

    // Extract JSON from response
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI returned invalid MCQ format');

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed.questions || [];
  },

  // ─────────────────────────────────────────
  // Elaborate on a flashcard term
  // ─────────────────────────────────────────
  async elaborateFlashcard(term, definition, apiKey) {
    const prompt = `Elaborate on this A-Level Biology term in 3-4 sentences with a real-world example:

Term: ${term}
Basic Definition: ${definition}

Format: Plain text with an example at the end. Keep it concise.`;

    return await this.ask(prompt, apiKey);
  },

  // ─────────────────────────────────────────
  // Get AI study recommendation
  // ─────────────────────────────────────────
  async getStudyRecommendation(weakTopics, apiKey) {
    const prompt = `Based on these weak biology topics: ${weakTopics.join(', ')}

Give a concise 30-minute study plan with:
1. Which topic to prioritize and why
2. 3 specific subtopics to focus on
3. 2 quick memory tips
4. A motivational closing sentence

Keep it under 200 words.`;

    return await this.ask(prompt, apiKey);
  },

  // ─────────────────────────────────────────
  // Get "fact of the day" for a topic
  // ─────────────────────────────────────────
  async getDailyFact(topic, apiKey) {
    const prompt = `Share one fascinating, exam-relevant biology fact about "${topic}" for a Sri Lanka A/L student. Keep it to 2-3 sentences. Start with "Did you know..."`;
    return await this.ask(prompt, apiKey);
  },
};
