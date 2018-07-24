angular.module('citiesApp')
    .controller('homeCtrl', ['$scope','$http','serviceController', function ($scope,$http,serviceController) {

        $scope.popularCategory;
        $scope.lastFavorites;
        $scope.hasFavorites;

        $http.get('http://localhost:8080/users/PopularPOI')
            .then(function (response) {
                $scope.popularCategory = response.data;
            });

        $http.get('http://localhost:8080/users/2LastFavorites')
            .then(function (response) {
                if(response.data == 'No favorites POIs added' ){
                    $scope.hasFavorites = false;
                }
                else{
                    $scope.hasFavorites = true;
                    $scope.lastFavorites = response.data;

                }

            });



    }]);