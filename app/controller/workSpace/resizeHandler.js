"use strict"

require('jquery');

let container = "";
let init = function(element, cont) {
    container = cont;
    element
        .unbind("mousedown")

    element
        .find(".ui-resize-y-b")
        .on("mousedown", handleMouseMovement)

    element
        .find(".ui-resize-y-t")
        .on("mousedown", handleMouseMovement)

    element
        .find(".ui-resize-x-r")
        .on("mousedown", handleMouseMovement)

    element
        .find(".ui-resize-x-l")
        .on("mousedown", handleMouseMovement)


}

let handleMouseMovement = function(e) {
    // body...
    e.preventDefault();
    e.stopPropagation();
    let ele = $(this);
    let dragType = "";
    if (ele.hasClass("ui-resize-y-b")) {
        dragType = "bottom";
    }
    if (ele.hasClass("ui-resize-y-t")) {
        dragType = "top";
    }
    if (ele.hasClass("ui-resize-x-r")) {
        dragType = "right";
    }
    if (ele.hasClass("ui-resize-x-l")) {
        dragType = "left";
    }

    $(document).on("mousemove", function(e) {
        // body...
        e.preventDefault();
        resizeElement(ele, dragType, e)

    })

    $(document).on("mouseup", function(e) {
        $(document).unbind('mousemove');

    });


}


let resizeElement = function(ele, dragType, mousePos) {
    let parent = ele.parent();
    let containerWidth = container.width();
    if (dragType === "bottom") {
        let newY = (parent.offset().top + parent.height());
        let diff = mousePos.pageY - newY
        let newH = parent.height() + diff;
        if (newH > 20) {
            let h = $(container).height() || 800;
            let prec = newH / h * 100
            parent.css("height", Math.round(prec) + "%")
        }
    }
    if (dragType === "top") {
        let parentOffset = container.offset();
        let contentX = parent.position().top; // left of the content
        let cursorX = mousePos.pageY - container.offset().top;
        let diff = contentX - cursorX;
        let newH = parent.height() + diff;
        let wpPos = container.position()
        if (newH > 20 && newH < container.height() && (parentOffset.top < (mousePos.pageY))) {
            let percent = newH / container.height() * 100;
            parent.css("height", Math.round(percent) + "%")
            parent.css("top", Math.round(cursorX / container.height() * 100) + "%")
        }
    }
    if (dragType === "right") {
        let parentOffset = container.offset();
        let newX = (parent.offset().left + parent.width());
        let diff = mousePos.pageX - newX
        let contOffsetX = parent.offset().left - parentOffset.left
        let newW = parent.width() + diff;
        let pRE = parent.offset().left + newW

        if (newW > 20 && newW < containerWidth && (pRE < (parentOffset.left + container.width()))) {
            let percent = newW / containerWidth * 100;
            parent.css("width", Math.round(percent) + "%")
        }
    }
    if (dragType === "left") {
        let parentOffset = container.offset();
        let contentX = parent.position().left; // left of the content
        let cursorX = mousePos.pageX - container.offset().left;
        let diff = contentX - cursorX;
        let newW = parent.width() + diff;
        let wpPos = container.position()
        if (newW > 20 && newW < containerWidth && (parentOffset.left < (mousePos.pageX))) {
            let percent = newW / container.width() * 100;
            parent.css("width", Math.round(percent) + "%")
            parent.css("left", Math.round(cursorX / container.width() * 100) + "%")
        }
    }
}

module.exports = init;
