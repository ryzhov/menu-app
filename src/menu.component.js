import {info, dir, debug} from './logger';
import './menu.less';

export const MenuComponent = {
    template: `
        <ul>
            <li menu-item="node" ng-repeat="node in $ctrl.nodes">
                {{ node.title }}
                <menu ng-if="node.nodes" nodes="node.nodes" />
            </li>
        </ul>
    `,    

    controller: class MenuComponent {
        $onChanges(changes) {
            if (changes.nodes) {
                this.nodes = [...this.nodes];
                debug(`nodes changed => ${JSON.stringify(this.nodes)}`);
            }
        }
    },

    bindings: {
        nodes: '<',
    },
}
