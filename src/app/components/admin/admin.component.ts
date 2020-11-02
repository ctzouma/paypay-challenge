import angular from 'angular';
import { AdminViewController } from './admin.controller';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import './admin.scss';

library.add(faTrashAlt, faPlus);
dom.watch();

export class AdminViewComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = AdminViewController;
        this.template = require('./admin.html');
    }
}

export const AdminViewComponentName = 'adminView';