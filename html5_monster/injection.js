//----------------------------------------------------------------------
// Speech2Text test for HTML5 Bingo/Monster(Bubble)
//
// use the Web Speech API to get the answers
//
// Author : gsyan (https://gsyan888.blogspot.com/)
//
// Change Logs: 
//		2021.06.18 created
//		2021.06.19 add the Mic enabled/unable button 
//				   add a label to show the result
//		2022.06.11 modifed for HTML5 monster
//		2022.06.12 trans Chinese to Pinyin , and using RegExp to check answers
//----------------------------------------------------------------------
//是否將中文轉拼音
var enableTransToPinyin = true;

//給哪支程用的
var HTML5FunAppName = 'monster';  //會自動抓, 不用設定value: bingo , monster, bubble

var eventType = 'mousedown';  //mousedown or touchstart, auto detect

var pinyinJSFilename = 'pinyin.js';

var getAllButtons = function(objLayer) {
	var buttons=null;
	//Layer 中只有存放按扭的 object 才有 length
	//利用這個特性, 找到 layer 中的元件
	if(objLayer) {
		var names = Object.keys(objLayer);
		for(var i=0; i<names.length; i++) {
			if(objLayer[names[i]] && typeof(objLayer[names[i]])=='object' && typeof(objLayer[names[i]]['length'])=='number') {
				var buttons = objLayer[names[i]];
				break;
			}
		}
	}
	return buttons;
}
//找出按鈕裡的字串
var getAnswer= function(btn) {
	var txt='';	
	if(btn) {
		var names = Object.keys(btn);
		for(var i=0; i<names.length; i++) {
			if(HTML5FunAppName=='bingo' && btn[names[i]] && typeof(btn[names[i]])=='string' && names[i]!='description') {
				//Bingo Button 中只 answer 和 description 的 object 才是 string 
				var txt = btn[names[i]];
				break;
			} else if(HTML5FunAppName=='monster' && btn[names[i]] && typeof(btn[names[i]])=='object' && typeof(btn[names[i]].getElementsByTagName)=='function') {
				if(typeof(btn[names[i]].innerText)!='undefined' && btn[names[i]].innerText!=null) {
					txt = btn[names[i]].innerText;
					break;
				}
			}
		}
	}
	return txt;
}

var getLabelText= function(btn) {
	var txt='';
	if(btn) {
		var names = Object.keys(btn);
		for(var i=0; i<names.length; i++) {
			if(btn[names[i]] && typeof(btn[names[i]])=='object' && typeof(btn[names[i]].getElementsByTagName)=='function') {
				if(typeof(btn[names[i]].innerText)!='undefined' && btn[names[i]].innerText!=null) {
					txt = btn[names[i]].innerText;
					break;
				}
			}
		}
	}
	return txt;
}
//find all buttons have mousedown event
findMousedownButtons = function(allBtn) {
	var options = [];
	for(var i=0; i<allBtn.length; i++) {
		var b = allBtn[i];
		var names = Object.keys(b);
		for(var j=0; j<names.length; j++) {
			if(b[names[j]] && typeof(b[names[j]])=='object' && (typeof(b[names[j]].mousedown)!='undefined' || typeof(b[names[j]].touchstart)!='undefined') ) {
				options.push(b);
				break;
			}
		}
	}
	return options;
}
//Bingo 載入題目後, 只有回選單、九宮格跟顯示提示等按鈕是帶有 mousedown(可按)
//因為 Bingo 的題幹每次換題目時會刪除
//以致原來是放在選項前面的
//第二題起, 會變成放在後面
//只好以找擁有 mousedown 的物件, 來找選項物件
getOptionButtons = function() {	
	if(HTML5FunAppName == 'bingo') {
		//bingo gameLayer child 7~16 是選項按鈕
		var btns = findMousedownButtons(getAllButtons(gameLayer));
		buttons = btns.slice(1, btns.length-1)
		buttonsTotal = buttons.length;
		hintButton = btns[btns.length-1];
	} else if(HTML5FunAppName == 'monster') {
		buttons =  findMousedownButtons(getAllButtons(qLayer));
		buttonsTotal = buttons.length;
	}
	//console.log(buttonsTotal);
	//console.log(buttons);
}

