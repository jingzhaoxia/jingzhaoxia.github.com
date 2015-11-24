'use strict';
;(function (doc, win){
	function change()
	{
		doc.documentElement.style.fontSize=20*doc.documentElement.clientWidth/320+'px';	
	}
	doc.addEventListener('DOMContentLoaded', change, false);
	win.addEventListener('resize', change, false);
})(document,window);

document.addEventListener('DOMContentLoaded',function (){
	// 头部导航按钮
	;(function (){
		var oBtn=document.querySelector('button');
		var oMenu=document.querySelector('#menu');
		
		oBtn.addEventListener('touchstart',function (){
			oMenu.classList.toggle('active');
		}, false);	
	})();
	
}, false);