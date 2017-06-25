/**
 * Handles the attributes of the elements clicked in the workspace
 */
"use strict"
let attrOptions = (function() {

    let container = "";
    let element = "";
    let type = "";
    let init = function(cont) {
        container = cont;
        attachHandlers();
    }
    let attachHandlers = function() {
        container.on("input", function(e) {
            // body...

            let $this = $(e.target);
            let attr = $this.attr("data-type");
            let value = $this.val();
            if (type === "image") {
                if (attr === "src") { element.attr("src", value) }
                if (attr === "alt") { element.attr("alt", value) }
            } else if (attr === "content") {
                element.text(value);
            } else if (attr === "href") {
                element.attr("href", value)
            }
        })

        container.on("input", function() {
            // body...
        })
    }
    let loadAttribute = function(ele, tp) {
        element = ele;
        type = tp;
        var id = container.attr("id");

        $("a[data-target='#" + id + "']").tab("show");
        container.empty();
        let layout = "";
        if (type === "image") {
            layout = loadImageLayout();
        }
        if (type === "header") {
            layout = loadHeaderLayout();
        }
        if (type === "anchor") {
            layout = loadAnchorLayout();
        }
        if (type === "paragraph") {
            layout = loadParagraphLayout();
        }

        container.append(layout)
    }


    let loadImageLayout = function() {
        let $formGrp = $("<div/>", {
            "class": "form-group"
        })
        $("<label/>", {
            "text": "Image Src"
        }).appendTo($formGrp)
        $("<input/>", {
            "class": "form-control",
            "data-type": "src",
            "value": element.attr("src")
        }).appendTo($formGrp)

        $("<label/>", {
            "text": "Alternate text"
        }).appendTo($formGrp)
        $("<input/>", {
            "class": "form-control",
            "data-type": "alt",
            "value": element.attr("alt")
        }).appendTo($formGrp)


        return $formGrp;
    }

    let loadHeaderLayout = function() {
        let $formGrp = $("<div/>", {
            "class": "form-group"
        })
        $("<label/>", {
            "text": "Header Text"
        }).appendTo($formGrp)
        $("<textArea/>", {
            "class": "form-control",
            "data-type": "content",
            "text": element.text()
        }).appendTo($formGrp)
        return $formGrp;
    }
    let loadAnchorLayout = function() {
        let $formGrp = $("<div/>", {
            "class": "form-group"
        })
        $("<label/>", {
            "text": "Anchor text"
        }).appendTo($formGrp)
        $("<input/>", {
            "class": "form-control",
            "data-type": "content",
            "value": element.text()
        }).appendTo($formGrp)

        $("<label/>", {
            "text": "Anhor url link"
        }).appendTo($formGrp)
        $("<input/>", {
            "class": "form-control",
            "data-type": "href",
            "value": element.attr("href")
        }).appendTo($formGrp)

        return $formGrp;
    }
    let loadParagraphLayout = function() {
        let $formGrp = $("<div/>", {
            "class": "form-group"
        })
        $("<label/>", {
            "text": "Header Text"
        }).appendTo($formGrp)
        $("<textArea/>", {
            "class": "form-control",
            "data-type": "content",
            "text": element.text()
        }).appendTo($formGrp)
        return $formGrp;
    }


    return {
        init: init,
        loadAttribute: loadAttribute

    }
})()


module.exports = attrOptions;
