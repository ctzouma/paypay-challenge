import angular from 'angular';
import { EmployeeViewController } from './employee.controller';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import './employee.scss';

library.add(faLock);
dom.watch();

export class EmployeeViewComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = EmployeeViewController;
        this.template = require('./employee.html');
    }
}

export const EmployeeViewComponentName = 'employeeView';