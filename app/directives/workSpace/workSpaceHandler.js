"use strict"

require('jquery');
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
// require('jquery-ui-bundle');

let container = "";
let isDragging = false;


let init = function(cont) {
    container = cont;
    attachHandlers();

}


let attachHandlers = function() {
    attachDropListeners();
}

let attachDropListeners = function() {
    container.droppable({
        placeholder: "highlight",
        tolerance: "fit",
        hoverClass: "droppableHover",
        drop: function(event, ui) {
            console.log(ui.draggable);

        }

    })
}


module.exports = init;
