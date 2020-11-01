import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class MainController implements angular.IComponentController {

    static $inject = ['$log', UserServiceName];
    constructor(private $log: angular.ILogService, private userService: UserService) {
        $log.debug(`${MainController.name} constr`);
        //  Check if we are able to set up the User
        userService.setUpUser();
    }
}