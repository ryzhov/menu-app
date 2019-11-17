
/* global document */

import {NgModule, platformBrowserDynamic} from "angular-ts-decorators";
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModelProvider} from './menu.model.provider';
import {menu} from './menu.model';
import {dir} from './logger';
import './index.less';

@NgModule({
    id: 'main',
    declarations: [AppComponent, MenuComponent],
    providers: [
        {provide: 'menuModel', useFactory: () => new MenuModelProvider()}
    ],
})
class MainModule {
    static config(menuModelProvider: MenuModelProvider) {
        'ngInject';
        dir({menuModelProvider});
        menuModelProvider.setData(menu);
    }
}

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
