angular.module('citiesApp')
    .controller('poiCtrl', ['serviceController', 'favoritesModel', '$http', '$scope', function (serviceController, favoritesModel, $http, $scope) {

        $scope.pois = serviceController.pois;
        self.topToDown = true;

        $("#favoriteTbl tbody").sortable()

        $scope.isInFavorite = function (poi) {
            return favoritesModel.isFavorite(poi);

        };
        $scope.addToFavorite = function (e, poi) {
            $(e.currentTarget).children().toggleClass("starColor");
            $scope.isInFavorite(poi) ?favoritesModel.removeFromFav(poi): favoritesModel.addToFav(poi);
        };

        $scope.sortByRank = function () {
            if ($scope.topToDown) {
                $scope.topToDown = false;
                $scope.pois.sort(function (y, x) {
                    return x.Rank < y.Rank ? -1 : x.Rank > y.Rank ? 1 : 0;
                });
            } else {
                $scope.topToDown = true;
                $scope.pois.sort(function (x, y) {
                    return x.Rank < y.Rank ? -1 : x.Rank > y.Rank ? 1 : 0;
                });
            }
        };


        $scope.sendReview = function (poi,id) {
            var id = 'review'+id;
            var comment = document.getElementById(id).value;
            if (comment != '') {
                var data = {pointOfInterest: poi, review: comment}
                $http.post('http://localhost:8080/users/ReviewPOI', data)
                    .then(function (res) {
                        if(res.data=="You already reviewed this POI"){
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

        $scope.isLoggedIn = function () {
            return document.getElementById('logout').style.display == 'inline-block'
        };

        $(window).on('shown.bs.modal', function(event) {
           $scope.updatePOI($scope.pois[parseInt(event.target.id.substring(1))-1]);
        });



    }]);
