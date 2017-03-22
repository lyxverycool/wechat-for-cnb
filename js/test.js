var ctx='http://www.cnbexperss.com/webapp';
var sendCodeDisabled=false;
var registerDisabled=false;

var register={
	message:function(msg){
		if(msg&&msg!=""){
			$("#message").show();
			$("#message").html(msg);
		}else{
			$("#message").hide();
		}
	}
	checkMobileValid:function(){
		var result=false;
		var defer=$.Deferred();
		var mobile=$("#mobile").val();
		if(mobile){
			$.ajax({
				url:ctx+"/userserve/duplicate.json",
				type:'get',
				dataType:'json',
				async:false,
				data:{
					attr:"mobile",term:mobile
				},
				success:function(res){
					if(res.duplicate){
						register.message("已注册");
                        result = false;
					}else{
						register.message();
						result=true;
					}
					refer:
				}
			})
		}else{
	
		}




	}



}