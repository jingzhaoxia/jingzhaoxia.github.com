'use strict';

function index()
{
	var iNow=window.location.hash.substring(1);
	if(iNow!=0) 
	{
		_backIndex();
		return;	
	}	
	var oBox=document.querySelector('.h-cont');
	oBox.style.display='block';	
	_shadow();
	_video();
	// 手机运动完了，阴影出现
	function _shadow()
	{
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
	}
	
	// 添加视频
	function _video()
	{
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
	}
	
	// 走了就消失
	function _backIndex()
	{
		setTimeout(function (){
			var oBox=document.querySelector('.h-cont');
			oBox.style.display='none';	
		}, 300);
	}
	
}





























