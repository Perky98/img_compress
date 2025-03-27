const CACHE_NAME = 'img-compress-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/logo.png',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png',
    'https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js',
    'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});