angular.module('citiesApp')
    .controller('registerCtrl', ['$http', '$scope', '$location', 'localStorageService', function ($http, $scope, $location, localStorageService) {

        $scope.checked = {};

        $http.get('http://localhost:8080/poi/Categories')
            .then(function (response) {
                $scope.categories = response.data;


            });

        var request = new XMLHttpRequest();
        request.open('GET', 'countries.xml', false);
        request.send();
        var xml = request.responseXML;
        $scope.countries = xml.getElementsByTagName("Name");


        $scope.addUser = function () {
            if ($scope.isValid()) {
                var categories = [];
                var data = {
                    userName: $scope.userName,
                    password: $scope.password,
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    city: $scope.city,
                    country: $scope.country,
                    email: $scope.email,
                    verifier1: $scope.verifier1,
                    verifier2: $scope.verifier2,
                };

                for (var key in $scope.checked) {
                    if ($scope.checked[key] == true) {
                        categories.push(key);
                    }
                }
                data['categories'] = categories;

                $http.post('http://localhost:8080/register', data)
                    .then(function (response) {
                        if (response.data === 'Username is already exists') {
                            window.alert('Username is already in use, please pick another name')
                        } else {
                            var d = Date().toString();
                            localStorageService.cookie.set('currentUser', response.data);
                            localStorageService.cookie.set('currentDate', d);
                            $location.path('/login');
                        }
                    })


            }
        }
        $scope.unChange = function () {
            if ($scope.userName.length === 0) {
                $scope.UnComment = '';
            } else if ($scope.userName.length < 3 || $scope.userName.length > 8) {
                $scope.UnComment = 'Username between 3 to 8 letters';
            } else {
                $scope.UnComment = '';

            }
        }
        $scope.pdChange = function () {
            if ($scope.password.length === 0) {
                $scope.pdComment = '';
            } else if ($scope.password.length < 5 || $scope.password.length > 10) {
                $scope.pdComment = 'password between 5 to 10 letters';
            } else {
                $scope.pdComment = '';

            }
        }
        $scope.isValid = function () {

            var a = /^[a-zA-Z]+$/.test($scope.userName);
            var abool = true;
            if ($scope.UnComment.length > 0) {
                abool = false;
            }
            a = a && abool;
            var b = /^\w+$/.test($scope.password);
            var bbool = true;
            if ($scope.pdComment.length > 0) {
                bbool = false;
            }
            b = b && bbool;

            if (a && b) {
                return true;
            } else if (!a) {
                window.alert('Username contain letters only.');
                return false;
            }
            else {
                window.alert('Password contain letters and number only.');
                return false;

            }
        }
        $scope.listChange = function (category) {
            if (!(category.Category in $scope.checked))
                $scope.checked[category.Category] = true;
            else {
                $scope.checked[category.Category] = !$scope.checked[category.Category];
            }

        }


    }]);