//find a button by text of the label
findButton = function(txt) {	
	var found = null;
	for(var i=0; i<buttonsTotal; i++) {
		var b = buttons[i];
		//如果已答對的格子(.enable==false)跳過
		//console.log(HTML5FunAppName+ ' , '+ b.enabled + ' , '+ getAnswer(b) + ' = ? '+ txt);
		/*
		if( (HTML5FunAppName=='bingo' && b.enabled && getAnswer(b) == txt)
			|| (HTML5FunAppName=='monster' && typeof(b)=='object' && b!=null && getLabelText(b) == txt)
		  ) 
		{	
			found = b;
			break;
		}
		*/
		var labelText = '';
		if(HTML5FunAppName=='bingo' && b.enabled ) {
			labelText = getAnswer(b);
		} else if(HTML5FunAppName=='monster' && typeof(b)=='object' && b!=null ) {
			labelText = getLabelText(b);
		}
		if(labelText!='' && txt.length>=labelText.length) {
			if(enableTransToPinyin && typeof(transToPinyin)=='function') {
				//將中文轉為無調號的拼音
				labelText = transToPinyin(labelText);
				txt = transToPinyin(txt);
			}
			//比對按鈕上的文字，如果是語音的一部份，就算答對
			var re = new RegExp(labelText,'gi');
			if(txt.match(re)) {
				//console.log(speech.match(re));
				found = b;
				break;
			}
		}
	}
	return found;
}
//click show hit button
showDescription = function() {	
	if(typeof(hintButton)!='undefined') {
		//hintButton.dispatchEvent('mousedown');
		hintButton.dispatchEvent(eventType);
	}
}

//
speech2TextEventsInit = function() {
	recognition.onstart = function() {
		var micButton = document.getElementById('micButton');
		micButton.style['background-color']='Violet';
		console.log('--------語音辨識開始--------');
	};
	
	recognition.onend = function() { 
		var micButton = document.getElementById('micButton');
		micButton.style['background-color']='DodgerBlue';
		micButton.textLabel.innerText = '';
		console.log('========語音辨識結束========');
	};
		
	recognition.onresult = function(event) { 
		console.log(event);
		/*
		for(var i=0; i<event.results.length; i++){
			var txt = event.results[i][0].transcript;
			console.log(txt);
			if(txt) {
				var btn = findButton(txt);
				if(btn!=null && typeof(btn)=='object') {
					btn.dispatchEvent('mousedown');
					break;
				}
			}
		}
		*/
		var atIndex = event.resultIndex;
		var theLast = event.results[atIndex].length-1;
		var txt = event.results[atIndex][theLast].transcript;
		//document.getElementById('micButton').textLabel.innerText = txt;
		console.log(txt);
		if(txt) {
			//
			getOptionButtons();
			//
			if(HTML5FunAppName=='bingo' && (txt=='芝麻開門' || txt=='芝麻關門')) {  //提示的 show & hide
				showDescription();
			} else {
				var btn = findButton(txt);
				//console.log(btn);
				var msg = txt;
				var dalayTime = 300;
				if(btn!=null && typeof(btn)=='object') {
					//找到按鈕就按
					//btn.dispatchEvent('mousedown');
					btn.dispatchEvent(eventType);
					msg = '請繼續';
				} else {
					//沒找到就顯示辨識出來的文字
					dalayTime = 1000;
				}
				document.getElementById('micButton').textLabel.innerText = msg;
				setTimeout(function() {
					document.getElementById('micButton').textLabel.innerText = '';
				}, dalayTime);
				
				//if(eventType.match(/touch/i)) {
				//	document.getElementById('micButton').dispatchEvent(eventType);
				//}
			}
		}
	}
}
addMicButton = function() {
	var micTxt = document.createTextNode('MIC');
	var micButton = document.createElement("div");
	micButton.id = 'micButton';
	micButton.title = '按這裡啟用/關閉語音辨識';
	micButton.appendChild(micTxt);
	document.body.appendChild(micButton);
	
	var labelText = document.createTextNode('');
	micButton.textLabel = document.createElement("div");
	micButton.textLabel.id = 'speechText';
	micButton.textLabel.appendChild(labelText);
	//document.body.appendChild(micButton.textLabel);
	micButton.appendChild(micButton.textLabel);
	
	micButton.style['text-align']='center';
	micButton.style.position='relative';
	micButton.style.width='80px'; //'50px';
	micButton.style.height='80px'; //'18px';
	micButton.style.left='25px'; //'54px';
	//micButton.style['top']='85%'; //'90%'; //Math.floor(window.innerHeight-50)+'px';
	micButton.style['top']= Math.floor(window.innerHeight-100)+'px';
	micButton.style['font-size']='12px'; //'xx-small';
	micButton.style.color='#ffffff';
	micButton.style.opacity='0.6';
	micButton.style['border-style']='ridge';
	micButton.style['border-radius']='120px'; //'8px';
	micButton.style['padding-top']='4px';
	micButton.style['background-color']='DodgerBlue';
	//micButton.innerText='@'+username;
	micButton.style['font-size'] = '1.2em';
	micButton.style['text-align']='center';
	
	micButton.textLabel.style.position = 'relative';
	micButton.textLabel.style.height = '18px';
	micButton.textLabel.style['text-align']='left';
	micButton.textLabel.style['font-size'] = '1.2em'; //'14px';
	micButton.textLabel.style['color']= 'black'; //'#339999';
	micButton.textLabel.style['text-shadow']='white 0.1em 0.1em 0.2em';
	micButton.textLabel.style['white-space']='nowrap';
	micButton.textLabel.style.left = '0.25em';//'30px'; //'60px';
	micButton.textLabel.style.top = '0.25em'; //'-250%'; //'-45px'; //'80%';//Math.floor(window.innerHeight-50+5)+'px';
	
	return micButton;
};
	
