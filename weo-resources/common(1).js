var EILibrary = {

    CreateEvent: function (eventName) {
        // non-IE
        if (document.createEvent) {
            evt = document.createEvent("Event");
            evt.initEvent(eventName, true, true);
            document.dispatchEvent(evt);
        } else if (document.createEventObject) { // MSIE
            // just change the property 
            // this will trigger onpropertychange
            document.documentElement[eventName]++;
        };
    },

    AttachEvent: function (eventName, eventListener) {
        // non-IE: just create a listener for the custom event
        if (document.addEventListener) {

            document.addEventListener(eventName, function () { eventListener(); }, false);
            // IE8
        } else if (document.attachEvent) {

            // since IE8 does not allow to listen to custom events, 
            // just listen to onpropertychange
            document.documentElement.attachEvent("onpropertychange", function (event) {

                // if the property changed is the custom property
                if (event.propertyName == eventName) {

                    eventListener();

                    // remove listener, since it's only used once
                    document.documentElement.detachEvent("onpropertychange", arguments.callee);
                }
            });
        }

    },

    GetUrlParameter: function (name, caseSensitive, url) {
        if (url == null)
            url = location.search;

        if (!caseSensitive)
            url = url.toLowerCase();

        var val = (RegExp(name.toLowerCase() + '=' + '(.+?)(&|$)').exec(url) || [, null])[1];
        if (val == null)
            return null
        return decodeURI(val);
    },

    ConsoleDebug: function () {
        if (window.console && window.console.debug) {

            if (document.attachEvent)// if IE8
            {
                var evalStatement = "console.debug(";
                for (var i = 0; i < arguments.length; i++) {
                    evalStatement += "arguments[" + i + "], ";
                }
                evalStatement = evalStatement.substring(0, evalStatement.length - 2);
                evalStatement += ");";

                eval(evalStatement);
            }
            else
                return console.debug.apply(console, arguments);
        }
    },

    ConsoleError: function () {

        if (window.console && window.console.error) {

            if (document.attachEvent)// if IE8
            {
                var evalStatement = "console.error(";
                for (var i = 0; i < arguments.length; i++) {
                    evalStatement += "arguments[" + i + "], ";
                }
                evalStatement = evalStatement.substring(0, evalStatement.length - 2);
                evalStatement += ");";


                eval(evalStatement);
            }
            else
                return console.error.apply(console, arguments);
        }
    },

    Browser: (function () {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return { name: 'IE', version: (tem[1] || '') };
        }
        if (M[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/)
            if (tem != null) { return { name: 'Opera', version: tem[1] }; }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
        return {
            name: M[0],
            version: M[1]
        };
    })()
    }
var EIMessages = {
    OldBrowserMessage: "Energy Intelligence no longer supports Internet Explorer 9 or earlier. Please upgrade your browser or use Google Chrome or Mozilla Firefox to view this page."
}

