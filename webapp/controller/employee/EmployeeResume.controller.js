sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	const _validTabKeys = ["Info", "Projects", "Hobbies", "Notes"];

	return BaseController.extend("sap.ui.demo.nav.controller.employee.EmployeeResume", {
		onInit: function () {
			const model = new JSONModel({});		
			this.getView().setModel(model, "view");

			var oRouter = this.getRouter();
			oRouter.getRoute("employeeResume").attachMatched(this._onRouteMatched, this);
		},
		onTabSelect: function(event) {
			this.getRouter().navTo("employeeResume", {
				employeeID: this.getView().getBindingContext().getProperty("EmployeeID"),
				"?query": { tab: event.getParameter("selectedKey") }
			}, true);
		},
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path : `/Employees(${oArgs.employeeID})`,
				events : {
					change: this._onBindingChange.bind(this),
					dataRequested: function (oEvent) {
						oView.setBusy(true);
					},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
					}
				}
			});

			const query = oArgs["?query"];
			if(query && _validTabKeys.includes(query.tab)) {
				oView.getModel("view").setProperty("/selectedTabKey", query.tab);

				if(query.tab === "Hobbies" || query.tab === "Notes") {
					console.log(query.tab);
					this.getRouter().getTargets().display(`resumeTab${query.tab}`);
				}
			} else {
				this.getRouter().navTo("employeeResume", {
					employeeID: oArgs.employeeID,
					"?query": { tab: _validTabKeys[0] }
				});
			}
		},
		_onBindingChange : function (oEvent) {
			// No data for the binding
			if (!this.getView().getBindingContext()) {
				this.getRouter().getTargets().display("notFound");
			}
		}
	});
});