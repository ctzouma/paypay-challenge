import angular from 'angular';
import ngRoute from 'angular-route';
import { LoginComponent, LoginComponentName } from './components/login/login.component';
import { UserComponent, UserComponentName } from './components/user/user.component';
import { ApiService, ApiServiceName } from './services/api.service';
import { UserService, UserServiceName } from './services/user.service';

export default angular
.module('paypay.challenge', [ngRoute])
.service(UserServiceName, UserService)
.service(ApiServiceName, ApiService)
.component(UserComponentName, new UserComponent())
.component(LoginComponentName, new LoginComponent())
.config(['$routeProvider', '$locationProvider',
    ($routeProvider: angular.route.IRouteProvider, 
    $locationProvider: angular.ILocationProvider) => {
        $routeProvider
        .when('/', {
            template: '<user-base></user-base>'
        })
        .when('/login', {
            template: '<login-base></login-base>'
        })
        .otherwise({
            redirectTo: '/'
        })
        $locationProvider.html5Mode(true);
    }
])
.name;

