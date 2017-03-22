var ctx = "http://cnbexpress.com/webapp";
//var ctx = "http://localhost/webapp"; //测试地址
//var ctx = "http://15h8409s06.imwork.net/webapp"; //测试地址

var docEl = document.documentElement, resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
var code = ""; //验证码
var codeLength = 6;//验证码长度

//进度条
var opts = {
    lines: 9, // The number of lines to draw
    length: 0, // The length of each line
    width: 8, // The line thickness
    radius: 12, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: false, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};
var target = document.getElementById('foo');
var spinner = new Spinner(opts).spin(target);

var pageEf = {
    recalc: function () {
        var myfontSize = 20 * (docEl.clientWidth / 320);//设置根字体大小
        if (myfontSize > 30) {
            docEl.style.fontSize = "30px";
        } else {
            docEl.style.fontSize = 20 * (docEl.clientWidth / 320) + 'px';
        }
    },
    sendMessage: function () {
        curCount = count;
        //设置button效果，开始计时
        $("#btnSendCode").attr("disabled", "true");
        $(".btn").css("opacity", "0.6");
        $("#btnSendCode").val(+curCount + "秒再获取");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        //timer处理函数
        function SetRemainTime() {
            if (curCount == 0) {
                window.clearInterval(InterValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled");//启用按钮
                $(".btn").css("opacity", "1");
                $("#btnSendCode").val("重新发送");
                code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
            } else {
                curCount--;
                $(".btn").css("opacity", "0.6");
                $("#btnSendCode").val(+curCount + "秒再获取");
            }
        }
    },
}

var sendCodeDisabled = false;
var registerDisabled = false;
var register = {
    message: function (msg) {
        if(msg && msg !=''){
            $("#message").show();
            $("#message").html(msg);
        } else{
            $("#message").hide();
        }
    },
    checkMobileValid: function () {
        var result = false;
        var defer = $.Deferred();
        var mobile = $("#mobile").val();
        if (mobile) {
            $.ajax({
                url: ctx + "/userserve/duplicate.json",
                type: 'get',
                dataType: 'json',
                async: false,
                data: {attr: 'mobile', term: mobile},
                success: function (res) {
                    if(res.duplicate){
                        register.message("已注册.");
                        result = false;
                    } else {
                        register.message();
                        result = true;
                    }
                }
            });
        } else {
            register.message("手机号码不能为空.");
            result = false;
        }
        defer.resolve(result);
        return defer.promise();
    },
    validate: function () {
        var res = true;
        if (!$("#mobile").val()) {
            res = false;
            register.message("手机号码不能为空.");
        } else if (!$("#validateCode").val()) {
            res = false;
            register.message("验证码不能为空.");
        }
        return res;
    },
    urlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    sendMobileCaptcha: function () {
        if(sendCodeDisabled){
            return false;
        }
        sendCodeDisabled = true;
        $.when(register.checkMobileValid()).done(function (ir) {
            if(ir){
                $.ajax({
                    url: ctx + "/userserve/mobileCaptcha/register",
                    type: 'post',
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data: {mobile: $("#mobile").val()},
                    success: function (res) {
                        sendCodeDisabled = false;
                        if (res.code != 1) {
                            register.message(res.message);
                        } else {
                            pageEf.sendMessage();
                        }
                    }
                });
            } else{
                sendCodeDisabled = false;
            }
        })
    },
    register: function () {
        if (register.validate()) {
            if(registerDisabled){
             return false;
            }
            registerDisabled = true;
            $("#foo").css("display", "block");
            $.ajax({
                url: ctx + "/userserve/register",
                type: 'post',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {mobile: $("#mobile").val(), validateCode: $("#validateCode").val(), v: register.urlParam('v')},
                success: function (res) {
                    registerDisabled = false;
                    if (res.code == 1) {
                        if (res.uri) {
                            window.location.href = res.uri;
                        } else {
                            window.location.href = "http://m.cnbexpress.com/";
                        }
                    } else {
                        $("#foo").css("display", "none");
                        register.message(res.message);
                    }
                }
            });
        }
    }
}


