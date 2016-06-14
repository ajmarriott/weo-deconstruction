var DocumentDetails_PrinterFriendlyOptions = '';
var DocumentDetails_Mail_To = '';
var DocumentDetails_Mail_From = '';
var DocumentDetails_Mail_Subject = '';

var ButtonImage;
var DocumentId;
var PublicationId;
var IsIssueOld;
var InitialContent;
//to load the buttons & article

(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');


function LoadDetailedArticle() {
    //var record = eval(article);
    var record = article;//$.parseJSON( article);
    //Code for google analytics
    var currentUserId = document.getElementById(obj_JSON_DocumentDetail.hdnCurrentUserId).value;
    var currentUser = (currentUserId == "" || !currentUserId) ? "Anonymous" : currentUserId;
    try {
        _gaq.push(['_trackEvent', 'Publication', record[0].Publication, record[0].HeadLine, 0]);
        if (record[0].PublicationId == "172") {
            _gaq.push(['_trackEvent', record[0].Publication, record[0].HeadLine, currentUser, 0]);
            ga('create', 'UA-16418774-3', { 'userId': currentUser });
            ga('send', 'pageview');
        }
    }
    catch (EX) { }

    var contentHolder = $("#divArticleHpContent"); //document.getElementById('divArticleHpContent');
    if (record != null) {
        if (record[0].DocumentBody != null) {

            var data = "";

            if (!obj_JSON_DocumentDetail.IsWorldOpinion) {

                ButtonImage = record[0].ButtonImage;

                data += "<div id='top'></div><table width='100%' cellpadding='0' cellspacing='0' style='padding:10px;'>";

            var from = record[0].IssueDate.length - 4;
            var to = record[0].IssueDate.length;
            
            data += "<tr><td style='text-align: center;padding-top:10px'>";
            if (record[0].PubImage != "") {
                    var htmlClass = record[0].PublicationId == 17 ? '' : 'class="w508"';
                    data += "<img src='" + record[0].PubImage + "' alt='" + record[0].Publication + "' " + htmlClass  + " ></td></tr>";
            }
            else {
                data += "<img src='../../12/TEMPLATE/_layouts/EIG/Images/NewsLetters/EILogoNonNewsletter.gif' alt='Newsletter' style='width:370px'></td></tr>";
            }

                data += "<tr><td><div class='ArticleCopyright' style='padding-top:10px;padding-bottom:10px;text-align:center;'>Copyright © <span id='copyrightYear'>" + record[0].IssueDate.substring(from, to) + "</span> <a href=\'/\'>Energy Intelligence Group</a>.";
            if (!IsArticleFree) {
                data += "All rights reserved. Unauthorized access or electronic forwarding, even for internal use, is prohibited.";
            }            
            data += "</div></td></tr>";

            //data += "<tr><td valign='middle' style='padding-top:20px;padding-bottom:5px;border-bottom:solid 1px #B9B9B9;'>";
            data += "<tr><td valign='middle' style='padding-bottom:5px;border-bottom:solid 1px #B9B9B9;'>";
            DocumentDetails_PrinterFriendlyOptions = data;
            data += "<table border='0' cellpadding='0' cellspacing='0' width='100%'><tr>";
            data += "<td>";
            data += "<table border='0' cellpadding='0' cellspacing='0'><tr>";
            //To display for Newsletter Article
            if (record[0].ButtonImage != "") {
                //data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " print\" onmousedown=\"this.className='" + record[0].ButtonImage + " print_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " print_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " print_ovr pcursor'; MouseOver(this, 'Print')\" onmouseout=\"this.className='" + record[0].ButtonImage + " print'; MouseOut()\" id='imgPrint' onclick='PrintArticle();'></div></td>";
                //data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " copyright\" onmousedown=\"this.className='" + record[0].ButtonImage + " copyright_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " copyright_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " copyright_ovr pcursor'; MouseOver(this, 'Copyright Info')\" onmouseout=\"this.className='" + record[0].ButtonImage + " copyright'; MouseOut()\" id='imgCopyright' onclick='ShowCopyRight();'></div></td>";
                //data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " staff\" onmousedown=\"this.className='" + record[0].ButtonImage + " staff_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " staff_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " staff_ovr pcursor'; MouseOver(this, 'Staff Info')\" onmouseout=\"this.className='" + record[0].ButtonImage + " staff'; MouseOut()\" id='imgStaffInfo' onclick='OpenStaffInfo();'></div></td>";
                var strURL;
                strURL = document.location.href;
                var index = strURL.indexOf("\/kc\/"); //checking for knowledge center folder in the url to hide the pdf icon

                if (index == -1) {
                        if (!(record[0].PublicationId == "17" && !IsIssueOld)) {
                    data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " PDF\" onmousedown=\"this.className='" + record[0].ButtonImage + " PDF_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " PDF_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " PDF_ovr pcursor'; MouseOver(this, 'PDF')\" onmouseout=\"this.className='" + record[0].ButtonImage + " PDF'; MouseOut()\" id='imgPDF' onclick='PrintArticleToPDF();'></div></td>";
                        }
                    data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " print\" onmousedown=\"this.className='" + record[0].ButtonImage + " print_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " print_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " print_ovr pcursor'; MouseOver(this, 'Print')\" onmouseout=\"this.className='" + record[0].ButtonImage + " print'; MouseOut()\" id='imgPrint' onclick='PrintArticle();'></div></td>";
                    if (record[0].PublicationId == "4") {
                        //visible only for PIW
                        data += "<td><div class=\"" + record[0].ButtonImage + " view\" onmousedown=\"this.className='" + record[0].ButtonImage + " view_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " view_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " view_ovr pcursor'; MouseOver(this, 'View Archives')\" onmouseout=\"this.className='" + record[0].ButtonImage + " view'; MouseOut()\" id='imgViewArchieve' onclick='window.location=\"searchPIWArchives.aspx\"' ></div></td>";
                    }
//                    data += "<td><div class=\"" + record[0].ButtonImage + " view_pub\" onmousedown=\"this.className='" + record[0].ButtonImage + " view_pub_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " view_pub_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " view_pub_ovr pcursor'; MouseOver(this, 'View Publication(Online format)')\" onmouseout=\"this.className='" + record[0].ButtonImage + " view_pub'; MouseOut()\" id='imgViewPub'></div></td>";
                    //data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " share\" onmousedown=\"this.className='" + record[0].ButtonImage + " share_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " share_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " share_ovr pcursor'; MouseOver(this, 'Send to your friend')\" onmouseout=\"this.className='" + record[0].ButtonImage + " share'; MouseOut()\" id='imgToFriend' onclick='OpenMailPopup(\"Friend\",\"\", \"\");'></div></td>";
                    //data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " save2wb\" onmousedown=\"this.className='" + record[0].ButtonImage + " save2wb_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " save2wb_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " save2wb_ovr pcursor'; MouseOver(this, 'Save to Workbench')\" onmouseout=\"this.className='" + record[0].ButtonImage + " save2wb'; MouseOut()\" id='imgSave2WB' onclick='SaveToWorkbench(\"" + record[0].DocumentId + "\")'></div></td>";

                    //Datasource redirect, if datasource is available
                    if (dataSource[0].DataSourceId != null) {
                        data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " dataSource\" onmousedown=\"this.className='" + record[0].ButtonImage + " dataSource_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " dataSource_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " dataSource_ovr pcursor'; MouseOver(this, 'View data source')\" onmouseout=\"this.className='" + record[0].ButtonImage + " dataSource'; MouseOut()\" id='imgDatasource' onclick='window.location=\"DataRoom.aspx?DSName=" + dataSource[0].DataSourceId + "\"'></div></td>";
                    }
                    else {
                        //	data += "<td><div class=\"" + record[0].ButtonImage + " dataSource\" onmousedown=\"this.className='" + record[0].ButtonImage + " dataSource_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " dataSource_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " dataSource_ovr pcursor'; MouseOver(this, 'View data source')\" onmouseout=\"this.className='" + record[0].ButtonImage + " dataSource'; MouseOut()\" id='imgDatasource'></div></td>";
                    }
                }

                    data += "<td style='width:20px;' id='divFavoritesContainer'>" + GetFavoritArticlesBtn(obj_JSON_DocumentDetail.IsWorldOpinion) + "</td>";

                //Edit, Force Rank links visible only for editor of the newsletter
                if (obj_JSON_DocumentDetail.forchLinkCheck == "True") {
                    data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " editArt\" onmousedown=\"this.className='" + record[0].ButtonImage + " editArt_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " editArt_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " editArt_ovr pcursor'; MouseOver(this, 'Edit Article')\" onmouseout=\"this.className='" + record[0].ButtonImage + " editArt'; MouseOut()\" id='imgEditArticle' onclick='EditArticle()'></div></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' onclick='ArticleForceRank();'>Force Rank</label></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' style='margin-left:15px;' onclick='ClearFromCache();'>Clear Cache</label></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' style='margin-left:15px;' onclick='ShowTags();'>Show tags</label></td>";
                }

                data += "</tr></table>";

                data += "</td><td align='right'>";
                
                data += "<table border='0' cellpadding='0' cellspacing='0'><tr>";
                data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " about\" onmousedown=\"this.className='" + record[0].ButtonImage + " about_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " about_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " about_ovr pcursor'; MouseOver(this, 'About')\" onmouseout=\"this.className='" + record[0].ButtonImage + " about'; MouseOut()\" id='imgAbout' onclick='LoadArticleAbout(\"" + GetAboutPage(record[0].PublicationId) + "\")' ></div></td>";
                data += "<td style='width:20px;'><div class=\"" + record[0].ButtonImage + " email\" onmousedown=\"this.className='" + record[0].ButtonImage + " email_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " email_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " email_ovr pcursor'; MouseOver(this, 'Email the editor')\" onmouseout=\"this.className='" + record[0].ButtonImage + " email'; MouseOut()\" id='imgEditor' onclick='OpenMailPopup(\"Editor\",\"" + record[0].EditorEmail + "\", \"" + record[0].EditorName + "\");'></div></td>";
                data += "</tr></table>";
                
                data += "</td><td align='right' style='width:90px'>";
                
                data += "<div class='" + record[0].ButtonImage + " back pcursor flt_right' onmousedown=\"this.className='" + record[0].ButtonImage + " back_clk pcursor'\" onmouseup=\"this.className='" + record[0].ButtonImage + " back_ovr pcursor'\" onmouseover=\"this.className='" + record[0].ButtonImage + " back_ovr pcursor'\" onmouseout=\"this.className='" + record[0].ButtonImage + " back pcursor'\" onclick='BackToHomePage(\"" + record[0].PublicationId + "\")'></div></td>";
            }

            //To display for non Newsletter Article
            else {
                data += "<td style='width:20px;'><div class='sprite_nonnewsletter print' onmousedown=\"this.className='sprite_nonnewsletter print_clk'\" onmouseup=\"this.className='sprite_nonnewsletter print_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter print_ovr pcursor'; MouseOver(this, 'Print')\" onmouseout=\"this.className='sprite_nonnewsletter print'; MouseOut()\" id='imgPrint' onclick='PrintArticle();'></div></td>";
                data += "<td style='width:20px;'><div class='sprite_nonnewsletter about' onmousedown=\"this.className='sprite_nonnewsletter about_clk'\" onmouseup=\"this.className='sprite_nonnewsletter about_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter about_ovr pcursor'; MouseOver(this, 'About')\" onmouseout=\"this.className='sprite_nonnewsletter about'; MouseOut()\" id='imgAbout' onclick='LoadArticleAbout(\"" + GetAboutPage(record[0].PublicationId) + "\")' ></div></td>";
                data += "<td style='width:20px;'><div class='sprite_nonnewsletter copyright' onmousedown=\"this.className='sprite_nonnewsletter copyright_clk'\" onmouseup=\"this.className='sprite_nonnewsletter copyright_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter copyright_ovr pcursor'; MouseOver(this, 'Copyright Info')\" onmouseout=\"this.className='sprite_nonnewsletter copyright'; MouseOut()\" id='imgCopyright' onclick='ShowCopyRight();'></div></td>";
                data += "<td style='width:20px;'><div class='sprite_nonnewsletter email' onmousedown=\"this.className='sprite_nonnewsletter email_clk'\" onmouseup=\"this.className='sprite_nonnewsletter email_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter email_ovr pcursor'; MouseOver(this, 'Email the editor')\" onmouseout=\"this.className='sprite_nonnewsletter email'; MouseOut()\" id='imgEditor' onclick='OpenMailPopup(\"Editor\",\"" + record[0].EditorEmail + "\", \"" + record[0].EditorName + "\");'></div></td>";
                data += "<td style='width:20px;'><div class='sprite_nonnewsletter staff' onmousedown=\"this.className='sprite_nonnewsletter staff_clk'\" onmouseup=\"this.className='sprite_nonnewsletter staff_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter staff_ovr pcursor'; MouseOver(this, 'Staff Info')\" onmouseout=\"this.className='sprite_nonnewsletter staff'; MouseOut()\" id='imgStaffInfo' onclick='OpenStaffInfo();'></div></td>";
                var strURL;
                strURL = document.location.href;
                var index = strURL.indexOf("\/kc\/"); //checking for knowledge center folder in the url to hide the pdf icon

                if (index == -1) {
                    data += "<td style='width:20px;'><div class='sprite_nonnewsletter PDF' onmousedown=\"this.className='sprite_nonnewsletter PDF_clk'\" onmouseup=\"this.className='sprite_nonnewsletter PDF_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter PDF_ovr pcursor'; MouseOver(this, 'PDF')\" onmouseout=\"this.className='sprite_nonnewsletter PDF'; MouseOut()\" id='imgPDF' onclick='PrintArticleToPDF();'></div></td>";
                    data += "<td style='width:20px;'><div class='sprite_nonnewsletter share' onmousedown=\"this.className='sprite_nonnewsletter share_clk'\" onmouseup=\"this.className='sprite_nonnewsletter share_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter share_ovr pcursor'; MouseOver(this, 'Send to your friend')\" onmouseout=\"this.className='sprite_nonnewsletter share'; MouseOut()\" id='imgToFriend' onclick='OpenMailPopup(\"Friend\",\"\", \"\");'></div></td>";
                    data += "<td style='width:20px;'><div class='sprite_nonnewsletter save2wb' onmousedown=\"this.className='sprite_nonnewsletter save2wb_clk'\" onmouseup=\"this.className='sprite_nonnewsletter save2wb_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter save2wb_ovr pcursor'; MouseOver(this, 'Save to Workbench')\" onmouseout=\"this.className='sprite_nonnewsletter save2wb'; MouseOut()\" id='imgSave2WB' onclick='SaveToWorkbench(\"" + record[0].DocumentId + "\")'></div></td>";
                    //Datasource redirect, if datasource is available
                    if (dataSource[0].DataSourceId != null) {
                        data += "<td style='width:20px;'><div class='sprite_nonnewsletter dataSource' onmousedown=\"this.className='sprite_nonnewsletter dataSource_clk'\" onmouseup=\"this.className='sprite_nonnewsletter dataSource_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter dataSource_ovr pcursor'; MouseOver(this, 'View data source')\" onmouseout=\"this.className='sprite_nonnewsletter dataSource'; MouseOut()\" id='imgDatasource' onclick='window.location=\"DataRoom.aspx?DSName=" + dataSource[0].DataSourceId + "\"'></div></td>";
                    }
                }
                //Edit, Force Rank links visible only for editor of the newsletter
                if (obj_JSON_DocumentDetail.forchLinkCheck == "True") {
                    data += "<td style='width:20px;'><div class='sprite_nonnewsletter editArt' onmousedown=\"this.className='sprite_nonnewsletter editArt_clk'\" onmouseup=\"this.className='sprite_nonnewsletter editArt_ovr'\" onmouseover=\"this.className='sprite_nonnewsletter editArt_ovr pcursor'; MouseOver(this, 'Edit Article')\" onmouseout=\"this.className='sprite_nonnewsletter editArt'; MouseOut()\" id='imgEditArticle' onclick='EditArticle()'></div></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' onclick='ArticleForceRank();'>Force Rank</label></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' style='margin-left:15px;' onclick='ClearFromCache();'>Clear Cache</label></td>";
                    data += "<td class='bValign'><label class='def_font font_12 pcursor bold italic clr_red' style='margin-left:15px;' onclick='ShowTags();'>Show tags</label></td>";
                }
                data += "</tr></table>";
                data += "</td><td align='right'><div class='sprite_nonnewsletter back pcursor flt_right' onmousedown=\"this.className='sprite_nonnewsletter back_clk pcursor'\" onmouseup=\"this.className='sprite_nonnewsletter back_ovr pcursor'\" onmouseover=\"this.className='sprite_nonnewsletter back_ovr pcursor'\" onmouseout=\"this.className='sprite_nonnewsletter back pcursor'\" onclick='BackToHomePage(\"" + record[0].PublicationId + "\")'></div></td>";
            }

            data += "</tr></table>";
            data += "<div id='divToolTip'></div></td></tr>";

            //	data += "<tr><td><div id='divToolTip'></div></td></tr>";
            //	data += "<tr><td style='border-bottom:solid 1px gray;'><div class='" + record[0].ButtonImage + " sprite_back pcursor flt_right' onclick='BackToHomePage(\"" + record[0].PublicationId + "\")'></div></td></tr>";
            data += "<tr><td><div id='divTagContainer' style='display: none; margin-bottom: 5px; margin-left: 21px; margin-right: 21px; margin-top: 5px;'><strong>Tags:</strong> "+DocumentTags+"</div></td></tr>";

            var isStream = window.location.pathname.toLowerCase() == "/pages/eig_streamarticle.aspx";
            if (isStream) {
                data += "<td><table style='margin-top:10px; width:100%'><tr><td ><div class=\"" + record[0].ButtonImage + " prevArticle\" onmousedown=\"this.className='" + record[0].ButtonImage + " prevArticle_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " prevArticle_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " prevArticle_ovr pcursor'; MouseOver(this, 'Previous Article')\" onmouseout=\"this.className='" + record[0].ButtonImage + " prevArticle'; MouseOut()\" id='imgPrevArticle' onclick='ShowPrevNextArticle( false);'></div><td>";
                data += "<td align='center' style='width:100%' ><div class='article_date pad_8t pad_8b'>" + record[0].DocumentDate + "</div></td>";
                data += "<td ><div  class=\"" + record[0].ButtonImage + " nextArticle\" onmousedown=\"this.className='" + record[0].ButtonImage + " nextArticle_clk'\" onmouseup=\"this.className='" + record[0].ButtonImage + " nextArticle_ovr'\" onmouseover=\"this.className='" + record[0].ButtonImage + " nextArticle_ovr pcursor'; MouseOver(this, 'Next Article')\" onmouseout=\"this.className='" + record[0].ButtonImage + " nextArticle'; MouseOut()\" id='imgNextArticle' onclick='ShowPrevNextArticle( true);'></div></td></tr></table></td>";
            }
            else {
                data += "<td align='center' style='width:100%' ><div class='article_date pad_8t pad_8b'>" + record[0].DocumentDate + "</div></td>";
            }
                        
            DocumentDetails_PrinterFriendlyOptions += "<tr><td align='right' class='article_date pad_8t'>" + record[0].DocumentDate + "</td></tr>";

            data += "<tr><td class='" + GetDetailedArticleCss(record[0].Publication) + "'>" + record[0].HeadLine + "</td></tr>";

            if (record[0].PublicationId == "1") {
                data += "<tr><td align='center'><span style='color: #969696; font:bold 12px Arial,Helvetica,sans-serif'>" + record[0].SectionName + "</span</td></tr>";
            }
            if (isStream) {
                data += "<tr><td class='article_date pad_8t pad_20l'><b>" + record[0].Publication + "</b></td></tr>";
            }

            DocumentDetails_PrinterFriendlyOptions += "<tr><td class='" + GetDetailedArticleCss(record[0].Publication) + "'>" + record[0].HeadLine + "</td></tr>";
            
            DocumentDetails_PrinterFriendlyOptions += "<tr><td>&nbsp;</td></tr>";
            DocumentDetails_PrinterFriendlyOptions += "<tr><td><div style='" + (record[0].AdjustedPDF ? "text-align:justify;" : "") + "' class='article_content w560'> " + record[0].DocumentBody + "</div></td></tr>";

            //alert($(record[0].DocumentBody).);

            //data += "<tr><td>&nbsp;</td></tr>";
            var wClass = (record[0].PublicationId == "17" && !IsIssueOld && !isStream) ? '' : 'w465';
                data += "<tr><td><div style='overflow:auto;" + (record[0].AdjustedPDF ? "text-align:justify;" : "") + "' class='article_content " + wClass + "'> " + EigScriptManager.RemoveScriptTags(record[0].DocumentBody) + "</div></td></tr>";
            data += "<tr><td align='right'><a href=\"#top\" class='" + GetDetailedArticleCss(record[0].Publication) + " pcursor font_11'>TOP</a></td></tr>";
            data += "</table>";

            var DateInfo = new Date();

            var YearInfo = DateInfo.getFullYear();

            DocumentDetails_PrinterFriendlyOptions += "<tr><td class='pad_10t Reader_ModalPoup_Header' style='font-size: 12px;font-family: Arial;font-weight: bold;'>";
            DocumentDetails_PrinterFriendlyOptions += "Copyright © " + YearInfo + " Energy Intelligence Group, Inc.";
            DocumentDetails_PrinterFriendlyOptions += "</td></tr>";

            DocumentDetails_PrinterFriendlyOptions += "</table>";

            document.title = "EIG Article : " + record[0].HeadLine;
            } else {
                data = $('#worldOpinionArticle').tmpl(record[0], { DocumentTags: DocumentTags })[0].outerHTML;
                DocumentDetails_PrinterFriendlyOptions = data;

                loadMoreOpinion(DocumentId);
            }

            InitialContent = data;
            data += '<div id="printContentWrapper" hidden></div>'

            contentHolder.html(data); //.innerHTML = data;
            GMRCharts.InitializeCharts();
            GMRTables.InitializeTables('', false);
            GMRMaps.InitializeMaps();
            //AddScriptTags(record);
            var currentRegexForKeyword;
            var currentKeywords = [];
            if (obj_JSON_DocumentDetail.IsSearchResult) {
                var divArticleHpContent = $("#divArticleHpContent");
                if (obj_JSON_DocumentDetail.SearchKeyWord.trim() != "") {
                    var wordArray = KeywordParse(obj_JSON_DocumentDetail.SearchKeyWord);
                    for (ind in wordArray)
                        if (wordArray[ind] != "") {
                            currentRegexForKeyword = KeywordToRegex(wordArray[ind]);
                            currentKeywords = KeywordsGetAllToHighLight(currentRegexForKeyword, $("#divArticleHpContent").html());
                            for (index in currentKeywords) if (currentKeywords[index] != "") divArticleHpContent.highlight(currentKeywords[index]);
                    }
                }
            }
                
        }
        else {
            contentHolder.html("The article you have requested is not available or does not exist."); //.innerHTML = "The article you have requested is not available or does not exist.";
        }
    }
    else {
        contentHolder.html("The article you have requested is not available or does not exist."); //.innerHTML = "The article you have requested is not available or does not exist.";
    }

    var IssueId = null;
    if (record != null) {
        //To load uc_EIG_Reader portlet
        var PublicationId = record[0].PublicationId;
        IssueId = record[0].IssueId;
    }

    if (IssueId == null || IssueId == "") { //Hide uc_EIG_Reader control
        $("span[dbname='uc_EIG_Reader']").hide();
        $("span[dbname='uc_EIG_Reader'] div.WhiteBG").removeClass("WhiteBG");
        $("span[dbname='uc_DocumentDetail'] table.landing-control-container").css({ "margin-bottom": "0" });
    } else {
        try {
            if (window.getEIGReadersData)
                getEIGReadersData(PublicationId, IssueId);
            else
                window.setTimeout("if (window.getEIGReadersData) getEIGReadersData('" + PublicationId + "', '" + IssueId + "')", 1500);
            //getEIGReadersData(PublicationId, IssueId);
        } catch (e) { }
    }


    if (IsUserLoggedIn == 'False') {
        $("#addalert").show();
    }
    else
    {
        //check WEO AddAlert button status 
        var posibleAddWeoAlert = EIG.Web.UI.UserControls.uc_DocumentDetail.PosibleAddWeoAlert().value;

        if (posibleAddWeoAlert) {
            $("#addalert").show();
        }
    }

}

function KeywordParse(initialKeyword) {
    var resultWord = initialKeyword;
    var resultKeywords = [];

    var keywordsInQuotes = resultWord.match(/"(.*?)"/g);

    if (keywordsInQuotes) {
        for (i = 0; i < keywordsInQuotes.length; i++) {
            resultKeywords.push(keywordsInQuotes[i].replace(/"{1}/g, ""));
            resultWord = resultWord.replace(keywordsInQuotes[i], "");
        }
    }

    resultWord = resultWord.replace(/((\s+)((\+|-){1})(\s*))/gi, "  ");
    resultWord = resultWord.replace(/(\^\d+)|((\s)(and|or|not)(\s))/gi, " ");
    resultWord = resultWord.split(/\s+/g);

    if (resultWord) {
        for (i = 0; i < resultWord.length; i++) {
            if (resultWord[i] != "") resultKeywords.push(resultWord[i]);
        }
    }
    return resultKeywords;
}

function KeywordToRegex(sourceKeyword) {
    var resultWord = sourceKeyword.toString();

    if (resultWord != "") {
        resultWord = resultWord.replace(/\(|\){1}/g, "");
        if (resultWord.substring(0, 1) == "*") {
            resultWord = "((\\S)|(\\w*))" + resultWord.substring(1);
        }

        if (resultWord.substring(resultWord.length - 1) == "*") {
            resultWord = resultWord.substring(0, resultWord.length - 1) + "((\\w*)|(\\S))";
        }

        resultWord = resultWord.replace(/\*{1}(?!\))/g, "\\w*");
        resultWord = resultWord.replace(/\?{1}/g, "\\w{1}");
    }

    return resultWord;
}

function KeywordsGetAllToHighLight(regexForKeyword, content) {
    var regexNeeded;
    try{
        regexNeeded = new RegExp(regexForKeyword, "gi");
    } catch (ex) { };
    var resultArray = content.match(regexNeeded);

    var resultKeyWord = [];
    if (resultArray) {
        $.each(resultArray, function (i, el) {
            if ($.inArray(el, resultKeyWord) === -1) resultKeyWord.push(el);
        });
    }

    if (resultKeyWord) {
        resultKeyWord.sort(function (a, b) {
            return b.length - a.length;
        });
    }

    return resultKeyWord;
}

function ShowTags() { 
    $("#divTagContainer").slideToggle("fast");
}

function GetFavoritArticlesBtn(IsWorldOpinion) {
    var html = "";
    var cssFavoritClass = IsFavoriteArticle == 'True' ? "removeFavoritArticles" : "addFavoritArticles";
    if (IsWorldOpinion)
        html = "<div id='divFavorites' class='favourite-slide rollover-button' onmouseover=\"MouseOver(this, '" + (IsFavoriteArticle == 'True' ? "Remove from favorites" : "Add to favorites") + "')\" onmouseout=\"MouseOut()\" onclick='ChangeFavoriteStatus(" +DocumentId + ")'></div>";
    else 
        html = "<div id='divFavorites' class=\"" + ButtonImage + " " + cssFavoritClass + "\" onmousedown=\"this.className='" + ButtonImage + " " + cssFavoritClass + "_clk'\" onmouseup=\"this.className='" + ButtonImage + " " + cssFavoritClass + "_ovr'\" onmouseover=\"this.className='" + ButtonImage + " " +cssFavoritClass + "_ovr pcursor'; MouseOver(this, '" +(IsFavoriteArticle == 'True' ? "Remove from favorites": "Add to favorites") + "')\" onmouseout=\"this.className='" + ButtonImage + " " +cssFavoritClass + "'; MouseOut()\" onclick='ChangeFavoriteStatus(" +DocumentId + ")'></div>";

    return html;
}

function ChangeFavoriteStatus(docId) {
    EIG.Web.UI.UserControls.uc_DocumentDetail.ChangeFavoriteStatus( docId, ChangeFavoriteStatusCallback);
    $("#divToolTip").hide();
}

function ChangeFavoriteStatusCallback(res) {
    //var hasClass = $('#divFavorites').hasClass('addFavoritArticles');

    if (res && res.value) {
        if (IsFavoriteArticle == 'False') {
            
            IsFavoriteArticle = 'True';
            $('#divFavoritesContainer').html(GetFavoritArticlesBtn(obj_JSON_DocumentDetail.IsWorldOpinion));

            alert('Article has been added to favorites.');
        }
        else {
            
            IsFavoriteArticle = 'False';
            $('#divFavoritesContainer').html(GetFavoritArticlesBtn(obj_JSON_DocumentDetail.IsWorldOpinion));

            alert('Article has been removed from favorites.');
        }
    } else {
        if (IsFavoriteArticle == 'False') {
            if (IsUserLoggedIn == 'False') alert('You need to be logged in to favorite an article.');
            else alert('Article has not been added to favorites.');
        } else {
            alert('Article has not been removed from favorites.');
        }
    }
}

function LoadArticleAbout(aboutUrlArticle) {
    window.location = obj_JSON_DocumentDetail.BaseSiteURL + aboutUrlArticle.split('~')[0];
}

function GetAboutPage(aboutPubId) {
    return EIG.Web.UI.UserControls.uc_DocumentDetail.GetMarketingPage(aboutPubId, $('#'+obj_JSON_DocumentDetail.hdnDocDetailId).val(), obj_JSON_DocumentDetail.ParentID).value;
}

//to get newsletter specific color
function GetDetailedArticleCss(articlePub) {
    var styleClr = "";

    if (articlePub == "Energy Compass") {
        styleClr = "ei_ec_atricle_title";
    }
    else if (articlePub == "Energy Intelligence Briefing") {
        styleClr = "ei_eib_atricle_title";
    }
    else if (articlePub == "Nefte Compass") {
        styleClr = "ei_nc_atricle_title";
    }
    else if (articlePub == "Petroleum Intelligence Weekly") {
        styleClr = "ei_piw_atricle_title";
    }
    else if (articlePub == "Oil Daily") {
        styleClr = "ei_od_atricle_title";
    }
    else if (articlePub == "Oil Market Intelligence") {
        styleClr = "ei_omi_atricle_title";
    }
    else if (articlePub == "Jet Fuel Intelligence") {
        styleClr = "ei_jfi_atricle_title";
    }
    else if (articlePub == "EI Finance") {
        styleClr = "ei_ipf_atricle_title";
    }
    else if (articlePub == "Natural Gas Week") {
        styleClr = "ei_ngw_atricle_title";
    }
    else if (articlePub == "World Gas Intelligence") {
        styleClr = "ei_wgi_atricle_title";
    }
    else if (articlePub == "NGW's Gas Market Reconnaissance") {
        styleClr = "ei_gmr_atricle_title";
    }
    else if (articlePub == "International Oil Daily") {
        styleClr = "ei_iod_atricle_title";
    }
    else if (articlePub == "Nuclear Intelligence Weekly") {
        styleClr = "ei_uiw_atricle_title";
    }
    else if (articlePub == "LNG Intelligence") {
        styleClr = "ei_lng_atricle_title";
    }
    else {
        styleClr = "ei_ec_atricle_title";
    }

    return styleClr;
}

//to print the article
function PrintArticle() {
    var record = eval(article);
    var pubId = record[0].PublicationId.toString();
    
    if (pubId == '17' && !IsIssueOld) {
        $("#printContentWrapper").html(InitialContent);
        GMRCharts.drawPrintCharts('printContentWrapper', printGMRArticle);
    } else {
        showPrintWindow(DocumentDetails_PrinterFriendlyOptions);
    }
}

function printGMRArticle()
{
    DocumentDetails_PrinterFriendlyOptions = '';
    DocumentDetails_PrinterFriendlyOptions += $('#printContentWrapper').html();
     showPrintWindow(DocumentDetails_PrinterFriendlyOptions);
}
 
function showPrintWindow(printContent) {
    //TODO: Need to be implemented in separate print page for EIG_Article
    MouseOut();
    var articleHpPrint = window.open('', '', 'left=0,top=0,width=600,height=400,toolbar=0,scrollbars=0,status=0');
    articleHpPrint.document.writeln('<!DOCTYPE html>');
    articleHpPrint.document.writeln('<html><head><title></title>');

    var record = eval(article);
    var pubId = record[0].PublicationId.toString();

    if (pubId == '17' && !IsIssueOld) {
        articleHpPrint.document.writeln('<link href="/_layouts/EIG/Css/c3.min.css" rel="stylesheet" type="text/css" >');
        articleHpPrint.document.writeln('<link href="/_layouts/EIG/Css/jquery.dataTables.min.css" rel="stylesheet" type="text/css" >');
        articleHpPrint.document.writeln('<link href="/_layouts/EIG/Css/GMRPublicationData.css" rel="stylesheet" type="text/css" >');
        articleHpPrint.document.writeln('<link href="/_layouts/EIG/Css/ol.min.css" rel="stylesheet" type="text/css" >');
        articleHpPrint.document.writeln('<script src="/_layouts/EIG/Js/jquery-1.7.1.min.js" type="text/javascript"></script>');
        articleHpPrint.document.writeln('<script src="https://www.google.com/jsapi" type="text/javascript"></script>');
        articleHpPrint.document.writeln('<script src="https://maps.googleapis.com/maps/api/js?v=3"></script>');
        articleHpPrint.document.writeln('<script src="/_layouts/EIG/Js/google-maplabel.js" type="text/javascript"></script>');
        articleHpPrint.document.writeln('<script src="/_layouts/EIG/Js/wxtiles.v2.js" type="text/javascript"></script>');
        articleHpPrint.document.writeln('<script src="/_layouts/EIG/Js/ol.min.js" type="text/javascript"></script>');
        articleHpPrint.document.writeln('<script src="/_layouts/EIG/Js/GMRMaps.js" type="text/javascript"></script>');
    }
    articleHpPrint.document.writeln('</head><body>');
    articleHpPrint.document.writeln('<div class >' + printContent + '</div>');
    articleHpPrint.document.writeln('<script> GMRMaps.InitializeMaps();</script></body></html>');
    setTimeout(function () {
    articleHpPrint.document.close();
    articleHpPrint.focus();
    articleHpPrint.print();
    articleHpPrint.close();
    }, 1000);
}

//to make pdf article
function PrintArticleToPDF() {
    
    if (obj_JSON_DocumentDetail.IsWorldOpinion && obj_JSON_DocumentDetail.UseIssuePDF) {
        var IssueId = eval(article)[0].IssueId;
        EIG.Web.UI.UserControls.UC_EIG_NewsLetters_HomePage.GetUserSubscriptions(IssueId, null, '172', 'PDF', PDFStatus);
    }
    else {

    var record = eval(article);
    $("#secretIFrame").attr("src", "ViewPdf.aspx?DocId=" + record[0].DocumentId + (obj_JSON_DocumentDetail.ParentType == "S" ? "&streamId=" + obj_JSON_DocumentDetail.ParentID : ""));

    //window.open("ViewPdf.aspx?DocId=" + record[0].DocumentId, "", "left=0,top=0,width=0,height=0,toolbar=no,scrollbars=no,status=no");
    //$.download('ViewPdf.aspx', 'DocId=' + record[0].DocumentId, 'GET');
}
}

function PDFStatus(subsVals) {

    var retVal = subsVals.value.split('$')
    if (retVal[0] == "Html") {
        //For LNG, GMR - Open Html file.
        window.open("PDFIssueExport.aspx?PubId=" + retVal[1] + "&IssueId=" + retVal[2], "html", "top=0,left=0,resizable=yes,toolbar=0,scrollbars=yes,status=0");
    }
    else if (retVal[0] == "Pdf") {
        //Open PDF file, if exists.
        window.open(retVal[1], "", "status=no,resizable=yes");
    }
    else if (retVal[0] == "Msg") {
        //To show alert msg.
        OpenGreyBG();

        var msg = "<table cellpadding='0' cellspacing='0'><tr class='alert_hdr'><td class='pad_10'><div class='clr_white def_font font_14 bold'>Alert!</div></td><td align='right' class='pad_10'><div class='spanClose' onclick='CloseMailStatus()'></div></td></tr>";
        msg += "<tr><td colspan='2' class='alertInnerDiv'><table cellpadding='0' cellspacing='0'><tr><td><div class='alert_msg_clr'>" + retVal[1] + "</div></td></tr>";
        msg += "<tr><td align='center'><div onclick=\"CloseMailStatus()\" class=\"sprite_ok ok pcursor mar_10t\" onmousedown=\"this.className='sprite_ok ok_clk pcursor mar_10t'\" onmouseup=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseover=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseout=\"this.className='sprite_ok ok pcursor mar_10t'\"></div></td></tr></table>";
        msg += "</td></tr></table>";

        var mailStatus = document.getElementById('divMailStatus');
        mailStatus.innerHTML = msg;
        mailStatus.style.top = "250px"; //(window.screen.height / 2) - 125;
        mailStatus.style.left = "350px"; //(window.screen.width / 2) - 175;
        mailStatus.style.display = "block";

        //	alert(retVal[1]);
        if (retVal[1] == "You need an active subscription to view this PDF") {
            window.location = "Order.aspx";
        }
    }
}

//To open send mail popup
function OpenMailPopup(mailTypeParam, editorEmail, editorName) {
    var pop = document.getElementById('divSendToFriend');
    pop.style.top = "250px";  //(window.screen.height / 2) - 160;
    pop.style.left = "440px";  //(window.screen.width / 2) - 200;
    pop.style.width = "400px";
    //pop.style.height = "280px";
    pop.style.display = "block";

    var mailType = document.getElementById('hdnTypeOfMail');
    mailType.value = mailTypeParam;

    var from = document.getElementById('txtShareFromId');
    var to = document.getElementById('txtShareToId');
    var toName = document.getElementById('txtShareToName');

    from.value = document.getElementById(obj_JSON_DocumentDetail.hdnCurrentUserEmailId).value;  //replace it with currently logged in user id
    from.disabled = true;
    DocumentDetails_Mail_From = from.value;
    if (mailTypeParam == "Friend") {
        to.value = "";
        toName.value = "";
        toName.disabled = false;

        document.getElementById('txtShareSubject').value = "";
        document.getElementById('txtShareMessage').value = "";

        $('#divPopHeading').html("SEND TO YOUR FRIEND"); //document.getElementById('divPopHeading').innerHTML = "SEND TO YOUR FRIEND";
    }
    else if (mailTypeParam == "Editor") {

        if (trim(editorEmail) != "") {
            toName.value = editorName;
            to.value = editorEmail;  //replace it with editor's mail id
        }
        else {
            toName.value = "webadmin@energyintel.com";
            to.value = "webadmin@energyintel.com";
        }
        toName.disabled = true;

        $('#divPopHeading').html("EMAIL THE EDITOR"); //document.getElementById('divPopHeading').innerHTML = "EMAIL THE EDITOR";
    }
    DocumentDetails_Mail_To = to.value;
    document.getElementById('txtShareSubject').value = "";
    DocumentDetails_Mail_Subject = document.getElementById('txtShareSubject').value;
    document.getElementById('txtShareMessage').value = "";
    OpenGreyBG();
}

//to open staffinfo
function OpenStaffInfo() {
    var record = eval(article);
    var pubId = record[0].PublicationId.toString();
    EIG.Web.UI.UserControls.uc_DocumentDetail.GetPublicationStaffInfoWithLogo(pubId, ShowStaffInfo);
}

function ShowStaffInfo(staffVal) {
    var staffRecord = eval(staffVal.value);
    var staffInfoContent = "<table class='WhiteBG'><tr><td align='center'><img src=" + staffRecord[0].Main_Image + "></td><tr>";
    staffInfoContent += "<tr><td align='center' class='sendToFriend_Msgbox'><b>" + staffRecord[0].Publication_Intro + "</b></td></tr>";
    staffInfoContent += "<tr><td>&nbsp;</td></tr>";
    staffInfoContent += "<tr><td class='sendToFriend_Msgbox'>" + staffRecord[0].Staff_Info + "</td></tr>";
    staffInfoContent += "<tr><td align='center' style='padding-bottom:8px'>";
    //	staffInfoContent += "<input type='button' id='btnCloseStaffInfo' onclick='CloseStaffInfo();' class='sendToFriend_bline2' onmouseout=\"this.className='sendToFriend_bline2'\" onmouseover=\"this.className='sendToFriend_bline2hover'\" onkeydown=\"this.className='sendToFriend_bline2'\" onkeyup=\"this.className='sendToFriend_bline2hover'\" value='Close' /></td></tr></table>";
    staffInfoContent += "<div onclick='CloseStaffInfo();' class=\"sprite_login_ctrl_ico close_nlhp_ico pcursor\" onmousedown=\"this.className='sprite_login_ctrl_ico close_nlhp_ico_ovr pcursor'\" onmouseup=\"this.className='sprite_login_ctrl_ico close_nlhp_ico_ovr pcursor'\" onmouseover=\"this.className='sprite_login_ctrl_ico close_nlhp_ico_ovr pcursor'\" onmouseout=\"this.className='sprite_login_ctrl_ico close_nlhp_ico pcursor'\"></div></td></tr></table>";

    var staffInfo = document.getElementById('divPubStaffInfo');
    staffInfo.style.width = "545px";
    //staffInfo.style.height = "194px";
    staffInfo.style.top = "220px"; //(window.screen.height - 380) / 2;
    staffInfo.style.left = "350px"; //(window.screen.width - 600) / 2;
    staffInfo.style.display = "block";

    $("#divPubStaffInfo").html(staffInfoContent); //staffInfo.innerHTML = staffInfoContent;

    OpenGreyBG();
}

//to close staffinfo
function CloseStaffInfo() {
    //var staffInfo = document.getElementById('divPubStaffInfo');
    //staffInfo.style.display = "none";
    $("#divPubStaffInfo").hide();

    CloseGreyBG();
}

//while click "send" button
function SendMailFromArticle() {
    var to;

    var record = eval(article);
    var headline = record[0].HeadLine;
    var docUrl = document.getElementById(obj_JSON_DocumentDetail.hdnDocUrl).value;

    var mailType = document.getElementById('hdnTypeOfMail').value;

    if (mailType == "Friend") {
        to = document.getElementById('txtShareToName').value;
    }
    else if (mailType == "Editor") {
        to = document.getElementById('txtShareToId').value;
    }

    var from = document.getElementById('txtShareFromId').value;
    var subject = document.getElementById('txtShareSubject').value;
    var message = document.getElementById('txtShareMessage').value;
    DocumentDetails_Mail_Subject = subject;
    DocumentDetails_Mail_From = from;
    DocumentDetails_Mail_To = to;
    var ValidateDocumentSentinfo = ValidateMailDatainformation();
    if (ValidateDocumentSentinfo == 1) {
        return false;
    }
    else {
        EIG.Web.UI.UserControls.uc_DocumentDetail.SendMailFromArticle(from.toString(), to.toString(), subject.toString(), message.toString(), headline.toString(), docUrl.toString(), mailType.toString(), MailStatus);
    }
}

function ValidateMailDatainformation() {
    if (DocumentDetails_Mail_To == "" || DocumentDetails_Mail_To == null) {
        //$.prompt.close();
        DocumentDetailsInfo_ErrorMessage("Please Enter the To Email Address");
        return 1;
    }

    if (DocumentDetails_Mail_From == "" || DocumentDetails_Mail_From == null) {
        //$.prompt.close();
        DocumentDetailsInfo_ErrorMessage("Please Enter the From Email Address");
        return 1;
    }

    var at = "@";
    var dot = ".";
    var lat = DocumentDetails_Mail_To.indexOf(at);
    var lstr = DocumentDetails_Mail_To.length;
    var ldot = DocumentDetails_Mail_To.lastIndexOf(dot);
    var name = DocumentDetails_Mail_To.substring(lat + 1, ldot).toLowerCase();
    var str = DocumentDetails_Mail_To;
    if (str.indexOf(at) == -1) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (str.indexOf(at) == -1 || str.indexOf(at) == 0 || str.indexOf(at) == lstr) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (str.indexOf(dot) == -1 || str.indexOf(dot) == 0 || str.indexOf(dot) == lstr) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).D");
        return 1;
    }

    if (str.indexOf(at, (lat + 1)) != -1) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (str.substring(lat - 1, lat) == dot || str.substring(lat + 1, lat + 2) == dot) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (str.indexOf(dot, (lat + 2)) == -1) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (str.indexOf(" ") != -1) {
        DocumentDetailsInfo_ErrorMessage("Please enter an Email Address (sample: name@company.com).");
        return 1;
    }

    if (DocumentDetails_Mail_Subject == null || DocumentDetails_Mail_Subject == "") {
        DocumentDetailsInfo_ErrorMessage("Please Enter the Subject");
        return 1;
    }

    return 0;
}

