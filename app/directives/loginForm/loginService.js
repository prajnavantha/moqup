"use strict"


module.exports = function(ngModule) {


    ngModule.factory('loginService', function($http,$location) {
        return {

            login: function(user,$scope) {
                console.log("login loginService");
                $http.post('/login', user)
                    .then(function(msg) {
                        if (msg.data.result === "success") {
                        	$location.path("/workspace");
                            console.log("success login");
                        } else if (msg.data.result === "failure") {
                        	console.log("login failed");
                        	$scope.msgText = msg.data.reason;
                        	$location.path("/login");
                        }
                    })
                    .catch(function() {
                    	$scope.msgText = "Failed to connect to server"
                        console.log("failure")
                    })
            }

        }

    })
}
