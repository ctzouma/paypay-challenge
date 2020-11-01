import { faSmileWink } from '@fortawesome/free-solid-svg-icons';
import angular from 'angular';
import { UserService, UserServiceName } from '../../services/user.service';

export class HeaderController implements angular.IComponentController {
    public authUser = {} as AuthUser;

    static $inject = ['$log', UserServiceName];
    constructor(private $log: angular.ILogService, private userService: UserService) {
        $log.debug(`${HeaderController.name} constr`);
    }

    $onInit(): void {
        this.userService.onUserAuthenticate().then(user => {
            this.authUser = user;
        });
    }
}