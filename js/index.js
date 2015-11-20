'use strict';

$(function (){
	
	
	// 鼠标右键
	;(function (){
		var oContextMenu=$('#g-context');
		$(document).on('contextmenu',function(ev){
			var _ev=ev;
			$.ajax({
				url:'context-menu.html',
				success:function (str){
					/*oContextMenu.html(str);
					// operContext(_ev);
					
					var oC=$('.g-context');
					var oUl=$('.menu-list');
					var aLi=oUl.children();
					var h=aLi.length*(aLi.eq(0).outerHeight()+10+2);
					console.log(aLi.eq(0).outerHeight());
					oC.show().css({
						left:_ev.clientX+'px',
						top:_ev.clientY+'px'
					});
					oC.stop().animate({
						height:h+'px',
						opacity:1	
					}, 800, 'bounce');
					*/

				}	
			});
			
			/*$(document).on('click',function (){
				oC.hide && oC.hide();	
			});*/
			// return false;
		});
		
		function operContext(ev)
		{
			
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
			setStyle3(oShadow, 'animation', '1s shadow ease forwards');
		}, false);
		oShadow.addEventListener('animationend', function (){
			setStyle3(oBigTree, 'animation', '1s big-tree ease forwards');
			setStyle3(oSmallTree, 'animation', '1s small-tree ease forwards');
			setStyle3(oOtherTree, 'animation', '1s other-tree ease forwards');
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
			setStyle3(oV[0], 'animation', '1s video ease forwards');
		}, false);
	})();
	

});





























