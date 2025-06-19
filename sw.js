const CACHE_NAME = 'percentage-calculator-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// تثبيت الملفات الأساسية
// sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v2').then(cache => { // غيرت اسم الكاش
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/icons/icon-144.png',
        '/icons/icon-192.png',
        '/icons/icon-512.png'
      ]);
    })
  );
});

// تنظيف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// إدارة الطلبات
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد في الكاش
        if (response) return response;
        
        // إذا لم يوجد، نجمعه من الشبكة ونخزنه
        return fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});