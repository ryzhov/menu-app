import {Injectable} from "angular-ts-decorators";

export interface MenuNode {
    title: string;
    nodes?: MenuNode[];
}

@Injectable()
export class MenuModelProvider {
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