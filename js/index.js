'use strict';

$(function (){
	// 四屏幕的高度
	;(function (){
		var aScroll=document.querySelectorAll('.scroll-page');
		var winH=document.documentElement.clientHeight;
		
		for(var i=0; i<aScroll.length; i++)
		{
			aScroll[i].style.height=winH+'px';	
		}
	})();	
	
	// 手机运动完了，阴影出现
	;(function (){
		var oPhone=document.querySelector('.h-phone');
		var oShadow=oPhone.querySelector('.phone-shadow');
		var oBigTree=oPhone.querySelector('.big-tree');
		var oSmallTree=oPhone.querySelector('.small-tree');
		var oOtherTree=oPhone.querySelector('.other-tree');
		
		oPhone.addEventListener('animationend',function (){
			oShadow.style.WebkitAnimation='1s shadow ease forwards';
			oShadow.style.MozAnimation='1s shadow ease forwards';
			oShadow.style.msAnimation='1s shadow ease forwards';
		}, false);
		oShadow.addEventListener('animationend', function (){
			oBigTree.style.WebkitAnimation='1s big-tree ease forwards';
			oBigTree.style.MozAnimation='1s big-tree ease forwards';
			oBigTree.style.msAnimation='1s big-tree ease forwards';

			oSmallTree.style.WebkitAnimation='1s small-tree ease forwards';
			oSmallTree.style.MozAnimation='1s small-tree ease forwards';
			oSmallTree.style.msAnimation='1s small-tree ease forwards';

			oOtherTree.style.WebkitAnimation='1s other-tree ease forwards';
			oOtherTree.style.MozAnimation='1s other-tree ease forwards';
			oOtherTree.style.msAnimation='1s other-tree ease  ';
		}, false);
	})();
	
	// 添加视频
	;(function (){
		var oOtherTree=$('.other-tree');
		var oV=$('.h-video');
		$.ajax({
			url:'video.html',
			success:function (str){
				oV.html(str);
				new Video();
			}	
		});	
		oOtherTree[0].addEventListener('animationend',function (){
			oV[0].style.WebkitAnimation='1s video ease forwards';	
		}, false);
	})();
	
	// 鸽子抖一抖
/*	;(function (){
		var oDove=$('.h-dove');	
		oDove[0].addEventListener('animationend',function (){
			oDove[0].style.WebkitAnimation='1s dove-shake ease forwards';	
		}, false);
	})();
*/});





























