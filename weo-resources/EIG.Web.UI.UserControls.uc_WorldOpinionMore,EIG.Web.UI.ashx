if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_WorldOpinionMore_class == "undefined") EIG.Web.UI.UserControls.uc_WorldOpinionMore_class={};
EIG.Web.UI.UserControls.uc_WorldOpinionMore_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_WorldOpinionMore_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	LoadArticles: function(pageSize, pageNumber, shift, largeSummary, freeArticles, featuredArticles, excludeArticles) {
		return this.invoke("LoadArticles", {"pageSize":pageSize, "pageNumber":pageNumber, "shift":shift, "largeSummary":largeSummary, "freeArticles":freeArticles, "featuredArticles":featuredArticles, "excludeArticles":excludeArticles}, this.LoadArticles.getArguments().slice(7));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_WorldOpinionMore,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_WorldOpinionMore = new EIG.Web.UI.UserControls.uc_WorldOpinionMore_class();

