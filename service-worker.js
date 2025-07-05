self.addEventListener('install', event => {
  console.log('[Service Worker] Installed');
  event.waitUntil(
    caches.open('visatrack-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/main.js',
        '/manifest.json',
        '/presskit/icon-192.png',
        '/presskit/icon-512.png',
        '/presskit/favicon.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
