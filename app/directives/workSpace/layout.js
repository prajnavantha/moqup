module.exports = function(ngModule) {
    "use strict"
    const $ = require('jquery');
    const css = require("./workSpace.css");

    const workSpaceHandler = require("./workSpaceHandler");
    const basicUnitHandler = require("./basicUnitHandler");

    ngModule.directive('moqupModule', function() {

        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'directives/workSpace/layout.html',
            controllerAs: 'vm',
            controller: function() {
                var vm = this;
                // vm.greeting = 'Hello'
                //THis will be the mediator for the app
                let $workSpaceContainer = $(".droppable");
                workSpaceHandler($workSpaceContainer);
                let $draggableContainer = $("#draggable");
                basicUnitHandler($draggableContainer);

            }
        }

    })
}