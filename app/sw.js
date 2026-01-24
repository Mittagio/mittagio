const CACHE = 'mittagio-app-v13';
const CACHE_PREFIX = 'mittagio-';

// Base-Pfad automatisch erkennen (Service Worker liegt im gleichen Verzeichnis wie index.html)
function getBasePath() {
  const swPath = self.location.pathname;
  
  // Service Worker-Pfad: z.B. /mittagio/app/sw.js -> Base: /mittagio/app/
  if (swPath.includes('/mittagio/app/')) {
    return '/mittagio/app/';
  } else if (swPath.includes('/app/')) {
    const dir = swPath.substring(0, swPath.indexOf('/app/') + 5);
    return dir;
  } else if (swPath.endsWith('sw.js')) {
    return swPath.replace('sw.js', '');
  }
  // Fallback: aktuelles Verzeichnis
  const dir = swPath.substring(0, swPath.lastIndexOf('/') + 1);
  return dir || './';
}

const BASE = getBasePath();
const ASSETS = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'assets/mittagio-logo.png',
  BASE + 'assets/provider-placeholder.png',
  BASE + 'assets/icons/icon-192.png',
  BASE + 'assets/icons/icon-512.png'
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
