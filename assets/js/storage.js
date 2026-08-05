// ===================================================
// BIO TUTOR — LOCALSTORAGE MANAGEMENT
// ===================================================

const STORAGE_KEYS = {
  API_KEY: 'biotutor_deepseek_key',
  CHAT_HISTORY: 'biotutor_chat_history',
  QUIZ_SCORES: 'biotutor_quiz_scores',
  FLASHCARD_SRS: 'biotutor_srs_data',
  CUSTOM_FLASHCARDS: 'biotutor_custom_cards',
  STUDY_STREAK: 'biotutor_streak',
  TOPIC_PROGRESS: 'biotutor_topic_progress',
  SETTINGS: 'biotutor_settings',
};

const Storage = {
  // --- API KEY ---
  getApiKey() {
    return localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  },
  setApiKey(key) {
    localStorage.setItem(STORAGE_KEYS.API_KEY, key);
  },
  clearApiKey() {
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
  },

  // --- CHAT HISTORY ---
  getChatHistory(contextKey = 'default') {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}');
    return all[contextKey] || [];
  },
  saveChatHistory(messages, contextKey = 'default') {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}');
    // Keep last 50 messages to avoid huge storage
    all[contextKey] = messages.slice(-50);
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(all));
  },
  clearChatHistory(contextKey = 'default') {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY) || '{}');
    delete all[contextKey];
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(all));
  },

  // --- QUIZ SCORES ---
  getQuizScores() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES) || '[]');
  },
  addQuizScore(scoreEntry) {
    const scores = this.getQuizScores();
    scores.push({
      ...scoreEntry,
      timestamp: Date.now(),
    });
    // Keep last 100 scores
    const trimmed = scores.slice(-100);
    localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(trimmed));
    this.updateStudyStreak();
  },

  // --- SRS FLASHCARD DATA ---
  getSRSData() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FLASHCARD_SRS) || '{}');
  },
  updateSRSCard(cardId, rating) {
    const data = this.getSRSData();
    const existing = data[cardId] || { reviews: 0, lastRating: null, nextReview: null };
    const now = Date.now();

    // Simple interval calculation
    const intervals = { again: 1, hard: 3, good: 7, easy: 14 }; // days
    const dayMs = 24 * 60 * 60 * 1000;

    data[cardId] = {
      reviews: existing.reviews + 1,
      lastRating: rating,
      lastReviewed: now,
      nextReview: now + (intervals[rating] || 7) * dayMs,
    };

    localStorage.setItem(STORAGE_KEYS.FLASHCARD_SRS, JSON.stringify(data));
  },

  // --- STUDY STREAK ---
  getStudyStreak() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_STREAK) || JSON.stringify({
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      studyDays: {},
    }));
  },
  updateStudyStreak() {
    const data = this.getStudyStreak();
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    data.studyDays[today] = (data.studyDays[today] || 0) + 1;

    if (data.lastStudyDate === yesterday) {
      data.currentStreak++;
    } else if (data.lastStudyDate !== today) {
      data.currentStreak = 1;
    }

    data.longestStreak = Math.max(data.longestStreak, data.currentStreak);
    data.lastStudyDate = today;

    localStorage.setItem(STORAGE_KEYS.STUDY_STREAK, JSON.stringify(data));
    return data;
  },

  // --- TOPIC PROGRESS ---
  getTopicProgress() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TOPIC_PROGRESS) || '{}');
  },
  updateTopicProgress(topicId, correct, total) {
    const data = this.getTopicProgress();
    const existing = data[topicId] || { correct: 0, total: 0 };
    data[topicId] = {
      correct: existing.correct + correct,
      total: existing.total + total,
    };
    localStorage.setItem(STORAGE_KEYS.TOPIC_PROGRESS, JSON.stringify(data));
  },

  // --- SETTINGS ---
  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || JSON.stringify({
      theme: 'dark',
      defaultTimerSeconds: 60,
      defaultQuestionsCount: 10,
      soundEffects: false,
      streamingEnabled: true,
    }));
  },
  updateSettings(partial) {
    const current = this.getSettings();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // --- UTILITY ---
  clearAll() {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
  getStorageSize() {
    let total = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) total += item.length * 2; // UTF-16
    });
    return (total / 1024).toFixed(1) + ' KB';
  },
};
