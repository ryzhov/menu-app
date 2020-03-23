import { debug } from './logger';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

registerRoute(/\.(js|json)$/, new NetworkFirst());
registerRoute(/\.css$/, new StaleWhileRevalidate({ cacheName: 'css-cache' }));
registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/, new CacheFirst({ cacheName: 'image-cache' }));

const sw: ServiceWorkerGlobalScope = self as any;

sw.skipWaiting();

sw.addEventListener('install', (event: Event) => {
    debug('sw:: install event => ', event);
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
    debug('sw:: activate event =>', event);
});
