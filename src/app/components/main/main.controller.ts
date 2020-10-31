import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class MainController implements angular.IComponentController {

    static $inject = ['$log', '$location', UserServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService,
        private userService: UserService) {
        $log.debug(`${MainController.name} constr`);
        //  Check if we are able to set up the User
        userService.setUpUser();
    }
}