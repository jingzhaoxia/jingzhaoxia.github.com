'use strict';
// 地图
$(function (){
	;(function (){
		//1. 创建地图
		var map = new BMap.Map("c-map");
		
		//2. 标注位置 116.290254, 40.149322
		var point=new BMap.Point(116.298804, 40.159802);
		
		//3. 显示到地图上
		map.centerAndZoom(point,15);
		
		//4. 添加标记物
		var marker=new BMap.Marker(point);
		map.addOverlay(marker);	

		//开启鼠标缩放地图
		map.enableScrollWheelZoom(true);
		  	
	})();	
});
















