(function (factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define('jstree.indicator', ['jquery', 'jstree'], factory);
    }
    else if (typeof exports === 'object') {
        factory(require('jquery'), require('jstree'));
    }
    else {
        factory(jQuery, jQuery.jstree);
    }
}(function ($, jstree, undefined) {
    "use strict";

    if ($.jstree.plugins.indicator) { return; }

    /**
     * the settings object.
     * key is the attribute name to select the customizer function from switch.
     * switch is a key => function(element, node) map.
     * rowIndicator: function(element, node) will be called if the type could not be mapped
     * @name $.jstree.defaults.indicator
     * @plugin indicator
     */
    $.jstree.defaults.indicator = {
        "key": "type",
        "switch": {},
        "rowIndicator": function (element, node) {
            let indicatorClass = "";
            let indicatorText = "";
            let isDotClass = false;
            if (node.state.submodule) {
                indicatorClass = "dg-jstree--submodule";
                indicatorText = "S";
            } else if (node.state.containsChanges) {
                indicatorClass = "dg-jstree--changed";
                isDotClass = true;
            } else if (node.state.added) {
                indicatorClass = "dg-jstree--added";
                indicatorText = "A";
            } else if (node.state.modified) {
                indicatorClass = "dg-jstree--modified";
                indicatorText = "M";
            } else if (node.state.deleted) {
                indicatorClass = "dg-jstree--deleted";
                indicatorText = "D";
            } else if (node.state.untracked) {
                indicatorClass = "dg-jstree--untracked";
                indicatorText = "U";
            } else if (node.state.conflict) {
                indicatorClass = "dg-jstree--conflict";
                indicatorText = "C";
            } else if (node.state.renamed) {
                indicatorClass = "dg-jstree--renamed";
                indicatorText = "R";
            }
            if (indicatorClass) {
                const link = element.querySelector("a:first-of-type");
                const row = element.querySelector(".jstree-wholerow");
                const indicator = document.createElement("span");
                indicator.classList.add("dg-jstree-indicator");
                indicator.classList.add(indicatorClass);
                if (isDotClass) {
                    const dot = document.createElement("div");
                    dot.classList.add("dg-jstree-dot");
                    indicator.appendChild(dot);
                } else indicator.innerHTML = indicatorText;
                link.classList.add(indicatorClass);
                row.appendChild(indicator);
            }
        }
    };

    $.jstree.plugins.indicator = function (options, parent) {
        this.bind = function () {
            parent.bind.call(this);
            this.element.on("init.jstree", function () {
                if (typeof this.settings.core.animation !== "string" && this.settings.core.animation)
                    document.documentElement.style.setProperty("--jstree-fiori-animation", `0.${this.settings.core.animation}s`);
                else document.documentElement.style.setProperty("--jstree-fiori-animation", `0s`);
            }.bind(this));
        }
        this.redraw_node = function (obj, deep, callback, force_draw) {
            let node_id = obj;
            let element = parent.redraw_node.apply(this, arguments);
            if (element) {
                let node = this._model.data[node_id];
                let cfg = this.settings.indicator;
                let key = cfg.key;
                let type = (node && node.original && node.original[key]);
                let rowIndicator = (type && cfg.switch[type]) || cfg.rowIndicator;
                if (rowIndicator) rowIndicator(element, node);
            }
            return element;
        };
        this.close_node = function (obj, animation) {
            if (this.settings.core.animation && obj.parentElement) {
                let indicators = obj.parentElement.querySelectorAll("span.dg-jstree-indicator");
                for (let i = 1; i < indicators.length; i++) {
                    indicators[i].style.animation = `fadeOut 0.${this.settings.core.animation}s`;
                }
            }
            return parent.close_node.call(this, obj, animation);
        };
    }
}));