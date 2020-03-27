import { debug } from './logger';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';

registerRoute(/[^\/]*\/$/, new NetworkFirst({ cacheName: 'runtime' }));
registerRoute(/\.(?:html|js|css|json)$/, new NetworkFirst({ cacheName: 'runtime' }));
registerRoute(/\.(?:png|jpg|jpeg|svg|gif)$/, new CacheFirst({ cacheName: 'media' }));

const sw: ServiceWorkerGlobalScope = self as any;

sw.skipWaiting();

sw.addEventListener('install', (event: Event) => {
    debug('sw:: install event => ', event);
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
    debug('sw:: activate event =>', event);
});
