if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_floater_class == "undefined") EIG.Web.UI.UserControls.uc_floater_class={};
EIG.Web.UI.UserControls.uc_floater_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_floater_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	UpdateSession: function() {
		return this.invoke("UpdateSession", {}, this.UpdateSession.getArguments().slice(0));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_floater,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_floater = new EIG.Web.UI.UserControls.uc_floater_class();

