sap.ui.define([
    "sap/ui/demo/nav/controller/BaseController",
], function(BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeList", {
        onListItemPressed: function(event) {
            this.getRouter().navTo("employee", { 
                employeeID: event.getSource().getBindingContext().getProperty("EmployeeID") 
            });
        }
    });
});