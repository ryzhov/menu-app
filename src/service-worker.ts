import { debug } from './logger';

const sw: ServiceWorkerGlobalScope = self as any;

sw.skipWaiting();

sw.addEventListener('install', (event: Event) => {
    debug('sw:: install event => ', event);
});

sw.addEventListener('activate', (event: ExtendableEvent) => {
    debug('sw:: activate event =>', event);
});

sw.addEventListener('fetch', (event: FetchEvent) => {
    const {request: {method, url}} = event;
    debug(`sw:: fetch event => ${method} ${url}`);
});

const {serviceWorker: {state}, caches} = sw;

debug('sw:: state => ', state, ', caches => ', caches);
