//var ctx = "http://cnbexpress.com/webapp";
var ctx = "http://15h8409s06.imwork.net/webapp" //测试地址
//var ctx = "http://localhost/webapp"; //测试地址
//字体rem大小
var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
        //设置根字体大小
        var myfontSize = 20 * (docEl.clientWidth / 320);
        if (myfontSize > 30) {
            docEl.style.fontSize = "30px";
        } else {
            docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
        }
    };
//绑定浏览器缩放与加载时间
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);

//解决Android 手机下, input 或 textarea 元素聚焦时, 输入法遮盖输入框bug
function androidInputBugFix() {
    if (/Android/gi.test(navigator.userAgent)) {
        window.addEventListener('resize', function () {
            if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                    document.activeElement.scrollIntoViewIfNeeded();
                }, 0);
            }
        })
    }
};
androidInputBugFix();

//进度条
var opts = {
    lines: 9, // The number of lines to draw
    length: 0, // The length of each line
    width: 8, // The line thickness
    radius: 12, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#CCBBFF', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};
var target = document.getElementById('common-progress-bar');
if(target){
    var spinner = new Spinner(opts).spin(target);
}

var app = {
    urlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    fromJson: function (str) {
        var $ = str;
        var func;
        var arrFunc;
        arrFunc = function (path, obj) {
            for (var i = 0; i < obj.length; i++) {
                func(path + "[" + i + "]", obj[i]);
            }
        };
        func = function (path, obj) {
            if (jQuery.isArray(obj)) {
                arrFunc(path, obj);
            } else {
                for (var name in obj) {
                    if (name === "$ref") {
                        //DEBUG $ref .. ../..
                        try {
                            eval(path + "=" + obj[name]);
                        } catch (e) {
                            throw e;
                        }
                    } else if (typeof obj[name] == 'object') {
                        func(path + "." + name, obj[name]);
                    }
                }
            }
        };
        func("$", $);
        return $;
    },
    lenthObject: function (obj) {
        var l = 0;
        for (var property in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, property)) {
                l++;
            }
        }
        return l;
    }
};

var progressBar = {
    show: function () {
        $(".common-mask").css("height",$(document).height());
        $(".common-mask").css("width",$(document).width());
        $(".common-mask").show()
        $(".common-progress-bar").css("display", "block");
    },
    hide: function () {
        $(".common-mask").hide()
        $(".common-progress-bar").css("display", "none");
    }
}
var dialog = {
    show: function () {
        $(".common-mask").css("height",$(document).height());
        $(".common-mask").css("width",$(document).width());
        $(".common-mask").show()
        $(".common-dialog").css("display","block");
    },
    close: function () {
        $(".common-dialog").hide()
        $(".common-dialog").css("display", "none");
    }
}