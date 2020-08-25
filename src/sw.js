importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
    ({
        url
    }) => url.origin === 'https://api.football-data.org',
    new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
    ({
        url
    }) => url.origin === 'https://fonts.googleapis.com',
    new workbox.strategies.StaleWhileRevalidate()
);
workbox.routing.registerRoute(
    ({
        url
    }) => url.origin === 'https://use.fontawesome.com/releases/v5.13.0',
    new workbox.strategies.StaleWhileRevalidate()
);

self.addEventListener('push', (event) => {
    const title = 'Bola Notification';
    const options = {
        body: event.data.text(),
        icon: './icon/app-icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(self.registration.showNotification(title, options));
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
    ignoreURLParametersMatching: [/.*/]
});