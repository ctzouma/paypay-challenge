import angular from 'angular';

export class HeaderController implements angular.IComponentController {

    static $inject = ['$log'];
    constructor(private $log: angular.ILogService) {
        $log.debug(`${HeaderController.name} constr`);
    }
}