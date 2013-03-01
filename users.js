function UserCtrl($scope,$http) {
  
  //数据的初始化
  $http.get('/users').success(function(data) {
    $scope.users = data;
  });
}