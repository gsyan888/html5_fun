//=======================================================
//以下為執行程式,不需要修改
//=======================================================
//
//HTML5 FUN 的主程式路徑
var moduleScripts = {
  lotto:"https://gsyan888.github.io/html5_fun/html5_lotto/lotto.js"
};
//取得HTML5 FUN 程式的網址
var moduleName = document.getElementById('injectionJS').getAttribute('moduleName');
if(typeof(moduleName)!='undefined' && moduleName!=null) {	
  if(moduleScripts[moduleName]) {
	HTML5FunScript = moduleScripts[moduleName];
  } else  {
	HTML5FunScript = null;
  }
}
//是否自動進入遊戲的參數
var autoStart = document.getElementById('injectionJS').getAttribute('autoStart');
if(typeof(autoStart)!='boolean') {
  if(typeof(autoStart)=='string') {
	 autoStart = autoStart.toLowerCase();	 
	 autoStart = autoStart=='1' || autoStart=='true' || autoStart=='y';
  } else {
	autoStart = false;
  }
}
//
/**
* 載外部的 .js , 並執行 callback 的指令
* @private
*/
loadExternalScript = function(scriptSrc, callback)  {
  var nocacheVal = '?nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
  var scriptToAdd = document.createElement('script');  //建立一個 scriptElement  
  scriptToAdd.setAttribute('type','text/javascript');
  scriptToAdd.setAttribute('charset','utf-8');
  scriptToAdd.setAttribute('src', scriptSrc + nocacheVal);	//避免 cache 時用的
  //scriptToAdd.setAttribute('src', scriptSrc);
  //載入成功時
  scriptToAdd.onload = scriptToAdd.onreadystatechange = function() {
	 if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
		scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
		document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//將變數載入後移除 script
		if( typeof callback == 'function' ) {
		   callback(true);	//執行指定的函數
		}
	 };
  };
  //無法載入時, 將設定用預設值
  scriptToAdd.onerror = function() {
	 scriptToAdd.onerror = null;	//將事件移除
	 //document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//移除 script
	 if( typeof callback == 'function' ) {
		callback(false);	//執行指定的函數
	 }
  }
  //在 head 的最前頭加上前述的 scriptElement
  var docHead = document.getElementsByTagName("head")[0];
  docHead.insertBefore(scriptToAdd, docHead.firstChild);
};
//載入的程序
injection = function() {
  //新增的 div id
  const id = {HTML5FunWrapper:'HTML5FunWrapper', HTML5FunEmbeded:'HTML5FunEmbeded'};

  //先檢查模組是否存在
  if(HTML5FunScript==null) {
	console.log('HTML5FunScript not found.');
	return false;
  }
  
  //The wrapper
  if(!document.getElementById(id.HTML5FunWrapper)) {
	var HTML5FunWrapper = document.createElement("div");
	var style = 'background:#F8F9F9;position:fixed;height:100%;width:100%;left: 0;top: 0;z-index:10000;visibility:visible;';
	HTML5FunWrapper.id = id.HTML5FunWrapper;
	HTML5FunWrapper.setAttribute("style", style);
	//HTML5FunWrapper.style.overflow = 'hidden';
	//document.body.insertBefore(HTML5FunWrapper, document.body.firstChild);
	document.body.appendChild(HTML5FunWrapper);
	//
	//
	if(!document.getElementById(id.HTML5FunEmbeded)) {
	  var HTML5FunEmbeded = document.createElement("div");
	  HTML5FunEmbeded.id = id.HTML5FunEmbeded;
	  HTML5FunEmbeded.setAttribute("style",'position:absolute;top:0;right:0;bottom:0;left:0;');
	  HTML5FunWrapper.appendChild(HTML5FunEmbeded);
	}
  }
  //load script and call start function
  if(document.getElementsByClassName('lime-director').length<=0) {
	loadExternalScript(HTML5FunScript, function(success) {
      if(success) {
		gameStart();
		//lotto.start();
	  } else {
	    //恢復捲軸的功能
		window.onscroll=null;
		var timeCount = 3;
		var msg = '載入失敗';
		HTML5FunEmbeded.style.color = 'red';
		HTML5FunEmbeded.innerHTML = '<h1>'+msg+'<h1>'+timeCount;
		var intervalID = setInterval(function() {
		  if(timeCount<=0) {
		    clearInterval(intervalID);
			HTML5FunEmbeded.remove();
			HTML5FunWrapper.remove();
			HTML5FunEmbeded = null;
			HTML5FunWrapper = null;
		  } else {
			HTML5FunEmbeded.innerHTML = '<h1>'+msg+'<h1>'+(timeCount-1);
		  }
		  timeCount--;
		},1000);
	  }
	});
  } else {
	gameStart(true);
  }	  
};
gameStart = function() {
  //
  //var HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
  //removeChild(HTML5FunEmbeded);
  //
  //啟動遊戲
  if(typeof(window[moduleName])!='undefined' && typeof(window[moduleName].start)=='function') {
    //先將捲軸捲到最上方，以免無法進行按下的動作
	window.scrollTo(0,0);
	//禁用捲軸的功能
	window.onscroll = function () { window.scrollTo(0, 0); };
	//執行 xxx.start
	window[moduleName].start();
	//讓遊戲全畫面
	document.body.style.overflow = 'hidden';
	//
	//右上角加一個關閉的按鈕
	var HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
	var closeBtn = document.createElement('div')
	closeBtn.id = 'closeBtn';
	closeBtn.setAttribute('style', 'position:absolute;top:0;right:0;');
	var style = 'float:right;font-size:1.5em;font-family: Garamond, "Apple Garamond"; display:inline-block;padding:0px 4px 0px 4px; background:#D5F5E3;';
	closeBtn.innerHTML="<span id='close' onclick='closeApp(); return false;' style='"+style+"'>&times;</span>";
	HTML5FunEmbeded.firstChild.appendChild(closeBtn);
	//
	//將遊戲放到最上層
	var HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
	if(typeof(HTML5FunWrapper)!='undefined' && HTML5FunWrapper!=null) {
	  HTML5FunWrapper.style['z-index'] = 10000;
	  HTML5FunWrapper.style.visibility = "visible";
	}
  }
}
//
//關閉遊戲的畫面
closeApp = function(label) {
  //移除右上角的關閉按鈕
  try {
	document.getElementById('closeBtn').remove();
  } catch(error) {  };
  //移除
  removeHTML5FunEmbeded();
}
//
//刪除指定元件內所有的 child nodes
removeChild = function(node) {
  var last;
  while (last = node.lastChild) node.removeChild(last);
}
//
//刪除 HTML5 FUN 遊戲的元件
//恢復網頁原有的功能
removeHTML5FunEmbeded = function() {
  //執行 xxx.stop
  if(typeof(window[moduleName])!='undefined' && typeof(window[moduleName].stop)=='function') {
	window[moduleName].stop();
  }
  //
  var HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
  try {
	//移除 HTML5FunEmbeded 中的所有元件
	removeChild(HTML5FunEmbeded);
  } catch(error) {    };
  var HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
  try {
	//隠藏HTML5FunWrapper
    HTML5FunWrapper.style.visibility = "hidden";
  } catch(error) {    };
  //恢復捲軸的功能  
  window.onscroll=null;
  //重新顯示原有的內容
  document.body.style.overflow = '';
}
//
//在畫面 playButton 新增一個 PLAY 的按鈕
createPlayButton = function() {
  //先檢查模組是否存在	
  if(HTML5FunScript==null) {
	console.log('HTML5FunScript not found.');
	return false;
  }
  //新增按鈕
  var playButton = document.getElementById('playButton');
  if(typeof(playButton)=='undefined' || playButton==null) {
    var playButton = document.createElement('div');
	playButton.id = 'playButton';
	var settingJS = document.getElementById("settingJS");
	if(typeof(settingJS)!='undefined' && settingJS!=null) {
	  settingJS.parentNode.insertBefore(playButton, settingJS);
	} else {
	  document.body.appendChild(playButton);
	}
  }
  playButton.innerHTML = `
	<center>
	<p>&nbsp;</p>
	<p><button onclick="injection()" type="button">PLAY</button></p>
  `;	
}
//
//自動載入就執行 injection , 否則就新增一個 PLAY 按鈕
if(autoStart) {
  injection();
} else {
  createPlayButton();
}
//
//=======================================================
//程式結束
//======================================================= 
 