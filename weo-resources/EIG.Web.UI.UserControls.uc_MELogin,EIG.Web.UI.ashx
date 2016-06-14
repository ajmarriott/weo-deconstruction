if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_MELogin_class == "undefined") EIG.Web.UI.UserControls.uc_MELogin_class={};
EIG.Web.UI.UserControls.uc_MELogin_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_MELogin_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	RegisterMeUser: function(email, company, fn, ln, job, phone, maiden) {
		return this.invoke("RegisterMeUser", {"email":email, "company":company, "fn":fn, "ln":ln, "job":job, "phone":phone, "maiden":maiden}, this.RegisterMeUser.getArguments().slice(7));
	},
	SaveProductInterest: function(productID, userID) {
		return this.invoke("SaveProductInterest", {"productID":productID, "userID":userID}, this.SaveProductInterest.getArguments().slice(2));
	},
	SetupProductOnLogin: function(productId, email) {
		return this.invoke("SetupProductOnLogin", {"productId":productId, "email":email}, this.SetupProductOnLogin.getArguments().slice(2));
	},
	IsCurrnetUserLoggedIn: function() {
		return this.invoke("IsCurrnetUserLoggedIn", {}, this.IsCurrnetUserLoggedIn.getArguments().slice(0));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_MELogin,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_MELogin = new EIG.Web.UI.UserControls.uc_MELogin_class();