var Drag = {

    obj: null,

    init: function(o, oRoot, minX, maxX, minY, maxY, bSwapHorzRef, bSwapVertRef, fXMapper, fYMapper) {
        o.onmousedown = Drag.start;

        o.hmode = bSwapHorzRef ? false : true;
        o.vmode = bSwapVertRef ? false : true;

        o.root = oRoot && oRoot != null ? oRoot : o;

        if (o.hmode && isNaN(parseInt(o.root.style.left))) o.root.style.left = "0px";
        if (o.vmode && isNaN(parseInt(o.root.style.top))) o.root.style.top = "0px";
        if (!o.hmode && isNaN(parseInt(o.root.style.right))) o.root.style.right = "0px";
        if (!o.vmode && isNaN(parseInt(o.root.style.bottom))) o.root.style.bottom = "0px";

        o.minX = typeof minX != 'undefined' ? minX : null;
        o.minY = typeof minY != 'undefined' ? minY : null;
        o.maxX = typeof maxX != 'undefined' ? maxX : null;
        o.maxY = typeof maxY != 'undefined' ? maxY : null;

        o.xMapper = fXMapper ? fXMapper : null;
        o.yMapper = fYMapper ? fYMapper : null;

        o.root.onDragStart = new Function();
        o.root.onDragEnd = new Function();
        o.root.onDrag = new Function();
    },

    start: function(e) {
        var o = Drag.obj = this;
        e = Drag.fixE(e);
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        o.root.onDragStart(x, y);

        o.lastMouseX = e.clientX;
        o.lastMouseY = e.clientY;

        if (o.hmode) {
            if (o.minX != null) o.minMouseX = e.clientX - x + o.minX;
            if (o.maxX != null) o.maxMouseX = o.minMouseX + o.maxX - o.minX;
        } else {
            if (o.minX != null) o.maxMouseX = -o.minX + e.clientX + x;
            if (o.maxX != null) o.minMouseX = -o.maxX + e.clientX + x;
        }

        if (o.vmode) {
            if (o.minY != null) o.minMouseY = e.clientY - y + o.minY;
            if (o.maxY != null) o.maxMouseY = o.minMouseY + o.maxY - o.minY;
        } else {
            if (o.minY != null) o.maxMouseY = -o.minY + e.clientY + y;
            if (o.maxY != null) o.minMouseY = -o.maxY + e.clientY + y;
        }

        document.onmousemove = Drag.drag;
        document.onmouseup = Drag.end;

        return false;
    },

    drag: function(e) {
        e = Drag.fixE(e);
        var o = Drag.obj;

        var ey = e.clientY;
        var ex = e.clientX;
        var y = parseInt(o.vmode ? o.root.style.top : o.root.style.bottom);
        var x = parseInt(o.hmode ? o.root.style.left : o.root.style.right);
        var nx, ny;

        if (o.minX != null) ex = o.hmode ? Math.max(ex, o.minMouseX) : Math.min(ex, o.maxMouseX);
        if (o.maxX != null) ex = o.hmode ? Math.min(ex, o.maxMouseX) : Math.max(ex, o.minMouseX);
        if (o.minY != null) ey = o.vmode ? Math.max(ey, o.minMouseY) : Math.min(ey, o.maxMouseY);
        if (o.maxY != null) ey = o.vmode ? Math.min(ey, o.maxMouseY) : Math.max(ey, o.minMouseY);

        nx = x + ((ex - o.lastMouseX) * (o.hmode ? 1 : -1));
        ny = y + ((ey - o.lastMouseY) * (o.vmode ? 1 : -1));

        if (o.xMapper) nx = o.xMapper(y);
        else if (o.yMapper) ny = o.yMapper(x);

        Drag.obj.root.style[o.hmode ? "left" : "right"] = nx + "px";
        Drag.obj.root.style[o.vmode ? "top" : "bottom"] = ny + "px";
        Drag.obj.lastMouseX = ex;
        Drag.obj.lastMouseY = ey;

        Drag.obj.root.onDrag(nx, ny);
        return false;
    },

    end: function() {
        document.onmousemove = null;
        document.onmouseup = null;
        Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style[Drag.obj.hmode ? "left" : "right"]),
                                                      parseInt(Drag.obj.root.style[Drag.obj.vmode ? "top" : "bottom"]));
        Drag.obj = null;
    },

    fixE: function(e) {
        if (typeof e == 'undefined') e = window.event;
        if (typeof e.layerX == 'undefined') e.layerX = e.offsetX;
        if (typeof e.layerY == 'undefined') e.layerY = e.offsetY;
        return e;
    }
};


//We wrap all the code in an object so that it doesn't interfere with any other code
var scroller = {
    init: function(Container, Content, Scroller, ScrollArea) {

        //collect the variables
        scroller.docH = document.getElementById(Content).offsetHeight;
        scroller.contH = document.getElementById(Container).offsetHeight;
        scroller.scrollAreaH = document.getElementById(ScrollArea).offsetHeight;

        //calculate height of scroller and resize the scroller div
        //(however, we make sure that it isn't to small for long pages)
        scroller.scrollH = (scroller.contH * scroller.scrollAreaH) / scroller.docH;
        //if(scroller.scrollH < 15) scroller.scrollH = 15;
        document.getElementById(Scroller).style.height = Math.round(scroller.scrollH) + "px";

        //what is the effective scroll distance once the scoller's height has been taken into account
        scroller.scrollDist = Math.round(scroller.scrollAreaH - scroller.scrollH);

        //make the scroller div draggable
        Drag.init(document.getElementById(Scroller), null, 0, 0, -1, scroller.scrollDist);

        //add ondrag function
        document.getElementById(Scroller).onDrag = function(x, y) {

            var scrollY = parseInt(document.getElementById(Scroller).style.top);

            scroller.docH = document.getElementById(Content).offsetHeight;
            scroller.contH = document.getElementById(Container).offsetHeight;
            scroller.scrollAreaH = document.getElementById(ScrollArea).offsetHeight;
            scroller.scrollH = (scroller.contH * scroller.scrollAreaH) / scroller.docH;
            scroller.scrollDist = Math.round(scroller.scrollAreaH - scroller.scrollH);
            var docY = 0 - (scrollY * (scroller.docH - scroller.contH) / scroller.scrollDist);

            //end
            document.getElementById(Content).style.top = docY + "px";
        };
    }
};