function DocumentDetailsInfo_ErrorMessage(divShareFriend) {
    eiDialog_ShowMessage(divShareFriend, "Share an Article");
}

//To display the Mail Status PopUp
function MailStatus(retVal) {
    CloseMailPopup();
    if (retVal.value == true) {
        OpenGreyBG();

        var msg = "<table cellpadding='0' cellspacing='0'><tr class='alert_hdr'><td class='pad_10'><div class='clr_white def_font font_14 bold'>Alert!</div></td><td align='right' class='pad_10'><div class='spanClose' onclick='CloseMailStatus()'></div></td></tr>";
        msg += "<tr><td colspan='2' class='alertInnerDiv'><table cellpadding='0' cellspacing='0'><tr><td><div class='alert_msg_clr'>Your message has been sent.</div></td></tr>";
        msg += "<tr><td align='center'><div onclick=\"CloseMailStatus()\" class=\"sprite_ok ok pcursor mar_10t\" onmousedown=\"this.className='sprite_ok ok_clk pcursor mar_10t'\" onmouseup=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseover=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseout=\"this.className='sprite_ok ok pcursor mar_10t'\"></div></td></tr></table>";
        msg += "</td></tr></table>";

        var mailStatus = document.getElementById('divMailStatus');
        $('#divMailStatus').html(msg); //mailStatus.innerHTML = msg;
        mailStatus.style.top = "250px"; //(window.screen.height / 2) - 125;
        mailStatus.style.left = "350px"; //(window.screen.width / 2) - 175;
        mailStatus.style.display = "block";
    }
}
//To close the Mail Status Popup
function CloseMailStatus() {
    CloseGreyBG();
    document.getElementById('divMailStatus').style.display = "none";
}

