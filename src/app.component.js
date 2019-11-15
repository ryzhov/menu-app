import {debug, info, dir} from './logger';
import {menu} from './menu.model'
import config from './config';
import './app.less';

export const AppComponent = {
    template: `
        <div>
            <h2>Hello, Word!</h2>
            <menu type="toolbar" nodes="$ctrl.nodes" />
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
    },
};