//onload = scroller.init;
var objStyle_1 = { "width": "150", "height": "150" };
function fnCreateScrollBar(divID, objStyle) {
    if ($.browser.msie) {
        $("#" + divID).attr("class", "ShowScroll");

    }
    else {
        var ScrollArea = "ScrollArea_" + divID;
        var Scroller = "Scroller_" + divID;
        var Container = "Container_" + divID;
        var Content = "Content_" + divID;
        var saveContent = $("#" + divID).html();
        var outerdiv = "outerdiv_" + divID;
        $("#" + divID).attr("id", outerdiv);
        var str = "<table border=0 cellspacing=0><tr><Td>";
        str = str + "<div id=" + Container + "><div id=" + Content + "><div id=" + divID + ">" + saveContent + "</div></div></div></td>";
        str = str + "<td><div id=" + ScrollArea + "><div id=" + Scroller + "></div></div></td></tr></table>";
        $("#" + outerdiv).html(str);

        fnSetCSS(Container, Content, Scroller, ScrollArea, objStyle);
        scroller.init(Container, Content, Scroller, ScrollArea);
    }
}

function fnSetCSS(Container, Content, Scroller, ScrollArea, objStyle) {
    $("#" + Container).css("position", "static");
    // $("#" + Container).css("top", "10px");
    $("#" + Container).css("width", objStyle.width + "px");

    $("#" + Container).css("overflow", "hidden");
    $("#" + Container).css("height", objStyle.height + "px");

    $("#" + Content).css("position", "relative");
    $("#" + Content).css("width", (objStyle.width - 10) + "px");
    $("#" + Content).css("left", "5px");

    $("#" + ScrollArea).css("position", "static");
    // $("#" + ScrollArea).css("left", "515px");
    //$("#" + ScrollArea).css("top", "10px");
    $("#" + ScrollArea).css("height", objStyle.height + "px");
    $("#" + ScrollArea).css("width", "15px");
    $("#" + ScrollArea).css("border", "1px solid #666");
    $("#" + ScrollArea).css("overflow", "hidden");

    $("#" + Scroller).css("position", "relative");
    //  $("#" + Scroller).css("top", "-1px");
    $("#" + Scroller).css("width", "15px");
    $("#" + Scroller).css("background", "#AAA");
    $("#" + Scroller).css("border-top", "1px solid #666");
    $("#" + Scroller).css("border-bottom", "1px solid #666");

}





//  fnCreateScrollBar("Div1", objStyle_1);



function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}


//Script block used by Footer

nav = navigator.appName.substring(0, 3);
ver = navigator.appVersion.substring(0, 1);

function CreateBookmarkLink() {
    title = "Energy Intelligence Group";
    url_site = "http://www.energyintel.com";
    if (window.sidebar) { // Mozilla Firefox Bookmark	
        window.sidebar.addPanel(title, url_site, "");
    }
    else if (window.external) {
        window.external.AddFavorite(url_site, title);
    }
    else if (window.opera && window.print)
    { return true; }
}

function prompt_EIG_Footer_PrivacyPolicy(resultData) {
    var iValue;
    var temp =
	        {
	            state0:
	                {
	                    html: '<div class=EIG_Footer_ModalPopup><div class="pad_10t pad_10b w100p"><table cellpadding="0" cellspacing="0" width="100%"><tr><td><div class="spanTitle">PRIVACY POLICY</div></td><td class="pad_10r" align="right"><div class="spanClose" onclick="CloseFooterPrompt();"></div></td></tr></table></div>' + resultData + '</div>',
	                    buttons: { OK: false }
	                }
	        };
    $.prompt(temp, { top: '10%', left: '10%' });
}

