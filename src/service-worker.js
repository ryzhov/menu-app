'use strict';

/**
 * Allows the current service worker registration to progress from waiting to active state
 * while service worker clients are using it.
 */

self.skipWaiting();

self.addEventListener('install', event => {
    console.log('service-worker:: install event => ', event);
});

self.addEventListener('activate', event => {
    console.log('service-worker:: activate event =>', event);
});

self.addEventListener('fetch', event => {
    const {request: {method, url}} = event;
    console.log(`service-worker:: fetch event => ${method} ${url}`);
});

const {serviceWorker: {state}} = self;

console.debug('service-worker:: state => ', state, ', caches => ', caches);
