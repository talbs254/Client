angular.module("citiesApp")
    .service('favoritesModel', ['$http', function ($http) {


        var self = this;
        this.favorites = new Array();
        this.lastFavorites = new Array();


        this.getFavorite = function () {
            return self.favorites;
        };


        this.addToFav = function (poi) {
            self.favorites.push(poi);
            if (self.lastFavorites[0] == undefined)
                self.lastFavorites[0] = poi;
            else {
                self.lastFavorites[1] = self.lastFavorites[0];
                self.lastFavorites[0] = poi;
            }
            $('#favNotification').attr('data-badge', self.favorites.length)
        };

        this.isFavorite = function (poi) {
            for (var i = 0; i < self.favorites.length; i += 1) {
                if (self.favorites[i].POI_id === poi.POI_id)
                    return true;
            }
            return false;
        };

        this.removeFromFav = function (poi) {
            for (var i = 0; i < self.favorites.length; i += 1) {
                if (self.favorites[i].POI_id === poi.POI_id) {
                    self.favorites.splice(i, 1);
                    $('#favNotification').attr('data-badge', self.favorites.length);
                    break;
                }
            }
        };

        this.updateUserFavorites = function (data) {
            $http.post('http://localhost:8080/users/POIByOrder', data)
                .then(function () {
                    $('#favNotification').attr('data-badge', self.favorites.length)
                    console.log();
                }).then(function () {
                    if (self.lastFavorites[1] != undefined)
                        $http.post('http://localhost:8080/users/AddPOI', {pointOfInterest: self.lastFavorites[1].POI_id}).then(function () {
                            if (self.lastFavorites[0] != undefined)
                                $http.post('http://localhost:8080/users/AddPOI', {pointOfInterest: self.lastFavorites[0].POI_id});
                        });


            });
        };


        document.getElementById('favorites').style.display = 'none';

        this.userFavorites = function () {
            $http.get('http://localhost:8080/users/Favorites')
                .then(function (ret) {
                    if (ret.data != "No favorites POIs added") {
                        for (var i = 0; i < ret.data.length; i += 1) {
                            self.favorites[ret.data[i].PriorityIndex] = ret.data[i];
                        }
                        $('#favNotification').attr('data-badge', self.favorites.length);
                    }
                }).catch();

        };
        this.userFavorites();

        $('#favNotification').attr('data-badge', self.favorites.length)
    }]);
