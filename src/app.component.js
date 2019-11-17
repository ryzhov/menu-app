import {debug, info, dir} from './logger';
import config from './config';
import './app.less';

export const AppComponent = {
    template: `
        <h2>Hello, Word!</h2>
        <menu type="toolbar" nodes="::$ctrl.nodes" on-click="$ctrl.onClick($event)"
            on-collapse="$ctrl.onCollapse($event)" />
    `,
    controller: class AppComponent {
        constructor(menuModel) {
            'ngInject';
            this.nodes = menuModel;
        }

        $onInit() {
            info(`app_version => ${config.appVersion} build => ${config.buildHash}`);
        }

        onClick({node}) {
            info(`onClick => "${node.title}"`);
        }

        onCollapse({node}) {
            node.collapsed = !node.collapsed;
        }
    },
};
