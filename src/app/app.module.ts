import angular from 'angular';
import ngRoute from 'angular-route';
import { LoginComponent, LoginComponentName } from './components/login/login.component';
import { EmployeeViewComponent, EmployeeViewComponentName } from './components/employee/employee.component';
import { ApiService, ApiServiceName } from './services/api.service';
import { UserService, UserServiceName } from './services/user.service';
import './app.scss';
import { MainComponent, MainComponentName } from './components/main/main.component';


const ngMessages = require('angular-messages'); // types not available for ngMessage module

export default angular
.module('paypay.challenge', [ngRoute, ngMessages])
.service(UserServiceName, UserService)
.service(ApiServiceName, ApiService)
.component(MainComponentName, new MainComponent())
.component(EmployeeViewComponentName, new EmployeeViewComponent())
.component(LoginComponentName, new LoginComponent())
.config(['$routeProvider', '$locationProvider',
    ($routeProvider: angular.route.IRouteProvider, 
    $locationProvider: angular.ILocationProvider) => {
        $routeProvider
        .when('/', {
            template: '<employee-view></employee-view>'
        })
        .when('/login', {
            template: '<login-base></login-base>'
        });
        $locationProvider.html5Mode(true);
    }
])
.name;

