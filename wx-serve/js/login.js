var common = {
    sendMessage: function () {
        var curCount = 60;
        $("#btnSendCode").attr("disabled", "true");
        $(".btn").css("opacity", "0.6");
        $("#btnSendCode").val(+curCount + "秒再获取");
        var InterValObj = window.setInterval(SetRemainTime, 1000);

        function SetRemainTime() {
            if (curCount == 0) {
                window.clearInterval(InterValObj);
                $("#btnSendCode").removeAttr("disabled");
                $(".btn").css("opacity", "1");
                $("#btnSendCode").val("重新发送");
            } else {
                curCount--;
                $(".btn").css("opacity", "0.6");
                $("#btnSendCode").val(+curCount + "秒再获取");
            }
        }
    },
    message: function (msg) {
        if (msg && msg != '') {
            $("#message").show();
            $("#message").html(msg);
        } else {
            $("#message").hide();
        }
    },
    isExistMobile: function (type) {
        var result = '';
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
                    if (res.duplicate) {
                        if (type == 'register') {
                            common.message("已注册.");
                        } else {
                            common.message();
                        }
                        result = 'login';
                    } else {
                        if (type == 'login') {
                            common.message("账号不存在.");
                        } else {
                            common.message();
                        }
                        result = 'register';
                    }
                }
            });
        } else {
            common.message("手机号码不能为空.");
            result = '';
        }
        defer.resolve(result);
        return defer.promise();
    },
    validate: function () {
        //var query = $('input[required]');
        var res = true;
        if (!$("#mobile").val()) {
            res = false;
            common.message("手机号码不能为空.");
        } else if (!$("#validateCode").val()) {
            res = false;
            common.message("验证码不能为空.");
        }
        return res;
    },
    sendMobileCaptcha: function (type) {
        $.when(common.isExistMobile(type)).done(function (ir) {
            if (ir == type) {
                common.sendMessage();
                $.ajax({
                    url: ctx + "/userserve/mobileCaptcha/" + type,
                    type: 'post',
                    dataType: 'json',
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    data: {mobile: $("#mobile").val()},
                    success: function (res) {
                        if (res.code != 1) {
                            common.message(res.message);
                        }
                    }
                });
            }
        })
    }
};
var register = {
    submit: function () {
        if (common.validate()) {
            progressBar.show();
            $.ajax({
                url: ctx + "/userserve/register",
                type: 'post',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {mobile: $("#mobile").val(), validateCode: $("#validateCode").val(), v: app.urlParam('v')},
                success: function (res) {
                    if (res.code == 1) {
                        if (res.uri) {
                            window.location.href = res.uri;
                        } else {
                            window.location.href = "../register/reg-finish.html";
                        }
                    } else{
                        common.message(res.message);
                    }
                },
                complete: function () {
                    progressBar.hide();
                }
            });
        }
    }
};
var login = {
    submit: function () {
        if (common.validate()) {
            progressBar.show();
            $.ajax({
                url: ctx + "/userserve/login",
                type: 'post',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {'loginType': 'mobile', 'mobile': $("#mobile").val(), 'validateCode': $("#validateCode").val()},
                success: function (res) {
                    progressBar.hide();
                    if (res.code == 1) {
                        if (res.uri) {
                            window.location.href = res.uri;
                        } else {
                            if(!res.isBind) {
                                $(".common-mask").css("height",$(document).height());
                                $(".common-mask").css("width",$(document).width());
                                $(".common-mask").show();
                                $("#userBindTip").html($("#mobile").val()+" 未绑定");
                                $(".common-dialog").css("display","block");
                            }else {
                                window.location.href = app.urlParam('redirect_uri');
                            }
                        }
                    } else {
                        common.message(res.message);
                    }
                }
            });
        }
    },
    closeBindTip: function (status) {
        $(".common-dialog").hide()
        $(".common-dialog").css("display", "none");
        if(status == 1){
            $.ajax({
                url: ctx + "/userserve/wechaUserBindTip",
                type: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (res) {
                    //TODO  绑定成功是否提示
                    window.location.href = app.urlParam('redirect_uri');
                }
            });
        }else {
            window.location.href = app.urlParam('redirect_uri');
        }
    }
}


