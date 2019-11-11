import {info, dir, debug} from './logger';
import './menu.less';

export const MenuComponent = {
    template: `
        <ul>
            <li ng-repeat="node in $ctrl.nodes">
                <button type="button" ng-click="$ctrl.onClick(node)">
                    {{ node.title }} <span ng-if="node.nodes">-></span>
                </button>
                <menu ng-show="node.collapsed" ng-if="node.nodes" nodes="node.nodes" />
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

        onClick(node) {
            debug(`node => "${node.title}" clicked`);
            node.collapsed = !node.collapsed;
        }
    },

    bindings: {
        nodes: '<',
    },
}
