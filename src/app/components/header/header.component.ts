import angular from 'angular';
import { HeaderController } from './header.controller';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser';
import './header.scss';

library.add(faUser);
dom.watch();

export class HeaderComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;

    constructor() {
        this.controller = HeaderController;
        this.template = require('./header.html');
    }
}

export const HeaderComponentName = 'appHeader';