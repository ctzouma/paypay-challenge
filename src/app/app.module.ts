import angular from 'angular';
import ngRoute from 'angular-route';
import { LoginComponent, LoginComponentName } from './components/login/login.component';
import { EmployeeViewComponent, EmployeeViewComponentName } from './components/employee/employee.component';
import { AdminViewComponent, AdminViewComponentName } from './components/admin/admin.component';
import { MainComponent, MainComponentName } from './components/main/main.component';
import { HeaderComponent, HeaderComponentName } from './components/header/header.component';
import { ApiService, ApiServiceName } from './services/api.service';
import { UserService, UserServiceName } from './services/user.service';
import './app.scss';


const ngMessages = require('angular-messages'); // types not available for ngMessage module

export default angular
.module('paypay.challenge', [ngRoute, ngMessages])
.service(UserServiceName, UserService)
.service(ApiServiceName, ApiService)
.component(MainComponentName, new MainComponent())
.component(HeaderComponentName, new HeaderComponent())
.component(EmployeeViewComponentName, new EmployeeViewComponent())
.component(AdminViewComponentName, new AdminViewComponent())
.component(LoginComponentName, new LoginComponent())
.config(['$routeProvider', '$locationProvider',
    ($routeProvider: angular.route.IRouteProvider, 
    $locationProvider: angular.ILocationProvider) => {
        $routeProvider
        .when('/', {
            template: '<employee-view></employee-view>'
        })
        .when('/admin', {
            template: '<admin-view></admin-view>'
        })
        .when('/login', {
            template: '<login-base></login-base>'
        })
        $locationProvider.html5Mode(true);
    }
])
.name;

