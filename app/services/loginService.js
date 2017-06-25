"use strict"


// module.exports = function (ngModule) {


// 	ngModule.factory('loginService', function($http){
// 		return {

// 			login : function (user) {
// 				console.log("login loginService");
// 				var $promise = $http.post('/login',user)
// 				$promise.then(function (msg) {
// 					if(msg.data === "success") {
// 						console.log("success login")
// 					}
// 				})
// 			}
// 		}

// 	})
// }

module.exports = function() {
    return {
    	login :function () {
    		console.log("lfffffffffffffffffff")
    	}

    }
}
