import angular from 'angular';
import { AdminViewController } from './admin.controller';

export class AdminViewComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = AdminViewController;
        this.template = require('./admin.html');
    }
}

export const AdminViewComponentName = 'adminView';