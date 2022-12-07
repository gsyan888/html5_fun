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
<div id="playButton"  style="width:100%;margin:3em 0em;text-align:center;"><button class="buttonPushable"  onclick="openInNewWindow();" type="button"><span class="buttonFront"><!-- 這裡插入開始玩按鈕的字樣 --></span></button></div>
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
  };
  
  html5FunDecodeAndUpdateJS = function(id, code) {
    if(typeof(id)=='string' && typeof(code)=='string') {
    	document.getElementById(id).innerHTML = html5FunDecodeJS(code);
    }
  };
  
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
  };
  
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
  };
    
  html5FunPlayGame = function() {
    //var code = prompt('請輸入遊戲代碼');
    const inputElement = document.getElementById('prompt-input');
    const buttonElement = document.getElementById('prompt-button');
    const containerElement = document.getElementById('prompt-container');
    const getCodeTriggerBtn = document.getElementById('getCodeTriggerBtn');

    containerElement['style']['display'] = 'block';
    getCodeTriggerBtn['style']['display'] = 'none';

    if(typeof(inputElement)!='undefined' && inputElement!=null) {
      inputElement.focus();
    }

    buttonElement.addEventListener('click', getCode = function(e) {
      const code = inputElement.value;

      if(typeof(inputElement)!='undefined' && inputElement!=null) {
        inputElement.blur();
      }
      	  	  
      // 在這裡使用 inputValue 這個變數
      // 來取得使用者輸入的值	  
      if( typeof(code) != 'undefined' && code != null && typeof(html5FunGameCode)=='string' && html5FunGameCode!='' &&  btoa(code.normalise_to_ascii().crypt_symmetric()) == html5FunGameCode ) {
        //移除確定鈕按下與鍵盤按鍵放開的監聽
 		buttonElement.removeEventListener('click', getCode);
		document.removeEventListener('keyup', keyHandler);

        //將因為輸入代碼而改變比例，變更為 1 倍
        var viewport = document.querySelector('meta[name="viewport"]');
        if(typeof(viewport)=='undefined' || viewport==null) {
          viewport = document.createElement('meta');
          viewport.name = 'viewport';
          document.getElementsByTagName('head')[0].appendChild(viewport);
        }
        viewport.setAttribute('content', 'width=device-width,initial-scale=1,maximum-scale=1');

        if(typeof(html5FunJsCode)=='string' && html5FunJsCode.length>0) {
	      html5FunDecodeAndUpdateJS('settingJS', html5FunJsCode);
          html5FunReloadSettingJS();
          html5FunLoadEmbededJS();
          //0.5秒後試著按 Play 鈕
          setTimeout(function() {
            if(document.querySelector('#playButton')) {
              if(btn = document.querySelector('.buttonPushable')) {
                btn.click();
              }
            }
          }, 750);
        }
      } else {
		  //如果是輸入狀態就顯示錯誤訊息，否則讓輸入對話框消失
	      if(!(/代碼不對哦/i.test(document.getElementById('prompt-input').innerHTML))) {
			document.getElementById('prompt-input').outerHTML = '<h2 id="prompt-input">代碼不對哦！請再想想。</h2>';
		  } else {
			document.getElementById('prompt-input').outerHTML = '<input id="prompt-input" type="text" />';
		    containerElement['style']['display'] = 'none';
		    getCodeTriggerBtn['style']['display'] = 'block';
		  }
	  }	  
    });
	document.addEventListener('keyup', keyHandler = function(e) {
		if(e.keyCode==13 && document.getElementById('prompt-input').value!='') {
			getCode();
		}
	});	
  };
  
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
      <div id="prompt-container" style="display:none;">
        <h1>請輸入遊戲代碼</h1>
        <input id="prompt-input" type="text" />
        <button id="prompt-button">確定</button>
      </div>

      <center>
      <p>&nbsp;</p>
      <p>
      <button id="getCodeTriggerBtn" onclick="html5FunPlayGame();" type="button" class="buttonPushable">
	    <span class="buttonFront">輸入代碼載入遊戲</span>
      </button>
      </p>
      </center>	
    `;
  };

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
      #prompt-container {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 300px;
        height:200px;
        transform: translate(-50%, -50%);
        background-color: #F39C12;
        opacity: 0.8;
        padding: 20px;
        border: 1px solid black;
        border-radius: 2em;
        text-align: center;
      }
      #prompt-container button {
        position:absolute;
        bottom: 0.25em;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 2em;
        padding: 0.5em 1em 0.5em 1em;
        font-size:1em;
      }
      #prompt-container input {
        padding: 0.5em 1em 0.5em 1em;
        font-size:1em;
        text-align: center;
        width:50%;
      }
      #prompt-container h1 {
        color: white;
      }
      #prompt-container h2 {
        color: red;
      }
    `;
    style.innerHTML = rule;
  };
  
  //新增一個 PLAY 按鈕
  html5FunAppendButtonStyle();
  html5FunCreatePlayButton();

-----*/}.toString().replace(/\r/g,"").slice("function(){/*---=====Template=====".length+1,-9)
];
