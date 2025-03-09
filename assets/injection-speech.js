//----------------------------------------------------------------------
// Speech2Text test for HTML5 Bingo/Monster(Bubble)/Poke/Spelling
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
//		2022.06.15 support HTML5 poke
//		2022.06.16 support HTML5 ghost
//		2022.06.23 Bubble add commands trigger mouse events to close dialog
//		2025.03.09 modifed for embed mode
//----------------------------------------------------------------------
var injectionSpeech = {};
injectionSpeech.recognition = null; //語音辨識的物件

injectionSpeech.enableTransToPinyin = true; //是否將中文轉拼音
injectionSpeech.recognitionLang = 'zh-TW'; //'en-US'; //語音辨識的語言
injectionSpeech.recognitionInterimResults = true; //是否有辨識結果就立即語音回報

//給哪支程用的
injectionSpeech.appName = 'monster';  //會自動抓, 不用設定value: bingo , monster, bubble, poke, spelling

injectionSpeech.triggerEventType = 'mousedown';  //mousedown or touchstart, auto detect

injectionSpeech.pinyinJSFile = 'https://gsyan888.github.io/html5_fun/assets/pinyin.js';

injectionSpeech.buttons;
injectionSpeech.buttonsTotal = 0;

injectionSpeech.sendKeyDown = function(code) {
	var ch = String.fromCharCode(code);
	var eventKeyDown = new KeyboardEvent('keydown', {
						code: ch,
						key: ch,
						charKode: code,
						keyCode: code,
						view: window
					});
	document.dispatchEvent(eventKeyDown);
};
injectionSpeech.checkSpelling = function(txt) {
	if(txt.match(/\s+go$|\s+g\so$|購$/i)) {
		//英文的指令
		//if(txt.match(/購$/i)) {
		//	txt = txt.replace(/購$/g, '');
		//}
		txt = txt.replace(/\s+go$|\s+g\so$|購$/g, '');
		txt = txt.replace(/\s/g, '');
		if(txt.length>0) {
			for(var i=0; i<txt.length; i++) {
				injectionSpeech.sendKeyDown(txt.charCodeAt(i));
			}
			//console.log(txt.length);
			injectionSpeech.sendKeyDown(13);
		}
	}
}
injectionSpeech.getAllButtons = function(objLayer) {
	var buttons;
	//Layer 中只有存放按扭的 object 才有 length
	//利用這個特性, 找到 layer 中的元件
	if(objLayer) {
		var names = Object.keys(objLayer);
		for(var i=0; i<names.length; i++) {
			if(objLayer[names[i]] && typeof(objLayer[names[i]])=='object' && typeof(objLayer[names[i]]['length'])=='number') {
				buttons = objLayer[names[i]];
				break;
			}
		}
	}
	return buttons;
}
//找出按鈕裡的字串
injectionSpeech.getAnswer = function(btn) {
	var txt='';	
	if(btn) {
		var names = Object.keys(btn);
		for(var i=0; i<names.length; i++) {
			if(injectionSpeech.appName=='bingo' && btn[names[i]] && typeof(btn[names[i]])=='string' && names[i]!='description') {
				//Bingo Button 中只 answer 和 description 的 object 才是 string 
				var txt = btn[names[i]];
				break;
			} else if(injectionSpeech.appName=='monster' && btn[names[i]] && typeof(btn[names[i]])=='object' && typeof(btn[names[i]].getElementsByTagName)=='function') {
				if(typeof(btn[names[i]].innerText)!='undefined' && btn[names[i]].innerText!=null) {
					txt = btn[names[i]].innerText;
					break;
				}
			}
		}
	}
	return txt;
}

