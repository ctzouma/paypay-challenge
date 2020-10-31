import angular from 'angular';
import { UserServiceName, UserService } from '../../services/user.service';
import { ApiService, ApiServiceName } from '../../services/api.service';

export class LoginController implements angular.IComponentController {
    private loginForm: LoginForm = {
        username: '',
        password: '',
        form: {} as angular.IFormController,
        submitted: false
    };
    private loginError = false;
    private hideFlashMsg = false;

    static $inject = ['$log', '$location', ApiServiceName, UserServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService, 
        private apiService: ApiService, private userService: UserService) {
        $log.debug(`${LoginController.name} constr`);
        // Redirect back to base page if already authenticated and deliberately going back to login page
        if (userService.isAuthenticated()) {
            $location.url('/');
            $location.replace();
        }
    }

    /**
     * Login Form submission
     */
    onFormSubmit(): void {
        /* If the form is valid and hasn't been submitted, or if there was an error in logging in but the form is valid
        allow submission */
        if (this.loginForm.form.$valid) {
            this.loginForm.submitted = true;
            this.loginError = false;
            this.apiService.login(this.loginForm.username, this.loginForm.password)
                .then((success) => {
                    if (!success) {
                        // If a login fails, focus on the username input
                        this.loginForm.form.username.$$element[0].focus();
                        this.hideFlashMsg = false;
                        this.loginError = true;
                    } else {
                        this.userService.setUpUser();
                        this.$location.url('/');
                    }
                });
        }
    }
}