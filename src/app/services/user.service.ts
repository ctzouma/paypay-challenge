import angular from 'angular';
import { ApiService, ApiServiceName } from './api.service';

/**
 * Service that handles user data and anything to do with the user
 */
export class UserService {
    private authenticated = false;
    private authUser = {} as User;

    static $inject = ['$log', '$location', ApiServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService, 
                private apiService: ApiService) {}

    /**
     * Sets up the User. Only necessary to be called upon initial login.
     * @param userData {User=} - If this parameter is received, then set the user directly. If not call the API. 
     */
    setUpUser(userData?: User): void {
        // Only set up the user once.
        if (!this.authenticated && !this.authUser.id) { 
            this.debug('setUpUser()');
            this.apiService.getUserInfo().then((user) => {
                if (user) {
                    this.setAuthUser(user);
                }
                this.$location.url('/');
            });
        }   
    }

    isAuthenticated(): boolean {
        return this.authenticated
    }

    /**
     * Set the user and set app authenticated state.
     * @param user {User} - the user to set as authenticated
     */
    private setAuthUser(user: User): void {
        this.authUser = user;
        this.authenticated = true;
        this.$log.debug('Received user info:', user);
    }

    /**
     * Custom logging - appends the classname to the beginning of the log - useful for debugging.
     * @param msg {string} - message to display
     */
    private debug(msg: string): void {
        this.$log.debug(`${UserService.name} - ${msg}`);
    }
}

export const UserServiceName = 'userService';