'use strict';

function ZQuery(arg)
{
	// 通过选择器获取的获取的元素
	this.elements=[];
	this.domString='';// 存储创建的
	
	switch(typeof arg)
	{
		case 'function':
			// 加载页面
			ready(arg);
			break;
		case 'string':
			// if(arg.charAt(0)=='<') // 创建元素 '<div></div>'
			if(arg.indexOf('<')!=-1)
			{
				// DOM 创建
				this.domString=arg; 
			}
			else
			{
				// 选择器
				this.elements=getElem(arg);
				this.length=this.elements.length;	
			}
			break;
		default:
			if(arg instanceof Array)
			{
				// 也可以直接往里面扔数组
				this.elements=arg;
			}
			else
			{
				// 将原生的转换为ZQuery对象 document, this
				this.elements.push(arg);	
			}
			break;	
	}	
}
// $ -> new ZQuery
function $(arg)
{
	return new ZQuery(arg);		
}
/*===============方法start===================*/
// css 样式
ZQuery.prototype.css=function (name,value){
	if(arguments.length==2)
	{
		// 2个参数 ， 赋值
		for(var i=0; i<this.elements.length; i++)
		{
			this.elements[i].style[name]=value;	
		}
	}
	else
	{
		// 1个参数	
		if(typeof name == 'string')
		{
			// 获取属性值，第0个
			return getStyle(this.elements[0],name);
		}
		else
		{
			// 批量设置
			var json=name;
			for(var name in json)
			{
				for(var i=0; i<this.elements.length; i++)
				{
					this.elements[i].style[name]=json[name];	
				}
			}	
		}
	}
	return this;
};

// attr 属性
ZQuery.prototype.attr=function (name, value){
	if(arguments.length==2)
	{
		// 2个参数 设置属性
		for(var i=0; i<this.elements.length; i++)
		{
			this.elements[i].setAttribute(name,value);	
		}
	}
	else
	{
		// 1个参数
		if(typeof name == 'string')
		{
			// 获取属性，第0个
			return this.elements[0].getAttribute(name);
		}
		else
		{
			// 批量设置
			var json=name;
			for(var name in json)
			{
				for(var i=0; i<this.elements.length; i++)
				{
					this.elements[i].setAttribute(name, json[name]);	
				}	
			}
		}
	}
	return this;
};


// html 内容
ZQuery.prototype.html=function (str){
	if(str || str=='') // 有str，有内容或者为空时，都是设置
	{
		for(var i=0; i<this.elements.length; i++)
		{
			this.elements[i].innerHTML=str;	
		}
	}
	else
	{
		// 获取，第0个
		return this.elements[0].innerHTML;
	}
	return this;
};

// val 表单元素
ZQuery.prototype.val=function (str){
	if(str || str=='')
	{
		// 设置
		for(var i=0; i<this.elements.length; i++)
		{
			this.elements[i].setAttribute('value',str);
		}
	}
	else
	{
		// 获取
		return this.elements[0].getAttribute('value');
	}
	return this;
};

// addClass 添加class
ZQuery.prototype.addClass=function (sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	for(var i=0; i<this.elements.length; i++)
	{
		if(this.elements[i].className)
		{
			if( ! reg.test(this.elements[i].className))
			{
				// 没有才要添加呢
				this.elements[i].className+=' '+sClass;
			}
		}
		else
		{
			this.elements[i].className=sClass;	
		}	
	}
	return this;
};

// removeClass 删除class
ZQuery.prototype.removeClass=function (sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	for(var i=0; i<this.elements.length; i++)
	{
		if(reg.test(this.elements[i].className))
		{
			// 有删掉，然后处理空格
			this.elements[i].className=this.elements[i].className.replace(reg,'').replace(/$\s+|\s+$/g,'').replace(/\s+/g,'');	
		}	
	}
	return this;
};

// hide 隐藏
ZQuery.prototype.hide=function (){
	for(var i=0; i<this.elements.length; i++)
	{
		this.elements[i].style.display='none';	
	}	
	return this;
};
// show 显示
ZQuery.prototype.show=function (){
	for(var i=0; i<this.elements.length; i++)
	{
		this.elements[i].style.display='block';	
	}	
	return this;
};


// index 从同级的兄弟姐妹中开始从0数
ZQuery.prototype.index=function (){
	var obj=this.elements[this.elements.length-1];
	var aSibling=obj.parentNode.children;
	
	for(var i=0; i<aSibling.length; i++)
	{
		if(aSibling[i]==obj) return i;	
	}
	return this;
};

// eq 下标对应的元素 返回对象
ZQuery.prototype.eq=function (n){
	return $(this.elements[n]);
};

// get 返回原生
ZQuery.prototype.get=function (){
	return this.elements[n];	
};

