module.exports = function(ngModule) {
    const css = require("./login.css");

    ngModule.directive('loginModule', function() {

        return {
            templateUrl: 'partials/loginForm/loginForm.html'
        }

    })
}
