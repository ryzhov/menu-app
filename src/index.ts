import { NgModule, platformBrowserDynamic } from "angular-ts-decorators";
import { AppComponent } from './app.component';
import { MenuComponent } from './menu.component';
import { InstallFormComponent } from './install-form.component';
import { MenuModel } from './menu.model.provider';
import { menu } from './menu.model';
import { info, debug, error } from './logger';
import config from './config';
import registerServiceWorker from 'service-worker-loader!./service-worker';
import './index.less';
import './icons/icon-144x144.png';

@NgModule({
    id: 'main',
    declarations: [AppComponent, MenuComponent, InstallFormComponent],
    providers: [
        MenuModel
    ],

    config(menuModelProvider: MenuModel): void {
        'ngInject';
        menuModelProvider.setData(menu);
    },
 
    run(): void {
        const { appVersion, buildHash } = config;
        info(`Version => ${appVersion}; Build => ${buildHash}`);
        
        registerServiceWorker({ scope: '/' }).then((registration: ServiceWorkerRegistration) => {
            debug('registration => ', registration);
            registration.addEventListener('updatefound', (event: Event) => {
                debug('updatefound event => ', event);
            });
        }).catch((exception: Error) => {
            error(exception);
        });
    }
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
