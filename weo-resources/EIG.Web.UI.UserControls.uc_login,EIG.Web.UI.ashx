if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_login_class == "undefined") EIG.Web.UI.UserControls.uc_login_class={};
EIG.Web.UI.UserControls.uc_login_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_login_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	userlogin: function(username, password) {
		return this.invoke("userlogin", {"username":username, "password":password}, this.userlogin.getArguments().slice(2));
	},
	userlogout: function() {
		return this.invoke("userlogout", {}, this.userlogout.getArguments().slice(0));
	},
	addportlets: function() {
		return this.invoke("addportlets", {}, this.addportlets.getArguments().slice(0));
	},
	EnterKeyLogin: function(username, password) {
		return this.invoke("EnterKeyLogin", {"username":username, "password":password}, this.EnterKeyLogin.getArguments().slice(2));
	},
	ValidateUserLogin: function() {
		return this.invoke("ValidateUserLogin", {}, this.ValidateUserLogin.getArguments().slice(0));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_login,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_login = new EIG.Web.UI.UserControls.uc_login_class();

