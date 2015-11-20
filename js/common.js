'use strict';
/* 公共函数 */

/**
 *  补零
 * @param n    number		需要补零的数
 */
function toDub(n)
{
	return n<10 ? '0'+n : ''+n;
}

/**
 *  浏览器前缀
 * @param obj   object		需要添加的对象
 * @param name   string		样式名
 * @param value   string	样式值
 */
function setStyle3(obj,name,value){
	var w=name.charAt(0).toUpperCase()+name.substring(1);
	
	obj.style['Webkit'+w]=value;
	obj.style['Moz'+w]=value;
	obj.style['ms'+w]=value;
	obj.style['O'+w]=value;
	obj.style[name]=value;
}
/**
 *  到可视区的距离
 * @param obj   object		需要添加的对象
 * @param name   string		样式名
 * @param value   string	样式值
 */
function getPos(obj)
{
	var left=0;
	var top=0;
	while(obj)
	{
		left+=obj.offsetLeft;
		top+=obj.offsetTop;
		
		obj=obj.offsetParent;
	}	
	return {left:left,top:top};
}

/**
 * 添加滚轮事件
 * @param obj    object  	被添加滚轮事件的对象
 * @param fn    function	添加滚轮后所执行的函数
 * 调用fn(down); 
 * 其中：向下滚 down=true; 向上滚 down=false;
 */
function addWheel(obj, fn)
{
	if( isFF() )	
	{
		// FF
		obj.addEventListener('DOMMouseScroll', _wheel, false);
	}
	else
	{
		// 非FF
		obj.onmousewheel=_wheel;
	}
	
	function _wheel(ev)
	{
		var oEvent=ev || event;
		var down=false;
		if(oEvent.detail)	
		{
			// FF	
			down=oEvent.detail>0 ? true : false;
		}
		else
		{
			// 非FF
			down=oEvent.wheelDelta>0 ? false : true;	
		}
		// 调用函数
		fn(down);
		
		/*
			自定义滚动条与系统默认滚动条
			阻止默认事件
			在 addEventListener 中阻止默认事件是 oEvent.preventDefault();
		*/ 
		// oEvent.preventDefault && oEvent.preventDefault();
		// return false;
	}

}

/**
 * 判断 FF 浏览器
 * 		是 返回true；不是 返回false。
 */
function isFF()
{
	if(window.navigator.userAgent.toLowerCase().indexOf('firfox') != -1)
	{
		return true;
	}
	else
	{
		return false; 	
	}
}

 
 
 
 
 
 
 
 
 
 
 
 