//clear maining pop fields	
function ClearMailPopup() {
    if (document.getElementById('hdnTypeOfMail').value == "Friend") {
        document.getElementById('txtShareToId').value = "";
        document.getElementById('txtShareToName').value = "";
    }
    document.getElementById('txtShareSubject').value = "";
    document.getElementById('txtShareMessage').value = "";
}

//close mail pop
function CloseMailPopup() {
    var pop = document.getElementById('divSendToFriend');
    pop.style.display = "none";
    CloseGreyBG();
}

//open gray background
function OpenGreyBG() {
    var greyPop = document.getElementById('divGray');
    greyPop.style.top = "0px";
    greyPop.style.left = "0px";
    greyPop.style.width = document.getElementsByTagName("body")[0].clientWidth + "px";
    greyPop.style.height = document.getElementsByTagName("body")[0].clientHeight + "px";
    greyPop.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=50)";
    greyPop.style.opacity = "0.5";
    greyPop.style.display = "block";
}

//close gray background
function CloseGreyBG() {
    var greyPop = document.getElementById('divGray');
    greyPop.style.display = "none";
}

// to open copyright popup
function ShowCopyRight() {
    var copyRight = document.getElementById('divCopyRight');
    copyRight.style.width = "620px";
    copyRight.style.height = "398px";
    copyRight.style.top = "250px"; //(window.screen.height - 380) / 2;
    copyRight.style.left = "333px"; //(window.screen.width - 600) / 2;
    copyRight.style.display = "block";
    var copyRightContent = "<div class='alertDiv'><table cellpadding='0' cellspacing='0' class='copyright_popup'><tr class='alert_hdr'><td class='pad_10l'><img src='~/_layouts/EIG/Images/ei-logo1.gif'></td><td align='right' class='pad_10r'><div onclick='CloseCopyRight()' class='spanClose'></div></td></tr>";
    copyRightContent += "<tr style='height:310px;'><td valign='top' colspan='2' class='WhiteBG'><iframe src='~/_layouts/EIG/inc_terms_conditions.htm' width='100%' height='310px' frameborder='0'></iframe></td></tr>";
    copyRightContent += "</table></div>";

    $('#divCopyRight').html(copyRightContent); //copyRight.innerHTML = copyRightContent;

    OpenGreyBG();
}

