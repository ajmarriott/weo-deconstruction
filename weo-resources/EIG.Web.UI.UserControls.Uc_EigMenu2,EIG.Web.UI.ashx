if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.Uc_EigMenu2_class == "undefined") EIG.Web.UI.UserControls.Uc_EigMenu2_class={};
EIG.Web.UI.UserControls.Uc_EigMenu2_class = function() {};
Object.extend(EIG.Web.UI.UserControls.Uc_EigMenu2_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetMainMenuMarker: function() {
		return this.invoke("GetMainMenuMarker", {}, this.GetMainMenuMarker.getArguments().slice(0));
	},
	GetMainMenu: function() {
		return this.invoke("GetMainMenu", {}, this.GetMainMenu.getArguments().slice(0));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.Uc_EigMenu2,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.Uc_EigMenu2 = new EIG.Web.UI.UserControls.Uc_EigMenu2_class();

