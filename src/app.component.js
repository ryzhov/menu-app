import {info} from './logger';
import {menu} from './menu.model'
import config from './config';
import './app.less';

export const AppComponent = {
    template: `
        <h2>Hello, Word!</h2>
        <menu nodes="$ctrl.nodes" />
    `,
    controller: class AppComponent {
        $onInit() {
            info(`app_version => ${config.appVersion} build => ${config.buildHash}`);
            this.nodes = menu;
        }
    }
}
