function json2url(json){
	json.t=Math.random();
	
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	json=json || {};
	if(!json.url)return;
	json.data=json.data || {};
	json.type=json.type || 'get';
	
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	
	switch(json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET',json.url+'?'+json2url(json.data),true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST',json.url,true);
			oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	
	//网络中
	json.fnLoading && json.fnLoading();
	
	
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			
			json.complete && json.complete();
			
			if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				if(json.dataType=='xml'){
					json.success && json.success(oAjax.responseXML);	
				}else{
					json.success && json.success(oAjax.responseText);	
				}
			}else{
				json.error && json.error(oAjax.status);	
			}
		}	
	};
}











