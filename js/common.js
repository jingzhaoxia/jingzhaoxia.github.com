'use strict';
/* 公共函数 */

/**
 *  页面加载
 * @param fn    object		执行的函数
 */
function ready(fn)
{
	if(document.addEventListener)
	{
		document.addEventListener('DOMContentLoaded', fn, false);
	}
	else
	{
		document.attachEvent('onreadystatechange',function (){
			if(document.readyState == 'complete')
			{
				fn();	
			}	
		});
	}	
}

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
 * @param n    number		需要补零的数
 */
function preBrowser(name,value)
{
	
}
 
 
 
 
 
 
 
 
 
 
 
 
 