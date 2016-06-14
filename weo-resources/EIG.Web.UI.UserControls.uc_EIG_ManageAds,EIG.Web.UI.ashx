if(typeof EIG == "undefined") EIG={};
if(typeof EIG.Web == "undefined") EIG.Web={};
if(typeof EIG.Web.UI == "undefined") EIG.Web.UI={};
if(typeof EIG.Web.UI.UserControls == "undefined") EIG.Web.UI.UserControls={};
if(typeof EIG.Web.UI.UserControls.uc_EIG_ManageAds_class == "undefined") EIG.Web.UI.UserControls.uc_EIG_ManageAds_class={};
EIG.Web.UI.UserControls.uc_EIG_ManageAds_class = function() {};
Object.extend(EIG.Web.UI.UserControls.uc_EIG_ManageAds_class.prototype, Object.extend(new AjaxPro.AjaxClass(), {
	SaveAdvtInfo: function(txtAdvNameValue, txtFileNameValue, txtRedirectUrlValue, ddlCampaignValue, imgId, isChkAdvValue, optSiteFromValue, absPath, advImgPhysicalPath, MaskCorners, UniqueGuid) {
		return this.invoke("SaveAdvtInfo", {"txtAdvNameValue":txtAdvNameValue, "txtFileNameValue":txtFileNameValue, "txtRedirectUrlValue":txtRedirectUrlValue, "ddlCampaignValue":ddlCampaignValue, "imgId":imgId, "isChkAdvValue":isChkAdvValue, "optSiteFromValue":optSiteFromValue, "absPath":absPath, "advImgPhysicalPath":advImgPhysicalPath, "MaskCorners":MaskCorners, "UniqueGuid":UniqueGuid}, this.SaveAdvtInfo.getArguments().slice(11));
	},
	SaveAdvtArrayInfo: function(uniqueGuid, advImgId, advName, campaignId, maskCorners, rotatorPeriod, images, absPath) {
		return this.invoke("SaveAdvtArrayInfo", {"uniqueGuid":uniqueGuid, "advImgId":advImgId, "advName":advName, "campaignId":campaignId, "maskCorners":maskCorners, "rotatorPeriod":rotatorPeriod, "images":images, "absPath":absPath}, this.SaveAdvtArrayInfo.getArguments().slice(8));
	},
	LoadAdvList: function(uniqueGuid) {
		return this.invoke("LoadAdvList", {"uniqueGuid":uniqueGuid}, this.LoadAdvList.getArguments().slice(1));
	},
	url: '/ajaxpro/EIG.Web.UI.UserControls.uc_EIG_ManageAds,EIG.Web.UI.ashx'
}));
EIG.Web.UI.UserControls.uc_EIG_ManageAds = new EIG.Web.UI.UserControls.uc_EIG_ManageAds_class();

