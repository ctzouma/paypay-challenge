import angular from 'angular';
import { UserServiceName, UserService } from '../../services/user.service';

export class UserController implements angular.IComponentController {

    static $inject = ['$log', '$location', UserServiceName]
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService,
        private userService: UserService) {
        $log.debug('UserController constr');
        // If the user isn't authenticated, display the login module
        if (!userService.isAuthenticated()) {
            $location.url('/login');
        }
    }
}