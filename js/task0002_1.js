window.onload=function(){
	var btn1=document.getElementById("btn1");
	var hobby1=document.getElementById("hobby1");
	var result1=document.getElementById("display1");

	btn1.onclick=function(){
		var h=hobby1.value.split(/\,|\，/);
		h=uniqArray(h);
		for(var i=0;i<h.length;i++){
			var trimValue = trim(h[i]); 
			if(trimValue!=="")
				result1.innerHTML+="<li>"+trimValue+"</li>";
		}
	}
    
    var btn2=document.getElementById("btn2");
	var hobby2=document.getElementById("hobby2");
	var result2=document.getElementById("display2");

	btn2.onclick=function(){
		var h=hobby2.value.split(/\n|\s+|\,|\，|\、|\;|\；/);
		h=uniqArray(h);
		for(var i=0;i<h.length;i++){
			var trimValue = trim(h[i]); 
			if(trimValue!=="")
				result2.innerHTML+="<li>"+trimValue+"</li>";
		}
	}
    
    var btn3=document.getElementById("btn3");
	var hobby3=document.getElementById("hobby3");
	var result3=document.getElementById("display3");
    var p=document.getElementsByTagName("p")[0];

    //oninput事件监听input、textarea输入框值变化
	hobby3.oninput=function(){
		var h=hobby3.value.split(/\n|\s+|\,|\，|\、|\;|\；/);
        if( h.length > 10 || h==""){
            p.style.display="block";
        }
        else{
            p.style.display="none";
            btn3.onclick=function(){
                if( h.length > 10 || h==""){
                    p.style.display="block";
                }
                h=uniqArray(h);
                for(var i=0;i<h.length;i++){
                    var trimValue = trim(h[i]); 
                    if(trimValue!=="")
                        result3.innerHTML+="<label><input type='checkbox' />"+trimValue+"</label>";
                }
            }
            
        }
		
	}
    
}