// click 点击事件,事件都是绑定的
/*ZQuery.prototype.click=function (fn){
	for(var i=0; i<this.elements.length; i++)
	{
		addEvent(this.elements[i],'click',fn);	
	}
};
*/

;'click contextmenu mousedown mouseup mousemove mouseover mouseout keydown keyup load scroll resize focus blur'.replace(/\w+/g,function (sEv){

	ZQuery.prototype[sEv]=function (fn){
		for(var i=0; i<this.elements.length; i++)
		{
			addEvent(this.elements[i],sEv,fn);	
		}
		return this;
	};	
});

// mouseenter 解决over问题 事件都是绑定的
ZQuery.prototype.mouseenter=function (fn){
	for(var i=0; i<this.elements.length; i++)
	{
		addEvent(this.elements[i],'mouseover',function (ev){
			var oFrom=ev.fromElement || ev.relatedTarget;
			if(this.contains(oFrom)) return ;
			fn && fn.apply(this,arguments);
		});	
	}
	return this;
};

// mouseout 解决out问题 事件都是绑定的
ZQuery.prototype.mouseleave=function (fn){
	for(var i=0; i<this.elements.length; i++)
	{
		addEvent(this.elements[i],'mouseout',function (ev){
			var oTo=ev.toElement || ev.relatedTarget;
			if(this.contains(oTo)) return ;
			fn && fn.apply(this,arguments);
		});	
	}
	return this;
};

// hover 移入移出
ZQuery.prototype.hover=function (fnOver, fnOut){
	this.mouseenter(fnOver);
	this.mouseleave(fnOut);
	return this;
};

// toggle 切换
ZQuery.prototype.toggle=function (){
	// 每一个都是从开始，再次点击回去接着来。各自的互不干扰
	var _this=this;
	var arg=arguments;
	for(var i=0; i<this.elements.length; i++)
	{
		(function (count){
			addEvent(_this.elements[i],'click',function (){
				var fn=arg[count%arg.length];
				fn.apply(this,arguments);
				count++;
			});
		})(0);
	}
	return this;
};

//each
ZQuery.prototype.each=function (fn){
	// 循环每一个，返回 下标和原生this
	for(var i=0; i<this.elements.length; i++)
	{
		fn && fn.call(this.elements[i],i,this.elements[i]);	
	}
	return this;
};

// find
ZQuery.prototype.find=function (str){
	// 找一组元素 $('p span') -> $('p').find('span')
 	var aElem=getElem(str, this.elements); //修改一下选择器，这次有指定父级
	return $(aElem);
}; 


// animate 运动
ZQuery.prototype.animate=function (json, options){
	for(var i=0; i<this.elements.length; i++)
	{
		move(this.elements[i], json, options);	
	}
	return this;
};

/*---------------------DOM start----------------------------*/
/*
	父级.insertAdjacentHTML('标志',字符串创建出来的);
	
	appendTo 内部后面		beforeEnd
	prependTo 内部前面	afeterBegin
	insertAfter 外部后面	afterEnd
	insertBefore 外部前面	beforeBegin
*/
// 外部后面 insertAfter - afterEnd
ZQuery.prototype.insertAfter=function (str){
	var aParent=getElem(str);
	for(var i=0; i<aParent.length; i++)
	{
		aParent[i].insertAdjacentHTML('afterEnd',this.domString);	
	}
	return this;
};

// 外部前面 insertBefore - beforeBegin
ZQuery.prototype.insertBefore=function (str){
	var aParent=getElem(str);
	for(var i=0; i<aParent.lenght; i++)
	{
		aParent[i].insertAdjacentHTML('beforeBegin',this.domString);	
	}
	return this;
};

// 内部后面 appendTo - beforeEnd
ZQuery.prototype.appendTo=function (){
	var aParent=getElem(str);
	for(var i=0; i<aParent.length; i++)
	{
		aParent[i].insertAdjacentHTML('beforeEnd',this.domString);	
	}
	return this;	
};

// 内部前面 prependTo - afterBegin
ZQuery.prototype.prependTo=function (str){
	var aParent=getElem(str);
	for(var i=0; i<aParent.length; i++)
	{
		aParent[i].insertAdjacentHTML('afterBegin',this.domString);	
	}
	return this;
};

// 删除
ZQuery.prototype.remove=function (){
	for(var i=0; i<this.elements.length; i++)
	{
		this.elements[i].parentNode.removeChild(this.elements[i]);		
	}
	return this;
};

/*---------------------DOM end----------------------------*/
// 交互
$.ajax=function (json){
	ajax(json);
	return this;
};

// 插件
$.fn=ZQuery.prototype;
$.fn.extend=function (json){
	for(var name in json)
	{
		ZQuery.prototype[name]=json[name];	
	}
	
	return this;
};
/*===============方法end===================*/

