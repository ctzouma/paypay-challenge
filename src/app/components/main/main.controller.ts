import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class MainController implements angular.IComponentController {

    static $inject = ['$log', '$location', UserServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService,
        private userService: UserService) {
        $log.debug(`${MainController.name} constr`);
        //  Check authentication
         if (!userService.isAuthenticated()) {
            $location.url('/login');
        }
    }
}