const CACHE_NAME = 'stanly-dev-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/elementos.css',
  '/js/particles-config.js',
  '/img/Logo03.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap',
  'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js'
];

// Instala o Service Worker e faz cache dos recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativa o Service Worker e remove caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Limpando cache antigo');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Estratégia de cache: Network First, fallback para cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Se a requisição foi bem-sucedida, clona e armazena no cache
        const responseClone = response.clone();
        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, responseClone);
          });
        return response;
      })
      .catch(() => {
        // Se a rede falhar, tenta servir do cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            // Se não estiver no cache, retorna página offline
            return caches.match('/');
          });
      })
  );
});
