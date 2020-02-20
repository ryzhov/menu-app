import {Injectable} from 'angular-ts-decorators';
import {MenuNode} from './types/MenuNode';

@Injectable('menuModel')
export class MenuModel implements ng.IServiceProvider {
    private data: MenuNode[];

    constructor() {
        this.data = [];
    }

    setData(data: MenuNode[]): void {
        this.data = data;
    }

    $get(): MenuNode[] {
        return this.data;
    }
}