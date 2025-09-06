const CACHE_NAME = 'portfolio-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/base.css',
    '/css/components.css',
    '/css/navigation.css',
    '/css/sections.css',
    '/css/cards.css',
    '/css/animations.css',
    '/css/responsive.css',
    '/css/dark-mode.css',
    '/css/theme-toggle.css',
    '/css/blog-enhancements.css',
    '/js/scripts.js',
    '/js/theme-toggle.js',
    '/js/enhancements.js',
    '/js/cert-enhancements.js',
    '/images/logo.svg',
    '/images/my_logo.webp',
    '/images/159160.webp',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Open+Sans:wght@300;400;600;700&display=swap'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});