function prompt_EIG_Footer_TermsConditons(resultData) {
    var iValue;
    var temp =
	        {
	            state0:
	                {
	                    html: '<div class=EIG_Footer_ModalPopup><div class="pad_10t pad_10b w100p" ><table cellpadding="0" cellspacing="0" width="100%"><tr><td><div class="spanTitle">Terms and Conditions and Privacy Policy</div></td><td class="pad_10r" align="right"><div class="spanClose" onclick="CloseFooterPrompt();" ></div></td></tr></table></div><div>' + resultData + '</div></div>',
	                    buttons: { OK: false }
	                }
	        };
    eiDialog_ShowMessage(resultData, "TERMS AND CONDITIONS AND PRIVACY POLICY", 800);
    //$.prompt(temp, { top: '10%', left: '10%' });
}

function EIG_Footer_PrivacyPolicy() {
    url = "12/Template/_layouts/PrivacyPolicy.htm";
    var resultData = "<iframe class='iframeCtnr'  frameborder='0px'  src=\'" + url + "'\"></iframe>";
    prompt_EIG_Footer_PrivacyPolicy(resultData);
}

function EIG_Footer_TermsConditions() {
    url = "12/Template/_layouts/TermsAndConditions.htm?r=" + Math.random();
    var resultData = "<iframe class='iframeCtnr' frameborder='0px'  src=\'" + url + "'\"></iframe>";
    prompt_EIG_Footer_TermsConditons(resultData);
}

function CloseFooterPrompt() {
    $.prompt.close();
}

//End of Footer Script Block 



//JS for login control


//$(document).ready(function() {

//    if (EIG_MENU_SITE_ID == 3) {
//        var LoggedIn = EIG.Web.UI.UserControls.uc_login.ValidateUserLogin().value;

//        if (LoggedIn != "") {
//            window.location.href = LoggedIn;
//        }
//    }
//});


// IMPORTANT InitEiDialog should overwrite all $.prompt on the site!!!
$(function () {

    $("#eiDialog").dialog({
        autoOpen: false,
        show: {
            effect: "fade",
            duration: 500
        },
        hide: {
            effect: "fade",
            duration: 500
        },
        resizable: false,
        modal: true,
        minHeight: 115,
        dialogClass: "eitheme",
        buttons: {
            "Ok": function () {
                $(this).dialog("close");
            }
        }
    });
});

function eiDialog_ShowMessage(message,title,width)
{
    $("#eiDialog").html(message);
    //if (title)
    $("#eiDialog").dialog('option', 'title', title ?title: "");
    //if (width)
    $("#eiDialog").dialog('option', "width", width ? width : "300");

    $("#eiDialog").dialog('open');
}

function Login_Messages(strMessage) {
    eiDialog_ShowMessage(strMessage,"Login");
}

function User_Messages(strMessage) {
    var temp_WB_SaveMessage =
		{
		    state0:
		        {
		            html: '<div class=div_WB_Header>' + '<div  class="w260"><span class="spanTitle">Register</span><span class="jqiclose"></span></div></div><div id="div_Workbench_ErrorMessage" class="div_WB_Message div_WB_Bottom">' + strMessage + '</div>',
		            buttons: { Ok: true },
		            focus: 1
		        }
		};
		$.prompt(temp_WB_SaveMessage, { callback: fnCBIPRedirect});
		//return false;
}
function fnCBIPRedirect() {
    
    window.location.href = str_Redirect;
    return false;
}
var str_Redirect = "";

function fnRedirect(url) {
    window.location.href = url;
}

function clickButton(e) {
    return;
    
    /*var evt = e ? e : window.event;
    var bt = document.getElementById(obj_login.imglogin);
    if (bt) {
        if (evt.keyCode == 13) {

            fnlogin();
            var username = document.getElementById(obj_login.username).value;
            var password = document.getElementById(obj_login.pwd).value;
            EIG.Web.UI.UserControls.uc_login.EnterKeyLogin(username, password);

            return true;
        }
    }*/
}


function fnForgot() {
    window.location = "/Pages/ForgotPassword.aspx";
}

//Start - Displays tooltip for select dropdown
function ShowTooltip(eventName, tooltipText, tooltipDivID) {
    if (document.all)   //IE
        DisplayTooltip(eventName, tooltipText, tooltipDivID);

    if (!document.all)  //Other browsers
        DisplayTooltip(eventName, tooltipText, tooltipDivID);
}


