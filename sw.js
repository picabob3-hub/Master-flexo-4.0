const CACHE_NAME = 'masterflexo-v1';
const assets = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];

// Instalar el Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Estrategia: Buscar en caché, si no hay, ir a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
