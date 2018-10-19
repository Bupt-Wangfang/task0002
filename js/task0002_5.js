$(function(){
    var right=document.getElementById("right");
    var left=document.getElementById("left");
    $(document).on("mousedown",function(e){
        e = e||window.event;
        target = e.target ||e.srcElement;
        if(target.nodeName.toLowerCase()=="span"){ 
            target.setAttribute("draggable","true");
            target.className="draging";
            var el=document.querySelector(".draging");
            if(el.parentNode.id==="left"){
            
               //ondragstart事件:当拖拽行为开始时触发
                el.ondragstart=function(e){
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData("text", e.target.innerHTML);
                    e.target.style.opacity="0.5";
                };
                
                //dragend事件:当拖拽行为结束后触发
                el.ondragend=function(e){
                    e.target.style.opacity="1";
                };
                
                //dragover事件：当被拖拽元素在目标元素上移动时触发
                right.ondragover=function(e){
                    e.preventDefault();
                    e.dropEffect="move";

                };
                
                //drop事件：当被拖拽元素在目标元素上，而且释放鼠标左键时触发
                right.ondrop=function(e){
                    e.preventDefault();
                    var newspan=document.createElement("span");
                    newspan.innerHTML=e.dataTransfer.getData("text");
                    right.appendChild(newspan);
                    el.parentNode.removeChild(el);
                    el.className="";
                };
            }
            else if(el.parentNode.id==="right"){
            
                el.ondragstart=function(e){
                    e.dataTransfer.effectAllowed = 'move';
                    e.dataTransfer.setData("text", e.target.innerHTML);
                    e.target.style.opacity="0.5";
                };
                
                el.ondragend=function(e){
                    e.target.style.opacity="1"
                }
                
                left.ondragover=function(e){
                    e.preventDefault();
                    e.dropEffect="move";
                }
                
                left.ondrop=function(e){
                    var newspan=document.createElement("span");
                    newspan.innerHTML=e.dataTransfer.getData("text");
                    left.appendChild(newspan);
                    right.removeChild(el);
                    el.className="";
                }
            }
        }
    });
});    