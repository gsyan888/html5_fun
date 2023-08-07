/**
 * @fileoverview
 * - HTML5 FUN embeded 用的載入工具
 * - update 2022.11.06 21:21:00 
 * - update 2023.05.16 22:30:00
 * 
 * @author gsyan 顏國雄
 * @see <a href="https://gsyan888.blogspot.com/" target="_blank">https://gsyan888.blogspot.com/</a>
 */
//=======================================================
//以下為執行程式,不需要修改
//=======================================================
//
//HTML5 FUN 的主程式路徑
var moduleScripts = {
  lotto:{
    src:"https://gsyan888.github.io/html5_fun/html5_lotto/lotto.js",
    name:"樂透摸彩機"
  },
  spelling:{
    src:"https://gsyan888.github.io/html5_fun/html5_spelling/spelling.js",
    name:"單字高手"
  },
  english1200:{
    src:"https://gsyan888.github.io/html5_fun/html5_english1200/english1200.js",
    name:"English1200"
  },
  basketball:{
    src:"https://gsyan888.github.io/html5_fun/html5_basketball/basketball.js",
    name:"投籃高手"
  },  
  baseball:{
    src:"https://gsyan888.github.io/html5_fun/html5_baseball/baseball.js",
    name:"王牌投手"
  },  
 
  bubble:{
    src:"https://gsyan888.github.io/html5_fun/html5_bubble/bubble.js",
    name:"戳泡泡Bubble"
  },
  card_flip:{
    src:"https://gsyan888.github.io/html5_fun/html5_card_flip/card_flip.js",
    name:"大家一起來"
  },
  crossword: {
    src:"https://gsyan888.github.io/html5_fun/html5_crossword/crossword.js",
    "name": "填字遊戲"
  },
  football:{
    src:"https://gsyan888.github.io/html5_fun/html5_football/football.js",
    name:"足球高手"
  }, 
  frog:{
    src:"https://gsyan888.github.io/html5_fun/html5_frog/frog.js",
    name:"青蛙過河"
  }, 
  speaking:{
    src:"https://gsyan888.github.io/html5_fun/html5_speaking/speaking.js",
    name:"Speaking"
  },
  phonetics_quiz:{
    src:"https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/phonetics_quiz.js",
    name:"注音高手"
  },
  pk:{
    src:"https://gsyan888.github.io/html5_fun/html5_pk/pk.js",
    name:"PK大賽"
  },
  pk2:{
    src:"https://gsyan888.github.io/html5_fun/html5_pk2/pk2.js",
    name:"PK2"
  },  
  sentence:{
    src:"https://gsyan888.github.io/html5_fun/html5_sentence/sentence.js",
    name:"造句靈感產生器"
  },
  shark:{
    src:"https://gsyan888.github.io/html5_fun/html5_shark/shark.js",
    name:"搶救公主",
	style: "background:#00bbff !important;background:-webkit-gradient(radial, 50% 50%, 10, 50% 50%, 850, from(#99ffff), to(#2f5c1b), color-stop(.6,#00bbff))  !important;background: -moz-radial-gradient(center 45deg, circle farthest-side, #99ffff 0%, #00bbff 60%, #2f5c1b 100%) !important;"
  },  
  bingo:{
    src:"https://gsyan888.github.io/html5_fun/html5_bingo/bingo.js",
    name:"BINO賓果"
  },
  charades:{
    src:"https://gsyan888.github.io/html5_fun/html5_charades/charades.js",
    name:"我說你猜"
  },
  listening:{
    src:"https://gsyan888.github.io/html5_fun/html5_listening/listening.js",
    name:"聽音辨字"
  },
  ghost:{
    src:"https://gsyan888.github.io/html5_fun/html5_ghost/ghost.js",
    name:"打鬼特攻隊"
  },  
  match:{
    src:"https://gsyan888.github.io/html5_fun/html5_match/match.js",
    name:"對對碰"
  },
  monster: {
    src:"https://gsyan888.github.io/html5_fun/html5_monster/monster.js",
    "name": "大嘴Monster"
  },
  unscramble: {
    src:"https://gsyan888.github.io/html5_fun/html5_unscramble/unscramble.js",
    "name": "重組遊戲"
  },
  gomoku: {
    src:"https://gsyan888.github.io/html5_fun/html5_gomoku/gomoku.js",
    "name": "漢字五子棋"
  },
  poke: {
    src:"https://gsyan888.github.io/html5_fun/html5_poke/poke.js",
    "name": "戳戳樂"
  },
  wheel: {
    src:"https://gsyan888.github.io/html5_fun/html5_wheel/wheel.js",
    "name": "幸運轉輪"
  },
  "math_whiteboard": {
    src:"https://gsyan888.github.io/html5_fun/html5_math/math.whiteboard.js",
    "name": "數學小白板"
  },
};


//取得網址中的某一個參數(已編碼過的)
getUrlParam = function( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null )    return "";  
	else    return results[1];
}

var customStyle = null;

//取得HTML5 FUN embed 模組名稱參數
var moduleName = document.getElementById('injectionJS').getAttribute('moduleName');

