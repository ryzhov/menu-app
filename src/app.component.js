import {debug, info, dir} from './logger';
import {menu} from './menu.model'
import config from './config';
import './app.less';

export const AppComponent = {
    template: `
        <div>
            <h2>Hello, Word!</h2>
            <menu type="toolbar" nodes="::$ctrl.nodes" on-click="$ctrl.onClick($event)"
                  on-collapse="$ctrl.onCollapse($event)"/>
        </div>
    `,
    controller: class AppComponent {
        constructor($element) {
            'ngInject';
            this.$element = $element;
        }

        $onInit() {
            info(`app_version => ${config.appVersion} build => ${config.buildHash}`);
            this.nodes = menu;
        }

        $postLink() {
            const {$element} = this;
            debug(`AppComponent#postLink:: $element => ${$element}`);
        }

        onClick({node}) {
            info(`onClick => "${node.title}"`);
        }

        onCollapse({node}) {
            node.collapsed = !node.collapsed;
        }
    },
};
