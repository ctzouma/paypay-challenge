import angular from 'angular';
import { ApiService, ApiServiceName } from './api.service';

/**
 * Service that handles user data and anything to do with the user
 */
export class UserService {
    private authenticated = false;
    private authUser = {} as User;
    private authenticateDefer: angular.IDeferred<User>;

    static $inject = ['$log', '$location', '$q', ApiServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService, 
                private $q: angular.IQService, private apiService: ApiService) {
        this.authenticateDefer = $q.defer();
    }

    /**
     * Sets up the User. 
     */
    setUpUser(): void {
        // Only set up the user once.
        if (!this.authenticated && !this.authUser.id) { 
            this.debug('setUpUser()');
            this.apiService.getUserInfo().then((user) => {
                if (user) {
                    this.setAuthUser(user);
                    this.$location.url('/');
                } else {
                    this.$location.url('/login');
                }
                this.$location.replace();
            });
        }   
    }

    isAuthenticated(): boolean {
        return this.authenticated
    }

    onUserAuthenticate(): angular.IPromise<User> {
        return this.authenticateDefer.promise;
    }

    /**
     * Set the user and set app authenticated state.
     * @param user {User} - the user to set as authenticated
     */
    private setAuthUser(user: User): void {
        this.authUser = user;
        this.authenticated = true;
        this.authenticateDefer.resolve(user);
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