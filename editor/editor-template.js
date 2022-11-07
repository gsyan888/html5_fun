/*
 Template
 
 使用時 <script> id 設為 templateJS, 並且要放入 innerHTML
 
 Template1 : Google Sites 用: 將 HTML5 FUN 輸出的語法，再加上 html , head, body tags
 Template2 : Google Sites 用: 在嵌入的 iFrame 中出現按鈕，按下去後，以新視窗開啟 Template1 的內容。 
 Templdae3 : for Crypt
 */
 
/* 指定n(1 or 2) 取得 Template1 or Template2 */
getTemplate = function(n) {
  return (n>=1 && n<=3?decodeHTML(html5funTemplates[n-1]):'');
};

html5funTemplates = [
function(){/*---=====Template=====
<!DOCTYPE HTML>
<html>
<head>
  <title>HTML5 FUN<\/title>
  <meta http-equiv="Content-Type" content="application\/xhtml+xml; charset=UTF-8" \/>
<\/head>  
<body>

<!-- 這裡插入原本的語法 -->

<script id="closeAppFunctionJS">
try {
isInIFrame = \`${isInIFrame}\`;
console.log('is in iFrame: '+isInIFrame);
}catch(error) { };

if(typeof(isInIFrame)!='undefined' && isInIFrame) {
  closeApp = function(e) {
    window.close();
  };
}
<\/script>

<\/body>
<\/html>
-----*/}.toString().replace(/\r/g,"").slice("function(){/*---=====Template=====".length+1,-9)

,

function(){/*---=====Template=====
<div id="playButton"  style="width:100%;margin:3em 0em;text-align:center;"><button class="buttonPushable"  onclick="openInNewWindow();" type="button"><span class="buttonFront">開始玩 HTML5 Speaking</span></button></div>
<style>
.buttonPushable {
  background: hsl(140deg 100% 32%);
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
  background: hsl(145deg 100% 47%);
  color: #339900;
  transform: translateY(-6px);
}	
</style>
<script>
isInIFrame = (window.self != window.top);
var html = ` 
<!-- 這裡插入編過碼的語法 -->
`;

decodeHTML = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};
function openInNewWindow() {
  var w = window.open("", "HTML5 FUN", "width="+screen.width+", height="+screen.height);
  var output = decodeHTML('<body>'+html+'</body>');
  w.document.write(output);
};
<\/script>
-----*/}.toString().replace(/\r/g,"").slice("function(){/*---=====Template=====".length+1,-9)

,

function(){/*---=====Template=====
  
  
  var html5FunGameCode = 'eX1oeQ==';
  
  var html5FunJsCode = '';
  
  //https://gist.github.com/eladkarako/738ff6791dd2e44baeb5787851f874d5
  // usage:
  //   btoa(String.normalise_to_ascii().crypt_symmetric());  //encode
  //   atob(String).normalise_to_unicode().crypt_symmetric(); //decode
  String.prototype.normalise_to_ascii   = function(){return unescape(encodeURIComponent(this)); }
  String.prototype.normalise_to_unicode = function(){return decodeURIComponent(escape(this));   }

  String.prototype.crypt_symmetric = function(key){
  	var me = this + "";                                             //unlink reference

  	key = Number(String(Number(key))) === key ? Number(key) : 13;   //optionaly provide key for symmetric-like-""encryption"".

  	me = me.split('')                                               //to array of characters.
         .map(function(c){return c.charCodeAt(0);})               //to array of numbers (each is character's ASCII value)
         .map(function(i){return i ^ key;        })               //XOR ""ENCRYPTION""
         ;
  	me = String.fromCharCode.apply(undefined, me);                  //one-liner trick: array-of-numbers to array-of-characters (ASCII value), join to single string. may result in buffer-overflow on long string!
  	return me;
  };

  html5FunEncodeJS = function(id) {
    var js = encodeURI(document.getElementById(id).innerHTML);
    return btoa(js.normalise_to_ascii().crypt_symmetric());
  };
  html5FunDecodeJS = function(code) {
    return decodeURIComponent(atob(code).normalise_to_unicode().crypt_symmetric());
  }
  html5FunDecodeAndUpdateJS = function(id, code) {
    if(typeof(id)=='string' && typeof(code)=='string') {
    	document.getElementById(id).innerHTML = html5FunDecodeJS(code);
    }
  }
  html5FunReloadSettingJS = function() {
	var settingJS = document.getElementById("settingJS");
	if(typeof(settingJS)!='undefined' && settingJS != null) {
		var js = settingJS.innerHTML;
		if(typeof(js)=='string' && js.length>0) {
			var scriptTag = document.createElement('script');
			scriptTag.id = 'jsForReload';
			scriptTag.innerHTML = js+'\n debugTestFunction=function(){console.log("Debug:settingJS reload.")}';
			var  head = document.getElementsByTagName('head')[0];
			head.appendChild(scriptTag);
			//debugTestFunction 已存在或是 10 秒後移除 reload 的 JS object
			debugStartTime = new Date();			
			debugIntervaleId = setInterval(function() {
				if(typeof(debugTestFunction)!='undefined' || ((new Date())-debugStartTime)>10000) {
					clearInterval(debugIntervaleId);
					//
					var scriptTag = document.getElementById('jsForReload');
					if(typeof(scriptTag)!='undefined') {
						document.getElementsByTagName('head')[0].removeChild(scriptTag);
					}
				}
			},100);
		}
	}    
  }
  html5FunLoadEmbededJS = function() {
	var scriptTag = document.createElement('script');
    scriptTag.type = "text/javascript";
    scriptTag.charset = "utf-8";
	scriptTag.id = 'injectionJS';
    scriptTag.src = "https://gsyan888.github.io/html5_fun/html5_fun_embeded.js";
	scriptTag.setAttribute('autostart', "false");
    scriptTag.setAttribute('modulename', "${modulename}");
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(scriptTag);
  }
    
  html5FunPlayGame = function() {
    var code = prompt('請輸入遊戲代碼');
  
    if( typeof(code) != 'undefined' && code != null && typeof(html5FunGameCode)=='string' && html5FunGameCode!='' &&  btoa(code.normalise_to_ascii().crypt_symmetric()) == html5FunGameCode ) {      
      if(typeof(html5FunJsCode)=='string' && html5FunJsCode.length>0) {
	    html5FunDecodeAndUpdateJS('settingJS', html5FunJsCode);
        html5FunReloadSettingJS();
        html5FunLoadEmbededJS();
	  }
    } else {
		alert('代碼不對哦~~');
	}
  }
  
  //在畫面 playButton 新增一個 PLAY 的按鈕
  html5FunCreatePlayButton = function() {
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
      <p>
      <button onclick="html5FunPlayGame();" type="button" class="buttonPushable">
	    <span class="buttonFront">輸入代碼載入遊戲</span>
      </button>
      </p>
      </center>	
    `
  }

  html5FunAppendButtonStyle = function() {
    var style= document.createElement("style");
    document.body.appendChild(style);
    var rule=`
      .buttonPushable {
        background: hsl(140deg 100% 32%);
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
        background: hsl(145deg 100% 47%);
        color: #339900;
        transform: translateY(-6px);
      }	
    `;
    style.innerHTML = rule;
  }
  
  //新增一個 PLAY 按鈕
  html5FunAppendButtonStyle();
  html5FunCreatePlayButton();

-----*/}.toString().replace(/\r/g,"").slice("function(){/*---=====Template=====".length+1,-9)
];
