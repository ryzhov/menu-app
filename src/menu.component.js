import {info, debug} from './logger';
import './menu.less';

export const MenuComponent = {
    template: `
        <ul>
            <li ng-repeat="node in $ctrl.nodes">
                <button type="button" ng-click="$ctrl.onClick(node)">
                    {{ node.title }}
                </button>
                <button type="button" ng-if="node.nodes" ng-click="$ctrl.onClickArrow(node)">
                    ->
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
            info(`node => "${node.title}" clicked`);
        }

        onClickArrow(node) {
            node.collapsed = !node.collapsed;
        }
    },

    bindings: {
        nodes: '<',
    },
}
