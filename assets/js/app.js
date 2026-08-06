// ===================================================
// BIO TUTOR — MAIN APP CONTROLLER & UTILITIES
// ===================================================

// ─── Toast Notifications ───
const Toast = {
  container: null,

  init() {
    if (!document.querySelector('.toast-container')) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.querySelector('.toast-container');
    }
  },

  show(message, type = 'info', duration = 3500) {
    if (!this.container) this.init();

    const icons = { success: '✅', error: '❌', info: '💡' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },
};

// ─── Markdown Renderer (lightweight) ───
function renderMarkdown(text) {
  return text
    // Bold: **text**
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text*
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Code: `code`
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Headers: ## heading
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    // Bullet lists: - item
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    // Numbered lists: 1. item
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    // Wrap in paragraphs
    .replace(/^(?!<[h|u|o|l])(.+)$/gm, (match) => {
      if (match.startsWith('<')) return match;
      return match;
    });
}

// ─── Format timestamp ───
function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

// ─── Format date for display ───
function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// ─── Copy to clipboard ───
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    Toast.show('Copied to clipboard!', 'success', 2000);
    return true;
  } catch {
    Toast.show('Copy failed', 'error');
    return false;
  }
}

// ─── Auto-resize textarea ───
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 140) + 'px';
}

// ─── API Key Modal ───
const ApiKeyModal = {
  show(onSave) {
    const overlay = document.getElementById('apiKeyModal');
    if (overlay) {
      overlay.classList.add('active');
      const input = document.getElementById('apiKeyInput');
      const existing = Storage.getApiKey();
      if (existing) input.value = existing;

      const saveBtn = document.getElementById('saveApiKey');
      const testBtn = document.getElementById('testApiKey');
      const statusEl = document.getElementById('apiKeyStatus');

      testBtn.onclick = async () => {
        const key = input.value.trim();
        if (!key) return Toast.show('Please enter an API key first', 'error');
        if (!DeepSeek.isValidKey(key)) return Toast.show('Key should start with "sk-"', 'error');

        testBtn.disabled = true;
        testBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Testing...';
        statusEl.textContent = '';

        const result = await DeepSeek.testConnection(key);
        testBtn.disabled = false;
        testBtn.innerHTML = '<i class="fa-solid fa-flask"></i> Test';

        if (result.success) {
          statusEl.textContent = '✅ Connected!';
          statusEl.style.color = 'var(--accent-green)';
        } else {
          statusEl.textContent = `❌ ${result.error}`;
          statusEl.style.color = '#ef4444';
        }
      };

      saveBtn.onclick = () => {
        const key = input.value.trim();
        if (!key) return Toast.show('API key cannot be empty', 'error');
        Storage.setApiKey(key);
        overlay.classList.remove('active');
        updateApiStatus();
        Toast.show('API key saved!', 'success');
        if (typeof onSave === 'function') onSave(key);
      };
    }
  },

  hide() {
    const overlay = document.getElementById('apiKeyModal');
    if (overlay) overlay.classList.remove('active');
  },
};

// ─── Update sidebar API status indicator ───
function updateApiStatus() {
  const dot = document.querySelector('.status-dot');
  const statusText = document.querySelector('.api-status-text strong');

  if (dot && statusText) {
    const key = Storage.getApiKey();
    if (key && DeepSeek.isValidKey(key)) {
      dot.classList.add('connected');
      statusText.textContent = 'DeepSeek Connected';
    } else {
      dot.classList.remove('connected');
      statusText.textContent = 'API Key Required';
    }
  }
}

// ─── Sidebar Active State ───
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href') || '';
    if (href.includes(currentPage) || (currentPage === 'index.html' && href === 'index.html') || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    }
  });
}

// ─── Mobile Sidebar ───
function initMobileSidebar() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (!menuBtn) return;

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  });

  overlay?.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
  });
}

// ─── Web Speech API Audio Pronunciation Engine ───
const BioAudio = {
  synth: window.speechSynthesis || null,

  speak(text, lang = 'en') {
    if (!this.synth) {
      Toast.show('Audio Speech API is not supported on this browser', 'error');
      return;
    }

    this.synth.cancel(); // Stop any ongoing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    // Detect language code
    if (lang === 'si' || /[\u0D80-\u0DFF]/.test(text)) {
      utterance.lang = 'si-LK';
    } else {
      utterance.lang = 'en-US';
    }

    const voices = this.synth.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(lang === 'si' ? 'si' : 'en'));
    if (matchingVoice) utterance.voice = matchingVoice;

    this.synth.speak(utterance);
    Toast.show(`🔊 Pronouncing: ${text}`, 'info', 1800);
  }
};

// ─── Update study streak display ───
function updateStreakDisplay() {
  const streakEl = document.getElementById('currentStreak');
  if (streakEl) {
    const data = Storage.getStudyStreak();
    streakEl.textContent = data.currentStreak;
  }
}

// ─── Dark/Light Theme Toggle ───
function initThemeToggle() {
  const settings = Storage.getSettings();
  const currentTheme = settings.theme || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Bind theme toggle buttons if present
  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.innerHTML = currentTheme === 'light' ? '<i class="fa-solid fa-moon"></i> Dark Mode' : '<i class="fa-solid fa-sun"></i> Light Mode';
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      Storage.updateSettings({ theme: newTheme });
      
      themeBtns.forEach(b => {
        b.innerHTML = newTheme === 'light' ? '<i class="fa-solid fa-moon"></i> Dark Mode' : '<i class="fa-solid fa-sun"></i> Light Mode';
      });
      Toast.show(`Switched to ${newTheme === 'light' ? 'Light Mode ☀️' : 'Deep Space Dark Mode 🌙'}`, 'info', 2000);
    });
  });
}

// ─── Init App ───
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  Toast.init();
  setActiveNavItem();
  initMobileSidebar();
  updateApiStatus();
  updateStreakDisplay();

  // Close modal when clicking overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // Open API key modal on settings button
  const settingsBtn = document.getElementById('openSettings');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => ApiKeyModal.show());
  }

  // API status click to open modal
  const apiStatusArea = document.querySelector('.api-status');
  if (apiStatusArea) {
    apiStatusArea.style.cursor = 'pointer';
    apiStatusArea.addEventListener('click', () => ApiKeyModal.show());
  }
});
