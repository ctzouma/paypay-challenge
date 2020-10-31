import angular from 'angular';

export class EmployeeViewController implements angular.IComponentController {

    static $inject = ['$log', '$location']
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService) {
        $log.debug(`${EmployeeViewController.name} constr`);
    }
}