//task0002-2
//判断arr是否为一个数组，返回一个bool值
function isArray(arr){
	if(Array.isArray){
        return Array.isArray(arr);
    }
    else{
        return Object.prototype.toString.call(arr)=='[object Array]';
    }
}

//判断fn是否为一个函数，返回一个bool值
function isFunction(fn){
    return typeof(fn)==="function";
    //return Object.prototype.toString.call(fn)==='[object Function]';
}

//function isFunction( fn ) { 
//    return !!fn && !fn.nodeName && fn.constructor != String && 
//    fn.constructor != RegExp && fn.constructor != Array && 
//    /function/i.test( fn + "" ); 
//} 

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
//第一种方法
function cloneObject(src) {
        var result;
    switch(Object.prototype.toString.call(src)){
        case "[object Number]":
            result=src;
            break;
        case "[object String]":
            result=src;
            break;
        case "[object Boolean]":
            result=src;
            break;
        case "[object Date]":
            result=new Date(src);
            break;
        case "[object Array]":
            result=[];
            for(var i = 0, len = src.length; i < len; i++){
                result[i]=(cloneObject(src[i]));
            }
            break;
        case "[object Object]":
            result={};
            for(var k in src){
                result[k] = cloneObject(src[k]);
            }
            break;
        default:
            break;
    }
    return result;
}

//第二种方法
function clone(obj){
    var o;
    switch(typeof obj){
    case 'undefined': 
        break;
    case 'string'   : 
        o = obj + '';
        break;
    case 'number'   : 
        o = obj - 0;
        break;
    case 'boolean'  : 
        o = obj;
        break;
    case 'object'   :
        if(obj === null){
            o = null;
        }
        else{
            if(obj instanceof Array){
                o = [];
                for(var i = 0, len = obj.length; i < len; i++){
                    o.push(clone(obj[i]));
                }
            }
            else{
                o = {};
                for(var k in obj){
                    o[k] = clone(obj[k]);
                }
            }
        }
        break;
    default:        
        o = obj;
        break;
    }
    return o;   
}

//学习数组、字符串、数字等相关方法，在util.js中实现以下函数
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
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

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符,假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
     var result;
    for(i=0;i<str.length;i++){
        if(str[i]!=" "  && str[i]!="\t")
            break;
    }
    for(j=str.length-1;j>=0;j--){
        if(str[j]!=" " && str[j]!="\t")
            break;
    }
    result=str.slice(i,j+1);
    return result;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串,尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var result;
    result = str.replace(/^\s+|\s+$/g, "");
    return result;
}


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(i=0;i<arr.length;i++){
        fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    return Object.keys(obj).length;
}

//function getObjectLength(obj) {
//    var count = 0;
//    for (var i in obj) {
//        if (obj.hasOwnProperty(i)) {
//            count++;
//          }
//    }
//    return count;
//}

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var reg=/^[^\s]+@[^\s]+\.[^\s]+$/;
    return reg.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var reg=/^1\d{10}$/;;
    return reg.test(phone);
}


//task0002-3
//首先判断有没有样式
function hasClass(element,className){
    var classNames=element.className;
    if(!classNames)
        return false;
    if(classNames.includes(className))
        return true;
    else
        return false;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if(!hasClass(element,newClassName))
        element.className+=" "+newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if(hasClass(element,oldClassName))
        element.className.replace(oldClassName,"");
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode===siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var current=element;
    var x=0,y=0;
    while(current!=null){
        x+=current.offsetLeft;
        y+=current.offsetTop;
        current=current.offsetParent;
    }
    return {x:x,y:y};
}

