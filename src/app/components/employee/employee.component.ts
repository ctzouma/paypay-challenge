import angular from 'angular';
import { EmployeeViewController } from './employee.controller';

export class EmployeeViewComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = EmployeeViewController;
        this.template = require('./employee.html');
    }
}

export const EmployeeViewComponentName = 'employeeView';