import angular from 'angular';
import { MainController } from './main.controller';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import './main.scss';

library.add(faTimes);
dom.watch();

export class MainComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = MainController;
        this.template = require('./main.html');
    }
}

export const MainComponentName = 'appMain';