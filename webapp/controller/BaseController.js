sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
], function(Controller, UIComponent, History) {
    "use strict";

    return Controller.extend("sap.ui.demo.nav.controller.BaseController", {
        onNavBack: function() {
            const previousLocation = History.getInstance().getPreviousHash();

            if(previousLocation != null) {
                window.history.go(-1);
            } else {
                UIComponent.getRouterFor(this).navTo("appHome", {}, true);
            }
        }
    });
});