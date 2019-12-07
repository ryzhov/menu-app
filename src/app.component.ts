import {Component, OnInit} from 'angular-ts-decorators';
import {MenuNode} from './menu.model.provider';
import config from './config';
import {info} from './logger';
import './app.less';

@Component({
    selector: 'app',
    template: `
        <h2>Hello, World!</h2>
        <menu type="toolbar" nodes="::$ctrl.nodes" on-click="$ctrl.onClick($event)"
            on-collapse="$ctrl.onCollapse($event)" />
    `,
})
export class AppComponent implements OnInit {
    private nodes: MenuNode[];
    
    constructor(menuModel: MenuNode[]) {
        'ngInject';
        this.nodes = menuModel;
    }

    ngOnInit(): void {
        info(`app_version => ${config.appVersion} build => ${config.buildHash}`);
    }

    onClick($event: MenuNode): void {
        info('app::onClick =>', $event.title);
    }

    onCollapse($event: MenuNode): void {
        $event.collapsed = !$event.collapsed;
    }
}
