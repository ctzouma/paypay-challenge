import angular from 'angular';
import { LoginController } from './login.controller';
import './login.scss';

export class LoginComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = LoginController;
        this.template = require('./login.html');
    }
}

export const LoginComponentName = 'loginBase';