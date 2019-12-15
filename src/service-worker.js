'use strict';

console.log('from service worker');
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
