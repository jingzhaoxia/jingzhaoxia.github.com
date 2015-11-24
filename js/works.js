 'use strict';
/* 作品展示 */
function works(){
	var aLi=document.querySelectorAll('#w-show-list li');
	var oLeft=document.querySelector('#w-left');
	var oRight=document.querySelector('#w-right');
	var iNow=window.location.hash.substring(1);
	
	if(iNow!=2) 
	{
		_backWorks();
		return;	
	}
	_works();	
	
	function _works()
	{
		var bReady=true;
		var timer=null;
		
		_show();
		// 存 class
		var aClass=[];
		for(var i=0; i<aLi.length; i++)
		{
			aClass[i]=aLi[i].className;	
		}
		
	
		function toLeft()
		{
			aClass.unshift(aClass.pop());
			for(var i=0;i<aLi.length; i++)
			{
				aLi[i].className=aClass[i];	
			}	
		}
		
		function toRight()
		{
			aClass.push(aClass.shift());
			for(var i=0;i<aLi.length; i++)
			{
				aLi[i].className=aClass[i];	
			}	
		}
		
		// 左边
		oLeft.onclick=function (){
			if(bReady==false) return;
			bReady=false;
			toLeft();
			_show();
		};
		// 右边
		oRight.onclick=function (){
			if(bReady==false) return;
			bReady=false;
			toRight();
			_show();
		};
		
		// 键盘控制
		document.onkeydown=function (ev){
			var oEvent=ev || event;
			
			if(bReady==false) return;
			bReady=false;
			
			if(oEvent.keyCode == 37)
			{
				toLeft();	
			} else if(oEvent.keyCode==39)
			{
				toRight();	
			}	
			_show();
		};
		aLi[0].addEventListener('transitionend',function (){
			bReady=true;
		}, false);
	}	
	
	function _show()
	{
		var oL2=document.querySelector('#w-show-list .l2');	
		var oL1=document.querySelector('#w-show-list .l1');	
		var oCur=document.querySelector('#w-show-list .cur');
		var oR1=document.querySelector('#w-show-list .r1');	
		var oR2=document.querySelector('#w-show-list .r2');	
		
		oL2.style.transform='perspective(800px) translateX(-260px) rotateY(60deg)';
		oL1.style.transform='perspective(800px) translateX(-180px) rotateY(60deg)';
		oCur.style.transform='perspective(800px) translateX(0px) rotateY(0deg)';
		oR1.style.transform='perspective(800px) translateX(180px) rotateY(-60deg)';
		oR2.style.transform='perspective(800px) translateX(260px) rotateY(-60deg)';
	}
	
	function _backWorks()
	{
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].style.transform='perspective(800px) translateX(0px) rotateY(0deg)';
		}	
	}
	
}