enableSpeech2Text = function(e) {
	e.preventDefault();
	//
	//detect mousedown or touchstart
	if(typeof(e.type)!='undefined') {
		eventType = e.type;
	}
	//
	var micButton = document.getElementById('micButton');	

	//bingo gameLayer child 7~16 是選項按鈕
	//buttons = getAllButtons(gameLayer).slice(7, 16);
	//buttonsTotal = buttons.length;
	//hintButton = getAllButtons(gameLayer)[16];

	//如果有支援語音辨識, 進行語音辨識初始化
	speechRecognitionReady = (typeof(window.SpeechRecognition)=='function' || typeof(window.webkitSpeechRecognition)=='function' || typeof(window.mozSpeechRecognition)=='function' || typeof(window.msSpeechRecognition)=='function');
	if(speechRecognitionReady) {
	//if(typeof(webkitSpeechRecognition)=='function') {
		//進行語音辨識初始化
		if(typeof(recognition)=='undefined') {
			recognition =  new (window.webkitSpeechRecognition || window.SpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			//recognition = new webkitSpeechRecognition();
			recognition.continuous = true;		//持續辨識,不自動停
			recognition.interimResults=true;	//立即辨識,不等待
			//recognition.lang='cmn-Hant-TW'; 	//'en-US'
			recognition.lang='zh-TW';
			
			speech2TextEventsInit();
		}
		var btnColor = micButton.style['background-color'].toLowerCase();		//'Violet'  DodgerBlue
		if(btnColor=='dodgerblue') {
			try {
				//recognition.stop();				
				recognition.start();
			} catch(e) { 
				//console.log(e)
				setTimeout( function() {
					recognition.start();
				}, 100);
			};
		} else {
			recognition.stop();
		}
	} else {
		alert('抱歉~ 您的瀏覽器不支援語音辨識(webkitSpeechRecognition)的功能');
		micButton.removeEventListener('mousedown', enableSpeech2Text);
		micButton.removeEventListener('touchstart', enableSpeech2Text);
		micButton.remove();
	}
}
translate = function(queryString) {
	//[[["MkEWBc","[[\"測試\",\"zh-CN\",\"zh-TW\",true],[null]]",null,"generic"]]]
	var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=zh-TW&hl=zh-TW&dt=t&dt=bd&dj=1&source=icon&tk=411946.411946&q=';  
	url += queryString;

	if (window.XMLHttpRequest) {     
      req = new XMLHttpRequest(); 
	}     
	else if (window.ActiveXObject) {     
      req = new ActiveXObject("Microsoft.XMLHTTP");     
	}     	
	//開啟網址的檔案
	req.open('GET', url);
	//等候回應並進行接下來的程序
	req.onreadystatechange = function() {     
   		if (req.readyState == 4) {
			if(req.status == 200) {	//200 為成功讀入資料; 404 : Not Found
				if(typeof(callback)=='function') {
					//callback(req.responseText);
					console.log(req.responseText);
				}
				console.log(req.responseText);
			} else {
				if(typeof(callback)=='function') {
					callback("");
				}
			}
		}
	}
	//送出取得檔案的請求
	try {
		req.send(null);
	} catch(e) { }
}
function loadPinyin(callback) {
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.onload = function(){
		if(typeof(callback)=='function') {
			callback();
		}
	};
	script.setAttribute('src', pinyinJSFilename);
	document.getElementsByTagName('head')[0].appendChild(script);
}
var injection = function(callback) {
	//偵測在使用哪一支 HTML5 FUN 的程式
	var script = document.getElementsByTagName('script');
	for(var i=0; i<script.length; i++) {
		var match = script[i].outerText.match(/,\s*\'([^\.]+)\.start\'/);
		if(match) {
			HTML5FunAppName = match[1];
			if(HTML5FunAppName=='bubble') {
				HTML5FunAppName = 'monster';
			}
			break;
		}
	}
	//
	//先載入原有的 LimeJS 程式
	if(typeof(callback)=='function') {
		callback();	
	}
	
	//如果有支援語音辨識, 進行語音辨識初始化
	speechRecognitionReady = (typeof(window.SpeechRecognition)=='function' || typeof(window.webkitSpeechRecognition)=='function' || typeof(window.mozSpeechRecognition)=='function' || typeof(window.msSpeechRecognition)=='function');
	if(speechRecognitionReady) {
		//add Mic button on left bottom after 1 sec.
		setTimeout( function() {
			var btn = addMicButton();
			btn.addEventListener('mousedown', enableSpeech2Text);
			btn.addEventListener('touchstart', enableSpeech2Text);
			//btn.addEventListener('touchend', enableSpeech2Text);
			loadPinyin();
		}, 1000);
	}
}

