/**
 * Defines all the configurations for draggable units
 * @param  {unit} unit [description]
 * @return {[type]}      [description]
 */

"use strict"

var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
let init = function(unit) {
    let element = "";
    if (unit === "image") {
        element = getImageUnit()
    }
    if (unit === "anchor") {
        element = getAnchorUnit()
    }
    if (unit === "header") {
        element = getHeaderUnit()
    }
    if (unit === "paragraph") {
        element = getParagraphUnit()
    }


    addResizeUnits(element);
    addHoverUnits(element);

    return element;
}

let getImageUnit = function() {

    var content = $("<div/>", {
        "data-type": "content",
        "data-option": "image",
        "style": "width:35%;height:25%;box-sizing: border-box;",
        "class": "position-absolute text-center display-inline workspace-baseUnit"
    })
    $("<img/>", {
        "class": "data", // to specify which is the data
        "style": "height:100%;  width: 100%;color: grey;font-size: 20px;",
        'alt': "Type the text that will be rendered if the image cannot be displayed",
        "src": "/assets/placeholder-img.jpg" //"http://www.cambridgecurlingclub.com/wp-content/uploads/placeholder.png" //"http://getuikit.com/docs/images/placeholder_600x400.svg"
    }).appendTo(content)



    return content;


}

let getParagraphUnit = function() {


    var content = $("<div/>", {
        "data-type": "content",
        "data-option": "paragraph",
        "style": "width:30%;box-sizing: border-box;word-wrap: break-word;white-space: pre;",
        "class": "position-absolute display-inline workspace-baseUnit"
    })
    $("<p/>", {
        "class": "data",
        "style": "width:100%;height:100%;overflow:hidden;",
        "text": lorem
    }).appendTo(content)

    return content
}


let getAnchorUnit = function() {
    var content = $("<div/>", {
        "data-type": "content",
        "data-option": "anchor",
        "style": "width:30%;box-sizing: border-box;word-wrap: break-word;white-space: pre;",
        "class": "position-absolute display-inline workspace-baseUnit"
    })
    $("<a/>", {
        "class": "data",
        "text": lorem
    }).appendTo(content)

    return content;
}

let getHeaderUnit = function(argument) {
    let content = $("<div/>", {
        "data-type": "content",
        "data-option": "header",
        "style": "width:25%;position:absolute;background-color:#fff;border:1px solid #000;box-sizing: border-box;",
        "class": "position-absolute text-center display-inline workspace-baseUnit"
    })
    $("<h2/>", {
        "class": "data",
        "text": lorem
    }).appendTo(content)


    return content;
}


let addResizeUnits = function(cont) {
    cont
        .append(handleResizeYB())
        .append(handleResizeYT())
        .append(handleResizeXR())
        .append(handleResizeXL())
}


let addHoverUnits = function(cont) {
    $("<div/>", {
        "class": "contentHoverClass",
        "style": "display:none;"
    }).appendTo(cont)
}




let handleResizeYB = function() {
    let cont = $("<div/>", {
        "class": "ui-resize-y-b",
    })

    return cont;
}
let handleResizeYT = function() {
    let cont = $("<div/>", {
        "class": "ui-resize-y-t",
    })

    return cont;
}
let handleResizeXR = function() {
    let cont = $("<div/>", {
        "class": "ui-resize-x-r",
    })

    return cont;
}
let handleResizeXL = function() {
    let cont = $("<div/>", {
        "class": "ui-resize-x-l",
    })

    return cont;
}


module.exports = init
