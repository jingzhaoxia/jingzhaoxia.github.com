'user strict';
/* 视频控制 */

/**
 *  视频控制
 */
function Video()
{
	this.videoBox=document.querySelector('.video-box');
	this.oV=this.videoBox.querySelector('.video-play .video');
	
	// 控制按钮
	this.oPlay=document.getElementById('play');
	this.oPause=document.getElementById('pause');
	this.oStop=document.getElementById('stop');
	this.oNext=document.getElementById('next');
	this.oPrev=document.getElementById('prev');
	this.time=5; // 快进、快退时间
	
	this.aBar=[];
	this.aBtn=[];	
	this.scale=0; 
	
	// 进度条
	this.oProgress=this.videoBox.querySelector('.progress');
	this.oProgressBar=this.oProgress.querySelector('.progress-bar');
	this.oProgressBtn=this.oProgressBar.querySelector('.progress-btn');
	
	// 时间
	this.oDuration=this.videoBox.querySelector('.duration');
	this.oCurrentTime=this.videoBox.querySelector('.current-time');
	
	// 喇叭
	this.oHornBtn=this.videoBox.querySelector('.horn-btn');
	this.oHorn=this.videoBox.querySelector('.horn');
	this.oHornNo=this.videoBox.querySelector('.horn-no');
	
	// 音量
	this.oVolume=this.videoBox.querySelector('.volume');
	this.oVolumeBar=this.oVolume.querySelector('.volume-bar');
	this.oVolumeBtn=this.oVolume.querySelector('.volume-btn');
	this.volumeInit();
		
	this.init();	
}

// 初始化
Video.prototype.init=function (){	
	// 播放
	this.toPlay();
	// 暂停
	this.toPause();
	// 停止
	this.stop();
	// 快进
	this.toNext();
	// 快退
	this.toPrev();
	// 播放进度
	this.playProgress();
	
	// 拖拽播放
	this.dragProgress();
	// 点击调整进度
	this.clickProgress();	
	// 总时间
	this.getDuration();
	// 是否静音
	this.volumeFlag();
	// 拖拽音量
	this.dragVolume();
	// 结束后重新播放
	this.rePlay();
};
// 缓冲好了，存放时间
Video.prototype.onpro=function (){
	
};

// 结束重新播放
Video.prototype.rePlay=function (){
	var _this=this;
	this.oV.onended=function (){
		_this.toPlay();
	};	
};

// 初始音量
Video.prototype.volumeInit=function (){
	this.oVolumeBar.style.width=this.oV.volume*100/8+'%';
};

// 拖拽音量
Video.prototype.dragVolume=function (){
	this.drag(this.oVolumeBtn, this.oVolumeBar);
};

// 调节音量
Video.prototype.volumeFlag=function (){
	var bSign=true;
	var _this=this;
	this.oHornBtn.onclick=function (){
		if(bSign)
		{
			_this.oHornNo.style.display='block';
			_this.oHorn.style.display='none';
			_this.oV.muted=true;
		}
		else
		{
			_this.oHornNo.style.display='none';
			_this.oHorn.style.display='block';
			_this.oV.muted=false;
		}	
		bSign=!bSign;
	};
};

// 总时间
Video.prototype.getDuration=function (){
	var _this=this;
	this.oV.onprogress=function (){
		_this.oDuration.innerHTML=toDub(parseInt(_this.oV.duration/60))+':'+toDub(parseInt(_this.oV.duration%60));
	};
};

// 点击调整进度
Video.prototype.clickProgress=function (){
	var _this=this;
	this.oProgress.onclick=function (ev){
		_this.scale=(ev.clientX-getPos(_this.videoBox).left)/_this.oProgress.offsetWidth;
		_this.oV.currentTime=_this.scale*_this.oV.duration;
	};
};

// 播放进度
Video.prototype.playProgress=function (){
	var _this=this;

	this.oV.ontimeupdate=function (){
		_this.scale=_this.oV.currentTime/_this.oV.duration;
		_this.oProgressBar.style.width=_this.scale*100+'%';
		// 当前时间
		_this.oCurrentTime.innerHTML=toDub(parseInt(_this.oV.currentTime/60))+':'+toDub(parseInt(_this.oV.currentTime%60));
	};	
};

// 拖拽播放
Video.prototype.dragProgress=function (){
	this.drag(this.oProgressBtn, this.oProgressBar);
};

// 播放
Video.prototype.toPlay=function (){
	var _this=this;
	this.oPlay.onclick=function (){
		_this.oV.play();
		_this.oPlay.style.display='none';	
		_this.oPause.style.display='block';	
	};	
};

// 暂停
Video.prototype.toPause=function (){
	var _this=this;
	this.oPause.onclick=function (){
		_this.oV.pause();
		_this.oPlay.style.display='block';	
		_this.oPause.style.display='none';		
	};	
};

// 停止
Video.prototype.stop=function (){
	var _this=this;
	this.oStop.onclick=function (){
		_this.oV.currentTime=0;
		_this.toPause();	
	};
};

// 快进
Video.prototype.toNext=function (){
	var _this=this;
	this.oNext.onclick=function (){
		_this.oV.currentTime+=_this.time;
	};
};

// 快退
Video.prototype.toPrev=function (){
	var _this=this;
	this.oPrev.onclick=function (){
		_this.oV.currentTime-=_this.time;
	};
};

/*---------------- 拖拽 -----------------------*/
Video.prototype.drag=function (btn, bar){
	this.aBar.push(bar);
	this.aBtn.push(btn);
	var _this=this;
	
	for(var i=0; i<this.aBar.length; i++)
	{
		(function (index){
			_this.aBtn[i].onmousedown=function (ev){
				var oEvent=ev || event;
				_this.fnDown(oEvent,index);
				
				this.setCapture && this.setCapture();
				return false;	
			};	
		})(i);
	}
};

Video.prototype.fnDown=function (oEvent,index){
	this.disX=oEvent.clientX-this.aBtn[index].offsetLeft-this.aBtn[index].offsetWidth;
	var _this=this;
	document.onmousemove=function (ev){
		var oEvent=ev || event;
		_this.fnMove(oEvent,index);
		_this.aBtn[index].releaseCapture && _this.aBtn[index].releaseCapture();
	};
	
	document.onmouseup=function (){
		_this.fnUp();
	};
};

Video.prototype.fnMove=function (oEvent,index){
	var l=oEvent.clientX-this.disX;
	var scale=l/this.aBar[index].parentNode.offsetWidth;
	scale>=1 && (scale=1);
	scale<=0 && (scale=0);
	this.aBar[index].style.width=scale*100+'%';
	// 如果是音量
	if(this.aBar[index] == this.oVolumeBar)
	{
		this.oV.volume=scale;
	}
	else if(this.aBar[index] == this.oProgressBar)
	{
		this.oV.currentTime=scale*this.oV.duration;	
	}
};

Video.prototype.fnUp=function (){
	document.onmousemove=null;
	document.onmouseup=null;
};