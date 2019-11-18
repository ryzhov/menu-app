import {NgModule, platformBrowserDynamic} from "angular-ts-decorators";
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModel, MenuNode} from './menu.model.provider';
import {menu} from './menu.model';
import {log} from './logger';
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
        log(`run:: menuModel => ${JSON.stringify(menuModel)}`);
    }
})
class MainModule { }

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