/*==============封装函数start==================*/
// ajax
function ajax(json)
{
	json=json || {};
	if( ! json.url) return ;
	json.data=json.data || {};
	json.type=json.type || 'get';
	json.timeout=json.timeout || 3000;
	json.dataType=json.Type || '';
	var timer=null;
	
	// 处理 jsonp
	if(json.dataType=='jsonp')
	{
		/*
			函数调用，函数定义
		*/	
		json.jsonp=json.jsonp || 'callback';
		var fnName='jsonp'+Math.random().replace('.','');
		json.data[json.jsonp]=fnName;
		var oS=document.createElement('script');
		oS.src=json.url+'?'+json2url(json.data);
		var oHead=document.getElementByTagName('head')[0];
		oHead.appendChild(oS);
		
		window[fnName]=function (data){
			json.success && json.success(data);
			oHead.removeChild(oS);
		};
	}
	
	
	
	timer=setTimeout(function (){
		json.error && json.error('网络超时');
		oAjax.onreadystatechange=null;
	},json.timeout);
	
	// 1. 创建
	if(window.XMLHttpRequest)
	{
		var oAjax=new XMLHttpRequest();
	}
	else
	{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	// 2. 打开 3. 发送
	switch(json.type.toLowerCase())
	{
		case 'get':
			console.log(json.url+'?'+json2url(json.data));
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json2url,true);
			oAjax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	
	// 网络加载
	json.fnLoading && json.fnLoading();
	
	// 4. 接收
	oAjax.onreadystatechange=function (){
		if(oAjax.readyState==4)
		{
			clearTimeout(timer);
			// 接受了
			json.complete && json.complete();
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				// 是不是xml
				if(json.dataType.toLowerCase() =='xml')
				{
					json.success && json.success(oAjax.responseXML);
				}
				else
				{
					json.success && json.success(oAjax.responseText);	
				}
			}	
			else
			{
				json.error && json.error(oAjax.status);	
			}
		}	
	};
}

function json2url(json)
{
	json.t=Math.random();
	var arr=[];
	
	for(var name in json)
	{
		arr.push(name+'='+json[name]);	
	}
	
	return arr.join('&');
}

// move 运动
function move(obj, json, options)
{
	// 处理可选参数
	options=options || {};
	options.duration=options.duration || '3000';
	options.easing=options.easing || 'linear';
	
	// start+dis*n/count;
	var start={};
	var dis={};
	var count=Math.floor(options.duration/30);
	var n=0;
	
	for(var name in json)
	{
		start[name]=parseInt(getStyle(obj, json[name]));
		// 如果没有写初始值 那么 start 就是NaN
		if(isNaN(start[name]))
		{
			switch(name)
			{
				case 'left':
					start[name]=obj.offsetLeft;
					break;
				case 'top':
					start[name]=obj.offsetTop;
					break;
				case 'width':
					start[name]=obj.offsetWidth;
					break;	
				case 'height':
					start[name]=obj.offsetHeight;
					break;
				case 'opacity':
					start[name]=1;
					break;
			}	
		}
		dis[name]=parseInt(json[name])-start[name];
	}
	
	// 动
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		n++;
		
		// 运动起来
		for(var name in json)
		{
			switch(options.easing)
			{
				case 'linear':
					var a=n/count;
					var cur=start[name]+dis[name]*a;
					break;
				case 'easing-in':
					var a=n/count;
					var cur=start[name]+dis[name]*Math.pow(a,3);
					break;
				case 'easing-out':

					var a=1-n/count;
					var cur=start[name]+dis[name]*(1-Math.pow(a,3));
					break;
			}	
			
			if(json[name]=='opacity')
			{
				obj.style[name]=cur;
				obj.style.filter='alpha(opacity:'+cur*100+')';
			}
			else
			{
				obj.style[name]=cur+'px';	
			}
		}
		
		// 停
		if(n==count)
		{
			clearInterval(obj.timer);	
			options.complete && options.complete.call(obj);
		}	
	}, 30);
}

// addEvent 事件绑定
function addEvent(obj,sEv,fn)
{
	if(obj.addEventListener)
	{
		obj.addEventListener(sEv,function (ev){
			var oEvent=ev || event;
			if(fn.call(obj,oEvent)==false)
			{
				// 阻止冒泡
				oEvent.cancelBubble=true;
				// addEventListener 阻止默认事件 preventDefalut
				oEvent.preventDefault();	
			}
		},false);
	}
	else
	{
		// attachEvent 中this问题
		obj.attachEvent('on'+sEv,function (ev){
			var oEvent=ev || event;
			if(fn.call(obj,oEvent)==false)
			{
				// 阻止冒泡
				oEvent.cancelBubble=true;
				return false;	
			}
		});
	}
}

