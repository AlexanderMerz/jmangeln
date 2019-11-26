const staticCache = 'site-static-v1';
const dynamicCache = 'site-dynamic-v1';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/styles/global.css',
    '/styles/navbar.css',
    '/styles/banner.css',
    '/styles/content.css',
    '/styles/cards.css',
    '/fonts/Syncopate-Bold.ttf',
    '/fonts/Exo-Regular.ttf',
    '/scripts/ui.js',
    '/components/info-card.mjs',
    '/images/brand.webp',
    '/images/brand.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(caches.open(staticCache).then(cache => {
        assets.forEach(asset => cache.add(asset));
    }).catch(error => console.log('Error', error)));
});

self.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(keys => Promise.all(keys
        .filter(key => key !== staticCache && key !== dynamicCache)
        .map(key => caches.delete(key)))));
});

self.addEventListener('fetch', event => {
    if(event.request.url.indexOf('http') !== 0) return;
    if (event.request.url.indexOf('/api/products') > 0) {
        caches.match(event.request).then(cacheRes => {
            if (cacheRes) {
                return cacheRes; 
            }
            return fetch(event.request).then(fetchRes => caches.open(dynamicCache).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                return fetchRes;
            }));
        });
    } else if (event.request.url.indexOf('/api/youtube') > 0) {
        event.respondWith(caches.match(event.request).then(cacheRes => {
            if (cacheRes && cacheRes.status !== 400) {
                const cachedAt = new Date(cacheRes.headers.get('date')).getTime();
                const now = new Date().getTime();
                if (now - cachedAt  < 8640000) {
                    return cacheRes;
                }
            }
            return fetch(event.request).then(fetchRes => caches.open(dynamicCache).then(cache => {
                cache.put(event.request.url, fetchRes.clone());
                return fetchRes;
            }));
        }));
    } else {
        event.respondWith(caches.match(event.request)
        .then(cacheRes => cacheRes || fetch(event.request)
        .then(async fetchRes => {
            const cache = await caches.open(dynamicCache);
            cache.put(event.request.url, fetchRes.clone());
            return fetchRes;
        }).catch(async () => {
            const cache = await caches.open(staticCache);
            return cache.match('/pages/fallback.html');
        })));
     }
    });

/*
 * Network first, then cache strategy
 * event.respondWith(
 *     fetch(event.request.url).then(async fetchRes => {
 *         const cache = await caches.open(dynamicCache);
 *         cache.put(event.request.url, fetchRes.clone());
 *         return fetchRes;
 *     }).catch(() => {
 *         caches.match(event.request).then(async response => {
 *             if (!response) {
 *                 const cache = await caches.open(staticCache);
 *                 return cache.match('/pages/fallback.html');
 *             }
 *         })
 *     })
 * );
 */
