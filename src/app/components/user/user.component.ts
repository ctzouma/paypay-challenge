import angular from 'angular';
import { UserController } from './user.controller';

export class UserComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = UserController;
        this.template = require('./user.html');
    }
}

export const UserComponentName = 'userBase';