// getStyle 获取当前样式
function getStyle(obj,sName)
{
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}

/*------------------选择器start--------------------*/
// getByClass 通过 class 获取一组元素
function getByClass(oParent, sClass)
{
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);	
	}
	else
	{
		var reg=new RegExp('\\b'+sClass+'\\b');	
		var aChild=[];
		var aElem=oParent.getElementsByTagName('*');
		
		for(var i=0; i<aElem.length; i++)
		{
			if(reg.test(aElem[i].className))
			{
				aChild.push(aElem[i]);	
			}	
		}
		
		return aChild;
	}
}

// getByStr 在父级下获取到有 str 的元素，选择器
// #box .red ul
function getByStr(aParent, str)
{
	var aChild=[];
	
	for(var i=0; i<aParent.length; i++)
	{
		switch(str.charAt(0))
		{
			case '#':
				// 通过 id 获取元素
				var obj=document.getElementById(str.substring(1));
				aChild.push(obj);
				break;
			case '.':
				// 通过 class 获取元素, 在每一个 parent
				var aElem=getByClass(aParent[i],str.substring(1));
				
				for(var i=0; i<aElem.length; i++)
				{
					aChild.push(aElem[i]);	
				}
				break;
			default:
				// 以标签开头的
				if(/\w+:\w+(\(\d+\))?/.test(str)) // 伪类 li:first li:eq(2)
				{
					var arr=str.split(/:|\(|\)/); // li,first, 或者 li,eq,2,
					// 通过标签获取元素 
					var aElem=aParent[i].getElementsByTagName(arr[0]);
					// 找到不同的伪类代表的元素
					switch(arr[1])
					{
						case 'first':
							aChild.push(aElem[0]);
							break;
						case 'last':
							aChild.push(aElem[aElem.length-1]);
							break;
						case 'eq':
							aChild.push(aElem[arr[2]]);
							break;
						case 'lt':
							for(var j=0; j<arr[2]; j++)
							{
								aChild.push(aElem[j]);	
							}
							break;
						case 'gt':
							for(var j=parseInt(arr[2])+1; j<aElem.length; j++)
							{
								aChild.push(aElem[j]);
							}
							break;
						case 'odd':
							for(var j=1; j<aElem.length; j+=2)
							{
								aChild.push(aElem[j]);	
							}
							break;
						case 'even':
							for(var j=0; j<aElem.length; j+=2)
							{
								aChild.push(aElem[j]);	
							}
							break;	
					}	
				}
				else if(/\w+\.\w+/.test(str)) // li.red
				{
					var arr=str.split('.');
					var aElem=aParent[i].getElementsByTagName(arr[0]);
					// 每一个元素的 class 与 arr[1]相比较
					var reg=new RegExp('\\b'+arr[1]+'\\b');
					for(var j=0; j<aElem.length; j++)
					{
						if(reg.test(aElem[j].className))
						{
							// 有的拿出来
							aChild.push(aElem[j]);	
						}	
					}
				}
				else if(/\w+\[\w+=\w+\]/.test(str)) // input[type=button]
				{
					var arr=str.split(/\[|=|\]/);
					var aElem=aParent[i].getElementsByTagName(arr[0]);
					//通过属性值来找元素
					for(var j=0; j<aElem.length; j++)
					{
						// 注意有 自定义属性
						if(aElem[j].getAttribute(arr[1])==arr[2])
						{
							// 有就找出来
							aChild.push(aElem[j]);
						}
					}
				}
				else
				{
					// 纯碎的 标签 如ul
					var aElem=aParent[i].getElementsByTagName(str);
					for(var j=0; j<aElem.length; j++)
					{
						aChild.push(aElem[j]);	
					}	
				}
				break;	
		}	
	}
	
	return aChild;
}

// getElem 获取元素，选择器
function getElem(str,aParent)
{
	// 处理字符串，拿到每一个 class
	var arr=str.replace(/^\s+|\s+$/g,'').split(/\s+/);
	// 有一个默认的父级 document
	var aParent=aParent || [document];
	// 每次的结果都是下一次的父级
	var aResult=[];
	
	for(var i=0; i<arr.length; i++)
	{
		aResult=getByStr(aParent, arr[i]);
		
		aParent=aResult;
	}
	
	return aResult;
}
/*------------------选择器end--------------------*/

// ready 页面加载
function ready(fn)
{
	if(document.addEventListener)
	{
		// 高级
		document.addEventListener('DOMContentLoaded',fn,false);
	}
	else
	{
		// IE系列
		document.attachEvent('onreadystatechange',function (){
			if(document.readyState=='complete')
			{
				fn && fn();	
			}	
		});
	}
}

/*==============封装函数end==================*/