function DisplayTooltip(eventName, tooltipText, tooltipDivID) {
    with (document.getElementById(tooltipDivID)) {
        innerHTML = tooltipText;    //Tooltip to be displayed
        with (style) {
            if (eventName == 'onmouseout' || eventName == 'onmouseleave')  //Hide tooltip on mouseout
                visibility = "hidden";
            else if (eventName == 'onmouseover' || eventName == 'onmouseenter') //Show tooltip on mouseover
                visibility = "visible";
        }
    }
}
//End - Displays tooltip for select dropdown

///////////////////////////////////////

// added to test IE8 compatible issue
// IE5.5+ PNG Alpha Fix v2.0 Alpha: Background Tiling Support
// (c) 2008-2009 Angus Turnbull http://www.twinhelix.com

// This is licensed under the GNU LGPL, version 2.1 or later.
// For details, see: http://creativecommons.org/licenses/LGPL/2.1/

var IEPNGFix = window.IEPNGFix || {};

IEPNGFix.tileBG = function(elm, pngSrc, ready) {
	// Params: A reference to a DOM element, the PNG src file pathname, and a
	// hidden "ready-to-run" passed when called back after image preloading.

	var data = this.data[elm.uniqueID],
		elmW = Math.max(elm.clientWidth, elm.scrollWidth),
		elmH = Math.max(elm.clientHeight, elm.scrollHeight),
		bgX = elm.currentStyle.backgroundPositionX,
		bgY = elm.currentStyle.backgroundPositionY,
		bgR = elm.currentStyle.backgroundRepeat;

	// Cache of DIVs created per element, and image preloader/data.
	if (!data.tiles) {
		data.tiles = {
			elm: elm,
			src: '',
			cache: [],
			img: new Image(),
			old: {}
		};
	}
	var tiles = data.tiles,
		pngW = tiles.img.width,
		pngH = tiles.img.height;

	if (pngSrc) {
		if (!ready && pngSrc != tiles.src) {
			// New image? Preload it with a callback to detect dimensions.
			tiles.img.onload = function() {
				this.onload = null;
				IEPNGFix.tileBG(elm, pngSrc, 1);
			};
			return tiles.img.src = pngSrc;
		}
	} else {
		// No image?
		if (tiles.src) ready = 1;
		pngW = pngH = 0;
	}
	tiles.src = pngSrc;

	if (!ready && elmW == tiles.old.w && elmH == tiles.old.h &&
		bgX == tiles.old.x && bgY == tiles.old.y && bgR == tiles.old.r) {
		return;
	}

	// Convert English and percentage positions to pixels.
	var pos = {
		top: '0%',
		left: '0%',
		center: '50%',
		bottom: '100%',
		right: '100%'
	},
		x,
		y,
		pc;
	x = pos[bgX] || bgX;
	y = pos[bgY] || bgY;
	if (pc = x.match(/(\d+)%/)) {
		x = Math.round((elmW - pngW) * (parseInt(pc[1]) / 100));
	}
	if (pc = y.match(/(\d+)%/)) {
		y = Math.round((elmH - pngH) * (parseInt(pc[1]) / 100));
	}
	x = parseInt(x);
	y = parseInt(y);

	// Handle backgroundRepeat.
	var repeatX = { 'repeat': 1, 'repeat-x': 1}[bgR],
		repeatY = { 'repeat': 1, 'repeat-y': 1}[bgR];
	if (repeatX) {
		x %= pngW;
		if (x > 0) x -= pngW;
	}
	if (repeatY) {
		y %= pngH;
		if (y > 0) y -= pngH;
	}

	// Go!
	this.hook.enabled = 0;
	if (!({ relative: 1, absolute: 1}[elm.currentStyle.position])) {
		elm.style.position = 'relative';
	}
	var count = 0,
		xPos,
		maxX = repeatX ? elmW : x + 0.1,
		yPos,
		maxY = repeatY ? elmH : y + 0.1,
		d,
		s,
		isNew;
	if (pngW && pngH) {
		for (xPos = x; xPos < maxX; xPos += pngW) {
			for (yPos = y; yPos < maxY; yPos += pngH) {
				isNew = 0;
				if (!tiles.cache[count]) {
					tiles.cache[count] = document.createElement('div');
					isNew = 1;
				}
				var clipR = Math.max(0, xPos + pngW > elmW ? elmW - xPos : pngW),
					clipB = Math.max(0, yPos + pngH > elmH ? elmH - yPos : pngH);
				d = tiles.cache[count];
				s = d.style;
				s.behavior = 'none';
				s.left = (xPos - parseInt(elm.currentStyle.paddingLeft)) + 'px';
				s.top = yPos + 'px';
				s.width = clipR + 'px';
				s.height = clipB + 'px';
				s.clip = 'rect(' +
					(yPos < 0 ? 0 - yPos : 0) + 'px,' +
					clipR + 'px,' +
					clipB + 'px,' +
					(xPos < 0 ? 0 - xPos : 0) + 'px)';
				s.display = 'block';
				if (isNew) {
					s.position = 'absolute';
					s.zIndex = -999;
					if (elm.firstChild) {
						elm.insertBefore(d, elm.firstChild);
					} else {
						elm.appendChild(d);
					}
				}
				this.fix(d, pngSrc, 0);
				count++;
			}
		}
	}
	while (count < tiles.cache.length) {
		this.fix(tiles.cache[count], '', 0);
		tiles.cache[count++].style.display = 'none';
	}

	this.hook.enabled = 1;

	// Cache so updates are infrequent.
	tiles.old = {
		w: elmW,
		h: elmH,
		x: bgX,
		y: bgY,
		r: bgR
	};
};


