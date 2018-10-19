function trim(str) {
    var result;
    result = str.replace(/^\s+|\s+$/g, "");
    return result;
}

function uniqArray(arr) {
    //ES6中常用方法
    //return Array.from(new Set(arr));
    //ES5中常用的方法splice
    for(i=0;i<arr.length;i++){
        for(j=i+1;j<arr.length;j++){
            if(arr[i]==arr[j]){
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}

$(document).ready(function(){
	$("#btn1").click(function(){
        var content="";
		var h=$("#hobby1").val().split(/\,|\，/);
		h=uniqArray(h);
		for(var i=0;i<h.length;i++){
			var trimValue = trim(h[i]); 
			if(trimValue!==""){
                content+="<li>"+trimValue+"</li>"; 
            }
		}
        $("#display1").html(content);	
	});

	$("#btn2").click(function(){
        var content="";
		var h=$("#hobby2").val().split(/\n|\s+|\,|\，|\、|\;|\；/);
		h=uniqArray(h);
		for(var i=0;i<h.length;i++){
			var trimValue = trim(h[i]); 
			if(trimValue!=="")
				content+="<li>"+trimValue+"</li>"; 
		}
        $("#display2").html(content);	
	});

    //oninput事件监听input、textarea输入框值变化
	$("#hobby3").on("input",function(){
		var h=$("#hobby3").val().split(/\n|\s+|\,|\，|\、|\;|\；/);
        if( h.length > 10 || h==""){
            $("p").css('display','block');
        }
        else{
            $("p").css('display','none');
        }
    });
    $("#btn3").click(function(){
        var content="";
        var h=$("#hobby3").val().split(/\n|\s+|\,|\，|\、|\;|\；/);
        if( h.length > 10 || h==""){
            $("p").css('display','block');
        }
        h=uniqArray(h);
        for(var i=0;i<h.length;i++){
            var trimValue = trim(h[i]); 
            if(trimValue!=="")
                content+="<label><input type='checkbox' />"+trimValue+"</label>";      
        }
        $("#display3").html(content);
    });   
});  