"use strict"
const angular = require("angular");
const $ = require("jquery");
const bootstrap = require('bootstrap');
const bs = require('bootstrap/dist/css/bootstrap.css');
const generalCss = require("./directives/general.css");
const utils = require("./shared/utils");
const ngRoute = require('angular-route');
const app = angular.module("app", [ngRoute]);

require('./directives/loginForm')(app)
require('./services/loginService')(app);

require('./directives/workSpace')(app)

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'partials/loginForm/loginLayout.html',
        controller: require('./controller/loginForm/loginController')
    });
    $routeProvider.when('/workspace', {
        templateUrl: 'partials/workspace/workspace.html',
        controller: require('./controller/workSpace/workSpaceController')
    });
    $routeProvider.otherwise({
        redirectTo: '/login'
    })

}])

app.run(function($rootScope, $location, loginService) {
    let routePermission = ['/workspace'];
    let loginPath = ['/login'];
    $rootScope.$on('$routeChangeStart', function() {
        if (routePermission.indexOf($location.path()) !== -1 && !utils.getCookie("accessToken")) {
            $location.path("/login");
        }
        if (loginPath.indexOf($location.path()) !== -1 && utils.getCookie("accessToken")) {
            $location.path("/workspace");
        }

    })
})
