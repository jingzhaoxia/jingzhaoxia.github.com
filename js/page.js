'use strict';
	//此处引用：鼠标滚轮mousewheel插件
$(function(){
	var aNav=$('.g-menu-list li'); // 导航
	var oSection=$('.section-wrap'); // 整个屏幕
	var aBtn=$('.section-btn li'); // 右侧的按钮
	var oArrow=$('.arrow'); // 向下的按钮
	var iNow=0; // 当前显示的
	var bReady=true; // 默认是准备好的
	window.location.hash=iNow;
	index();

	function toUp()
	{
		iNow++;
		iNow==aBtn.length && (iNow=0);
	}
	
	function toDown()
	{
		iNow--;
		iNow<0 && (iNow=aBtn.length-1);
	}
	
	function show()
	{
		aBtn.each(function (index){
			$(this).removeClass('active');
			aNav.eq(index).removeClass('active');
		});	
		aBtn.eq(iNow).addClass('active');
		aNav.eq(iNow).addClass('active');
		oSection.css('transform','translateY(-'+(iNow*100)+'%)');
		// 将当前显示的第几屏幕存入 locaStorage
		window.location.hash=iNow;
		index();
		introduce();
		works();
		ring();
	}
	function change(index,elem)
	{
		elem.on('click',function (){
			iNow=index;
			// 清空全部的
			show();
		});
	}
	
	// 导航点击显示
	aNav.each(function (index){
		var _this=$(this);
		change(index, _this);
	});
	
	// 右侧按钮点击切换
	aBtn.each(function (index){
		var _this=$(this);
		change(index, _this);
	});

	// 翻页按钮
	function fnClick()
	{
		toUp();
		show();
		setTimeout(function (){
			oArrow.one('click',fnClick);
		}, 1000);
	}
	oArrow.one('click',fnClick);
	
	// 鼠标翻页
	function fnMouse(ev)
	{
		if(ev.deltaY<0)
		{
			// 向上
			toUp();
		}
		else
		{
			// 向下
			toDown();
		}
		show();
		setTimeout(function (){
			$(document).one('mousewheel',fnMouse);
		}, 1000);
	}
	
	$(document).one('mousewheel',fnMouse);
	
	// 键盘控制
	function fnKeydown(ev)
	{
		switch(ev.keyCode)
		{
			case 38:
				// 页面向下走
				toDown();
				show();
				break;
			case 40:
				toUp();
				show();
				break;	
		}
		setTimeout(function (){
			$(document).one('keydown',fnKeydown);
		}, 1000);
	}
	$(document).one('keydown',fnKeydown);
});	
