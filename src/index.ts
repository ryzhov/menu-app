import {NgModule, platformBrowserDynamic} from "angular-ts-decorators";
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModel} from './menu.model.provider';
import {MenuNode} from './types/MenuNode';
import {menu} from './menu.model';
import {debug, info} from './logger';
import config from './config';
import {registerServiceWorker} from './register_service_worker';
import './index.less';

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
 
    run(menuModel: MenuNode[]): void {
        'ngInject';
        const { appVersion, buildHash } = config;
        debug('menuModel => ', menuModel);
        info(`Version => ${appVersion}; Build => ${buildHash}`);
        registerServiceWorker();
    }
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
