let app = angular.module('single-page-app', ['ngRoute']);

let urlBase = 'http://localhost:3000/app'

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/playlist', {
      templateUrl: 'templates/playlist.html'
    });
});

app.controller('playlistCtrl', ['$location', '$http', function ($location, $http) {
  let url = new URL($location.absUrl()).searchParams;
  let code = url.get('code');
  $http.get(`${urlBase}/token?code=${code}`).then(function (response) {
    console.log(response.data)
  });
}]);
