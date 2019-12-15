
import {info, error, debug} from './logger';

export const registerServiceWorker = () => {
    if (!Reflect.has(navigator, 'serviceWorker')) {
      info('service workers are not supported =>', navigator);
      return;
    }

    const { serviceWorker } = navigator;

    serviceWorker.register('/service-worker.js').then(registration => {
        debug('service worker registration => ', registration);
    }).catch(exception => {
        error('register service worker exception => ', exception);        
    });
};
