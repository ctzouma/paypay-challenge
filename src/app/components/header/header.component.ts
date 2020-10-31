import angular from 'angular';

export class HeaderComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = HeaderController;
        this.template = require('./header.html');
    }
}

export const HeaderComponentName = 'appHeader';