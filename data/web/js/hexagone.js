window.onload=function (){
	document.documentElement.style.fontSize=document.documentElement.clientWidth/16+'px';
	
	var oLeft=document.querySelector('.prev');
	var oRight=document.querySelector('.next');
	
	var aDiv=document.querySelectorAll('.home-loop');
	var iNow=0;
	
	oLeft.addEventListener('touchstart',function (){
		for(var i=0; i<aDiv.length; i++)
		{
			aDiv[i].classList.remove('active');
		}
		iNow--;
		if(iNow<0)
		{
			iNow=aDiv.length-1;
		}
		aDiv[iNow].classList.add('active');
	},false);
	oRight.addEventListener('touchstart',function (){
		for(var i=0; i<aDiv.length; i++)
		{
			aDiv[i].classList.remove('active');
		}
		iNow++;
		if(iNow>aDiv.length-1)
		{
			iNow=0;
		}
		aDiv[iNow].classList.add('active');
	},false);
};

