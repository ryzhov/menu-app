import {Component, Input, Output, AfterViewInit} from 'angular-ts-decorators';
import {IAugmentedJQuery} from 'angular';
import {MenuNode} from './menu.model.provider';
import {EventEmitter} from './events';
import './menu.less';

export interface NodeEvent {
    node: MenuNode
}

@Component({
    selector: 'menu',
    template: `
        <li ng-repeat="node in $ctrl.nodes">
            <button type="button" ng-click="$ctrl.click({node})">
                {{ node.title }}
            </button>
            <button type="button" ng-if="node.nodes" ng-click="$ctrl.collapse({node})">
                <svg viewBox="0 0 10 10">
                    <path d="M7 9L5 8 3 9V6L1 4h3l1-3 1 3h3L7 6z"/>
                </svg>
            </button>
            <menu ng-show="node.collapsed" ng-if="node.nodes" type="toolbar" nodes="::node.nodes"
                  on-click="$ctrl.click($event)" on-collapse="$ctrl.collapse($event)"/>
        </li>
    `,
})
export class MenuComponent implements AfterViewInit {
    @Input() private readonly nodes: MenuNode[];
    @Output() private onClick: (event: EventEmitter<NodeEvent>) => void;
    @Output() private onCollapse: (event: EventEmitter<NodeEvent>) => void;
    
    constructor(private $element: IAugmentedJQuery) {
        'ngInject';
    }

    ngAfterViewInit(): void {
        const {$element} = this;
        $element.attr('nodes-count', this.nodes.length);
    }

    click({node}: NodeEvent): void {
        this.onClick({$event: {node}});
    }

    collapse({node}: NodeEvent): void {
        this.onCollapse({$event: {node}});
    }
}
