import {Component} from 'angular-ts-decorators';
import {MenuNode} from './types/MenuNode';
import {NodeEvent} from './types/NodeEvent';
import {info, debug} from './logger';
import './app.less';

@Component({
    selector: 'app',
    template: `
        <install-form ng-show="!$ctrl.isInstalled" on-install="$ctrl.onInstall($event)"></install-form>
        <h2>Hello, World!</h2>
        <menu type="toolbar" nodes="::$ctrl.menuModel" on-click="$ctrl.onClick($event)"
            on-collapse="$ctrl.onCollapse($event)"></menu>
    `,
})
export class AppComponent {
    private isInstalled: boolean = true;

    constructor(private readonly menuModel: MenuNode[])
    {
        'ngInject';
    }

    onInstall(userChoice: UserChoice): void {
        this.isInstalled = 'accepted' === userChoice.outcome;
        debug('app::onInstall => ', userChoice);
    }

    onClick({node}: NodeEvent): void {
        info('app::onClick =>', node.title);
    }

    onCollapse({node}: NodeEvent): void {
        node.collapsed = !node.collapsed;
    }
}
