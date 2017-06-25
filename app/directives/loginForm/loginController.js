module.exports = function($scope, loginService) {

    $scope.login = function(user) {
        console.log("here", loginService);
        loginService.login(user, $scope);
    }


}