injectionSpeech.getLabelText = function(btn) {
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
injectionSpeech.findMousedownButtons = function(allBtn) {
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
injectionSpeech.getOptionButtons = function() {	
	if(injectionSpeech.appName == 'bingo') {
		//bingo gameLayer child 7~16 是選項按鈕
		var btns = injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(gameLayer));
		hintButton = btns[btns.length-1];  //右邊問號的按鈕(用來查看解釋)
		injectionSpeech.buttons = btns.slice(1, btns.length-1); //九宮格按鈕
	} else if(injectionSpeech.appName == 'monster') {
		injectionSpeech.buttons =  injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(qLayer));
	} else if(injectionSpeech.appName == 'ghost') {
		//ghost 的結構不一樣，mousedown 是在下一層的某個物件中，所以不用 injectionSpeech.findMousedownButtons
		injectionSpeech.buttons =  injectionSpeech.getAllButtons(answerLayer); 
	} else 	if(injectionSpeech.appName == 'poke') {
		//poke boxLayer children 第 0 個是外框, 它沒有 mousedown
		injectionSpeech.buttons = injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(boxLayer));
		showNumber = 1; //將 poke 的顯示號碼改為要
	}		
	//console.log(injectionSpeech.buttons);
	injectionSpeech.buttonsTotal = injectionSpeech.buttons.length; //按鈕的總數
}

//find a button by text of the label
injectionSpeech.findButton = function(txt) {	
	var found = null;
	for(var i=0; i<injectionSpeech.buttonsTotal; i++) {
		var b = injectionSpeech.buttons[i];
		var labelText = '';
		if(injectionSpeech.appName=='bingo' && b.enabled ) {
			labelText = injectionSpeech.getAnswer(b);
		} else if(injectionSpeech.appName=='poke') {
			//戳戳樂直接取數字來比較
			//labelText = i; //+'號';
			labelText = injectionSpeech.getLabelText(b)
			//var digits = txt.match(/number\s(\d+)$|(\d+)\sgo$|(\d+)號$/i);
			//if(digits && digits.length>=3 && ((digits[1]!='undefined' && digits[1]==labelText) || (digits[2]!='undefined' && digits[2]==labelText)) ) {
			var digits = txt.match(/(\d+)號$/i);
			if(digits && digits.length>=2 && digits[1]!='undefined' && digits[1]==labelText) {
				//中文的指令(數字+號)
				found = b;
				break;
			} else if(txt.match(/\s+go$|\dgo$|購$/i)) {
				//英文的指令(數字+go)
				if(txt.match(/購$/i)) {
					txt = txt.replace(/購$/g, ' go');
				}
				if(txt.match(/\dgo$/i)) {	//數字跟go黏在一起的，添加空格
					txt = txt.replace(/(\d)go$/ig, '$1 go');
					//console.log(txt);
				}
				//取得阿拉伯數字
				digits = txt.match(/(\d+)\sgo$/i);
				if(digits && digits.length>=2 && digits[1]!='undefined') {
					var num = digits[1];  //已是阿拉伯數字的
				} else {
					var num = injectionSpeech.text2num(txt.toLowerCase()); //英文轉阿拉伯數字
				}
				//console.log(num+ ' : '+txt);
				if(num && num==Number(labelText)) {
					found = b;
					break;
				}					
			} else if(txt.match(/繼續$|下一個$|關閉$|芝麻關門$|抽下一個$|OK$|okay$|next one$/i)) {
				//關閉對話框的指令如果符合的, 就按 Enter 鍵
				var topLayerChildren = injectionSpeech.getAllButtons(topLayer);
				if(topLayerChildren.length>0 && injectionSpeech.getAllButtons(topLayerChildren[0]).length>0) {
					var eventEnterKeyup = new KeyboardEvent('keyup', {
						code: 'Enter',
						key: 'Enter',
						charKode: 13,
						keyCode: 13,
						view: window
					});
					document.dispatchEvent(eventEnterKeyup);
					break;
				}
			}
			continue; //戳戳樂只需要數字，所以不用轉拼音
		} else if(typeof(b)=='object' && b!=null ) {
			labelText = injectionSpeech.getLabelText(b);
		}
		if(labelText!='' && txt.length>=labelText.length) {
			//比對按鈕上的文字，如果是語音的一部份，就算答對
			//先用原文字比對
			var re = null;
			var match = null;
			try {
				re = new RegExp(labelText,'gi');
			} catch(error) {  };
			if(re) {
				//比對按鈕上的文字，如果是語音的一部份，就算答對
				match = txt.match(re);
			}
			if((!re || !match) && injectionSpeech.enableTransToPinyin && typeof(transToPinyin)=='function') {
				//將中文轉為無調號的拼音(以同音字再比對看看)
				var labelTextPinyin = transToPinyin(labelText);
				var txtPinyin = transToPinyin(txt);
				//console.log(labelTextPinyin + ' : ' + txtPinyin);
				try {
					re = new RegExp(labelTextPinyin,'gi');
				} catch(error) {  };
				if(re) {
					match = txtPinyin.match(re);
				}
			}
			if(match) {
				//console.log(match);
				if(injectionSpeech.appName=='ghost') {
					//ghost 的按鈕需再往下一層才能找出來
					b = injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(b))[0];
				}
				found = b;
				break;
			} else if(txt.match(/回主選單$|重新挑戰$|繼續$|開始$|下一題$|下一個$|關閉$|芝麻關門$|抽下一個$|OK$|okay$|next one$/i)) {
				//關閉對話框的指令如果符合的, 就按按鈕
				//if(injectionSpeech.appName=='bubble') {
				var topLayerChildren = injectionSpeech.getAllButtons(topLayer);
				//console.log(topLayerChildren);
				if(topLayerChildren.length>0) {
					//topLayerChildren = injectionSpeech.getAllButtons(topLayerChildren[0]);
					topLayerChildren = injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(injectionSpeech.getAllButtons(topLayer)[0]));
					if(topLayerChildren.length>1) {
						for(var t=0; t<topLayerChildren.length; t++) {
							btnLabelText = injectionSpeech.getLabelText(topLayerChildren[t]);
							re = null;
							match = null;
							try {
								re = new RegExp(btnLabelText,'gi');
							} catch(error) {  };
							if(re) {
								//比對按鈕上的文字，如果是語音的一部份，就算答對
								match = txt.match(re);
								if(match) {
									topLayerChildren[t].dispatchEvent(injectionSpeech.triggerEventType);
									console.log('found '+t+' : '+btnLabelText);
									break;
								}									
							}
						}
					} else {
						if(topLayerChildren.length>0) { // && typeof(topLayerChildren[0].dispatchEvent)=='function') {
							topLayerChildren[0].dispatchEvent(injectionSpeech.triggerEventType);
							break;
						}
					}
				}
			}
		}
	}
	return found;
}
//click show hit button
injectionSpeech.showDescription = function() {	
	if(typeof(hintButton)!='undefined') {
		//hintButton.dispatchEvent('mousedown');
		hintButton.dispatchEvent(injectionSpeech.triggerEventType);
	}
}