IEPNGFix.update = function() {
	// Update all PNG backgrounds.
	for (var i in IEPNGFix.data) {
		var t = IEPNGFix.data[i].tiles;
		if (t && t.elm && t.src) {
			IEPNGFix.tileBG(t.elm, t.src);
		}
	}
};
IEPNGFix.update.timer = 0;

if (window.attachEvent && !window.opera) {
	window.attachEvent('onresize', function() {
		clearTimeout(IEPNGFix.update.timer);
		IEPNGFix.update.timer = setTimeout(IEPNGFix.update, 100);
	});
}

// IE5.5+ PNG Alpha Fix v2.0 Alpha: Background Tiling Support
// added to test IE8 compatible issue



/////splits functions
function SplitFunction(fString) {

    if (typeof fString == 'string') {

        var functions = fString.split('function');
        var result = [];
        for (var i = 0; i < functions.length; i++) {
            var f = functions[i];
            if (f) {
                if ($.trim(f) != '') {
                 
                 
                    result.push('function ' + f);
                }
            }
        }
        return GetDistinctArray(result);
    }
    return [fString];
};

function GetDistinctArray(funcArray) {
    var callArray = [];
    for (var i = 0; i < funcArray.length; i++) {
        var f = funcArray[i];

        var found = false;
        for (var j = 0; j < callArray.length; j++) {
            var callItem = callArray[j];
            found = callItem == f;
            if (found)
                break;
        }

        if (found == false) {
            callArray.push(f);

        } //else
          //  alert('double');
    }
    return callArray;
 }


function IsVariableDefined(var_name) {

    var res = eval("typeof " + var_name +" === 'undefined'");
    if (res == false) {
        var variable = eval(var_name);
        if (variable) {
            if (variable != null)
                return true;
        }
    }
    return false;
}

function trim(str, chars) {
    return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
    chars = chars || "\\s";
    return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function formatDatePart(part) {
    return part.toString().length == 1 ? "0" + part : part.toString();
};

Date.prototype.toShortString = function () { return [formatDatePart(this.getMonth()+1), formatDatePart(this.getDate()), this.getFullYear()].join('/'); };

Date.prototype.toSqlString = function () {

    var month = (this.getMonth() + 1).toString();
    if (month.length == 1) month = "0" + month;

    var day = this.getDate().toString();
    if (day.length == 1) day = "0" + day;

    var year = this.getFullYear();
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();

    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}


//Array patch for IE
if (!Array.indexOf) {
    Array.prototype.indexOf = function (obj) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == obj) {
                return i;
            }
        }
        return -1;
    }
}

//For AjaxPro call backs
function processCallBackResult(cbResult, errorMessage) {
    if (cbResult.error != null) {
        EILibrary.ConsoleError(cbResult.error.Message);
        if (errorMessage == undefined)
            errorMessage = "Something wrong. Plese reload the page.";
        showMessage(errorMessage);
    }
    else {
        return cbResult.value;
    }
}

