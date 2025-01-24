self.addEventListener('install', event => {
    console.log('Service Worker installed');
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activated');
  });
  
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
  });

  const CACHE_NAME = 'my-pwa-cache-v1'; // Имя кэша
const urlsToCache = [
  '/',            // Главная страница
  '/index.html',  // Основной файл
  '/manifest.json', // Манифест
  '/sw-register.js', // Регистрация Service Worker
  '/192.png', // Иконки
  '/512.png', 
];

// Установка Service Worker и кэширование файлов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Обновление Service Worker (очистка старого кэша)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Перехват запросов и выдача кэшированных файлов
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если запрос есть в кэше, вернуть его
        if (response) {
          return response;
        }

        // Если нет в кэше, загрузить из сети
        return fetch(event.request);
      })
  );
});

