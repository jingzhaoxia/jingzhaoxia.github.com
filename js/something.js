'use strict';
$(function (){
	;(function (){
		var data=[
			{
				'title':'模拟苹果菜单',
				'href':'',
				'img':'',
				'simple':''
			},
			{
				'title':'翻面效果',
				'href':'',
				'img':'',
				'simple':''
			},
			{
				'title':'模拟拉勾网',
				'href':'',
				'img':'',
				'simple':''
			},
			{
				'title':'3D图片环',
				'href':'',
				'img':'',
				'simple':''
			},
			{
				'title':'照片墙',
				'href':'',
				'img':'',
				'simple':''
			}
		];
		
		var oUl=$('#s-show-list');
		var aLi=oUl.children();	
		var oLeft=$('#s-left');
		var oRight=$('#s-right');
		
		// 放内容
		
		
		// 存class
		var aClass=[];
		aLi.each(function (index){
			aClass.push($(this).attr('class'));	
		});		
		
		// 左边
		oLeft.on('click',function (){
			aClass.unshift(aClass.pop());
			_class();
		});
		
		// 右边
		oRight.on('click',function (){
			aClass.push(aClass.shift());
			
			_class();
		});
		
		function _class()
		{
			aLi.each(function (index){
				$(this).attr('class',$(aClass).eq(index)[0]);	
			});	
		}
	})();	
});






















