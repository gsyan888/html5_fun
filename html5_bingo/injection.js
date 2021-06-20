//----------------------------------------------------------------------
// Speech2Text test for HTML5 Bingo
//
// use the Web Speech API to get the answers
//
// Author : gsyan (https://gsyan888.blogspot.com/)
//
// Change Logs: 
//		2021.06.18 created
//		2021.06.19 add the Mic enabled/unable button 
//				   add a label to show the result
//----------------------------------------------------------------------
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
	//Button 中只 answer 和 description 的 object 才是 string 
	if(btn) {
		var names = Object.keys(btn);
		for(var i=0; i<names.length; i++) {
			if(btn[names[i]] && typeof(btn[names[i]])=='string' && names[i]!='description') {
				var txt = btn[names[i]];
				break;
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
			if(b[names[j]] && typeof(b[names[j]])=='object' && typeof(b[names[j]].mousedown)!='undefined' ) {
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
getBingoButtons = function() {
	//bingo gameLayer child 7~16 是選項按鈕
	var btns = findMousedownButtons(getAllButtons(gameLayer));
	buttons = btns.slice(1, btns.length-1)
	buttonsTotal = buttons.length;
	hintButton = btns[btns.length-1];
}

//find a button by text of the label
findButton = function(txt) {	
	var found = null;
	for(var i=0; i<buttonsTotal; i++) {
		var b = buttons[i];
		//如果已答對的格子(.enable==false)跳過
		if(b.enabled && getAnswer(b) == txt) {
			found = b;
			break;
		}
	}
	return found;
}
//click show hit button
showDescription = function() {	
	if(typeof(hintButton)!='undefined') {
		hintButton.dispatchEvent('mousedown');
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
		document.getElementById('micButton').textLabel.innerText = txt;
		console.log(txt);
		if(txt) {
			getBingoButtons();

			if(txt=='芝麻開門' || txt=='芝麻關門') {  //提示的 show & hide
				showDescription();
			} else {
				var btn = findButton(txt);
				if(btn!=null && typeof(btn)=='object') {
					btn.dispatchEvent('mousedown');
				}
			}
		}
	}
}
addMicButton = function() {
	var micTxt = document.createTextNode('MIC');
	var micButton = document.createElement("div");
	micButton.id = 'micButton';
	micButton.appendChild(micTxt);
	document.body.appendChild(micButton);
	
	var labelText = document.createTextNode('');
	micButton.textLabel = document.createElement("div");
	micButton.textLabel.id = 'speechText';
	micButton.textLabel.appendChild(labelText);
	document.body.appendChild(micButton.textLabel);
	
	micButton.style['text-align']='center';
	micButton.style.position='relative';
	micButton.style.width='50px';
	micButton.style.height='18px';
	micButton.style.left='54px';
	micButton.style.top=Math.floor(window.innerHeight-50)+'px';
	micButton.style['font-size']='12px'; //'xx-small';
	micButton.style.color='#ffffff';
	//micButton.style.opacity='0.8';
	micButton.style['border-style']='ridge';
	micButton.style['border-radius']='8px';
	micButton.style['padding-top']='4px';
	micButton.style['background-color']='DodgerBlue';
	//micButton.innerText='@'+username;
	
	micButton.textLabel.style.position = 'relative';
	micButton.textLabel.style.height = '12px';
	micButton.textLabel.style['text-align']='left';
	micButton.textLabel.style['font-size'] = '10px';
	micButton.textLabel.style['color']= '#339999';
	micButton.textLabel.style.left = '60px';
	micButton.textLabel.style.top = Math.floor(window.innerHeight-50+5)+'px';
	
	return micButton;
};
	
enableSpeech2Text = function() {
	var micButton = document.getElementById('micButton');
	var btnColor = micButton.style['background-color'].toLowerCase();		//'Violet'  DodgerBlue

	//bingo gameLayer child 7~16 是選項按鈕
	//buttons = getAllButtons(gameLayer).slice(7, 16);
	//buttonsTotal = buttons.length;
	//hintButton = getAllButtons(gameLayer)[16];

	//如果有支援語音辨識, 進行語音辨識初始化
	if(typeof(webkitSpeechRecognition)=='function') {
		//進行語音辨識初始化
		if(typeof(recognition)=='undefined') {
			recognition = new webkitSpeechRecognition();
			recognition.continuous = true;		//持續辨識,不自動停
			//recognition.interimResults=true;	//立即辨識,不等待
			//recognition.lang='cmn-Hant-TW'; 	//'en-US'
			speech2TextEventsInit();
		}
		
		if(btnColor=='dodgerblue') {
			if(typeof(recognition.start)=='function') {
				try {
					//recognition.stop();				
					recognition.start();
				console.log('ok');
				} catch(e) { 
					//console.log(e)
					setTimeout( function() {
						recognition.start();
					}, 100);
				};
			}
		} else {
			recognition.stop();
		}
	} else {
		alert('抱歉~ 您的瀏覽器不支援語音辨識(webkitSpeechRecognition)的功能');
		micButton.removeEventListener('mousedown', enableSpeech2Text);
		micButton.remove();
	}
}

var injection = function(callback) {
	//先載入原有的 LimeJS 程式
	if(typeof(callback)=='function') {
		callback();				
	}
	
	//add Mic button on left bottom after 1 sec.
	setTimeout( function() {
		addMicButton().addEventListener('mousedown', enableSpeech2Text);
	}, 1000);
}

