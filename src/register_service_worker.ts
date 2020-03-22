
import { info, error, debug } from './logger';

export const registerServiceWorker = ($window: ng.IWindowService): void => {
    const { navigator } = $window;

    if (!Reflect.has(navigator, 'serviceWorker')) {
      info('service workers are not supported =>', navigator);
      return;
    }

    const { serviceWorker } = navigator;

    serviceWorker.register('/service-worker.js').then((registration: ServiceWorkerRegistration): void => {
        registration.addEventListener('updatefound', event => {
            info('updatefound event => ', event);
        });

        debug('service worker registration => ', registration);
    }).catch(exception => {
        error('register service worker exception => ', exception);
    });
};
