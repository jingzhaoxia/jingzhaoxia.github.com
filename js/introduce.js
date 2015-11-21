'use strict';
// 项目经验
function introduce()
{
	var data=[
		{
			'titName':'项目名称',
			'title':'中关村互联网金融服务中心',
			'cycName':'项目周期',
			'cycle':'1周',
			'toolName':'项目工具',
			'tool':'Adobe Dreamweaver、SVN',
			'desName':'项目描述',
			'describe':[
						'根据客户需求与psd设计图按照命名规范、模块化等思想编写静态布局。',
						'使用jQuery与插件等实现网页效果。其中时间轴巧妙的运用浮动与DOM操作。使用命名空间避免重名问题，同时将公共部分封装重用。',
						'使用SVN管理项目，做到分工协作、及时沟通问题。'
						]

		},
		{
			'titName':'项目名称',
			'title':'河南省部门数据查询系统',
			'cycName':'项目周期',
			'cycle':'2个月',
			'toolName':'项目工具',
			'tool':'eclipse、SVN、weblogic、oracle',
			'desName':'项目描述',
			'describe':[
						'根据客户需求与设计图按照W3C规范编写静态布局。',
						'使用JavaScript实现网页效果。使用AJAX和JSON与后台交互数据。',
						'使用SVN更新程序，并与测试沟通修改页面bug。',
						'在项目中与后台、测试、设计等及时沟通，提高团队协作能力。'	
						]
		},
		{
			'titName':'项目名称',
			'title':'河南省部门数据查询系统后台管理',
			'cycName':'项目周期',
			'cycle':'2个月',
			'toolName':'项目工具',
			'tool':'eclipse、SVN、weblogic、oracle',
			'desName':'项目描述',
			'describe':[
						'按照W3C规范在JAZZ框架（公司内部组件）基础上还原设计图，并且考虑HTML结构的重用。',
						'根据jQuery内部代码实现的原理，使用JAZZ框架实现页面效果。',
						'使用AJAX和JSON实现与后台交互。其中使用zTree插件实现手风琴的树结构。',
						'在项目中与后台、测试、设计和组件开发人员及时沟通，最大还原设计图效果。'	
						]
		},
		{
			'titName':'项目名称',
			'title':'浙江统计数据',
			'cycName':'项目周期',
			'cycle':'2个月',
			'toolName':'项目工具',
			'tool':'eclipse、SVN、weblogic、oracle',
			'desName':'项目描述',
			'describe':[
						'根据客户需求将原有旧版的网页修改为设计图。',
						'使用JavaScript实现页面效果。其中通过AJAX请求后台数据使用zTree插件以文档树结构展示数据。',
						'使用SVN管理工具更新程序，并将程序更新到服务器为测试准备。',
						'通过远程为客户在linux系统上用webologic服务器、oracle数据库部署程序。'	
					]
		}
	];
	var iNow=window.location.hash.substring(1);
	if(iNow!=1)
	{
		return;	
	}
	_introduce();
	function _introduce()
	{
		var oBox=document.querySelector('#i-box');
		oBox.innerHTML='';
		for(var i=0; i<data.length; i++)
		{
			var oTable=document.createElement('table');
			oTable.classList.add('i-show');
			oTable.cellspacing=0;
			oTable.cellpadding=0;
			oTable.dataset.index=i;
			oBox.appendChild(oTable);
		}
		
		var aTable=oBox.children;
		var iNow=0;
		aTable[iNow].classList.add('active');
		aTable[iNow].classList.add('animated');
		aTable[iNow].classList.add('bounce');
		_table(aTable[iNow],iNow);
		var oNext=document.querySelector('#i-next');
		
		// 下一个
			oNext.onclick=function (){
				for(var i=0; i<aTable.length; i++)
				{
					aTable[i].classList.remove('active');
					aTable[i].classList.remove('animated');
					aTable[i].classList.remove('bounce');
				}	
				iNow++;
				if(iNow>=aTable.length) iNow=0;
				_table(aTable[iNow],iNow);
				aTable[iNow].classList.add('animated');
				aTable[iNow].classList.add('bounce');
				aTable[iNow].classList.add('active');
			};

		
		function _des(arr)
		{
			var oUl=document.createElement('ul');
			for(var i=0; i<arr.length; i++)
			{
				var oLi=document.createElement('li');
				oLi.innerHTML='<em>'+(i+1)+'、</em>'+arr[i];
				oUl.appendChild(oLi);
			}
			return oUl.innerHTML;	
		}
		
		function _table(oTable,i)
		{
			
			oTable.innerHTML='<tr>'+
								'<th class="t-tit-name animated bounceInLeft">'+data[i].titName+'</th>'+
								'<td class="t-tit animated bounceInRight" >'+data[i].title+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th class="t-cycle-name animated bounceInLeft">'+data[i].cycName+'</th>'+
								'<td class="t-cycle animated bounceInRight">'+data[i].cycle+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th class="t-tool-name animated bounceInLeft">'+data[i].toolName+'</th>'+
								'<td class="t-tool animated bounceInRight">'+data[i].tool+'</td>'+
							'</tr>'+
							'<tr>'+
								'<th class="t-des-name t-bottom animated bounceInLeft ">'+data[i].desName+'</th>'+
								'<td class="t-des animated bounceInRight" ><ul>'+_des(data[i].describe)+'</ul></td>'+
							'</tr>';
		
		}
	}
}


























