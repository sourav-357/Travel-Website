const CACHE_NAME = 'wanderly-v1';
const ASSETS = [
  '/index.html','/packages.html','/destinations.html','/itinerary.html','/blog.html','/about.html','/contact.html','/faq.html',
  '/assets/css/style.css',
  '/assets/js/components.js','/assets/js/app.js','/assets/js/pages.js',
  '/assets/img/logo.svg','/assets/img/favicon.svg','/assets/img/placeholder.svg'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k!==CACHE_NAME).map((k)=>caches.delete(k)))));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if(req.method !== 'GET') return;
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match('/index.html')))
  );
});


