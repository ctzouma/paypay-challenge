import angular from 'angular';

enum ApiMethod {
    POST = "POST",
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

export class ApiService {

    private readonly userBase = '/api/user'
    private readonly urls = {
        login: `${this.userBase}/login`,
        userInfo: `${this.userBase}/info`
    }

    static $inject = ['$log', '$http', '$q'];
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService,
            private $q: angular.IQService) {
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
     * [GET] Request for your user info
     */
    getUserInfo(): angular.IPromise<User> {
        this.debug('getUserInfo()');
        const config = this.getApiConfig(ApiMethod.GET, this.urls.userInfo);
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            if (resp.data.success) {
                return resp.data.result;
            }
            return null;
        }).catch((err) => {
            this.handleRejection(err);
            return null;
        })
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