//
injectionSpeech.speech2TextEventsInit = function() {
	injectionSpeech.recognition.onstart = function() {
		var micButton = document.getElementById('micButton');
		micButton.style['background-color']='Violet';
		console.log('--------語音辨識開始--------');
	};
	
	injectionSpeech.recognition.onend = function() { 
		var micButton = document.getElementById('micButton');
		micButton.style['background-color']='DodgerBlue';
		micButton.textLabel.innerText = '';
		console.log('========語音辨識結束========');
	};
		
	injectionSpeech.recognition.onresult = function(event) { 
		//console.log(event);
		var atIndex = event.resultIndex;
		var theLast = event.results[atIndex].length-1;
		var txt = event.results[atIndex][theLast].transcript;
		//document.getElementById('micButton').textLabel.innerText = txt;
		console.log(txt);
		if(txt) {
			if(injectionSpeech.appName=='spelling' ) {
					injectionSpeech.checkSpelling(txt);
					return;
			}
			//
			injectionSpeech.getOptionButtons();
			//
			if(injectionSpeech.appName=='bingo' && (txt=='芝麻開門' || txt=='芝麻關門')) {  //提示的 show & hide
				injectionSpeech.showDescription();
			}  else {
				var btn = injectionSpeech.findButton(txt);
				//console.log(btn);
				var msg = txt;
				var dalayTime = 300;
				if(btn!=null && typeof(btn)=='object') {
					//找到按鈕就按
					//btn.dispatchEvent('mousedown');
					btn.dispatchEvent(injectionSpeech.triggerEventType);
					msg = '請繼續';
				} else {
					//沒找到就顯示辨識出來的文字
					dalayTime = 1000;
				}
				document.getElementById('micButton').textLabel.innerText = msg;
				setTimeout(function() {
					document.getElementById('micButton').textLabel.innerText = '';
				}, dalayTime);
				
				//if(injectionSpeech.triggerEventType.match(/touch/i)) {
				//	document.getElementById('micButton').dispatchEvent(injectionSpeech.triggerEventType);
				//}
			}
		}
	}
}
injectionSpeech.addMicButton = function() {
	injectionSpeech.removeMicButton(); //先試著移除已存在的 MIC 按鈕
	
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
	micButton.style.position='fixed';
	micButton.style.width='10vmin'; //'80px';
	micButton.style.height='10vmin'; //'80px';
	micButton.style.left='1vmin'; //'25px';
	micButton.style['top']= 'calc(100% - 12vmin)'; //'calc(100% - 100px)';
	micButton.style['z-index'] = '299999999';
	micButton.style.color='#ffffff';
	micButton.style.opacity='0.5';
	micButton.style['border-style']='ridge';
	micButton.style['border-radius']='50%'; //120px '8px';
	micButton.style['padding-top']='4px';
	micButton.style['background-color']='DodgerBlue';
	//micButton.innerText='@'+username;
	micButton.style['font-size'] = '2.5vmin'; //1.2em
	micButton.style['text-align']='center';
	
	micButton.textLabel.style.position = 'relative';
	micButton.textLabel.style.height = '3vmin'; //18px
	micButton.textLabel.style['text-align']='left';
	micButton.textLabel.style['font-size'] = '1.2em'; //1.2em 
	micButton.textLabel.style['color']= 'black'; //'#339999';
	micButton.textLabel.style['text-shadow']='white 0.1em 0.1em 0.2em';
	micButton.textLabel.style['white-space']='nowrap';
	micButton.textLabel.style.left = '0.25em';//0.25em
	micButton.textLabel.style.top = '0.25em'; //0.25em
	
	return micButton;
};
	