// to close copyright popup
function CloseCopyRight() {
    var copyRight = document.getElementById('divCopyRight');
    copyRight.style.display = "none";
    CloseGreyBG();
}

//to show the tool tip
function MouseOver(imgId, msg) {
    var toolTip = document.getElementById('divToolTip');

    var e = document.getElementById(imgId.id);
    var position = { x: 0, y: 0 };
    while (e) {
        position.x += e.offsetLeft;
        position.y += e.offsetTop;
        e = e.offsetParent;
    }

    if (window.addEventListener) {
        imgTop = position.y - parseInt(15);
        imgLeft = position.x + parseInt(2);
    }
    else if (window.attachEvent) {
        imgTop = position.y - parseInt(15);
        imgLeft = position.x + parseInt(2);
    }

    $("#divToolTip").html(msg); //toolTip.innerHTML = msg;
    toolTip.style.top = imgTop + 'px';
    toolTip.style.left = imgLeft + 'px';
    toolTip.style.zIndex = 1000;
    toolTip.style.display = "block";
    
}

//to remove the tool tip
function MouseOut() {
    var toolTip = document.getElementById('divToolTip');
    $("#divToolTip").hide(); //toolTip.style.display = "none";
    
}

//save the article to work bench
function SaveToWorkbench(docId) {
    EIG.Web.UI.UserControls.uc_DocumentDetail.SaveToWorkbench(docId, SaveToWorkbench_CAllBack);
}
//To display the status Popup for save the article to work bench
function SaveToWorkbench_CAllBack(ret) {
    var success = ret.value;
    OpenGreyBG();
    if (success == 0) {
        var msg = "<table cellpadding='0' cellspacing='0'><tr class='alert_hdr'><td class='pad_10'><div class='clr_white def_font font_14 bold'>Alert!</div></td><td align='right' class='pad_10'><div class='spanClose' onclick='CloseMailStatus()'></div></td></tr>";
        msg += "<tr><td colspan='2' class='alertInnerDiv'><table cellpadding='0' cellspacing='0'><tr><td><div class='alert_msg_clr'>" + obj_JSON_DocumentDetail.WorkBenchSaveError + "</div></td></tr>";
        msg += "<tr><td align='center'><div onclick=\"CloseMailStatus()\" class=\"sprite_ok ok pcursor mar_10t\" onmousedown=\"this.className='sprite_ok ok_clk pcursor mar_10t'\" onmouseup=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseover=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseout=\"this.className='sprite_ok ok pcursor mar_10t'\"></div></td></tr></table>";
        msg += "</td></tr></table>";
    }
    else {
        var msg = "<table cellpadding='0' cellspacing='0'><tr class='alert_hdr'><td class='pad_10'><div class='clr_white def_font font_14 bold'>Alert!</div></td><td align='right' class='pad_10'><div class='spanClose' onclick='CloseMailStatus()'></div></td></tr>";
        msg += "<tr><td colspan='2' class='alertInnerDiv'><table cellpadding='0' cellspacing='0'><tr><td><div class='alert_msg_clr'>" + obj_JSON_DocumentDetail.SavedSuccess + "</div></td></tr>";
        msg += "<tr><td align='center'><div onclick=\"CloseMailStatus()\" class=\"sprite_ok ok pcursor mar_10t\" onmousedown=\"this.className='sprite_ok ok_clk pcursor mar_10t'\" onmouseup=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseover=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseout=\"this.className='sprite_ok ok pcursor mar_10t'\"></div></td></tr></table>";
        msg += "</td></tr></table>";
    }
    var mailStatus = document.getElementById('divMailStatus');
    $('#divMailStatus').html(msg); //mailStatus.innerHTML = msg;
    mailStatus.style.top = "250px"; //(window.screen.height / 2) - 125;
    mailStatus.style.left = "420px"; //(window.screen.width / 2) - 175;
    mailStatus.style.display = "block";
}

