import angular from 'angular';
import { MenuButtonController } from './menu-button.controller';
import './menu-button.scss';

export class MenuButtonComponent implements angular.IComponentOptions {
    public controller: any;
    public template: NodeRequire;
    public transclude: any;
    public bindings: any;

    constructor() {
        this.controller = MenuButtonController;
        this.template = require('./menu-button.html');
        this.transclude = {
            icon: 'buttonContent',
            menu: 'menuContent'
        }
        this.bindings = {
            width: '@menuWidth'
        }
    }
}

export const MenuButtonComponentName = 'menuButton';