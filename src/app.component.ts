import {Component} from 'angular-ts-decorators';
import {MenuNode} from './types/MenuNode';
import {NodeEvent} from './types/NodeEvent';
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
export class AppComponent {
    private nodes: MenuNode[];
    
    constructor(menuModel: MenuNode[]) {
        'ngInject';
        this.nodes = menuModel;
    }

    onClick({node}: NodeEvent): void {
        info('app::onClick =>', node.title);
    }

    onCollapse({node}: NodeEvent): void {
        node.collapsed = !node.collapsed;
    }
}
