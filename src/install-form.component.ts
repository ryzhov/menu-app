
import {Component, Output} from 'angular-ts-decorators';
import {EventEmitter} from './types/EventEmitter';
import {debug} from './logger';

@Component({
    selector: 'installForm',
    template: `
        <button ng-click="$ctrl.onClick()">Install application</button>
    `
})
export class InstallFormComponent {
    private promptEvent: BeforeInstallPromptEvent;
    @Output() private onInstall: (event: EventEmitter<UserChoice>) => void;
    
    constructor(private readonly $window: ng.IWindowService, private readonly $scope: ng.IScope)
    {
        'ngInject';
        
        $window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            debug('beforeinstallprompt:: event => ', event);
            this.promptEvent = event;
            $scope.$apply(() => this.onInstall({$event: {outcome: 'dismissed'}}));
        });
    }
    
    onClick(): void {
        const { promptEvent, $scope } = this;
        if (promptEvent) {
            promptEvent.prompt().then((userChoice: UserChoice) => {
                this.promptEvent = null;
                $scope.$apply(() => this.onInstall({$event: userChoice}));
            });
        }
    } 
}