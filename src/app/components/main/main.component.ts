import angular from 'angular';
import { MainController } from './main.controller';
import './main.scss';

export class MainComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = MainController;
        this.template = require('./main.html');
    }
}

export const MainComponentName = 'appMain';