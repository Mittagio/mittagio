/* Mittagio SW v20260317t – Löscht alle alten Caches und gibt Kontrolle ab */
const CACHE_VERSION = 'mittagio-v20260317t';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) { return caches.delete(key); })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

/* Kein Caching – alle Requests direkt ans Netzwerk */
self.addEventListener('fetch', function(e) {
  e.respondWith(fetch(e.request));
});