// 实现一个简单的Query，是document.querySelector的功能子集，和之前的$是不兼容的
function $(selector) {
    var ele = document;
    var sele=selector.replace(/\s+/,' ').split(" ");  //去除多余的空格
    for(var i=0;i<sele.length;i++){
        switch(sele[i][0]){
            case '#':
                ele=ele.getElementById(sele[i].substring(1));
                break;
            case '.':
                ele=ele.getElementsByClassName(sele[i].slice(1))[0];
                break;
            case '[':
                var index=sele[i].indexOf('=');  //标记=的位置；
                var temp = ele.getElementsByTagName('*');//获取所有元素
                if(index!==-1){
                    var key=sele[i].substring(1,index);
                    var value=sele[i].substring(index+1);
                    for(var j=0;j<temp.length;j++){
                        if(temp[j].getAttribute(key)==value){
                            ele=temp[j];
                            break;
                        }
                    }
                }
                else{
                    var key = sele[i].substring(1);
                    for (var j = 0; j < temp.length; j++) {
                        if (temp[j][key]) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                break;
            default:
                ele = ele.getElementsByTagName(sele[i])[0];
                break;
        }
    }
    if(!ele)
        ele=null;
    return ele;   
}


//task0002-4  事件
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false);
    }
    else{
        element.attachEvent("on"+event,listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
        element.removeEventListener(event,listener);
    }
    else{
        element.detachEvent("on"+event,listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,'keydown',function(event){
        if(event.keyCode==13)
            listener.call(element,event);//call()接收2个参数，第一个参数是this值,第二个参数是你想要传给函数的参数
    });
}

//接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
//addEvent(element, event, listener) -> $.on(element, event, listener);
//removeEvent(element, event, listener) -> $.un(element, event, listener);
//addClickEvent(element, listener) -> $.click(element, listener);
//addEnterEvent(element, listener) -> $.enter(element, listener);
$.on=addEvent;
$.un=removeEvent;
$.click=addClickEvent;
$.enter= addEnterEvent;

// 事件代理,实现对element里面所有tag的eventName事件进行响应
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element,eventName,function(e){
        if(e.target && e.target.nodeName.toLowerCase()==tag)
            listener.call(e.target,e);
    });
}
$.delegate = delegateEvent;


//task0002-5  BOM
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串 
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器 
    strStart = userAgent.indexOf('rv');
    strStop = userAgent.indexOf(')');
    temp = userAgent.substring(strStart, strStop);
    broName = temp.replace('rv', 'IE').replace(':', '版本号');
    if(isIE){ 
       return broName; 
    }else{ 
      return -1; 
    } 
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=cookieName+ "=" +escape(cookieValue)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

// 获取cookie值
function getCookie(cookieName) {
   if (document.cookie.length>0)
   {
       c_start=document.cookie.indexOf(cookieName + "=")
       if (c_start!=-1)
       { 
           c_start=c_start + cookieName.length+1; 
           c_end=document.cookie.indexOf(";",c_start);
           if (c_end==-1) c_end=document.cookie.length;
           return unescape(document.cookie.substring(c_start,c_end));
       } 
    }
    return "";
}

// 封装一个ajax方法,options是一个对象，里面可以包括的参数为：type: post或者get，可以有一个默认值，
//data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
//onsuccess: 成功时的调用函数
//onfail: 失败时的调用函数
function ajax(url, options) {
   var xmlHttp=null;
   if(XMLHttpRequest){
       xmlHttp=new XMLHttpRequest();
   }
   else{
       xmlHttp=new AvtiveXObject('Microsoft.XMLHTTP');
   }
   var type=options.type || "GET";
   var params = [];
　　for (var key in data){
　　　　params.push(key + '=' + data[key]);
　　}
　　var dataStr = params.join('&');
    if (type === 'POST') {
　　　　xmlHttp.open(type, url,true);
　　　　xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
　　　　xmlHttp.send(dataStr);
　　}
　　else {
　　　　xmlHttp.open(type, url + '?' + dataStr,true);
　　　　xmlHttp.send(null);
　　} 
　　xmlHttp.onreadystatechange = function () {
        if(xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(xmlHttp.responseText, xmlHttp);
            } else {
                //先判断是否存在请求失败函数
                //存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(xmlHttp);
                }
            }
        }
    };
    return xmlHttp;
}



