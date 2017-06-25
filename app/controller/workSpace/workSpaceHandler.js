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

    container.on("click", ".workspace-baseUnit", function(e) {
        //handle the sidebar configuration and remove any propagation
        e.preventDefault();
        e.stopPropagation();
        let $this = $(this);
        let type = $this.attr("data-option");

        attributeHandler.loadAttribute($this, type);

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
            computeHelperLine(ui.helper);
            computeAlignmentLines(ui.helper).compute();
        },
        stop: function(event, ui) {
            removeHelperLine(ui.helper);
            computeAlignmentLines(ui.helper).clear();
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


let computeHelperLine = function(element) {
    if ($("#veMidLine").length == 0) {
        $("<div/>", {
            "class": "position-absolute",
            "id": "veMidLine",

        }).appendTo(container)
    }
    if ($("#heMidLine").length == 0) {

        $("<div/>", {
            "class": "position-absolute",
            "id": "heMidLine",

        }).appendTo(container)
    }

    var offset = element.position()
    var eLeft = offset.left;
    var eTop = offset.top;
    var eWidth = element.outerWidth();
    var eHeight = element.outerHeight();

    container
        .find("#heMidLine")
        .show()
        .css({
            "top": (eTop + (eHeight / 2)) / container.height() * 100 + "%"
        })
        .show()

    container
        .find("#veMidLine")
        .show()
        .css({
            "left": (eLeft + (eWidth / 2)) / container.width() * 100 + "%"
        })
        .show()

}

/*Takes care of showing lines when element comes close to any of the existing siblings*/
let computeAlignmentLines = function(element) {


    return (function(element, container) {
        let maps = [];
        let threshold = 2;
        let siblings = element.siblings(".workspace-baseUnit");
        if (maps.length === 0 || maps.length !== siblings.length) {
            maps.length = 0;
            siblings.each(function(i, item) {
                var $item = $(item);
                var offset = $item.position();

                maps.push({
                    "top": offset.top,
                    "left": offset.left,
                    "width": $item.outerWidth(),
                    "height": $item.outerHeight(),
                    "center": $item.outerWidth() / 2,
                    "middle": $item.outerHeight() / 2
                })
            })
        }

        if ($("#vLineBase").length == 0) {
            $("<div/>", {
                "class": "position-absolute",
                "id": "vLineBase",

            }).appendTo(container)
        }
        if ($("#hLineBase").length == 0) {

            $("<div/>", {
                "class": "position-absolute",
                "id": "hLineBase",

            }).appendTo(container)
        }
        if ($("#vLine").length == 0) {
            $("<div/>", {
                "class": "position-absolute",
                "id": "vLine",

            }).appendTo(container)
        }
        if ($("#hLine").length == 0) {

            $("<div/>", {
                "class": "position-absolute",
                "id": "hLine",

            }).appendTo(container)
        }

        function clear() {
            maps.length = 0;
        }

        function handleComputation() {
            let offset = element.position()
            let eLeft = offset.left;
            let eTop = offset.top;
            let eWidth = element.outerWidth();
            let eHeight = element.outerHeight();
            let vLineBase = $("#vLineBase");
            let hLineBase = $("#hLineBase");
            let vLine = $("#vLine");
            let hLine = $("#hLine");

            maps.some(function(item, i) {
                let alignFound = false;
                if (((item.left + threshold + item.width) >= (eLeft + eWidth)) && ((item.left - threshold + item.width) <= (eLeft + eWidth))) {
                    vLineBase.show();
                    vLineBase.css({
                        "left": (item.left + item.width) / container.width() * 100 + "%"
                    })
                    alignFound = true;
                } else if (((item.left + threshold) >= (eLeft + eWidth)) && ((item.left - threshold) <= (eLeft + eWidth))) {
                    vLineBase.show();
                    vLineBase.css({
                        "left": item.left / container.width() * 100 + "%"
                    })
                    alignFound = true;
                } else {
                    vLineBase.hide();
                }

                if (((item.top + threshold + item.height) >= eTop + eHeight) && ((item.top - threshold + item.height) <= eTop + eHeight)) {
                    hLineBase.show();
                    hLineBase.css({
                        "top": (item.top + item.height) / container.height() * 100 + "%"
                    })
                    alignFound = true;
                } else if (((item.top + threshold) >= eTop + eHeight) && ((item.top - threshold) <= eTop + eHeight)) {
                    hLineBase.show();
                    hLineBase.css({
                        "top": item.top / container.height() * 100 + "%"
                    })
                    alignFound = true;
                } else {
                    hLineBase.hide();
                }


                if (((item.left + threshold) >= eLeft) && ((item.left - threshold) <= eLeft)) {
                    vLine.show()
                    vLine.css({
                        "left": item.left / container.width() * 100 + "%"
                    })
                    alignFound = true;
                } else if (((item.left + threshold + item.width) >= eLeft) && ((item.left - threshold + item.width) <= eLeft)) {
                    vLine.show()
                    vLine.css({
                        "left": (item.left + item.width) / container.width() * 100 + "%"
                    })
                    alignFound = true;
                } else {
                    vLine.hide();
                }

                if (((item.top + threshold) >= eTop) && ((item.top - threshold) <= eTop)) {
                    hLine.show();
                    hLine.css({
                        "top": item.top / container.height() * 100 + "%"
                    })
                    alignFound = true;
                    // break;
                } else if (((item.top + threshold + item.height) >= eTop) && ((item.top - threshold + item.height) <= eTop)) {
                    hLine.show();
                    hLine.css({
                        "top": (item.top + item.height) / container.height() * 100 + "%"
                    })
                    alignFound = true;
                } else {
                    hLine.hide();
                }

                return alignFound;
            })


        }
        return {
            clear: clear,
            compute: handleComputation
        }
    })(element, container)

}

let removeHelperLine = function() {
    // body...
    container.find("#heMidLine").hide();
    container.find("#veMidLine").hide();
}

module.exports = init;
