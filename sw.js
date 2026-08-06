// ===================================================
// BIO TUTOR — SERVICE WORKER FOR PWA & OFFLINE CACHING
// ===================================================

const CACHE_NAME = 'biotutor-v1.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './pages/anatomy.html',
  './pages/chat.html',
  './pages/flashcards.html',
  './pages/quiz.html',
  './pages/topics.html',
  './pages/progress.html',
  './assets/css/main.css',
  './assets/css/sidebar.css',
  './assets/css/anatomy3d.css',
  './assets/css/chat.css',
  './assets/css/quiz.css',
  './assets/css/flashcard.css',
  './assets/js/app.js',
  './assets/js/storage.js',
  './assets/js/deepseek.js',
  './assets/js/topics.js',
  './assets/js/quiz.js',
  './assets/js/flashcard.js',
  './assets/js/anatomy3d.js',
  './models/digestive.glb',
  './models/circulatory.glb',
  './models/respiratory.glb',
  './models/excretory.glb',
  './models/nervous.glb',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js'
];

// Install Event
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[PWA] Pre-caching BioTutor app assets & 3D models');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[PWA] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event (Cache First, fallback to Network)
self.addEventListener('fetch', (e) => {
  // Skip API requests from caching
  if (e.request.url.includes('api.deepseek.com')) return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for html requests offline
        if (e.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
