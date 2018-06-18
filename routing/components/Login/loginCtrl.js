angular.module('citiesApp')
    .controller('loginCtrl', ['$http', '$scope', '$location', '$window', 'localStorageService', function ($http, $scope, $location, $window, localStorageService) {


        document.getElementById('home').style.display = 'none';

        $http.get('http://localhost:8080/poi/POIs')
            .then(function (response) {
                $scope.pois = response.data;

            });


        $scope.checkUser = function () {
            if ($scope.isValid()) {
                var data = {userName: $scope.userName, password: $scope.password};

                $http.post('http://localhost:8080/login', data)
                    .then(function (response) {
                        if (response.data == "login without cookie") {
                            document.getElementById('login').style.display = 'none';
                            document.getElementById('register').style.display = 'none';
                            document.getElementById('home').style.display = 'inline-block';
                            //document.getElementById('cartC').style.display = 'inline-block';

                            $window.isLoggedIn = true;
                            $window.m_currentUserName = $scope.userName;
                            $location.path('/home');
                        }
                        else if (response.data == 'no such user exists.') {
                            window.alert('Wrong username');
                        }
                        else if (response.data == 'Authentication failed. Wrong password.') {
                                window.alert('Wrong password');
                        }
                         else {
                            var d = Date().toString();
                            localStorageService.cookie.set('currentUser', response.data);
                            localStorageService.cookie.set('currentDate', d);
                            document.getElementById('login').style.display = 'none';
                            document.getElementById('register').style.display = 'none';
                            document.getElementById('home').style.display = 'inline-block';
                            //document.getElementById('cartC').style.display = 'inline-block';
                            $window.isLoggedIn = true;
                            $window.m_currentUserName = $scope.userName;
                            $location.path('/home');
                        }
                    });
            }
        }
        $scope.unChange = function () {
            if ($scope.userName == 'a')
                return true;
            if ($scope.userName.length == 0) {
                $scope.UnComment = '';
            } else if ($scope.userName.length < 3 || $scope.userName.length > 8) {
                $scope.UnComment = 'Username between 3 to 8 letters and no spaces';
            } else {
                $scope.UnComment = '';

            }
        }
        $scope.pdChange = function () {
            if ($scope.password == 'a')
                return true;

            if ($scope.password.length === 0) {
                $scope.pdComment = '';
            } else if ($scope.password.length < 5 || $scope.password.length > 10) {
                $scope.pdComment = 'Password between 5 to 10 letters and no spaces';
            } else {
                $scope.pdComment = '';

            }
        }
        $scope.isValid = function () {

            var a = /^[a-zA-Z]+$/.test($scope.userName);
            var b = /^\w+$/.test($scope.password);
            if ($scope.userName && $scope.password) {
                if (a && b && $scope.userName.length > 0 && $scope.password.length > 0) {
                    return true;
                } else {
                    window.alert('one or more fields are wrong');
                    return false;
                }
            } else {
                window.alert('one or more fields are wrong');
                return false;

            }
        }


    }]);