if(typeof(moduleName)!='undefined' && moduleName!=null) {	
  //本機偵錯用，將程式路徑改為 ../XXX/html5_XXX/XXX.js
  if(typeof(debug)!='undefined' && debug!=null && debug && typeof(moduleName)=='string') {
    console.log(`debug: ${debug}`);
    var src = `../${moduleName}/html5_${moduleName}/${moduleName}.js`;
    if(typeof(moduleScripts[moduleName])=='undefined' || moduleScripts[moduleName]==null) {
	  moduleScripts[moduleName] = {name:moduleName.toUpperCase()};
    }
    moduleScripts[moduleName].src = src;
  }

  //取得HTML5 FUN 程式的網址
  if(moduleScripts[moduleName]) {
	
	HTML5FunScript = moduleScripts[moduleName].src;
	
	if(typeof(moduleScripts[moduleName].style)!='undefined' && moduleScripts[moduleName].style!=null) {
		customStyle = moduleScripts[moduleName].style;
	}
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
//試著由網址中取得 autoStart 的參數
var autoStartURI = getUrlParam('autoStart').toLowerCase();
if(autoStartURI!='') {
  if(autoStartURI=='true') {
    autoStart = true;
  } else if(autoStartURI=='false') {
    autoStart = false;
  }
}

//取得背景顏色的參數
var wrapperBackground = document.getElementById('injectionJS').getAttribute('background');
if(typeof(wrapperBackground)=='undefined' || wrapperBackground==null) {
	//wrapperBackground = '#F8F9F9';
	wrapperBackground = '#ffffff';
}
//取得額外 style 自串的參數
var wrapperStyle = document.getElementById('injectionJS').getAttribute('style');
if(typeof(wrapperStyle)=='undefined' || wrapperStyle==null) {
  if(typeof(customStyle)!='undefined' && customStyle!=null) {
	wrapperStyle = customStyle;
  } else {
	wrapperStyle = '';
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
  //讓 play button lost focus : 呼叫 blur(), 以免按空白鍵也觸發
  var elm = document.getElementById('playButton');
  if(typeof(elm)!='undefined' && elm!=null) {
    var btn = elm.getElementsByTagName('button');
    if(typeof(btn)!='undefined' && btn!=null && btn.length>0) {
      btn[0].blur();
    }
  }
  //避免短時間內連續執行，有發現重覆執行就暫停 double check (照說 blur() 就有效了)
  if(typeof(window['injectionEnable']) == 'undefined' || window['injectionEnable']==null) {
    window['injectionEnable'] = true;
	window['injectionEnableTimeout'] = setTimeout(function(){delete window['injectionEnable']; console.log('duplication check end.');}, 1000);
  } else {
	//清掉前一次的，重新計算時間
	clearTimeout(injectionEnableTimeout);
	window['injectionEnableTimeout'] = setTimeout(function(){delete window['injectionEnable']; console.log('duplication check end.');}, 1000);
	console.log('duplicatly run , wait a moment.');
	return;
  }
  
   //先將捲軸捲到最上方，以免無法進行按下的動作
  window.scrollTo(0,0);
  //
  //新增的 div id
  const id = {HTML5FunWrapper:'HTML5FunWrapper', HTML5FunEmbeded:'HTML5FunEmbeded'};

  //先檢查模組是否存在
  if(HTML5FunScript==null) {
	console.log('HTML5FunScript not found.');
	return false;
  }
  
  //The wrapper
  if(!document.getElementById(id.HTML5FunWrapper)) {
	HTML5FunWrapper = document.createElement("div");
	var style = 'background:'+wrapperBackground+';position:fixed;height:100%;width:100%;left: 0;top: 0;z-index:99999999;visibility:visible;'+wrapperStyle;
	HTML5FunWrapper.id = id.HTML5FunWrapper;
	HTML5FunWrapper.setAttribute("style", style);
	//HTML5FunWrapper.style.overflow = 'hidden';
	//document.body.insertBefore(HTML5FunWrapper, document.body.firstChild);
	document.body.appendChild(HTML5FunWrapper);
	//
	//
	if(!document.getElementById(id.HTML5FunEmbeded)) {
	  HTML5FunEmbeded = document.createElement("div");
	  HTML5FunEmbeded.id = id.HTML5FunEmbeded;
	  HTML5FunEmbeded.setAttribute("style",'position:absolute;top:0;right:0;bottom:0;left:0;');
	  HTML5FunWrapper.appendChild(HTML5FunEmbeded);
	}
  }
  //load script and call start function
  if(document.getElementsByClassName('lime-director').length<=0) {
	loadExternalScript(HTML5FunScript, function(success) {
      if(success) {
		if(document.getElementsByClassName('lime-director').length<=0) {
			console.log('HTML5FunScript load success');
			gameStart();
		}
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
	console.log('restart');
	gameStart(true);
  }
	//  else {
	//  	var el = document.getElementsByClassName('lime-director')[0];
	//	var elClone = document.getElementsByClassName('lime-director')[1];
	//	el.parentNode.replaceChild(elClone, el);
	//	console.log('number of lime-director total : '+document.getElementsByClassName('lime-director').length);
	//  }
};
gameStart = function() {
  //
  //HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
  //removeChild(HTML5FunEmbeded);
  //
  //啟動遊戲
  if(typeof(window[moduleName])!='undefined' && typeof(window[moduleName].start)=='function') {
    //先將捲軸捲到最上方，以免無法進行按下的動作
	window.scrollTo(0,0);
	//禁用捲軸的功能
	window.onscroll = function () { window.scrollTo(0, 0); };
	//讓遊戲全畫面
	document.body.style.overflow = 'hidden';
	//執行 xxx.start
	window[moduleName].start();
	//
	//右上角加一個關閉的按鈕
	HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
	var closeBtn = document.createElement('div')
	closeBtn.id = 'closeBtn';
	closeBtn.setAttribute('style', 'position:absolute;top:0;right:0;z-index:9998;');
	var style = 'float:right;font-size:1.5em;font-family: Garamond, "Apple Garamond"; display:inline-block;padding:0px 4px 0px 4px; background:#D5F5E3;opacity:0.5;';
	closeBtn.innerHTML="<span id='close' ontouchstart='closeApp(event)' onmousedown='closeApp(event)' style='"+style+"'>&times;</span>";
	HTML5FunEmbeded.firstChild.appendChild(closeBtn);
	//
	//將遊戲放到最上層
	HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
	if(typeof(HTML5FunWrapper)!='undefined' && HTML5FunWrapper!=null) {
	  HTML5FunWrapper.style['z-index'] = 99999999;
	  HTML5FunWrapper.style.visibility = "visible";
	}
  } else {	  
	removeHTML5FunEmbeded();
	console.log('程式執行失敗!');
  }
}
//
//關閉遊戲的畫面
closeApp = function(e) {
  e.preventDefault();
  //移除右上角的關閉按鈕
  try {
	document.getElementById('closeBtn').remove();
  } catch(error) {  };
  //移除
  removeHTML5FunEmbeded();
  
  /* 如果有設定關閉後要執行的程序, 就執行 */
  if(typeof(callbackAfterClosed)=='function') {
    callbackAfterClosed();
  }
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
  //remove children of lime-scene
  var nTotal = document.getElementsByClassName('lime-scene').length;
  for(var i=nTotal-1; i>=0; i--) {
	removeChild(document.getElementsByClassName('lime-scene')[i]);
  }
  //remove children of lime-director
  var nTotal = document.getElementsByClassName('lime-director').length;
  for(var i=nTotal-1; i>=0; i--) {
	removeChild(document.getElementsByClassName('lime-director')[i]);
  }
  //
  HTML5FunEmbeded = document.getElementById("HTML5FunEmbeded");
  try {
	//移除 HTML5FunEmbeded 中的所有元件
	removeChild(HTML5FunEmbeded);
  } catch(error) {    };
  HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
  //remve all elements
  try {
	removeChild(HTML5FunWrapper);
  } catch(error) {  console.log(error);  };
  HTML5FunWrapper.remove();
  HTML5FunEmbeded = null;
  HTML5FunWrapper = null;
  console.log('remove all elements');
  //try {
  //	//隠藏HTML5FunWrapper
  //  HTML5FunWrapper.style.visibility = "hidden";
  //} catch(error) {    };
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
	alert('HTML5FunScript not found.');
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
  /*
  playButton.innerHTML = `
	<center>
	<p>&nbsp;</p>
	<p><button onclick="injection()" type="button">開始玩
  `+moduleScripts[moduleName].name+'</button></p>';	
  */
  playButton.innerHTML = `
	<center>
	<p>&nbsp;</p>
	<p><button onclick="injection()" type="button" class="buttonPushable">
	<span class="buttonFront">開始玩 HTML5 FUN 
  `+moduleScripts[moduleName].name+'</span></button></p></center>';	
}
//
appendButtonStyle = function() {
  if(document.getElementById("HTML5FUN-3D-BUTTON")) 
	  return;
  var style= document.createElement("style");
  style.id = "HTML5FUN-3D-BUTTON";
  //(document.head || document.documentElement).appendChild(style);
  document.body.appendChild(style);
  var rule=`
  /* 3D button */
  .buttonPushable {
    background: hsl(340deg 100% 32%);
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;
  }
  .buttonFront {
    display: block;
    padding: 12px 42px;
    border-radius: 12px;
    font-size: 1.25rem;
    background: hsl(345deg 100% 47%);
  	color: #F4D03F;  /* white; */
    border: 1px dotted hsl(340deg 100% 32%);	
    transform: translateY(-6px);
  }
  /* 解決文字計算長度受 Blogger CSS 的影響 */
  body {
    word-break: revert;
    word-wrap: revert;
  }

  `;
  style.innerHTML = rule;
}
//
//
//自動載入就執行 injection , 否則就新增一個 PLAY 按鈕
appendButtonStyle();
createPlayButton();
//
if(autoStart) {
  injection();
} else {
  //createPlayButton();
}
//
//=======================================================
//程式結束
//======================================================= 
 