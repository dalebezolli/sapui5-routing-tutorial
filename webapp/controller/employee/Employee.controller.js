sap.ui.define([
    "sap/ui/demo/nav/controller/BaseController",
], function(BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.nav.controller.employee.Employee", {
        onInit: function() {
            this.getRouter().getRoute("employee").attachMatched(this._onRouteMatched, this);
        },
        _onRouteMatched: function(event) {
            const employeeID = event.getParameter("arguments").employeeID;
            const view = this.getView();

            view.bindElement({
                path: `/Employees(${employeeID})`,
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function() {
                        view.setBusy(true);
                    },
                    dataReceived: function() {
                        view.setBusy(false);
                    }
                }
            });
        },
        _onBindingChange: function() {
            if(this.getView().getBindingContext()) return;

            this.getRouter().getTargets().display("notFound", { fromTarget: "home" });
        }
    });
});