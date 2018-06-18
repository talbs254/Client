angular.module('citiesApp')
    .service('setHeadersToken', ['$http', function ($http) {

        let token = ""

        this.set = function (t) {
            token = t;
            $http.defaults.headers.common['x-access-token'] = t

        }
    }]);