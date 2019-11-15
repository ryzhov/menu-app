import {info, debug, dir} from './logger';
import './menu.less';

export const MenuComponent = {
    template: `
        <li ng-repeat="node in $ctrl.nodes">
            <button type="button" ng-click="$ctrl.onClick(node)">
                {{ node.title }}
            </button>
            <button type="button" ng-if="node.nodes" ng-click="$ctrl.onClickArrow(node)">
                <svg viewBox="0 0 10 10">
                    <path d="M7 9L5 8 3 9V6L1 4h3l1-3 1 3h3L7 6z"/>
                </svg>
            </button>
            <menu ng-show="node.collapsed" ng-if="node.nodes" type="toolbar" nodes="node.nodes" />
        </li>
    `,    

    controller: class MenuComponent {
        constructor($element) {
            'ngInject';
            this.$element = $element;
        }

        $onChanges(changes) {
            if (changes.nodes) {
                this.nodes = [...this.nodes];
                debug(`nodes changed => ${JSON.stringify(this.nodes)}`);
            }
        }

        $postLink() {
            const {$element} = this;
            debug(`MenuComponent#postLink:: $element => ${$element}`);
            $element.attr('nodes-count', this.nodes.length);
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
};
