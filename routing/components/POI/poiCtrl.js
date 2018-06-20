angular.module('citiesApp')
    .controller('poiCtrl', ['favoritesModel','$http', '$scope', '$location', '$window', function(favoritesModel, $http, $scope, $location, $window) {

        $("#favoriteTbl tbody").sortable()

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



        $scope.isInFavorite = function(poi,idx,rank){
            return favoritesModel.isFavorite(poi);

        };
        $scope.addToFavorite = function(e, poi){
            $(e.currentTarget).children().toggleClass("starColor");
            favoritesModel.addToFav(poi);
        }



        $http.get('http://localhost:8080/poi/POIs')
            .then(function (response) {
                $scope.pois = response.data;

            });

        $scope.save = function () {
            favoritesModel.updateUserFavorites()
        }

    }]);
