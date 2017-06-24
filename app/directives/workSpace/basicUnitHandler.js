"use strict"
require('jquery');
require("jquery-ui/ui/widgets/draggable");
require("jquery-ui/ui/widgets/droppable");
// require('jquery-ui-bundle');
let basicUnits = require("./basicUnits")
let container = "";

//Define the draggable and the clickable component here
let init = function(cont) {
    container = cont;
    createView();
    attachHandlers();
}

let createView = function() {

    basicUnits.forEach(function(item, index) {
        let cont = $("<div/>", {
            "data-type": item["type"],
            "data-element": item["element"],
            "class": item["class"],
            "title": item["element"]
        })

        var wrapper = $("<div/>", {
            "class": "text-center"
        }).appendTo(cont)

        $("<h4/>", {
            "text": item["element"]
        }).appendTo(wrapper)

        cont.appendTo(container)

    })

}

let attachHandlers = function() {
    container.find(".unitComponent").draggable({
        helper: "clone",
        cursor: "no-drop",
        cursorAt: {
            left: -10,
            top: -10
        },
        drag: function() {
            // var offset = $(this).offset();
            // var xPos = offset.left;
            // var yPos = offset.top;
        },
        helper: function(event) {
            var clone = $(this).clone();
            clone.css("width", "100px");
            return clone; //$("<div class='ui-widget-header'>I'm a custom helper</div>");
        }

    });

}



module.exports = init;
