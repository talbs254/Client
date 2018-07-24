angular.module('citiesApp')
    .controller('favoritesCtrl', ['serviceController','favoritesModel', '$timeout','$scope', '$http', function (serviceController,favoritesModel, $timeout, $scope, $http) {
        $scope.favorites = favoritesModel.favorites;
        $scope.favoritesSize = favoritesModel.favorites.length;

        $scope.updatePOIsOrder = function () {
            $scope.favorites =[];
            $timeout(
                () => {
                    $('#favoriteTbl tbody').children().each(
                        (index, elem) => {
                            $scope.favorites[index] = angular.element(elem).scope().poi;
                        }
                    )
                }, 0);
        };

        $("#favoriteTbl tbody").sortable({
            update: $scope.updatePOIsOrder
        });


        $scope.save = function () {
            favoritesModel.updateUserFavorites({favorites: $scope.favorites}) ;
        };

        $scope.removePOI = function (poi){
            favoritesModel.removeFromFav(poi);

        };

        $scope.sortByRank = function () {
            if ($scope.topToDown) {
                $scope.topToDown = false;
                $scope.favorites.sort(function (y, x) {
                    return x.Rank < y.Rank ? -1 : x.Rank > y.Rank ? 1 : 0;
                });
            } else {
                $scope.topToDown = true;
                $scope.favorites.sort(function (x, y) {
                    return x.Rank < y.Rank ? -1 : x.Rank > y.Rank ? 1 : 0;
                });
            }
        };

        $scope.sendReview = function (poi,id) {
            var id = 'review2' + id;
            var comment = document.getElementById(id).value;
            if (comment != '') {
                var data = {pointOfInterest: poi, review: comment}
                $http.post('http://localhost:8080/users/ReviewPOI', data)
                    .then(function (res) {
                        if (res.data == "You already reviewed this POI") {
                            alert("You already reviewed this POI");
                        }
                        else {
                            $scope.updatePOI(poi);
                            alert("Thanks for Review");
                        }
                    })
            }

            else {
                alert("Fill the review text field");
            }
        };
        $scope.sendRank = function (poi) {
            var rank = $("input[name=rank]:checked").val();
            if (rank != undefined) {
                var data = {pointOfInterest: poi, rank: rank}
                $http.post('http://localhost:8080/users/RankPOI', data)
                    .then(function (res) {
                        if(res.data=="You already ranked this POI"){
                            alert("You already ranked this POI");
                        }
                        else{
                            $scope.updatePOI(poi);
                            alert("Thanks for Ranking");
                        }
                    });
            }
            else {
                alert("Should choose rank");
            }
        };

        $scope.updatePOI = function updatePOI(poi) {
            if(poi!=undefined){
                var uri = 'http://localhost:8080/poi/' + poi.POI_id;
                $http.get(uri).then(function (res) {
                    serviceController.updatePOIs(res.data[0]);
                });
            }
        };
    }]);