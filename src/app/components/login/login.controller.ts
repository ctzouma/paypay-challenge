import angular from 'angular';
import { UserServiceName, UserService } from '../../services/user.service';
import { ApiService, ApiServiceName } from '../../services/api.service';

export class LoginController implements angular.IComponentController {
    private loginForm = {} as LoginForm;
    private loginError = false;

    static $inject = ['$log', '$location', ApiServiceName, UserServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService, 
        private apiService: ApiService, private userService: UserService) {
        $log.debug('LoginController constr');
    }

    onFormSubmit(): void {
        if (this.loginForm.form.$valid && (!this.loginForm.form.$submitted || this.loginError)) {
            this.loginError = false;
            this.apiService.login(this.loginForm.username, this.loginForm.password)
                .then((success) => {
                    if (!success) {
                        this.loginForm.form.username.$$element[0].focus();
                        this.loginError = true;
                    } else {
                        this.userService.setUpUser();
                    }
                });
        }
    }
}