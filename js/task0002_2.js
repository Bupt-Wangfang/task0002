$(function(){
	function calculate(){
		var date=$("#date").val().match(/(^\d{4})-(\d{2})-(\d{2})$/);
		if(date!==null){
			date=new Date(date[1],date[2]-1,date[3]);
			var current=new Date();
			var left_time=parseInt((date.getTime()-current.getTime())/1000);
			var t=setInterval(calculate, 1000);
			if(left_time > 0){
				var day = parseInt(left_time / (60 * 60 * 24)); //天
	            var hour = parseInt(left_time / (60 * 60) % 24); //时
	            var minute = parseInt(left_time / 60 % 60); //分
	            var second = parseInt(left_time % 60); //秒
				$("#display").text("距离" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 00:00:00，还有" + day+ "天" + hour+ "小时" + minute+ "分" + second+ "秒");
			}
			if (left_time === 0) { 
                clearInterval(calculate);
                $("#display").text("时间已经到了。");
            } 
            if (left_time < 0) { 
            	var day = parseInt(-left_time / (60 * 60 * 24)); //天
	            var hour = parseInt(-left_time / (60 * 60) % 24); //时
	            var minute = parseInt(-left_time / 60 % 60); //分
	            var second = parseInt(-left_time % 60); //秒
                $("#display").text("距离" + date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDate() + "日 00:00:00，已经过去了" + day+ "天" + hour+ "小时" + minute+ "分" + second+ "秒");
            } 
		}
	}
	$("#btn").click(function () {
            calculate();
    }); 
});