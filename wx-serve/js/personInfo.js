var person = {
    info: function () {
            $.ajax({
                url: ctx + "/staff/infoDetail",
                type: 'get',
                dataType: 'json',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                success: function (res) {
                    console.info(res);
                    person.myAvatarModel(res.url);
                    person.infoModel(res.info);
                }
            });
    },
    myAvatarModel: function (avatarUrl) {
        if (avatarUrl) {
            var key = avatarUrl.key;
            $("#myAvatar").attr("src",key);
        }
    },
    infoModel: function (info) {
        var htmlModel = '<div class="list flex">'
                    +'<div class="list-left"><span>姓名</span></div>'
                    +'<div class="list-right"><span>'+(info.person.name? info.person.name: '')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>性别</span></div>'
                    +'<div class="list-right"><span>'+(info.person.gender? info.person.gender.name: '')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>所在城市</span></div>'
                    +'<div class="list-right"><span>'+ (info.person.division?(info.person.division.parent?info.person.division.parent.name:'') +'&nbsp;'+ info.person.division.name:'')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>出生日期</span></div>'
                    +'<div class="list-right"><span>'+(info.person.birthDay? info.person.birthDay: '')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>'+(info.person.idCert?info.person.idCert.certificateType.name:'居民身份证')+'</span></div>'
                    +'<div class="list-right"><span>'+(info.person.idCert?info.person.idCert.certificateNo:'')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>工号</span></div>'
                    +'<div class="list-right"><span>'+(info.code? info.code: '')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>职务</span></div>'
                    +'<div class="list-right"><span>'+ (info.effectiveJournal? (info.effectiveJournal.position? info.effectiveJournal.position.name: ''): '')+'</span></div>'
                    +'</div>'
                    +'<div class="list flex">'
                    +'<div class="list-left"><span>部门</span></div>'
                    +'<div class="list-right"><span>'+(info.effectiveJournal? (info.effectiveJournal.org?info.effectiveJournal.org.name:''): '')+'</span></div>'
                    +'</div>';
        $(".container-2").html(htmlModel);
    }

}