function showMessage(text, contentWidth) {

    var data = '<div class="div_WB_Header">';
    data += '<div style="min-width: 200px;">';
    data += '<span class="spanTitle" style="text-transform:none">Custom Newsletter</span>';
    data += '<span class="jqiclose"></span>';
    data += '</div>';
    data += '</div>';

    data += '<div id="div_Workbench_ErrorMessage" class="div_WB_Message div_WB_Bottom">';
    data += text;
    data += '</div>';

    messageBox(data, contentWidth);
}

function messageBox(content, contentWidth) {

    if (!contentWidth)
        contentWidth = 200;

    var message = {
        state0: {
            html: content,
            buttons: { OK: false },
            focus: 1
        }
    };

    var left = (($(window).width() - contentWidth) / 2) + $(window).scrollLeft() + "px";

    $.prompt(message, { left: left, top: "180px" });

}

function printWindow(windowFeatures, windowContent) {

    var WinPrint = window.open('', '', windowFeatures);

    WinPrint.document.write(windowContent);

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
}

///class EigScriptManager with  static methods

function EigScriptManager()
{

}

EigScriptManager.isJsFileDefined = function(jsFileName) {
    var scripts = $(document.getElementsByTagName('script'));
    return $.grep(scripts, function (el) { return el.src == jsFileName; }).length > 0;
}

EigScriptManager.AddScriptTags = function (htmlSource) {

    //for (var i = 0; i < source.length; i++) {

    //var s = $(source[i].DocumentBody);
    var s = $(htmlSource);
    s.filter('script').each(function () {
        if (this.src) {
            if (!EigScriptManager.isJsFileDefined(this.src)) {
                var script = document.createElement('script'), j, attrName, attrValue, attrs = this.attributes;
                for (var j = 0; j < attrs.length; j++) {
                    attrName = attrs[j].name;
                    attrValue = attrs[j].value;
                    if (attrValue != "null")
                    script[attrName] = attrValue;
                }
                document.body.appendChild(script);
            }
        } else {
            var code = this.text || this.textContent || this.innerHTML || "";
            $.globalEval(code);
            //setTimeout('alert("global eval"); $.globalEval(' + code.replace("'","\"") + ')', 1000);
        }
    });
}


EigScriptManager.RemoveScriptTags = function (s) {
    var div = document.createElement('div');
    div.innerHTML = s;
    var scripts = div.getElementsByTagName('script');
    var i = scripts.length;
    while (i--) {
        scripts[i].parentNode.removeChild(scripts[i]);
    }
    return div.innerHTML;
}

function addHyphensByCssClass(className, wordPartLength, symbolsAdded) {
    $.each($("." + className), function (ind, value) {
        $(this).html(addHyphens(value.innerHTML, wordPartLength, symbolsAdded));
    });
}

function addHyphens(text, wordPartLength, symbolsAdded) {
    var resultWord = text;
    var resultPartWords = [];
    var resultHyphenWords = [];

    resultWord = resultWord.split(/\s+/g);

    if (resultWord) {
        for (i = 0; i < resultWord.length; i++) {
            if (resultWord[i] != "") resultPartWords.push(resultWord[i]);
        }
    }

    var wordParts = 0;
    var wordParted, wordPartLeft;
    for (i = 0; i < resultPartWords.length; i++) {
        if (resultPartWords[i].length > wordPartLength) {
            wordParted = "";
            wordPartLeft = resultPartWords[i];
            wordParts = Math.floor(resultPartWords[i].length / wordPartLength);
            for (wp = 0; wp < wordParts; wp++) {
                wordParted += wordPartLeft.substr(0, wordPartLength);
                wordParted += symbolsAdded;
                wordPartLeft = wordPartLeft.substr(wordPartLength, wordPartLeft.length);
            }
            if (wordPartLeft != "") wordParted += wordPartLeft;
            resultHyphenWords.push(wordParted)
        } else resultHyphenWords.push(resultPartWords[i]);
    }
    return resultHyphenWords.join(" ");
}
function checkBrowserForGMR(pubId, isIssueOld) {

    if (pubId == 17 && !isIssueOld) {
        if (EILibrary.Browser.name == "MSIE" && EILibrary.Browser.version <= 9) {
            alert(EIMessages.OldBrowserMessage);
        }
    }
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        //  xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}