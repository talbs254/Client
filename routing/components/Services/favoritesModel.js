angular.module("citiesApp")
.service('favoritesModel', ['$http', function ($http) {

    var self = this;
    self.favorites=[];

    self.getFavorites = function () {


    };

    self.addToFav = function (poi,idx) {
        self.favorites.push({
            key: poi,
            value: idx
        });
    };

    self.isFavorite = function(poi){
        for(var i=0; i<self.favorites.length; i+=1){
            if(self.favorites[i].key.POI_id === poi.POI_id)
                return true;
        }
        return false;
    };

    self.removeFromFav= function (poi) {
        for(var i=0; i<self.favorites.length; i+=1){
            if(self.favorites[i].key.POI_id === poi.POI_id)
                self.favorites.splice(i,1);
        }
    };

    self.updateUserFavorites = function () {
        for(var i=0; i<self.favorites.length ; i+=1){
            var data = {
                pointOfInterest: self.favorites[i].key.POI_id,
            };
            $http.post('http://localhost:8080/users/AddPOI',data)
                .then(function (response) {
                    console.log(response)

            })
        }
    }
}]);