injectionSpeech.enableSpeech2Text = function(e) {
	e.preventDefault();
	//
	//detect mousedown or touchstart
	if(typeof(e.type)!='undefined') {
		injectionSpeech.triggerEventType = e.type;
	}
	//
	var micButton = document.getElementById('micButton');	

	//bingo gameLayer child 7~16 是選項按鈕
	//injectionSpeech.buttons = injectionSpeech.getAllButtons(gameLayer).slice(7, 16);
	//injectionSpeech.buttonsTotal = injectionSpeech.buttons.length;
	//hintButton = injectionSpeech.getAllButtons(gameLayer)[16];

	//如果有支援語音辨識, 進行語音辨識初始化
	speechRecognitionReady = (typeof(window.SpeechRecognition)=='function' || typeof(window.webkitSpeechRecognition)=='function' || typeof(window.mozSpeechRecognition)=='function' || typeof(window.msSpeechRecognition)=='function');
	if(speechRecognitionReady) {
	//if(typeof(webkitSpeechRecognition)=='function') {
		//進行語音辨識初始化
		if(typeof(injectionSpeech.recognition)=='undefined' || injectionSpeech.recognition == null) {
			injectionSpeech.recognition =  new (window.webkitSpeechRecognition || window.SpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			//injectionSpeech.recognition = new webkitSpeechRecognition();
			injectionSpeech.recognition.continuous = true;		//持續辨識,不自動停
			injectionSpeech.recognition.interimResults=true;	//立即辨識,不等待
			//injectionSpeech.recognition.lang='cmn-Hant-TW'; 	//'en-US'
			injectionSpeech.recognition.lang='zh-TW';
			//injectionSpeech.recognition.lang='en-US';
			if(typeof(injectionSpeech.recognitionLang)=='string' && injectionSpeech.recognitionLang!='') {
				injectionSpeech.recognition.lang = injectionSpeech.recognitionLang 
			}
			if(typeof(injectionSpeech.recognitionInterimResults)!='undefined') {
				injectionSpeech.recognition.interimResults = injectionSpeech.recognitionInterimResults;
			}
			injectionSpeech.speech2TextEventsInit();
		}
		var btnColor = micButton.style['background-color'].toLowerCase();		//'Violet'  DodgerBlue
		if(btnColor=='dodgerblue') {
			if(injectionSpeech.appName=='poke') {  //戳戳樂在按了 MIC 按鈕後，試著顯示格子左上角的編號
				injectionSpeech.displayPokeNumbers();
			}
			try {
				//injectionSpeech.recognition.stop();				
				injectionSpeech.recognition.start();
			} catch(e) { 
				//console.log(e)
				setTimeout( function() {
					injectionSpeech.recognition.start();
				}, 100);
			};
		} else {
			injectionSpeech.recognition.stop();
		}
	} else {
		alert('抱歉~ 您的瀏覽器不支援語音辨識(webkitSpeechRecognition)的功能');
		injectionSpeech.removeMicButton(micButton);
	}
}
injectionSpeech.removeMicButton = function(micButton) {
	if(!micButton) {
		micButton = document.getElementById('micButton');
	}
	if(micButton) {
		try{micButton.removeEventListener('mousedown', injectionSpeech.enableSpeech2Text);}catch(e){};
		try{micButton.removeEventListener('touchstart', injectionSpeech.enableSpeech2Text);}catch(e){};
		try{micButton.remove();}catch(e){};
	}
}
// injectionSpeech.text2num : convert English words to number
// rf. https://stackoverflow.com/questions/11980087/javascript-words-to-numbers
//將英文轉為阿拉伯數字, strSource 中必須以 go 結尾
injectionSpeech.text2num = function(strSource) {
	var Small = {
		'zero': 0,
		'one': 1,
		'two': 2,
		'three': 3,
		'four': 4,
		'five': 5,
		'six': 6,
		'seven': 7,
		'eight': 8,
		'nine': 9,
		'ten': 10,
		'eleven': 11,
		'twelve': 12,
		'thirteen': 13,
		'fourteen': 14,
		'fifteen': 15,
		'sixteen': 16,
		'seventeen': 17,
		'eighteen': 18,
		'nineteen': 19,
		'twenty': 20,
		'thirty': 30,
		'forty': 40,
		'fifty': 50,
		'sixty': 60,
		'seventy': 70,
		'eighty': 80,
		'ninety': 90,
		'for' : 4,	//for == four
		'to' : 2	//to == two
	};
	var Magnitude = {
		'thousand':     1000,
		'million':      1000000,
		'billion':      1000000000,
		'trillion':     1000000000000,
		'quadrillion':  1000000000000000,
		'quintillion':  1000000000000000000,
		'sextillion':   1000000000000000000000,
		'septillion':   1000000000000000000000000,
		'octillion':    1000000000000000000000000000,
		'nonillion':    1000000000000000000000000000000,
		'decillion':    1000000000000000000000000000000000,
	};;
	var all_keys = Object.keys(Small).join('|')+'|'+Object.keys(Magnitude).join('|')+'|go'
	var match, word, n, g;
	var words = strSource.split('\s+');
	var re = RegExp(all_keys, 'i');
	for(var i=0; i<words.length; i++) {
		//if(!words[i].match(/zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|nonilliondecillion|go/i)) {
		if(!words[i].match(re)) {
			//console.log('debug : '+words[i]);
			return null;
		}
	}
	//搜尋的字串包括 go
	re = RegExp('('+all_keys+')\\s+', 'ig');
    //match = (strSource+' ').match(/(zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million|billion|trillion|quadrillion|quintillion|sextillion|septillion|octillion|nonilliondecillion|go)\s+/ig)
	match = (strSource+' ').match(re);
    //console.log(match);
	//如果沒有找到任何數字的單字或是沒有 go 的關鍵字就不轉換
	if(typeof(match)=='undefined' || match==null) {
		return null;
	} else if(!match[match.length-1].match(/go/i)) {
		return null;
	}
	
	var found = false;
    n = 0;
    g = 0;
	//match 要去掉最後一個 go 的，所以 match.length-1
	for(var i=0; i<match.length-1; i++) {
		word = match[i].replace(/\s/g, '');
		var x = Small[word];
		if (x != null) {
			g = g + x;
			found = true;
		}
		else if (word == "hundred") {
			g = g * 100;
			found = true;
		}
		else {
			x = Magnitude[word];
			if (x != null) {
				n = n + g * x
				g = 0;
				found = true;
			}
			else { 
				//console.log("Unknown number: "+word); 
				found = false;
			}
		}
	}
	if(found) {
		return n + g;
	} else {
		return null;
	}
}
injectionSpeech.translate = function(queryString) {
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
//顯示戳戳樂的格子號碼, 並將號碼改為由 1 開始
injectionSpeech.displayPokeNumbers = function() {
	var btns = injectionSpeech.findMousedownButtons(injectionSpeech.getAllButtons(boxLayer));
	//console.log(btns);
	for(var j=0; j<btns.length; j++) {
		var btn = btns[j];
		var names = Object.keys(btn);
		for(var i=0; i<names.length; i++) {
			if(btn[names[i]] && typeof(btn[names[i]])=='object' && typeof(btn[names[i]].getElementsByTagName)=='function') {
				//if(typeof(btn[names[i]].innerText)!='undefined' && btn[names[i]].innerText!=null) {
				if(btn[names[i]].getAttribute('title')!=null && btn[names[i]].children.length==1) {
					var child = btn[names[i]].children[0];
					if(child.children.length>=2 && !isNaN(child.children[1].innerHTML)) {
						child.children[1].innerHTML = j+1;
						btn[names[i]].title = '#'+child.children[1].innerHTML;
						child.children[1].style['display'] = 'block';
					}
					break;
				}
			}
		}
	}
}
injectionSpeech.loadPinyin = function(callback) {
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.onload = function(){
		if(typeof(callback)=='function') {
			callback();
		}
	};
	script.setAttribute('src', injectionSpeech.pinyinJSFile);
	document.getElementsByTagName('head')[0].appendChild(script);
}
injectionSpeech.start = function(callback) {
	//取得網址中的某一個參數(已編碼過的)
	if(typeof(gup)!=='function') {
		var gup = function( name, url ){
			if(typeof(url)!='string') {
				url = window.location.href;
			}
			name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
			var regexS = "[\\?&]"+name+"=([^&#]*)";  
			var regex = new RegExp( regexS );  
			var results = regex.exec(url); 
			if( results == null )    return "";  
			else    return results[1];
		}
	}
	//偵測是否指定辨識的語言
	var lang = gup('lang');
	if(lang != '') {
		injectionSpeech.recognitionLang = lang;
	}
	//偵測在使用哪一支 HTML5 FUN 的程式
	if(typeof(moduleName)=='string' && moduleName.replace(/\s/g, '')!='') {
		injectionSpeech.appName = moduleName;
	} else {
		var script = document.getElementsByTagName('script');
		for(var i=0; i<script.length; i++) {
			var match = script[i].outerText.match(/,\s*\'([^\.]+)\.start\'/);
			if(match) {
				injectionSpeech.appName = match[1];
				if(injectionSpeech.appName=='bubble') {
					injectionSpeech.appName = 'monster';
				}
				break;
			}
		}
	}
	//是否將中文轉拼音 (spelling/poke: false)
	injectionSpeech.enableTransToPinyin = (injectionSpeech.appName != 'spelling' && injectionSpeech.appName != 'poke');
	//語音辨識的語言 (spelling: en-US, others: zh-TW);
	injectionSpeech.recognitionLang = (injectionSpeech.appName == 'spelling'?'en-US':'zh-TW');
	//是否有辨識結果就立即語音回報 (bingo: false)
	injectionSpeech.recognitionInterimResults = (injectionSpeech.appName != 'bingo');; 
	
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
			var btn = injectionSpeech.addMicButton();
			btn.addEventListener('mousedown', injectionSpeech.enableSpeech2Text);
			btn.addEventListener('touchstart', injectionSpeech.enableSpeech2Text);
			//btn.addEventListener('touchend', injectionSpeech.enableSpeech2Text);
			if(injectionSpeech.enableTransToPinyin) {
				injectionSpeech.loadPinyin();
			}
		}, 1000);
	}
}
