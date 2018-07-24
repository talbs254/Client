angular.module('citiesApp')
    .service('serviceController', ['favoritesModel','localStorageService','$http','$location',function (favoritesModel,localStorageService,$http,$location) {

        var self=this;
        this.username = localStorageService.get('username');

        document.getElementById('logout').style.display = 'none';
        document.getElementById('favorites').style.display = 'none';

        this.pois = $http.get('http://localhost:8080/poi/POIs')
            .then(function (response) {
                self.pois = response.data;
            });


        let token = "";
        this.set = function (t) {
            token = t;
            $http.defaults.headers.common['x-access-token'] = t
        };

        this.logout = function () {
            localStorageService.remove('username');
            localStorageService.remove('token');
            document.getElementById('login').style.display = 'inline-block';
            document.getElementById('register').style.display = 'inline-block';
            document.getElementById('home').style.display = 'inline-block';
            document.getElementById('user').innerText = "Hello User";
            document.getElementById('logout').style.display = 'none';
            document.getElementById('favorites').style.display = 'none'
        };

        this.updatePOIs = function (poi) {
            for(var i=0 ; i<self.pois.length; i+=1){
                if(self.pois[i].POI_id == poi.POI_id){
                    self.pois[i].Rank = poi.Rank;
                    self.pois[i].NumberOfRanks = poi.NumberOfRanks;
                    self.pois[i].Views = poi.Views;
                    self.pois[i].LastReview1 = poi.LastReview1;
                    self.pois[i].LastReview2 = poi.LastReview2;
                    console.log(poi.POI_id);
                    break;
                }
            }
        };
        this.set(localStorageService.get('token'));
        $http.get('http://localhost:8080/users/Favorites').then(function (res) {
            if(res.data.message != 'Failed to authenticate token.'){
                document.getElementById('login').style.display = 'none';
                document.getElementById('register').style.display = 'none';
                document.getElementById('home').style.display = 'inline-block';
                document.getElementById('user').innerText = "Hello " + self.username;
                document.getElementById('logout').style.display = 'inline-block';
                document.getElementById('favorites').style.display = 'inline-block';
                favoritesModel.userFavorites();
                favoritesModel.getFavorite();
                $location.path('/home');
            }
        }).catch();


    }]);