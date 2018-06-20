angular.module('citiesApp')
    .service('setHeadersToken', ['$http', function ($http) {

        var self=this;

        let token = ""

        this.set = function (t) {
            token = t;
            $http.defaults.headers.common['x-access-token'] = t
        }
    }]);