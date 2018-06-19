let app = angular.module('citiesApp', ["ngRoute", 'LocalStorageModule']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider)  {


    $locationProvider.hashPrefix('');


    $routeProvider.when('/', {
        templateUrl: 'components/Login/login.html',
        controller: 'loginCtrl as loginCtrl'
    })
        .when('/home', {
            templateUrl: 'components/Home/home.html',
            controller : 'homeCtrl as homeCtrl'
        }).when('/about', {
            templateUrl: 'components/About/about.html',
            //controller : 'aboutCtrl as abtCtrl'
        }).when('/login', {
            templateUrl: 'components/Login/login.html',
            controller : 'loginCtrl as loginCtrl'
        }).when('/poi', {
            templateUrl: 'components/POI/poi.html',
            controller : 'poiCtrl as poiCtrl'
        }).when('/retrievePassword', {
            templateUrl: 'components/RetrievePassword/retrievePassword.html',
            controller: 'retrievePasswordCtrl as retrievePasswordCtrl'
        }).when('/register', {
            templateUrl: 'components/Register/register.html',
            controller: 'registerCtrl as registerCtrl'
        })
        .otherwise({ redirectTo: '/' });



}]);









