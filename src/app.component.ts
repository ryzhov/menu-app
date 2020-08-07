import {Component} from 'angular-ts-decorators';
import {MenuNode} from './types/MenuNode';
import {NodeEvent} from './types/NodeEvent';
import {BeforeInstallPromptEvent, UserChoice, Outcome} from './types/BeforeInstallEventPrompt';
import {info, debug} from './logger';
import './app.less';

type InstallationState = Outcome | 'pending' | 'installed';

@Component({
    selector: 'app',
    template: `
        <install-form ng-show="'pending' === $ctrl.installationState"
                      on-before-install="$ctrl.onBeforeInstall($event)"
                      on-install="$ctrl.onInstall($event)">
        </install-form>
        <h2>
            Hello, World!
            <em>[{{ $ctrl.installationState }}]</em>
        </h2>
        <menu type="toolbar" nodes="::$ctrl.menuModel" on-click="$ctrl.onClick($event)"
            on-collapse="$ctrl.onCollapse($event)"></menu>
    `,
})
export class AppComponent {
    private installationState: InstallationState = 'installed';

    constructor(private readonly menuModel: MenuNode[])
    {
        'ngInject';
    }

    onBeforeInstall({ platforms }: BeforeInstallPromptEvent) {
        this.installationState = 'pending';
        debug('app::onBeforeInstall platforms => ', platforms);
    }

    onInstall(userChoice: UserChoice): void {
        this.installationState = userChoice.outcome;
        debug('app::onInstall  outcome => ', userChoice);
    }

    onClick({node}: NodeEvent): void {
        info('app::onClick =>', node.title);
    }

    onCollapse({node}: NodeEvent): void {
        node.collapsed = !node.collapsed;
    }
}
