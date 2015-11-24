'use strict';

// 改变字体大小
;(function (doc, win){
	function changeFont()
	{
		doc.documentElement.style.fontSize=doc.documentElement.clientWidth/16+'px';	
	}
	doc.addEventListener('DOMContentLoaded', changeFont, false);
	win.addEventListener('resize',changeFont, false);
})(document,window);

// 首页加载
document.addEventListener('DOMContentLoaded',function (){
	//选项卡
	;(function(){
		var oTab=document.querySelector('#h-tab');
		var oUl=oTab.querySelector('ul');
		var aCont=oTab.querySelectorAll('ul li');
		var aBtn=oTab.querySelectorAll('ol li');
		var arr=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
		
		// 给每个图片赋值
		for(var i=0; i<aCont.length; i++)
		{
			var oA=aCont[i].querySelector('a');
			oA.innerHTML='<img src="./jhs/images/ad/'+arr[i]+'">';	
		}
		
		// 选项卡
		for(var i=0; i<aBtn.length; i++)
		{
			aBtn[i].dataset.index=i;
			aBtn[i].addEventListener('touchstart',function (){
				for(var i=0; i<aBtn.length; i++)
				{
					aBtn[i].classList.remove('active');
					// aCont[i].classList.remove('active');	
					oUl.style.WebkitTransform='translate3d(0,0,0)';
				}
				this.classList.add('active');
				// aCont[this.dataset.index].classList.add('active');	
				var x=-this.dataset.index*aCont[0].offsetWidth;
				oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
			}, false);	
		}
	})();
	
	// 拖拽、轮播图
	;(function (){
		var oTab=document.querySelector('#h-tab');
		var oUl=oTab.querySelector('ul');
		var aCont=oTab.querySelectorAll('ul li');
		var aBtn=oTab.querySelectorAll('ol li');
		var arr=['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
		
		// 给每个图片赋值
		for(var i=0; i<aCont.length; i++)
		{
			var oA=aCont[i].querySelector('a');
			oA.innerHTML='<img src="./jhs/images/ad/'+arr[i]+'">';	
		}
		
		var x=0;
		var iNow=0;
		oTab.addEventListener('touchstart',function (ev){
			oUl.style.WebkitTransition='none';
			var startX=ev.targetTouches[0].pageX;
			var disX=startX-x;	
			
			function fnMove(ev)
			{
				x=ev.targetTouches[0].pageX-disX;
				oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
				ev.preventDefault();
			}
			
			function fnEnd(ev)
			{
				oTab.removeEventListener('touchmove', fnMove, false);
				oTab.removeEventListener('touchend', fnEnd, false);
				
				var endX=ev.changedTouches[0].pageX;
				if(Math.abs(startX-endX)>50)
				{
					//换图
					if(startX>endX)
					{
						// 往左拖拽
						iNow++;
						(iNow>=aCont.length) && (iNow=aCont.length-1);
					}
					else
					{
						// 往右拖拽	
						iNow--;
						(iNow<=0) && (iNow=0);
					}
					x=-iNow*aCont[0].offsetWidth;
					oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
				}
				x=-iNow*aCont[0].offsetWidth;
				oUl.style.WebkitTransition='1s all ease';
				oUl.style.WebkitTransform='translate3d('+x+'px,0,0)';
				for(var i=0; i<aBtn.length; i++)
				{
					aBtn[i].classList.remove('active');	
				}
				aBtn[iNow].classList.add('active');
			}
			oTab.addEventListener('touchmove', fnMove, false);
			oTab.addEventListener('touchend', fnEnd, false);
		}, false);
	})();
	
	// 返回顶部 ?? 不能实现
	;(function (){
		var oBtn=document.querySelector('.back-top .btn');
		var timer=null;
		var userScroll=false;
		
		window.addEventListener('touchstart', function (){
			if(userScroll)
			{
				clearInterval(timer);	
			}	
			userScroll=true;
		}, false);
		
		oBtn.addEventListener('touchstart',function (){
			var start=document.body.scrollTop;
			var dis=0-start;
			var count=Math.floor(1000/16);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function (){
				n++;
				userScroll=false;
				var cur=start+dis*n/count;
				document.body.scrollTop=cur;
				if(n==cur)
				{
					clearInterval(timer);	
				}	
			}, 16);
		}, false);
	})();
}, false);



