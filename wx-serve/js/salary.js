var yearMonthMap = {};
var paySlipMap;
var salary = {
    getPayslipConfigs: function () {
        $.ajax({
            url: ctx + "/staffPayslip/allYearMonth",
            type: 'get',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (res) {
                if (res.yearMonth.length <=0 ) {
                    window.location.href = "/salary-empty.html";
                } else {
                    $.each(res.yearMonth, function (i, v) {
                        if (yearMonthMap[v.key]) {
                            yearMonthMap[v.key].push(v.value);
                        } else {
                            yearMonthMap[v.key] = [];
                            yearMonthMap[v.key].push(v.value);
                        }
                    });
                    $("#year").append('<option value="">请选择</option>');
                    for (var y in yearMonthMap) {
                        $("#year").append('<option value="' + y + '">' + y + '</option>');
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                window.location.href ="../salary/noAuth.html";
            }
        });
    },
    changeYear: function () {
        $("#month").html("");
        var y = $("#year").val();
        if (yearMonthMap[y]) {
            $("#month").append('<option value="请选择">请选择</option>');
            $.each(yearMonthMap[y].sort(), function (i, v) {
                $("#month").append('<option value="' + v + '">' + v + '</option>');
            });
        }
    },
    search: function (y, m) {
        var y = $("#year").val();
        var m = $("#month").val();
        if (y && m) {
            progressBar.show();
            $.ajax({
                url: ctx + "/staffPayslip/getPayslips",
                type: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                data: {year: y, month: m - 1},
                success: function (res) {
                    var payslip = app.fromJson(res);
                    console.info(payslip);
                    salary.paySlips(payslip);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    window.location.href = rootPath + "/wx-serve/html/login/login.html";
                },
                complete: function () {
                    progressBar.hide();
                }
            });
        } else {
            alert("请选择查询日期.");
        }
    },
    paySlips: function (payslip) {
        $(".containers").hide();
        $(".container-2").show();
        paySlipMap = {};
        $(".container-2").html("");
        $.each(payslip, function (i, v) {
            if (paySlipMap[v.config.name]) {
                paySlipMap[v.config.name].push(v);
            } else {
                paySlipMap[v.config.name] = [];
                paySlipMap[v.config.name].push(v);
            }
        });
        if (app.lenthObject(paySlipMap) > 1) {
            $(".container-1").css("display", "flex");
            $("#payName").html("");
            $("#payName").append('<option>请选择</option>');
            for (var p in paySlipMap) {
                $("#payName").append('<option value="' + p + '">' + p + '</option>');
            }
        } else {
            $(".container-1").css("display", "none");
            for (var p in paySlipMap) {
                salary.payBatch(p);
            }
        }
    },
    payBatch: function (payName) {
        $(".container-2").html("");
        if (!payName) {
            payName = $("#payName").val()
        }
        var payBatchHtml = "";
        $.each(paySlipMap[payName], function (i, v) {
            var fieldValues = {};
            var fieldTypes = [];
            var typeFields = {};
            for (var name in v.fields) {
                fieldValues[name] = v.fields[name];
            }
            $.each(v.config.fields, function (i, field) {
                if (fieldTypes.indexOf(field.type.name) == -1) {
                    if (field.type.name !== '统计项') {
                        fieldTypes.push(field.type.name);
                    }
                }
                if (!typeFields[field.type.name]) {
                    typeFields[field.type.name] = [];
                }
                typeFields[field.type.name].push(field);
            });
            fieldTypes.push('统计项');
            console.info(fieldTypes);
            payBatchHtml = payBatchHtml + '<div class="lists" id="btn1" onclick="salary.paySlipDetil(this)">'
                + '<div class="lis flex flex-align-center hv">'
                + '<div class="data">'
                + '<span>第' + ++i + '批次</span>'
                + '</div>'
                + '<div class="money">'
                + '<span>' + v.fields['实发工资'] + '</span>元'
                + '</div>'
                + '<span style="color:#ccc;font-size:1rem;">></span>'
                + '</div>'
                + '<div class="content content1">';
            console.info(typeFields);
            $.each(fieldTypes, function (i, fieldType) {
                payBatchHtml = payBatchHtml + '<div class="list">'
                    + '<div class="title">'
                    + '<span class="test-left">' + fieldType + '</span>'
                    + '</div>'
                    + '<div class="panel">';

                $.each(typeFields[fieldType], function (i, field) {
                    if (!field.placeholder) {
                        var value = '';
                        if (fieldValues[field.name]) {
                            value = fieldValues[field.name];
                        }
                        payBatchHtml = payBatchHtml + '<div class="panel-list">'
                            + '<span class="test-left panel-left">' + field.name + '</span>'
                            + '<span class="panel-right">' + value + '</span>'
                            + '</div>';
                    }
                });
                payBatchHtml = payBatchHtml + '</div></div>';
            });
            payBatchHtml = payBatchHtml + '<div class="contact flex flex-pack-center">'
                + '<span class="last">若工资有误，或对工资单有疑问请及时与HR沟通</span>'
                + '</div>'

                + '</div>'
                + '</div>';
        });
        $(".container-2").html(payBatchHtml);
    },
    paySlipDetil: function (obj) {
        $(obj).children(".content").toggle(500);
        $(".end").show();
        $(this).siblings(".lists").children(".content").hide();
    }
      
}
    
