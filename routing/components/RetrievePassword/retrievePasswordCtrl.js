angular.module('citiesApp')
    .controller('retrievePasswordCtrl', ['$scope', '$http', function ($scope, $http) {

        $scope.isShow = false;
        $scope.retrievePass = function () {
            var data = {userName: $scope.userName, verifier1: $scope.verifier1, verifier2: $scope.verifier2};
            $http.post('http://localhost:8080/retrievePassword', data)
                .then(function (response) {
                    if (response.data == 'Wrong verifiers.') {
                        window.alert('Wrong verifiers.')
                    } else {
                        $scope.Pass = response.data;//password
                        $scope.isShow = true;
                    }
                });
        }
    }]);