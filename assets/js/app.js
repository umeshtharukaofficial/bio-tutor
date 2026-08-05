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

// ─── Update study streak display ───
function updateStreakDisplay() {
  const streakEl = document.getElementById('currentStreak');
  if (streakEl) {
    const data = Storage.getStudyStreak();
    streakEl.textContent = data.currentStreak;
  }
}

// ─── Init App ───
document.addEventListener('DOMContentLoaded', () => {
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
