
/* global document */

import {module, element, bootstrap} from 'angular';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModelProvider} from './menu.model.provider';
import {menu} from './menu.model';
import './index.less';

const mainModule = module('main', [])
    .component('app',  AppComponent)
    .component('menu',  MenuComponent)
    .provider('menuModel', MenuModelProvider)
    .config(menuModelProvider => {
        'ngInject';
        menuModelProvider.data = menu;
    })
    .name
;

element(document).ready(() => {
    bootstrap(document, [mainModule], {strictDi: true});
});