//to go back to article home page when clicking Bach button
function BackToHomePage(pubId) {
    //	window.location = "NewsLetters.aspx?PubId=" + pubId;
    if (window.location.hash == "") {
    window.history.go(-1);
    } else {
        window.history.go(-2);
    }
}

//to edit the article
function EditArticle() {
    window.location = document.getElementById(obj_JSON_DocumentDetail.hdnEditUrl).value;
}

//ranking the article
function ArticleForceRank() {
    EIG.Web.UI.UserControls.uc_DocumentDetail.ArticleForceRank(docId, ArticleForceRank_CALLBACK);
}

//clear cache for the article
function ClearFromCache() {
    EIG.Web.UI.UserControls.uc_DocumentDetail.ClearFromCache(docId, ClearFromCache_CALLBACK);
}

function ClearFromCache_CALLBACK(ret) {
    var isSuccess = ret.value;
    if (isSuccess > 0) {
        alert("Cache cleared, window will be reloaded.");
        window.location.reload(true);
    } 
}

//To display the Force Rank status information
function ArticleForceRank_CALLBACK(ret) {
    var isSuccess = ret.value;
    if (isSuccess > 0) {
        OpenGreyBG();

        var msg = "<table cellpadding='0' cellspacing='0'><tr class='alert_hdr'><td class='pad_10'><div class='clr_white def_font font_14 bold'>Alert!</div></td><td align='right' class='pad_10'><div class='spanClose' onclick='CloseMailStatus()'></div></td></tr>";
        msg += "<tr><td colspan='2' class='alertInnerDiv'><table cellpadding='0' cellspacing='0'><tr><td><div class='alert_msg_clr'>" + obj_JSON_DocumentDetail.SavedSuccess + "</div></td></tr>";
        msg += "<tr><td align='center'><div onclick=\"CloseMailStatus()\" class=\"sprite_ok ok pcursor mar_10t\" onmousedown=\"this.className='sprite_ok ok_clk pcursor mar_10t'\" onmouseup=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseover=\"this.className='sprite_ok ok_ovr pcursor mar_10t'\" onmouseout=\"this.className='sprite_ok ok pcursor mar_10t'\"></div></td></tr></table>";
        msg += "</td></tr></table>";

        var mailStatus = document.getElementById('divMailStatus');
        $('#divMailStatus').html(msg);//mailStatus.innerHTML = msg;
        mailStatus.style.top = "250px"; //(window.screen.height / 2) - 125;
        mailStatus.style.left = "350px"; //(window.screen.width / 2) - 175;
        mailStatus.style.display = "block";
    }
}
function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
}

