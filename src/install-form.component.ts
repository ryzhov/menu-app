
import {Component, Output} from 'angular-ts-decorators';
import {EventEmitter} from './types/EventEmitter';
import {BeforeInstallPromptEvent, UserChoice} from './types/BeforeInstallEventPrompt';

@Component({
    selector: 'installForm',
    template: `
        <button ng-click="$ctrl.onClick()">Install application</button>
    `
})
export class InstallFormComponent {
    private promptEvent: BeforeInstallPromptEvent;
    @Output() private onInstall: (event: EventEmitter<UserChoice>) => void;
    @Output() private onBeforeInstall: (event: EventEmitter<BeforeInstallPromptEvent>) => void;
    
    constructor(private readonly $window: ng.IWindowService, private readonly $scope: ng.IScope)
    {
        'ngInject';
        
        $window.addEventListener('beforeinstallprompt', (event: BeforeInstallPromptEvent) => {
            this.promptEvent = event;
            $scope.$apply(() => this.onBeforeInstall({$event: event}));
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