module.exports = function(ngModule) {
    "use strict"
    const $ = require('jquery');
    const css = require("./workSpace.css");

    

    ngModule.directive('moqupModule', function() {

        return {
            templateUrl: 'partials/moqupEditor/moqupEditor.html',
            controller: require("./workSpaceController")
        }

    })
}
