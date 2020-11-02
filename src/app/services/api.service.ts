import angular from 'angular';

enum ApiMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

enum ErrorCodes {
    UNAUTHORIZED = 401
}

/**
 * Application's API service to have all API defined in one place, to be injected as needed
 */
export class ApiService {

    private readonly userBase = '/api/user';
    private readonly employeeBase = '/api/employee';
    private readonly urls = {
        login: `${this.userBase}/login`,
        userInfo: `${this.userBase}/info`
    };

    static $inject = ['$log', '$http'];
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService) {
    }

    /**
     * [GET] Login
     * @param username {string}
     * @param password {string}
     */
    login(username: string, password: string): angular.IPromise<boolean> {
        this.debug('login()');
        const config = this.getApiConfig(ApiMethod.POST, this.urls.login, null, {username: username, password: password});
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            return resp.data.success;
        }).catch((err) => {
            this.handleRejection(err);
            return false;
        });
    }

    /**
     * [GET] Get the user's information
     */
    getUserInfo(): angular.IPromise<AuthUser | null> {
        this.debug('getUserInfo()');
        const config = this.getApiConfig(ApiMethod.GET, this.urls.userInfo);
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            let user = {} as AuthUser;
            if (resp.data.success) user = resp.data.result;
            else this.handleRejection(resp);
            return user;
        }).catch((err: angular.IHttpResponse<any>) => {
            // We do not want to output an error to the console 
            if (err.status !== ErrorCodes.UNAUTHORIZED) this.handleRejection(err);
            return null;
        })
    }

    getEmployees(): angular.IPromise<Employee[]> {
        this.debug('getEmployees()');
        const config = this.getApiConfig(ApiMethod.GET, `${this.employeeBase}s`);
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            let employees = [] as Employee[];
            if (resp.data.success) employees = resp.data.result;
            else this.handleRejection(resp);
            return employees;
        }).catch((err: angular.IHttpResponse<any>) => {
            this.handleRejection(err);
            return [];
        });
    }

    updateEmployee(employee: Employee): angular.IPromise<boolean> {
        this.debug(`updateEmployee()`);
        const {employeeId, ...rest} = employee;
        const config = this.getApiConfig(ApiMethod.PATCH, `${this.employeeBase}/${employeeId}`, null, rest);
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            if (resp.data.success) return true;
            return false;
        }).catch(err => {
            this.handleRejection(err);
            return false;
        });
    }

    /**
     * 
     * @param method {ApiMethod} - GET, POST etc.
     * @param url  {string} - The API endpoint URL
     * @param params  {Object} - URL parameters
     * @param data {Object} - POST body 
     */
    private getApiConfig(method: ApiMethod, url: string, 
            params?: {[key: string]: any} | null | undefined, 
            data?: {[key: string]: any} | null | undefined): angular.IRequestConfig {
        const config = {} as angular.IRequestConfig;
        config.method = method;
        config.url = url;
        config.params = params || null;
        config.data = data || null;
        return config;
    }

    /**
     * Handle a failed API response
     * @param response - Typically, a failed response containing some error message
     */
    private handleRejection(response: angular.IHttpResponse<any>): void {
        this.$log.error(`Error in response. Server message: ${response.data.message}`, response);
    }

    /**
     * Custom logging - appends the classname to the beginning of the log - useful for debugging.
     * @param msg {string} - message to display
     */
    private debug(msg: string) {
        this.$log.debug(`${ApiService.name} - ${msg}`);
    }
}

export const ApiServiceName = 'apiService';