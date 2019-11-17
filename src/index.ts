
/* global document */

import {module, element, bootstrap} from 'angular';
import {AppComponent} from './app.component';
import {MenuComponent} from './menu.component';
import {MenuModelProvider} from './menu.model.provider';
import {menu} from './menu.model';
import 'reflect-metadata'; 
import './index.less';

const mainModule = module('main', [])
    .component('app', Reflect.getMetadata('custom:options', AppComponent))
    .component('menu', Reflect.getMetadata('custom:options', MenuComponent))
    .provider('menuModel', MenuModelProvider)
    .config((menuModelProvider: MenuModelProvider) => {
        'ngInject';
        menuModelProvider.setData(menu);
    })
    .name
;

element(document).ready(() => {
    bootstrap(document, [mainModule], {strictDi: true});
});