const CACHE = 'mittagio-app-v5';
const CACHE_PREFIX = 'mittagio-';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/mittagio-logo.png',
  '/assets/provider-placeholder.png',
  '/assets/icons/icon-192.png',
  '/assets/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
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
  if(isHtmlRequest(req)){
    e.respondWith(
      fetch(req).then((resp)=>{
        const copy = resp.clone();
        caches.open(CACHE).then(c=>c.put(req, copy)).catch(()=>{});
        return resp;
      }).catch(()=> caches.match(req))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then((r) => r || fetch(req).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      return resp;
    }).catch(() => r))
  );
});
