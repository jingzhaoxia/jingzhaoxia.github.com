'use strict';
/*var iNow=window.location.hash.substring(1);	
console.log(iNow);
if(iNow!=3) return;
_ring();*/
function ring()
{
	var oUl=$('.m-pic');
	var oLeft=document.querySelector('#m-left');
	var oRight=document.querySelector('#m-right');
	var N=8;
	var y=0;
	var iNow=window.location.hash.substring(1);
	if(iNow!=3) 
	{
		_ringBack();
		return;	
	}
	_ring();
	_opacity();
	function _ring()
	{
		oUl.html('');
		for(var i=0; i<N; i++)
		{
			var oLi=$('<li><a href="javascript:;" target="_blank"></a></li>');
			oLi.children().eq(0).attr('href','../data/html/mobile'+(i%5)+'.html');
			oLi.children().eq(0).css({
				'display':'block',
				'margin':'0 auto',
				'margin-top':'21px',
				'width':'75px',
				'height':'135px',
				'background-image':'url(../data/images/mobile'+(i%5)+'.jpg)',
				'background-repeat':'no-repeat',
				'background-size':'cover'
			});
			oLi.appendTo(oUl);
			
			(function (oLi,index){
				setTimeout(function (){
					oLi.css('transform','rotateY('+360/N*index+'deg) translateZ(350px)');
				}, 300*(N-index));
			})(oLi,i);
			
			// 键盘事件
			document.onkeydown=function (ev){
				if(ev.keyCode==37)
				{
					y-=360/N;
					change();	
				}
				else if(ev.keyCode==39)
				{
					y+=360/N;
					change();
				}	
			};
			
			
			// 左边
			oLeft.onclick=function (){
					y-=360/N;
					change();	
			};
			oRight.onclick=function (){
					y+=360/N;
					change();
			};
		}
	}
	
	
	function _opacity()
	{
		var aLi=oUl.children();	
		if( ! aLi) return;
		// 最后一个走完了
		aLi.eq(0).on('transitionend',function (){
			change();
		});
	}
	
	function _ringBack()
	{
		var aLi=oUl.children();	
		if( ! aLi) return;
		aLi.each(function(i){
			(function (oLi,index){
				setTimeout(function (){
					oLi.css('transform','rotateY('+0+'deg) translateZ(0)');
				}, 0);
			})(aLi.eq(i),i);
		});
		
		aLi.eq(0).on('transitionend',function (){
			oUl.html();
		});
	}
	
	function change()
	{
		var aLi=oUl.children();	
		if( ! aLi) return;
		aLi.each(function (index){
			$(this).css('transform','rotateY('+(360/N*index+y)+'deg) translateZ(350px)');	
			var d=Math.abs((360/N*index+y)%360);
			if(d>180) d=360-d;
			d=180-d;
			
			var scale=d/180;
			scale<0.3 && (scale=0.3);
			$(this).css('opacity', scale);
		});
	}
}



	










