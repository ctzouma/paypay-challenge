import { library } from '@fortawesome/fontawesome-svg-core';
import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class EmployeeViewController implements angular.IComponentController {
    public userInitialized = false;

    static $inject = ['$log', UserServiceName]
    constructor(private $log: angular.ILogService, private userService: UserService) {
        $log.debug(`${EmployeeViewController.name} constr`);
    }

    $onInit(): void {
        this.userService.onUserAuthenticate().then(() => {
            this.userInitialized = true;
        });
    }
}