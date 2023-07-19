sap.ui.define([
	"sap/ui/demo/nav/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("sap.ui.demo.nav.controller.NotFound", {
		onInit: function () {
			this.getRouter().getTarget("notFound").attachDisplay(function (event) {
				this._data = event.getParameter("data");
			}, this);
		},
		onNavBack: function () {
			if (this._data && this._data.fromTarget) {
				this.getRouter().getTargets().display(this._data.fromTarget);
				delete this._data.fromTarget;

				return;
			}

			BaseController.prototype.onNavBack.apply(this, arguments);
		}
	});
});
