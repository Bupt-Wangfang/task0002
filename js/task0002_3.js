
$(function(){

	var timer=null,
	index,
	pics=$(".container div"),
    dots=$(".dots span"),
	size=pics.length,
	direction=true,      //轮播顺序，true为正序
	interval=1000,       //间隔时长
	cycle=true;          //是否循环，true为循环

	if(direction===true){
		index=0;
	}
	else{
		index=size;
	}


	//清除定时器,停止自动播放
	function stopAutoPlay()
	{
		if(timer){
			clearInterval(timer);
		}
	}

	//图片自动轮播-正向
	function startAutoPlay()
	{
		timer=setInterval(function(){
			index++;
			if (index>=size)
			{
				if(cycle!==false)
					index=0;
				else{
					clearInterval(timer);
					pics[index].style.display="block";
				}
			}
			changeImg();
		},interval);
	}

	//图片自动轮播-反向
	function startAutoPlay_Reverse()
	{
		timer=setInterval(function(){
			index--;
			if (index<0)
			{
				if(cycle!==false)
					index=size-1;
				else{
					clearInterval(timer);
					pics[index].style.display="block";
				}
			}
			changeImg();
		},interval);
	}

	//改变图片的函数
	function changeImg(){
		for(var i=0,len=dots.length;i<len;i++)
		{
			//dots[i].className="";
			//pics[i].style.display="none";
            dots.eq(i).removeClass("active");  // 注意jquery对象和dom对象的区别
            pics.eq(i).css("display","none");
		}
		//dots[index].className="active";
		//pics[index].style.display="block";
        dots.eq(index).addClass("active");
        pics.eq(index).css("display","block");
	}

	function slideImg()
	{
		$(".main").on('mouseover',function(){
			stopAutoPlay();
		});
		$(".main").on('mouseout',function(){
			startPlay();
		});
		$(".main").trigger('mouseout');


		//点击导航切换
		for(var i=0,len=dots.length;i<len;i++){
			dots[i].id=i;
			dots.eq(i).click(function(){
				index=this.id;
				changeImg();
			});
		}

		//点击箭头切换
		//下一张
		$("#next").click(function(){
			index++;
			if(index>=size) index=0;
			changeImg();
		});

		//上一张
		$("#prev").click(function(){
			index--;
			if(index<0) index=size-1;
			changeImg();
		});
	}

	if(direction===false){
		startPlay=startAutoPlay_Reverse;
	}
	else{
		startPlay=startAutoPlay;
	}
	slideImg();
});