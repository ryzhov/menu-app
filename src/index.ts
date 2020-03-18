import {NgModule, platformBrowserDynamic} from "angular-ts-decorators";
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModel} from './menu.model.provider';
import {menu} from './menu.model';
import {info} from './logger';
import config from './config';
import {registerServiceWorker} from './register_service_worker';
import './index.less';
import './icons/icon-144x144.png';

@NgModule({
    id: 'main',
    declarations: [AppComponent, MenuComponent],
    providers: [
        MenuModel
    ],

    config(menuModelProvider: MenuModel): void {
        'ngInject';
        menuModelProvider.setData(menu);
    },
 
    run($window: ng.IWindowService): void {
        'ngInject';
        const { appVersion, buildHash } = config;
        info(`Version => ${appVersion}; Build => ${buildHash}`);
        registerServiceWorker($window);
    }
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
