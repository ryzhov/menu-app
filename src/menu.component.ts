import {Component, Input, Output, AfterViewInit} from 'angular-ts-decorators';
import {IAugmentedJQuery} from 'angular';
import {MenuNode} from './menu.model.provider';
import './menu.less';

interface NodeEvent {
    $event: MenuNode
}

@Component({
    selector: 'menu',
    template: `
        <li ng-repeat="node in $ctrl.nodes">
            <button type="button" ng-click="$ctrl.onClick({$event:{node}})">
                {{ node.title }}
            </button>
            <button type="button" ng-if="node.nodes" ng-click="$ctrl.onCollapse({$event:{node}})">
                <svg viewBox="0 0 10 10">
                    <path d="M7 9L5 8 3 9V6L1 4h3l1-3 1 3h3L7 6z"/>
                </svg>
            </button>
            <menu ng-show="node.collapsed" ng-if="node.nodes" type="toolbar" nodes="::node.nodes"
                  on-click="$ctrl.onClick({$event})" on-collapse="$ctrl.onCollapse({$event})"/>
        </li>
    `,
})
export class MenuComponent implements AfterViewInit {
    @Input() private readonly nodes: MenuNode[];
    @Output() private onClick: (event: NodeEvent) => void;
    @Output() private onCollapse: (event: NodeEvent) => void;
    
    constructor(private $element: IAugmentedJQuery) {
        'ngInject';
    }

    ngAfterViewInit(): void {
        const {$element} = this;
        $element.attr('nodes-count', this.nodes.length);
    }
}
