import angular from 'angular';

export class AdminViewController implements angular.IComponentController {

    static $inject = ['$log', '$location']
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService) {
        $log.debug(`${AdminViewController.name} constr`);
    }
}