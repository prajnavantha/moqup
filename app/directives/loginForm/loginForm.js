module.exports = function(ngModule) {
    
    ngModule.directive('loginModule', function() {

  
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'directives/loginForm.html',
            controllerAs: 'vm',
            controller: function() {
                var vm = this;
                vm.greeting = 'Hello Webpack'
            }
        }

    })
}
