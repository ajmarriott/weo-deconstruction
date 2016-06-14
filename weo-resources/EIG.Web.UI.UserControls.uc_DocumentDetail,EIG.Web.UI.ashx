if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_DocumentDetail_class == "undefined") EIG.Web.UI.UserControls.uc_DocumentDetail_class={};
EIG.Web.UI.UserControls.uc_DocumentDetail_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_DocumentDetail_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetPrevNextDocumentId: function(streamId, regionId, category, documentId, direction) {
		return this.invoke("GetPrevNextDocumentId", {"streamId":streamId, "regionId":regionId, "category":category, "documentId":documentId, "direction":direction}, this.GetPrevNextDocumentId.getArguments().slice(5));
	},
	GetMarketingPage: function(pubId, docId, streamId) {
		return this.invoke("GetMarketingPage", {"pubId":pubId, "docId":docId, "streamId":streamId}, this.GetMarketingPage.getArguments().slice(3));
	},
	GetDetailedArticle: function(docId, ParentType, ParentID, queryUrl) {
		return this.invoke("GetDetailedArticle", {"docId":docId, "ParentType":ParentType, "ParentID":ParentID, "queryUrl":queryUrl}, this.GetDetailedArticle.getArguments().slice(4));
	},
	SendMailFromArticle: function(from, to, subject, message, articleHeadline, url, mailType) {
		return this.invoke("SendMailFromArticle", {"from":from, "to":to, "subject":subject, "message":message, "articleHeadline":articleHeadline, "url":url, "mailType":mailType}, this.SendMailFromArticle.getArguments().slice(7));
	},
	GetPublicationStaffInfoWithLogo: function(pubId) {
		return this.invoke("GetPublicationStaffInfoWithLogo", {"pubId":pubId}, this.GetPublicationStaffInfoWithLogo.getArguments().slice(1));
	},
	SaveToWorkbench: function(docId) {
		return this.invoke("SaveToWorkbench", {"docId":docId}, this.SaveToWorkbench.getArguments().slice(1));
	},
	ArticleForceRank: function(docId) {
		return this.invoke("ArticleForceRank", {"docId":docId}, this.ArticleForceRank.getArguments().slice(1));
	},
	ClearFromCache: function(docId) {
		return this.invoke("ClearFromCache", {"docId":docId}, this.ClearFromCache.getArguments().slice(1));
	},
	GetDataSource: function(docId) {
		return this.invoke("GetDataSource", {"docId":docId}, this.GetDataSource.getArguments().slice(1));
	},
	ChangeFavoriteStatus: function(docId) {
		return this.invoke("ChangeFavoriteStatus", {"docId":docId}, this.ChangeFavoriteStatus.getArguments().slice(1));
	},
	PosibleAddWeoAlert: function() {
		return this.invoke("PosibleAddWeoAlert", {}, this.PosibleAddWeoAlert.getArguments().slice(0));
	},
	AddWeoAlert: function() {
		return this.invoke("AddWeoAlert", {}, this.AddWeoAlert.getArguments().slice(0));
	},
	IsIssueOld: function(DocId) {
		return this.invoke("IsIssueOld", {"DocId":DocId}, this.IsIssueOld.getArguments().slice(1));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_DocumentDetail,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_DocumentDetail = new EIG.Web.UI.UserControls.uc_DocumentDetail_class();

