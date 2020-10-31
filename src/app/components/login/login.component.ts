import angular from 'angular';
import { LoginController } from './login.controller';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import './login.scss';

library.add(faExclamationCircle, faTimes);
dom.watch();

export class LoginComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = LoginController;
        this.template = require('./login.html');
    }
}

export const LoginComponentName = 'loginBase';