function ShowPrevNextArticle(direction) {
        
    var currentDocumentId = docId;
    var streamId = obj_JSON_DocumentDetail.ParentID;
    var regionId = obj_JSON_DocumentDetail.RegionID;
    var category = obj_JSON_DocumentDetail.Category;

    var nextDocumentId = EIG.Web.UI.UserControls.uc_DocumentDetail.GetPrevNextDocumentId( streamId, regionId, category, currentDocumentId, direction ).value;

    if (nextDocumentId) {
//                docId = nextDocumentId;
//                fnInitalize_DocumentLoading();
        var href = window.location.href;
        
        window.location = href.replace("DocId="+currentDocumentId,"DocId="+nextDocumentId);
    }
    else {
        var message = (direction ? "next" : "previous" );

        alert("There is not " + message +  " article.");
    }
}

var docId = document.getElementById(obj_JSON_DocumentDetail.hdnDocDetailId).value;
var dataSource;
var article;

//To Get DataSource
function fnInitalize_DocumentLoading() {
    $("#contentHolder").html("Loading...");
    EIG.Web.UI.UserControls.uc_DocumentDetail.GetDataSource(docId, fnInitalize_DocumentLoading_CALLBACK);
}
//To Get Detailed Article
function fnInitalize_DocumentLoading_CALLBACK(ret) {
    dataSource = eval(ret.value);
    EIG.Web.UI.UserControls.uc_DocumentDetail.GetDetailedArticle(docId, obj_JSON_DocumentDetail.ParentType.toString(), obj_JSON_DocumentDetail.ParentID.toString(), window.location.pathname, fnInitalize_ArticleDetail_CALLBACK);
}

