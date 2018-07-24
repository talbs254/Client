angular.module('citiesApp').
    controller('aboutCtrl', ['$scope','serviceController',function ($scope,serviceController) {

        $scope.popularPOIs = serviceController.pois;

    }]);