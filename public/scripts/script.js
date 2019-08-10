let app = angular.module('single-page-app', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home.html'
    })
    .when('/playlist', {
      templateUrl: 'templates/playlist.html'
    });
});

app.controller('playlistCtrl', ['$scope', '$location', '$http', ($scope, $location, $http) => {
  let { access_token } = $location.search();
  let url = `${$location.protocol()}://${$location.host()}:${$location.port()}/api`;

  $http.get(`${url}/me/${access_token}`).then(({ data: { data } }) => {
    $scope.error = false;
    $scope.user = data;
  });

  $scope.getPlaylist = () => {
    $http.get(`${url}/playlist/${access_token}/${$scope.city}`).then(({ data: { data } }) => {
      $scope.error = false;
      $scope.city = data.city;
      $scope.tracks = data.playlist;
      $scope.temperature = data.temperature;
    }, function error(response) {
      $scope.error = true;
    });
  };
}]);
