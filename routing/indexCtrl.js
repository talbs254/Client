angular.module('citiesApp')
    .controller('indexCtrl', ['serviceController','$scope', function(serviceController,$scope) {

        $scope.logout = function () {
            serviceController.logout();
        }
    }]);
