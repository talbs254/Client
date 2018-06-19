angular.module('citiesApp')
    .controller('poiCtrl', ['$http', '$scope', '$location', '$window', function($http, $scope, $location, $window) {

        function shuffle(array) {
            var currentIndex = array.length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        }

        $http.get('http://localhost:8080/poi/POIs')
            .then(function (response) {
                $scope.pois = shuffle(response.data);

            });

        self.addToCart = function (poi_id) {

        }

    }]);
