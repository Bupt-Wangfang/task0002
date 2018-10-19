 $(function(){
     
    var content=document.getElementsByClassName("content")[0];
    var oUl=document.getElementsByClassName("ullist")[0];
    var oLi=document.querySelectorAll(".ullist li");
    
    function ajax(url, options) {
        var oAjax;
        if (window.XMLHttpRequest) {
            oAjax = new XMLHttpRequest();
        } else {
            oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var param = "";
        var data = options.data ? options.data : -1; //缓存data
        if (typeof(data) === "object") {
            for (var key in data) { //请求参数拼接
                if (data.hasOwnProperty(key)) {
                    param += key + "=" + data[key] + "&";
                }
            }
            param.replace(/&$/, "");
        } 
        else {
            param = "timestamp=" + new Date().getTime();
        }

        var type = options.type ? options.type.toUpperCase() : "GET";
        if (type === "GET") {
            oAjax.open("GET", url + "?" + param, true);
            oAjax.send();
        } 
        else {
            oAjax.open("POST", url, true);
            oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            oAjax.send(param);
        }

        //OnRedayStateChange事件
        oAjax.onreadystatechange = function() {
            if (oAjax.readyState === 4) {
                if (oAjax.status === 200) {
                    options.onsuccess(oAjax.responseText, oAjax);
                } 
                else {
                    if (options.onfail) {
                        options.onfail(oAjax);
                    }
                }
            }
        };
        return oAjax; //发送请求的XMLHttpRequest对象
    }

    content.addEventListener("click",function(e){//文本框点击事件
        document.onkeydown = function (e) {
            if(e.keyCode==40){
                 var actli=document.querySelector(".active");
                 if(actli){
                     if(actli.nextElementSibling==null){
                         return;
                     }
                     actli.nextElementSibling.className="active";
                     actli.className="";
                 }
                else{
                   var oLi=document.querySelectorAll(".ullist li");
                   oLi[0].className="active";
              }
           }
           
            if(e.keyCode==38){
                var actli=document.querySelector(".active");
                if(actli){
                    if(actli.previousElementSibling==null){
                        return;
                    }
                    actli.previousElementSibling.className="active";
                    actli.className="";

                }
            }
            
            if(e.keyCode==13){
                var actli=document.querySelector(".active");
                var val=actli.innerText;
                content.value=val;
                oUl.style.display="none";
            }
        }        
    });
    
    oUl.addEventListener("mouseover",function(e){//下拉栏鼠标移入事件
        var actli=document.querySelector(".active");
        if(actli){
            actli.className="";
        }
    });
    
    oUl.addEventListener("mouseleave",function(e){//下拉栏鼠标移出事件
        if(content.value===""){
            oUl.style.display="none";
        }
            
    });
    
    oUl.addEventListener("click",function(e){//下拉栏鼠标点击事件
        var val=e.target.innerText;
        content.value=val;
        oUl.style.display="none";
    });
    
    function handleValue() {
        var value=content.value;
        var reg = new RegExp("^" + value, "i");
        if (value === "") {
            oUl.style.display = "none";
        } 
        else 
        {
            ajax("task0002_4.txt",{
                onsuccess:check
            });
        }
        
        function check(data) {
            var checkArr = eval(data);
            var liElement = "";
            for (var i = 0, len = checkArr.length; i < len; i++) {
                var valueMatch = checkArr[i].match(reg);
                if (valueMatch) {
                    liElement += "<li><span>" + valueMatch[0] + "</span>" + checkArr[i].substr(valueMatch[0].length) + "</li>";
                }
            }
            oUl.innerHTML = liElement;
            oUl.style.display = "block";
        }

    }
    
    content.oninput=handleValue;  //监听input的值
    
 });   
    