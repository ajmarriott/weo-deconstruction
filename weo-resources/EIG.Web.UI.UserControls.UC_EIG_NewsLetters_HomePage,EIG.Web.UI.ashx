if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage_class == "undefined") EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage_class={};
EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage_class = function() {};
Object.extend(EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	GetSubSection: function(pubId, issueId) {
		return this.invoke("GetSubSection", {"pubId":pubId, "issueId":issueId}, this.GetSubSection.getArguments().slice(2));
	},
	UpdateDailyEmailAlertFreq: function(name, pubId) {
		return this.invoke("UpdateDailyEmailAlertFreq", {"name":name, "pubId":pubId}, this.UpdateDailyEmailAlertFreq.getArguments().slice(2));
	},
	UpdateDailyEmailAlertType: function(name, pubId) {
		return this.invoke("UpdateDailyEmailAlertType", {"name":name, "pubId":pubId}, this.UpdateDailyEmailAlertType.getArguments().slice(2));
	},
	LoadNLArticle: function(nwPubId, issueID, showCount, Section, SubSection, currentStyle, isBackIssue) {
		return this.invoke("LoadNLArticle", {"nwPubId":nwPubId, "issueID":issueID, "showCount":showCount, "Section":Section, "SubSection":SubSection, "currentStyle":currentStyle, "isBackIssue":isBackIssue}, this.LoadNLArticle.getArguments().slice(7));
	},
	LoadNewsArticle: function(pubId, pageSize, pageNumber, timezoneInfo) {
		return this.invoke("LoadNewsArticle", {"pubId":pubId, "pageSize":pageSize, "pageNumber":pageNumber, "timezoneInfo":timezoneInfo}, this.LoadNewsArticle.getArguments().slice(4));
	},
	SendMailFromArticle: function(from, to, subject, message, articleHeadline, url, mailType) {
		return this.invoke("SendMailFromArticle", {"from":from, "to":to, "subject":subject, "message":message, "articleHeadline":articleHeadline, "url":url, "mailType":mailType}, this.SendMailFromArticle.getArguments().slice(7));
	},
	GetPublicationStaffInfoWithLogo: function(pubId) {
		return this.invoke("GetPublicationStaffInfoWithLogo", {"pubId":pubId}, this.GetPublicationStaffInfoWithLogo.getArguments().slice(1));
	},
	AddToSession: function(docId) {
		return this.invoke("AddToSession", {"docId":docId}, this.AddToSession.getArguments().slice(1));
	},
	GetUserSubscriptions: function(issueId, userId, pubId, pdfButtonType) {
		return this.invoke("GetUserSubscriptions", {"issueId":issueId, "userId":userId, "pubId":pubId, "pdfButtonType":pdfButtonType}, this.GetUserSubscriptions.getArguments().slice(4));
	},
	GetUserSubscriptionsForViewArticles: function(issueId, userId, pubId) {
		return this.invoke("GetUserSubscriptionsForViewArticles", {"issueId":issueId, "userId":userId, "pubId":pubId}, this.GetUserSubscriptionsForViewArticles.getArguments().slice(3));
	},
	LogAuditTrailforBackButton: function(pubId, issueId) {
		return this.invoke("LogAuditTrailforBackButton", {"pubId":pubId, "issueId":issueId}, this.LogAuditTrailforBackButton.getArguments().slice(2));
	},
	NeedReloadPage: function(newIssueID) {
		return this.invoke("NeedReloadPage", {"newIssueID":newIssueID}, this.NeedReloadPage.getArguments().slice(1));
	},
	UpdatePreviousIssue: function(newIssueID) {
		return this.invoke("UpdatePreviousIssue", {"newIssueID":newIssueID}, this.UpdatePreviousIssue.getArguments().slice(1));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage = new EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage_class();

