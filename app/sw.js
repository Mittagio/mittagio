const CACHE = 'mittagio-app-v9';
const CACHE_PREFIX = 'mittagio-';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/mittagio-logo.png',
  './assets/provider-placeholder.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  // Alte Caches löschen beim Install
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith(CACHE_PREFIX)).map(k => caches.delete(k))
    )).then(() => caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}))
  );
  self.skipWaiting();
});

function isHtmlRequest(req){
  const accept = req.headers.get('accept') || '';
  return req.mode === 'navigate' || accept.includes('text/html');
}

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k))
    )).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  // HTML-Dateien NICHT cachen - immer neueste Version vom Server laden
  if(isHtmlRequest(req)){
    e.respondWith(
      fetch(req).catch(()=> caches.match(req))
    );
    return;
  }
  // Andere Assets (Bilder, CSS, JS) können gecached werden
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => r))
  );
});
