$(function(){
	//-------------------------以下为静态页面切换的函数-----------------------------	
	//重新计算.container隐藏,.cal展现。
	$(".cal-again").each(function(){
		$(this).click(function(){
			$(this).parent().parent().parent().hide();
			$(this).parent().parent().parent().siblings(".cal").show();
			mySwiper.update();
		})
	})
	//大陆与国外切换a2为国外按钮。a1为中国内地按钮
	$(".a2").each(function(){
		$(this).click(function(){
			$(this).addClass("radio-check");
			$(this).parent().siblings('.flex').children().removeClass("radio-check");
			$(this).parent().parent().parent().siblings(".content-radio").children(".content-radio-right").children(".min").html("当月工资不低于4800元");
			mySwiper.update();
		})
	})
	$(".a1").each(function(){
		$(this).click(function(){
			$(this).addClass("radio-check");
			$(this).parent().siblings('.flex').children().removeClass("radio-check");
			$(this).parent().parent().parent().siblings(".content-radio").children(".content-radio-right").children(".min").html("当月工资不低于3500元");
			mySwiper.update();
		})
	})
	//社保选项切换b1为交社保，b2为不交社保
	$(".b2").each(function(){
		$(this).click(function(){
			$(this).addClass("radio-check");
			$(this).parent().siblings('.flex').children().removeClass("radio-check");
			$(this).parent().parent().parent().siblings('.shebao').css("display","none");
			$(this).parent().parent().parent().siblings('.shebaos').css("display","none");
			$(".cal .alert-3").html("");
			mySwiper.update();
		})
	})
	$(".b1").each(function(){
		$(this).click(function(){
			$(this).addClass("radio-check");
			$(this).parent().siblings('.flex').children().removeClass("radio-check");
			$(this).parent().parent().parent().siblings(".shebao").css("display","flex");
			$(this).parent().parent().parent().siblings(".shebaos").css("display","flex");
			mySwiper.update();
		})
	})	
	//公积金缴纳切换c1为交公积金，c2为不缴纳公积金
	$(".c2").each(function(){
		$(this).click(function(){
			$(this).parents(".cal").find(".c1").removeClass("radio-check");
			$(this).addClass("radio-check");
			$(this).parents(".cal").find(".d1").removeClass("radio-check");
			$(this).parents(".cal").find(".d2").addClass("radio-check");
			$(this).parents(".cal").find(".gongjijin").hide();
			$(this).parents(".cal").find(".gongjijins").hide();
			$(this).parents(".cal").find(".bili").hide();
			$(this).parents(".cal").find(".select-2").hide();
			$(this).parents(".cal").find(".cune").css("display","none");
			$(this).parents(".cal").find(".alert-4").css("display","none");
			$(this).parents(".cal").find(".alert-5").html("");
			mySwiper.update();
		})
	})
	$(".c1").each(function(){
		$(this).click(function(){
			$(this).parents(".cal").find(".c2").removeClass("radio-check");
			$(this).parents(".cal").find(".c1").addClass("radio-check");
			$(this).parents(".cal").find(".d2").removeClass("radio-check");
			$(this).parents(".cal").find(".d1").addClass("radio-check");
			$(this).parents(".cal").find(".gongjijin").show();
			$(this).parents(".cal").find(".gongjijins").show();
			$(this).parents(".cal").find(".bili").show();
			$(this).parents(".cal").find(".select-2").show();
			$(this).parents(".cal").find(".cune").css("display","none");
			$(this).parents(".cal").find(".alert-4").css("display","block");
			$(this).parents(".cal").find('.d1').prop('checked',true);
			$(this).parents(".cal").find('.d2').prop('checked',false);
			mySwiper.update();
		})
	})
	//缴纳基数d1与缴纳存额d2切换
	$(".d2").each(function(){
		$(this).click(function(){
			$(this).parents(".cal").find(".d1").removeClass("radio-check");
			$(this).parents(".cal").find(".d2").addClass("radio-check");
			$(this).parents(".cal").find(".gongjijin").css("display","none");
			$(this).parents(".cal").find(".gongjijins").css("display","none");
			$(this).parents(".cal").find(".bili").css("display","none");
			$(this).parents(".cal").find(".cune").css("display","flex");
			$(this).parents(".cal").find(".alert-4").html("");
			$(this).parents(".cal").find(".alert-5").html("");
			mySwiper.update();
		})
	})
	$(".d1").each(function(){
		$(this).click(function(){
			$(this).parents(".cal").find(".d2").removeClass("radio-check");
			$(this).parents(".cal").find(".d1").addClass("radio-check");
			$(this).parents(".cal").find(".gongjijin").css("display","flex");
			$(this).parents(".cal").find(".gongjijins").css("display","flex");
			$(this).parents(".cal").find(".bili").css("display","flex");
			$(this).parents(".cal").find(".cune").css("display","none");
			$(this).parents(".cal").find(".alert-5").html("");
			mySwiper.update();
		})
	})
	//查年终奖税前和查税后的切换
	$("#a-before").click(function(){
		$("#a-award").html("税后年终奖");
		$("#a-before").css("background","#ec6952");
		$("#a-before").css("color","#fff");
		$("#a-after").css("color","#333");
		$("#a-after").css("background","#fff");
		mySwiper.update();
	});
	$("#a-after").click(function(){
		$("#a-award").html("税前年终奖");
		$("#a-after").css("background","#ec6952");
		$("#a-after").css("color","#fff");
		$("#a-before").css("color","#333");
		$("#a-before").css("background","#fff");
		mySwiper.update();
	})
	//查劳务收入税前和查税后的切换
	$("#b-before").click(function(){
		$("#b-award").html("税后劳务收入");
		$("#b-before").css("background","#ec6952");
		$("#b-before").css("color","#fff");
		$("#b-after").css("color","#333");
		$("#b-after").css("background","#fff");
		mySwiper.update();
	});
	$("#b-after").click(function(){
		$("#b-award").html("税前劳务收入");
		$("#b-after").css("background","#ec6952");
		$("#b-after").css("color","#fff");
		$("#b-before").css("color","#333");
		$("#b-before").css("background","#fff");
		mySwiper.update();
	})
	//工资输入框失去焦点后,获取工资数值，添加到基数里面,并且select框切换为按工资
	//第一页工资输入框失去焦点
	$(".salary-1").blur(function(){
		var salaryVal=$(".salary-1").val();
		$(".way1-1").val("按工资");
		$(".way2-1").val("按工资");
		//console.log(salaryVal);
		$(".jishu").val(salaryVal);
	})
	//第二页工资输入框失去焦点
	$(".salary-2").blur(function(){
		var salaryVal=$(".salary-2").val();
		$(".way1-2").val("按工资");
		$(".way2-2").val("按工资");
		//console.log(salaryVal);
		$(".jishu").val(salaryVal);
	})
	
	//改变第一个页面
	//改变select1社保下拉框选中值发生事件
	$(".way1-1").change(function(){
		var checkValue=$(".way1-1").val();
		console.log(checkValue);
		if(checkValue=="按最低标准"){
			$(".jishu1-1").val(3500);
			$('.jishu1-1').attr("disabled",true);
			$(".jishu1-1").addClass('dis');
		}
		else if(checkValue=="按工资"){
			console.log($(".salary-1").val());
			$(".jishu1-1").val($(".salary-1").val());
			$('.jishu1-1').attr("disabled",true);
			$(".jishu1-1").addClass('dis');
		}else{
			$('.jishu1-1').attr("disabled",false);
			$(".jishu1-1").removeClass('dis');
			$(".jishu1-1").val("请输入");
		}
	}) 
	//改变select2公积金下拉框选中值发生事件
	$(".way2-1").change(function(){
		var checkValue=$(".way2-1").val();
		console.log(checkValue);
		if(checkValue=="按最低标准"){
			$(".jishu2-1").val(3500);
			$('.jishu2-1').attr("disabled",true);
			$(".jishu2-1").addClass('dis');
		}
		else if(checkValue=="按工资"){
			$(".jishu2-1").val($(".salary").val());
			$('.jishu2-1').attr("disabled",true);
			$(".jishu2-1").addClass('dis');
		}else{
			$('.jishu2-1').attr("disabled",false);
			$(".jishu2-1").removeClass('dis');
			$(".jishu2-1").val("请输入");
		}
	}) 
	//改变第二个页面
	//改变select1选中值发生事件
	$(".way1-2").change(function(){
		var checkValue=$(".way1-2").val();
		console.log(checkValue);
		if(checkValue=="按最低标准"){
			$(".jishu1-2").val(3500);
			$('.jishu1-2').attr("disabled",true);
			$(".jishu1-2").addClass('dis');
		}
		else if(checkValue=="按工资"){
			$(".jishu1-2").val($(".salary").val());
			$('.jishu1-2').attr("disabled",true);
			$(".jishu1-2").addClass('dis');
		}else{
			$(".jishu1-2").removeClass('dis');
			$('.jishu1-2').attr("disabled",false);
			$(".jishu1-2").val("请输入");
		}
	}) 
	//改变select2选中值发生事件
	$(".way2-2").change(function(){
		var checkValue=$(".way2-2").val();
		console.log(checkValue);
		if(checkValue=="按最低标准"){
			$(".jishu2-2").val(3500);
			$('.jishu2-2').attr("disabled",true);
			$(".jishu2-2").addClass('dis');
		}
		else if(checkValue=="按工资"){
			$('.jishu2-2').attr("disabled",true);
			$(".jishu2-2").addClass('dis');
			$(".jishu2-2").val($(".salary").val());
		}else{
			$('.jishu2-2').attr("disabled",false);
			$(".jishu2-2").removeClass('dis');
			$(".jishu2-2").val("请输入");
		}
	})
	//-------------------------以下为不同页面获取数据跳转到相应页面的函数-----------------------------		
	//查工资个税
	$(".btn1").click(function(){
		//城市,获取工资，社保基数，公积金基数，公积金比例，存额的数值
		var salaryVal=parseFloat($(".salary-1").val());
		var socialVal=parseFloat($(".jishu1-1").val());
		var gongVal=parseFloat($(".jishu2-1").val());
		var biVal=parseFloat($(".bili-1").val());
		var cunVal=parseFloat($(".cune-1").val());
		var cityVal=$(".city-1").val();
		console.log(salaryVal);
		console.log(socialVal);
		console.log(gongVal);
		console.log(biVal);
		console.log(cunVal);
		console.log(cityVal);
		//获取四个单选框的值
		var shenfenVal=$('input:radio[name="shenfen1"]:checked').val();
		var shebaoVal=$('input:radio[name="shebao1"]:checked').val();
		var gongjijinVal=$('input:radio[name="gongjijin1"]:checked').val();
		var jiaonaVal=$('input:radio[name="jiaona1"]:checked').val();
		console.log(shenfenVal);
		console.log(shebaoVal);
		console.log(gongjijinVal);
		console.log(jiaonaVal);
		if(!cityVal){
			$(".cal-1 .alert-1").html("城市不能为空！")
		}else{
			$(".cal-1 .alert-1").html("");
		}
		if(!salaryVal){
			$(".cal-1 .alert-2").html("税前工资不能为空！")
		}else{
			$(".cal-1 .alert-2").html("")
		}
		if(shebaoVal=="缴纳"&&!socialVal){
			$(".cal-1 .alert-3").html("社保缴纳基数不能为空！")
		}else{
			$(".cal-1 .alert-3").html("")
		}
		if(gongjijinVal=="缴纳"){
			if(jiaonaVal=="缴纳基数"){
				if(!gongVal&&biVal){
					$(".cal-1 .alert-5").html("");
					$(".cal-1 .alert-4").html("公积金缴纳基数不能为空！")
				}
				else if(gongVal&&!biVal) {
					$(".cal-1 .alert-4").html("");
					$(".cal-1 .alert-5").html("公积金缴纳比例不能为空！")
				}
				else if(!gongVal&&!biVal){
					$(".cal-1 .alert-4").html("公积金缴纳基数不能为空！")
					$(".cal-1 .alert-5").html("公积金缴纳比例不能为空！")
				}
				else{
					$(".cal-1 .alert-4").html("");
					$(".cal-1 .alert-5").html("");
				}
			}
			else{
				if(!cunVal){
					$(".cal-1 .alert-5").html("缴存额不能为空！")
				}else{
					$(".cal-1 .alert-5").html("")
				}
			}
		}else{

		}
		//第一种情况有工资，但没缴纳社保，也没有缴纳公积金
		if(salaryVal&&shebaoVal=="不缴纳"&&gongjijinVal=="不缴纳"){
			if(!cityVal){
				$(".cal-1 .alert-1").html("请输入这个城市！")
			}else{
				if(cityVal=="北京市,市辖区,东城区"){
				console.log('en')
					$(".cal-1").hide();
					$(".container-1").show();
					alert("第一种")
				}
				else{
				$(".cal-1 .alert-1").html("抱歉没有这个城市！")
				}
			}			
		}	
		//第二种情况有城市，有工资，但没缴纳社保，也没有缴纳公积金			
	});
	//查税前工资
	$(".btn2").click(function(){
		//获取工资，社保基数，公积金基数，公积金比例，存额,城市的数值
		var salaryVal=parseFloat($(".salary-2").val());
		var socialVal=parseFloat($(".jishu1-2").val());
		var gongVal=parseFloat($(".jishu2-2").val());
		var biVal=parseFloat($(".bili-2").val());
		var cunVal=parseFloat($(".cune-2").val());
		var cityVal=$(".city-2").val();
		console.log(salaryVal);
		console.log(socialVal);
		console.log(gongVal);
		console.log(biVal);
		console.log(cunVal);
		console.log(cityVal);
		//获取四个单选框的值
		var shenfenVal=$('input:radio[name="shenfen2"]:checked').val();
		var shebaoVal=$('input:radio[name="shebao2"]:checked').val();
		var gongjijinVal=$('input:radio[name="gongjijin2"]:checked').val();
		var jiaonaVal=$('input:radio[name="jiaona2"]:checked').val();
		console.log(shenfenVal);
		console.log(shebaoVal);
		console.log(gongjijinVal);
		console.log(jiaonaVal);
		if(!cityVal){
			$(".cal-2 .alert-1").html("城市不能为空！")
		}else{
			$(".cal-2 .alert-1").html("");
		}
		if(!salaryVal){
			$(".cal-2 .alert-2").html("税前工资不能为空！")
		}else{
			$(".cal-2 .alert-2").html("")
		}
		if(shebaoVal=="缴纳"&&!socialVal){
			$(".cal-2 .alert-3").html("社保缴纳基数不能为空！")
		}else{
			$(".cal-2 .alert-3").html("")
		}
		if(gongjijinVal=="缴纳"){
			if(jiaonaVal=="缴纳基数"){
				if(!gongVal&&biVal){
					$(".cal-2 .alert-5").html("");
					$(".cal-2 .alert-4").html("公积金缴纳基数不能为空！")
				}
				else if(gongVal&&!biVal) {
					$(".cal-2 .alert-4").html("");
					$(".cal-2 .alert-5").html("公积金缴纳比例不能为空！")
				}
				else if(!gongVal&&!biVal){
					$(".cal-2 .alert-4").html("公积金缴纳基数不能为空！")
					$(".cal-2 .alert-5").html("公积金缴纳比例不能为空！")
				}
				else{
					$(".cal-2 .alert-4").html("");
					$(".cal-2 .alert-5").html("");
				}
			}
			else{
				if(!cunVal){
					$(".cal-2 .alert-5").html("缴存额不能为空！")
				}else{
					$(".cal-2 .alert-5").html("")
				}
			}
		}else{
			$(".cal-2 .alert-4").html("");
			$(".cal-2 .alert-4").html("");		
		}		
	});
	//查年终奖
	$(".btn3").click(function(){
		var salaryVal=$(".salary-3").val();
		var shenfenVal=$('input:radio[name="shenfen3"]:checked').val();
		console.log(shenfenVal);
		console.log(salaryVal);
		var mColor=$("#a-before").css("color");
		//通过颜色判断税前税后
		var revenueVal
		if(mColor=="rgb(255, 255, 255)"){
			revenueVal="税前"
		}else{
			revenueVal="税后"
		}
		console.log(revenueVal);
		if(!salaryVal){
			$(".cal-3 .alert").html("年终奖不能为空！")
		}else{
			$(".cal-3 .alert").html("");
			//$(".cal-3").hide();
			//$(".container-3").show();
		}
	})
	//查劳务收入
	$(".btn4").click(function(){
		var salaryVal=$(".salary-4").val();
		var shenfenVal=$('input:radio[name="shenfen4"]:checked').val();
		console.log(shenfenVal);
		console.log(salaryVal);
		var mColor=$("#b-before").css("color");
		//通过颜色判断税前税后
		var revenueVal
		if(mColor=="rgb(255, 255, 255)"){
			revenueVal="税前"
		}else{
			revenueVal="税后"
		}
		console.log(revenueVal);
		if(!salaryVal){
			$(".cal-4 .alert").html("劳务收入不能为空！")
		}else{
			$(".cal-4 .alert").html("");
			//$(".cal-3").hide();
			//$(".container-3").show();
		}
	})
})

