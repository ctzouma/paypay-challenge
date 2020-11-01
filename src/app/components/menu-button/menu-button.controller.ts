import angular from 'angular';

export class MenuButtonController implements angular.IComponentController {
    static $inject = ['$log'];
    constructor(private $log: angular.ILogService) {
        $log.debug(`${MenuButtonController.name} constr`);
    }
}