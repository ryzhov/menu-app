import {Component} from 'angular-ts-decorators';
import {MenuNode} from './types/MenuNode';
import {NodeEvent} from './types/NodeEvent';
import {info, error, debug} from './logger';
import './app.less';

@Component({
    selector: 'app',
    template: `
        <button name="button" ng-show="$ctrl.promptEvent" ng-click="$ctrl.onInstall()">Install application</button>
        <h2>Hello, World!</h2>
        <menu type="toolbar" nodes="::$ctrl.menuModel" on-click="$ctrl.onClick($event)"
            on-collapse="$ctrl.onCollapse($event)" />
    `,
})
export class AppComponent {
    private promptEvent: BeforeInstallPromptEvent;

    constructor(
        private readonly menuModel: MenuNode[],
        private readonly $scope: ng.IScope,
        private readonly $window: ng.IWindowService
    )
    {
        'ngInject';
        
        $window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            info('beforeinstallprompt:: event => ', event);
            $scope.$apply(() => this.promptEvent = event);
        });
    }

    onInstall(): void {
        const { promptEvent, $scope } = this;
        if (promptEvent) {
            promptEvent.prompt().then((userChoice: UserChoiceValue) => {
                const { outcome } = userChoice;
                if ('accepted' === outcome) {
                    $scope.$apply(() => this.promptEvent = null);
                    this.promptEvent = null;
                }
                debug('userChoice => ', userChoice);
            });
        }
    }

    onClick({node}: NodeEvent): void {
        info('app::onClick =>', node.title);
    }

    onCollapse({node}: NodeEvent): void {
        node.collapsed = !node.collapsed;
    }
}
