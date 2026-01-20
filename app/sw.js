const CACHE = 'mittagio-v4';
const ASSETS = [
  '/app/',
  '/app/index.html',
  '/app/manifest.json',
  '/app/assets/mittagio-logo.png',
  '/app/assets/provider-placeholder.png',
  '/app/assets/icons/icon-192.png',
  '/app/assets/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => r))
  );
});
