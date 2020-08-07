
import { platformBrowserDynamic } from "angular-ts-decorators";
import { MainModule } from './main.module';

platformBrowserDynamic().bootstrapModule(MainModule, {strictDi: true});