function LightBoxArticleImages (htmlSource,prefix) {
    if (typeof prefix ===typeof undefined)
        prefix = '';
    var articleContent = $('<div></div>').html(htmlSource);
    articleContent.find('img.article-image').each(function (index, item) {
        var src = $(item).prop("src");
        var replacement = $("<a data-lightbox ='article-image" + prefix + "' href='" + src + "'>" + item.outerHTML + "</a>");
        $(item).replaceWith(replacement);
    });
    return articleContent.html();
}

function fnInitalize_ArticleDetail_CALLBACK(ret) {
    article = ret.value;
    if (article != null)
    for (var i = 0; i < article.length; i++) {
        if (article[i].PopupImage)
            article[i].DocumentBody = LightBoxArticleImages(article[i].DocumentBody,i.toString());
    }
    DocumentId = article[0].DocumentId;
    PublicationId = article[0].PublicationId;
    IsIssueOld = EIG.Web.UI.UserControls.uc_DocumentDetail.IsIssueOld(DocumentId).value;
    LoadDetailedArticle();
    checkBrowserForGMR(PublicationId, IsIssueOld);
    if (article != null)
    for (var i = 0; i < article.length; i++) {
        EigScriptManager.AddScriptTags(article[i].DocumentBody);
}
}

fnInitalize_DocumentLoading();


//to create weo alert in pub updates
function WeoAddAlert() {

    if (IsUserLoggedIn == 'False') {
        var parameters = {
            titleHtml: '<div class="weo-logo"></div>',
            lftLogBtnTxt: 'back to registration',
            rgtLogBtnLnk: 'http://www2.energyintel.com/WorldEnergyOpinion',
            productId: 172
        };

        (new uc_MeLogin(parameters)).Open('register');
    }
    else {

        var status = EIG.Web.UI.UserControls.uc_DocumentDetail.AddWeoAlert().value;

        if (status == 'WEOCUSTOMALERTEXISTS') {
            eiDialog_ShowMessage("WEO custom alert already exists!", "Add alert");
            $("#addalert").hide();
        }
        else if (status == 'WEOALERTEXISTS') {
            eiDialog_ShowMessage("WEO Publication Alert already exists!", "Add alert");
            $("#addalert").hide();
        }
        else if (status == 'WEOALERTNOTCHECKED') {
            window.location = '/Pages/MyAccount.aspx#subscriptions';
        }
        else if (status == 'WEOCUSTOMALERTADDED') {
            eiDialog_ShowMessage("WEO Custom Alert successfully added!", "Add alert");
            $("#addalert").hide();
        }
    }
}