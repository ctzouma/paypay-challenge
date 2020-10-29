import angular from 'angular';

enum ApiMethods {
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

    login(username: string, password: string): angular.IPromise<boolean> {
        this.debug('login()');
        const config = this.getApiConfig(ApiMethods.POST, this.urls.login, null, {username: username, password: password});
        return this.$http(config).then((resp: angular.IHttpResponse<any>) => {
            return resp.data.success;
        }).catch((err) => {
            this.handleRejection(err);
            return false;
        });
    }

    getUserInfo(): angular.IPromise<User> {
        this.debug('getUserInfo()');
        const config = this.getApiConfig(ApiMethods.GET, this.urls.userInfo);
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

    private getApiConfig(method: ApiMethods, url: string, 
            params?: {[key: string]: any} | null | undefined, 
            data?: {[key: string]: any} | null | undefined): angular.IRequestConfig {
        const config = {} as angular.IRequestConfig;
        config.method = method;
        config.url = url;
        config.params = params || null;
        config.data = data || null;
        return config;
    }

    private handleRejection(response: angular.IHttpResponse<any>): void {
        this.$log.error(`Error in response. Server message: ${response.data.message}`, response);
    }

    private debug(msg: string) {
        this.$log.debug(`${ApiService.name} - ${msg}`);
    }
}

export const ApiServiceName = 'apiService';