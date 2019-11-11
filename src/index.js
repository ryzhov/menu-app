
/* global document */

import {module, element, bootstrap} from 'angular';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import './index.less';

const mainModule = module('main', [])
    .component('app',  AppComponent)
    .component('menu',  MenuComponent)
    .name
;

element(document).ready(() => {
    bootstrap(document, [mainModule]);
});