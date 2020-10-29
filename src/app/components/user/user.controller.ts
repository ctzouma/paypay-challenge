import angular from 'angular';
import { UserServiceName, UserService } from '../../services/user.service';

export class UserController implements angular.IComponentController {

    static $inject = ['$log', '$location', UserServiceName]
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService,
        private userService: UserService) {
        $log.debug('UserController constr');
        if (!userService.isAuthenticated()) {
            $location.url('/login');
        }
    }
}