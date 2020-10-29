import angular from 'angular';
import { ApiService, ApiServiceName } from './api.service';

export class UserService {
    private authenticated = false;
    private authUser = {} as User;

    static $inject = ['$log', '$location', ApiServiceName];
    constructor(private $log: angular.ILogService, private $location: angular.ILocationService, 
                private apiService: ApiService) {
        
    }

    setUpUser(): void {
        this.debug('setUpUser()');
        this.apiService.getUserInfo().then((user) => {
            if (user) {
                this.authUser = user;
                this.authenticated = true;
                this.$log.debug('Received user info:', user);
            }
            this.$location.url('/');
        });   
    }

    isAuthenticated(): boolean {
        return this.authenticated
    }

    private debug(msg: string): void {
        this.$log.debug(`${UserService.name} - ${msg}`);
    }
}

export const UserServiceName = 'userService';