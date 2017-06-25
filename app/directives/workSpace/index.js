module.exports = function(ngModule) {
    const css = require("./workSpace.css");

    ngModule.directive('moqupModule', function() {

        return {
            templateUrl: 'partials/workspace/workspace.html'
        }

    })
}
