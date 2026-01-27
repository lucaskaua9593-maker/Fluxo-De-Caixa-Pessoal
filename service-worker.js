self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('fluxo-caixa-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/salario/salario.html',
        '/flash/flash.html',
        '/style.css',
        '/script.js',
        '/manifest.json',
        // Adicione ícones e outros arquivos necessários
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
