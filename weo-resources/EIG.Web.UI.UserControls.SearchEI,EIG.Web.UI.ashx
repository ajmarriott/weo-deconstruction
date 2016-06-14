if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.SearchEI_class == "undefined") EIG.Web.UI.UserControls.SearchEI_class={};
EIG.Web.UI.UserControls.SearchEI_class = function() {};
Object.extend(EIG.Web.UI.UserControls.SearchEI_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetSearchResults: function(KeyWord) {
		return this.invoke("GetSearchResults", {"KeyWord":KeyWord}, this.GetSearchResults.getArguments().slice(1));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.SearchEI,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.SearchEI = new EIG.Web.UI.UserControls.SearchEI_class();

