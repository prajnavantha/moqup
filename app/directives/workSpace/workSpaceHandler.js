/**
 * Handles the main workspace area were user drags and drops elements
 */
"use strict"

require('jquery');
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
const getLayout = require("./unitLayout");
const resizeHandler = require("./resizeHandler");
const attributeHandler = require("./attributeHandler");

// require('jquery-ui-bundle');

let container = "";
let isDragging = false;
let mousePos = { x: 0, y: 0 }

let init = function(cont) {
    container = cont;
    attachHandlers();

}


let attachHandlers = function() {
    attachDropListeners();
    container.on("mousemove", function(e) {
        mousePos.x = e.pageX;
        mousePos.y = e.pageY;
    })

    container.on("click", ".workspace-baseUnit", function() {
        //handle the sidebar configuration
        let $this = $(this);
        let type = $this.attr("data-option");
        let element = $this.find(".data");
        attributeHandler.loadAttribute(element, type);

    })
}

let attachDropListeners = function() {
    container.droppable({
        placeholder: "highlight",
        tolerance: "fit",
        hoverClass: "droppableHover",
        drop: function(event, ui) {
            console.log(ui.draggable);
            let type = ui.draggable.attr("data-type")
            let unit = ui.draggable.attr("data-element")
            if (unit) {
                let element = getLayout(unit);
                if (element) {

                    let off = container.offset();
                    let pos = container.position()
                    let diff = (mousePos.x - container.offset().left);

                    let containerHeight = container.height();
                    let containerWidth = container.width();
                    let containerOffset = container.offset();
                    element.css({
                        "top": ((mousePos.y - containerOffset.top) + 10) / containerHeight * 100 + "%",
                        "left": ((mousePos.x - containerOffset.left) + 10) / containerWidth * 100 + "%"
                    })
                    element.appendTo(container)


                    resizeHandler(element, container);
                    // element.draggable();
                    attachDraggable(element);
                }
            }


        }

    })
}


let attachDraggable = function(element) {
    element.draggable({
        grid: [1, 1],
        snap: true,
        snapTolerance: 2,
        containment: ".droppable",
        scroll: true,
        cursor: "no-drop",
        start: function(event, ui) {
            // thake care of showing lines
        },
        drag: function(event, ui) {
            // thake care of showing lines
        },
        stop: function(event, ui) {
            //get percentage from position
            //// thake care of showing lines
            // templateComponent.alignSupport().getInstance().stop()
            // var top = ui.position.top;
            // var left = ui.position.left;

            // var leftperc = left / 400 * 100;
            // var topperc = top / self.containerElement.height() * 100
            // ui.helper.css("left", Math.round(leftperc) + "%")
            // ui.helper.css("top", Math.round(topperc) + "%")

        }
    });
}


module.exports = init;
