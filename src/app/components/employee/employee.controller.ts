import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class EmployeeViewController implements angular.IComponentController {
    public authUser = {} as AuthUser;

    static $inject = ['$log', UserServiceName]
    constructor(private $log: angular.ILogService, private userService: UserService) {
        $log.debug(`${EmployeeViewController.name} constr`);
    }

    $onInit(): void {
        this.userService.onUserAuthenticate().then(authUser => {
            this.authUser = authUser;
        });
    }
}