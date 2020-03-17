
/* global navigator */
/* global window */

import {info, error, debug} from './logger';

export const registerServiceWorker = () => {
    if (!Reflect.has(navigator, 'serviceWorker')) {
      info('service workers are not supported =>', navigator);
      return;
    }

    const { serviceWorker } = navigator;

    serviceWorker.register('/service-worker.js').then(registration => {
        registration.addEventListener('updatefound', event => {
            info('updatefound event => ', event);
        });

        debug('service worker registration => ', registration);
    }).catch(exception => {
        error('register service worker exception => ', exception);        
    });

    window.addEventListener('beforeinstallprompt', event => {
        debug('beforeinstallprompt => ', event);
        event.userChoice
            .then(choiceResult => debug('choiceResult => ', choiceResult))
            .catch(exception => error(exception))
        ;
    });
};
