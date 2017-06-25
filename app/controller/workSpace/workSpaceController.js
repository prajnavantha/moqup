"use strict"
const workSpaceHandler = require("./workSpaceHandler");
const basicUnitHandler = require("./basicUnitHandler");
const attributeHandler = require("./attributeHandler");


module.exports = function($scope,loginService) {


	$scope.signout = function () {
		console.log("here");
        loginService.logout();
		
	}

    let $workSpaceContainer = $(".droppable");
    workSpaceHandler($workSpaceContainer);
    let $draggableContainer = $("#draggable");
    basicUnitHandler($draggableContainer);
    let $configContainer = $("#layoutConfig");
    attributeHandler.init($configContainer)

}
