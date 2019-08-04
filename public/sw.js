const shell = 'site-static';
const dynamicCache = 'site-dynamic';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/styles/global.css',
    '/styles/navbar.css',
    '/styles/banner.css',
    '/styles/content.css',
    '/styles/cards.css',
    '/fonts/OpenSans-Regular.ttf',
    '/fonts/Syncopate-Bold.ttf',
    '/fonts/Exo-Regular.ttf',
    '/scripts/ui.js',
    '/scripts/fetch.js',
    '/scripts/lazy-load.mjs',
    '/components/info-card.js',
    '/images/brand.webp',
    '/images/brand.jpg',
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(shell).then(cache => cache.addAll(assets)));
});
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== shell && key !== dynamicCache)
                .map(key => caches.delete(key))
            );
        })
    );
});
self.addEventListener('fetch', event => {
    if (!!~event.request.url.indexOf('/api/blog')) {
        event.respondWith(
            fetch(event.request.url).then(fetchRes => {
                return caches.open(dynamicCache).then(cache => {
                    cache.put(event.request.url, fetchRes.clone());
                    return fetchRes;
                })
            }).catch(() => {
                caches.match(event.request).then(response => {
                    if (!response) return caches.open(shell).then(cache => {
                        return cache.match('/pages/fallback.html');
                    })
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(cacheRes => {
                return cacheRes || fetch(event.request).then(fetchRes => {
                    return caches.open(dynamicCache).then(cache => {
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                }).catch(() => {
                    return caches.open(shell).then(cache => {
                        return cache.match('/pages/fallback.html')
                    });
                });
            })
        );
    }
});