angular.module('citiesApp')
    .controller('homeCtrl', ['$http', '$scope', '$location', '$window', 'localStorageModel', function ($http, $scope, $location, $window, localStorageModel) {

        $http.get('http://localhost:8080/users/PopularPOI')
            .then(function (response) {
                console.log(response)
            });


    }]);