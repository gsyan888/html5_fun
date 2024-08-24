/**
 * HTML5 FUN English 800
 * @Author gsyan (https://gsyan888.blogspot.com/)
 */
var qFile = 'https://gsyan888.github.io/html5_fun/assets/english800-data.js';
var soundFailureURL = 'https://gsyan888.github.io/html5_fun/html5_wheel/assets/sound_spin.mp3';
var soundCoinURL = 'https://gsyan888.github.io/html5_fun/assets/sound-coin.mp3';
var soundFinishURL = 'https://gsyan888.github.io/html5_fun/assets/sound-ding-dong-ding-dong.mp3';

var soundFinish, soundFailure, soundCoin, soundTTS;
var tts_language = 'zh-TW'; //'en-US';  //跟語音辨識的語言一樣 英文: 'en-US' , 中文: 'zh-TW'
var tts_speed = 1;  //語音的速度 0 ~ 1 (可用小數) 0.3
var tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl=${tts_language}&client=tw-ob&ttsspeed=${tts_speed}&q=';
var ttsVoices;
var currentIndex = 0;
var currentQuestion = {};
var currentErrors = {};
var logger = {};

function openNav() {
  var width = 400;
  var size = getWindowSize();
  if(size.width < size.height) {
    width = size.width;
  }
  width = width+'px';
  document.getElementById("mySidebar").style.width = width;
  document.getElementById("gameWrapper").style.marginLeft = width;
  document.querySelector('.navOpenBtn').style.display = 'none';
  updateStatistics();
  importLogger(false); //hide the file drop area
}
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("gameWrapper").style.marginLeft= "0";
  document.querySelector('.navOpenBtn').style.display = 'block';
}
/**
 * 遊戲音效物件的初始
 */
soundInit = function() {
	if(typeof(soundFinish)=='undefined' || soundFinish==null) {
		soundFinish = audioInit(soundFinishURL); //, true); //simple audio mode
	};	
	if(typeof(soundFailure)=='undefined' || soundFailure==null) {
		soundFailure = audioInit(soundFailureURL);
	};	
	if(typeof(soundCoin)=='undefined' || soundCoin==null) {
		soundCoin = audioInit(soundCoinURL);
	};
};
getTTS_URL = function(query) {
	var url = '';
	var lang = '';
	//字串字尾如果是 .??-?? 者，視為有指定語言代碼
	//左側為要發音的字串，而搜尋的字串(去掉點)為語音代碼
	if(/\.(\w{2}\-\w{2})$/.test(query)) {
		query = window['RegExp']['leftContext'];	//要合成語音的字串
		lang = window['RegExp']['lastParen'];		//語言代碼
	}		
	if(typeof(tts_language)=='string' &&  typeof(tts_speed)!='undefined' && !isNaN(tts_speed) && typeof(tts_base_url)=='string') {
		url = tts_base_url.replace(/\$\{tts_language\}/i, (lang==''?tts_language:lang));
		url = url.replace(/\$\{tts_speed\}/i, tts_speed);
		url = url+encodeURIComponent(query);
	}
	return url;
};
ttsEndedHandler = function(e) {
  //如果自訂的 queue 還有未播放完的，就依設定繼續播放
  if(typeof(soundTTS)!='undefined' && soundTTS != null) {
    if(soundTTS.queue && soundTTS.queue.length > 0) {
      var url  = getTTS_URL(soundTTS.queue[0]);
	  soundTTS.queue.splice(0, 1);
	  soundTTS.src = url;
	  audioPlay(soundTTS);
	}
  }
};
ttsSpeak = function(txt, lang, speed) {
    if(typeof(lang)!='string') { 
		lang = 'en-US';
	}
	var url = getTTS_URL(txt + '.' + lang);
	if(typeof(soundTTS)=='undefined' || soundTTS == null) {
		soundTTS = audioInit(url, true);
		soundTTS.addEventListener("ended", ttsEndedHandler);
	} else {
		soundTTS.src = url;
	}
	soundTTS.queue = []; //清空前一次的 queue
	//alert(soundTTS.src);
	audioPlay(soundTTS);
	return true;
    

	if(typeof(lang)!='string') {
		lang = tts_language;
	}
	if(typeof(speed)!='number') {
		speed = tts_speed;
	}
	// Get a reference to the speechSynthesis controller
	var synth = window['speechSynthesis'];

	// Check if the browser supports speechSynthesis
	if (synth) {
		// Create a new utterance for the specified text
		var utterance = new SpeechSynthesisUtterance(txt);
		
		// Set the language of the utterance
		utterance['lang'] = lang;
		
		// Set the rate of the utterance
		utterance['rate'] = speed;
		
		utterance['volume'] = 1;
		//utterance['pitch'] = 1;
		
		//Don't use Microsoft Anna
		ttsVoices = window['speechSynthesis']['getVoices']();
		var voice;
		for(var i=0; i<ttsVoices.length; i++) {
			if(ttsVoices[i]['lang'].toLowerCase() == lang.toLowerCase()) {
				if(!(ttsVoices[i]['voiceURI'].match(/Microsoft\s+Anna/i))) {
					//console.log(ttsVoices[i]);
					utterance['voice'] = ttsVoices[i];
					break;
				}
			}
		}
		
		synth.cancel();

		// Speak the utterance
		synth['speak'](utterance);
		
		return true;
	} else {
		return false;
	}
};
/*
載入指定的 script
 */
loadJsFromExternalScript = function (scriptSrc, callback) {
  var scriptToAdd = document.createElement('script'); /* 建立一個 scriptElement	*/
  scriptToAdd.setAttribute('type', 'text/javascript');
  scriptToAdd.setAttribute('charset', 'utf-8');
  scriptToAdd.setAttribute('src', scriptSrc);
  /* 載入成功時 */
  scriptToAdd.onload = scriptToAdd.onreadystatechange = function () {
    if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
      scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
      document.getElementsByTagName('head')[0].removeChild(scriptToAdd); /* 載入後移除 */
      if (typeof(callback) == 'function') {
        callback(); /* 執行指定的函數 */
      }
    };
  };
  /* 無法載入時, 將設定用預設值 */
  scriptToAdd.onerror = function () {
    scriptToAdd.onerror = null; /* 將事件移除 */
    document.getElementsByTagName('head')[0].removeChild(scriptToAdd); /* 移除 script */
    if (typeof callback == 'function') {
      callback(); /* 執行指定的函數 */
    }
  }

  /* 在 head 的最前頭加上前述的 scriptElement */
  var docHead = document.getElementsByTagName("head")[0];
  docHead.insertBefore(scriptToAdd, docHead.firstChild);
};

//將文字以換行字元切割, 第一個用英文播放, 第二個用中文播放
ttsSpeakForWord = function(t) {
  t = t.split(/\n+/);
  ttsSpeak(t[0], 'en-US');
  if(t.length > 1 && t[1].replace(/\s/g, '')!='' && typeof(soundTTS)!='undefined' && soundTTS!=null) {
    soundTTS.queue = [t[1] + '.zh-TW'];
  }
};
ttsSpeakForSentence = function() {
  var txt = document.querySelector('.sentence').textContent;
  if(typeof(soundTTS)!='undefined' && soundTTS!=null && audioIsPlaying(soundTTS)) {
    soundTTS.queue.push( txt + '.en-US');
  } else {
    ttsSpeak(txt);	
  }
};
removeAllChildren = function(el) {
  Array.from(el.children).forEach(e=>e.remove());
};
nextQuestion = function(n, stopSound) {
  if(typeof(stopSound)=='undefined') {
    try{soundTTS.pause();}catch(e){};
  }
  if(typeof(n)!='undefined' && n!=null && !isNaN(n)) {
    n = Number(n);
	if(n < 0) {
	  currentIndex += n;
	} else {
	  currentIndex = n;
	}
  } else {
    //currentIndex = Math.floor(Math.random()*questionLines.length);
	currentIndex++;
  }
  if(currentIndex > questionLines.length-1) {
	currentIndex = 0;
  } else if(currentIndex < 0) {
    currentIndex = questionLines.length-1;
  }
  currentErrors = {};
  
  updateRangeValue(currentIndex);
  
  var eSentence = document.querySelector('.sentence');
  var eTrans =  document.querySelector('.trans');
  var eWords =  document.querySelector('.words');
  var eAnswers =  document.querySelector('.answers');
  removeAllChildren(eWords);
  removeAllChildren(eAnswers);
  document.querySelector('.trans').style.display = 'none';
  eWords.setAttribute('style', '');
  eAnswers.setAttribute('style', '');  
  
  var isVertical = window.innerWidth < window.innerHeight;
  if(isVertical) {
    eWords.classList.toggle('words-v', true);
	eAnswers.classList.toggle('answers-v', true);
	eSentence.parentElement.classList.toggle('question-v', true);
  }
  document.querySelector('.range-wrap').classList.toggle('range-wrap-v', isVertical);
  
  var question = questionLines[currentIndex];
  var q = question[0];
  var t = question[question.length-1];
  var words = [];
  for(var i=1; i<question.length-1; i++) {
	if((match=question[i].match(/\*{2}([^\*]+)\*{2}\s*\:\s*(.*)/))) {
	  words.push([match[1].trim(), match[2].trim()]);
	}
  }
  currentQuestion = {
    q:q,
	t:t,
	words:words
  };
  eSentence.innerHTML = q;
  eTrans.innerHTML = t;
  var offset = 100/(words.length+1);
  var rndList = Array.from({length: words.length}, (x, i) => i);
  rndList.sort(() => (Math.random() > 0.5) ? 1 : -1); //先洗一次順序
  for(var i=0; i<words.length; i++) {
    var w = document.createElement('div');
	w.setAttribute('class', 'card word');
	w.setAttribute('value', words[i][1]);
	w.setAttribute('checked', false);
	w.innerHTML = words[i][0];
	if(isVertical) {
	  w.classList.toggle('card-v', true);
	  w.style.top = Math.floor(offset*(i+1))+'%';
	  w.style.left = '50%';
	} else {
	  w.style.left = Math.floor(offset*(i+1))+'%';
	  w.style.top = '50%';
	}
	eWords.appendChild(w);
    var a = document.createElement('div');
	a.setAttribute('class', 'card answer');
	a.setAttribute('value', words[i][0]);
	a.innerHTML = words[i][1];
	var rnd = Math.floor(Math.random()*rndList.length);
	var rndPos = rndList[rnd];
	rndList.splice(rnd, 1);
	if(isVertical) {
	  a.classList.toggle('card-v', true);
	  a.style.top = Math.floor(offset*(rndPos+1))+'%';
	  a.style.left = '50%';
	} else {
	  a.style.left = Math.floor(offset*(rndPos+1))+'%';
	  a.style.top = '50%';
	}	
	eAnswers.appendChild(a);		
	a.addEventListener('touchstart', startDragHandler);
	a.addEventListener('mousedown', startDragHandler);
    w.onclick = function() {
      ttsSpeakForWord(this.innerText);
    };
  }  
};
addMcqPlayButton = function() {
  var eAnswers =  document.querySelector('.answers');
  var btn = document.createElement('button');
  btn.setAttribute('class', 'circleBtn playBtn');
  btn.innerHTML = '<label>挑戰<br>多選一</label>';
  btn.setAttribute('onclick', 'multipleChoiceQuestions();');
  eAnswers.appendChild(btn);
};
multipleChoiceQuestions = function() {
  var eSentence = document.querySelector('.sentence');
  var eTrans =  document.querySelector('.trans');
  var eWords =  document.querySelector('.words');
  var eAnswers =  document.querySelector('.answers');
  removeAllChildren(eWords);
  removeAllChildren(eAnswers);
  document.querySelector('.trans').style.display = 'none';
  eWords.setAttribute('style', '');
  eAnswers.setAttribute('style', '');
  
  var isVertical = window.innerWidth < window.innerHeight;
  eWords.classList.toggle('words-v', false);
  eAnswers.classList.toggle('answers-v', false);
  eSentence.parentElement.classList.toggle('question-v', isVertical);
  if(isVertical) {
    eWords.style.top = '55%';
	eAnswers.style.bottom = '20%';
  }
  
  var question = questionLines[currentIndex];
  var q = question[0];
  var t = question[question.length-1];
  var words = [];
  for(var i=1; i<question.length-1; i++) {
	if((match=question[i].match(/\*{2}([^\*]+)\*{2}\s*\:\s*(.*)/))) {
	  words.push([match[1].trim(), match[2].trim()]);
	}
  }
  eSentence.innerHTML = q;
  eTrans.innerHTML = t;
  var xOffset = 100/(words.length+1);
  var rnd = Math.floor(Math.random()*words.length);
  for(var i=0; i<words.length; i++) {
    var w = document.createElement('div');
	w.setAttribute('class', 'card word');
	w.setAttribute('value', words[i][1]);
	w.setAttribute('checked', false);
	w.innerHTML = words[i][0];	
	if(isVertical) {  
	  var style = 'min-height:20px;';
	  style += 'line-height:20px;';
	  style += 'font-size:16px;';
	  style += 'left: auto;';
	  style += 'top:auto;';
	  style += 'display:inline-block;';
	  style += 'position:relative;';
	  style += 'transform:none;';
	  style += 'margin:0.25em;';
	  w.setAttribute('style', style);
	} else {
	  w.style.left = Math.floor(xOffset*(i+1))+'%';
	}
	eWords.appendChild(w);
    w.onclick = function() {
      ttsSpeakForWord(this.innerText);
	  checkChoice(this);
    };
  }
  var a = document.createElement('div');
  a.setAttribute('class', 'mcqLabel');
  a.classList.toggle('mcqLabel-v', isVertical);
  a.setAttribute('value', words[rnd][0]);
  a.innerHTML = words[rnd][1];
  eAnswers.appendChild(a);		
  var label = document.createElement('label');
  label.setAttribute('class', 'mcqHint');
  label.innerHTML = '請按一下正確的答案';
  eAnswers.appendChild(label);  
};
checkChoice = function(word) {
  var mcqLabel = document.querySelector('.mcqLabel');
  //if(word.getAttribute('checked')!='true' && word.getAttribute('value')==mcqLabel.innerText) {
  if(word.getAttribute('checked')!='true' && word.innerText==mcqLabel.getAttribute('value')) {
    if(typeof(soundCoin)!='undefined' && soundCoin!=null) {
      audioPlay(soundCoin);
    }
    word.innerHTML += '<br>' + mcqLabel.innerText;
	word.setAttribute('checked', true);
	ttsSpeakForWord(word.innerText);
	var finish = finishCheck();
	if(!finish) {
	  var words = [];
	  Array.from(word.parentElement.children).forEach(w=>{if(w.getAttribute('checked')=='false') words.push(w)});
	  var rnd = Math.floor(Math.random()*words.length);
	  mcqLabel.innerHTML = words[rnd].getAttribute('value');
	  mcqLabel.setAttribute('value', words[rnd].innerText);
	} else {
	  removeAllChildren(mcqLabel.parentElement);
	}
  } else {
    logError(word);
    if(typeof(soundFailure)!='undefined' && soundFailure!=null) {
      audioPlay(soundFailure);
    }
  }
};
rectCollision = function(a, b) {
  var rectA=a.getBoundingClientRect(), rectB=b.getBoundingClientRect();
  var cx = rectB.left + rectB.width/2;  //left 與 x 一樣，但有些瀏覽器只有 left
  var cy = rectB.top + rectB.height/2;  //top 與 y 一樣，但有些瀏覽器只有 top
  return (
    cx > rectA.left && 
	cx < rectA.left + rectA.width &&
	cy > rectA.top &&
	cy < rectA.top + rectA.height
  );
};
rectCollision2 = function(a, b) {
  var rectA=a.getBoundingClientRect(), rectB=b.getBoundingClientRect();
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.height + rectA.y > rectB.y
  );
};
logError = function(word) {
  var w = word.innerText.split(/\n+/)[0];
  if(currentErrors) {
	if(typeof(currentErrors[w])!='number') {
	  currentErrors[w] = 0;
	}
	currentErrors[w]++;
  }
}
finishCheck = function() {
  var words = document.querySelectorAll('.card.word');
  var total = words.length;
  var unchecked = total;
  for(var i=0; i<total; i++) {
    if(words[i].getAttribute('checked')=='true') {
	  unchecked--;
	}
  }
  if(unchecked <= 0) {
    logger['currentIndex'] = currentIndex;
	logger['errors'][currentIndex] = currentErrors;
	updateLog(logger);
	updateRangeValue(currentIndex);
	
	document.querySelector('.trans').style.display = 'block';
    if(typeof(soundFinish)!='undefined' && soundFinish!=null) {
      audioPlay(soundFinish);
    }
	ttsSpeakForSentence();
  }
  return unchecked <= 0;
};
checkAnswer = function(ans) {
  var words = document.querySelectorAll('.card.word');      
  var hit;
  for(var i=0; i<words.length; i++) {
    var w = words[i];
	if(rectCollision(w, ans)) {
	  hit = w;
	  break;
	}
  }
  if(hit && hit.getAttribute('checked')!='true') {
    //if(hit.getAttribute('value')==ans.innerText) {
	if(hit.innerText==ans.getAttribute('value') || hit.getAttribute('value')==ans.innerText) {
      return hit;
	} else {
	  logError(hit);
	}
  }
  return null;
};
parseQuestions = function(data) {
  var questions = data.trim().replace(/\r/g,'').split(/\n\n+/);  
  //console.log(questions);
  var max = 0;
  var maxIndexAt = 0;
  questions.forEach((q,i,a)=>{
	q = q.trim().split(/\n+/);
	q.forEach((s,j)=>q[j]=s.trim().replace(/^(-|\d+\.)\s*/g, ''));
	a[i] = q;
	if(a[i].length > max) {
		max = a[i].length;
		maxIndexAt = i;
	}
  });
  questionLines = questions;
  console.log(questionLines);
  console.log(max, ' : ', questionLines[maxIndexAt]);

  //nextQuestion(currentIndex, true);
};
/**
 * 將元件放到最上層
 * @param {Object}
 */
moveToTop = function(target) {
  var p = target.parentElement;
  var q = [];
  for(var i=p.children.length-1; i>=0; i--) {
    var child = p.children[i];
    if(child == target) {
      break;
    } else {
      q.push(child);
      p.removeChild(child);
    }
  }
  for(var i=q.length-1; i>=0; i--) {
    p.insertBefore(q[i], target);
  }
};
/**
 * 取得多點觸控時，該點的 event
 * 這樣就能只針對該點進行操作，達成支援多點的功能
 * @param {object} event object
 * @return {object} event object
 */
getEvt = function(evt) {
  if (evt.touches) { 
    var id = evt.changedTouches[0].identifier;
    for(i=0; i<evt.touches.length; i++) {		  
      if(evt.touches[i].identifier == id) {
	    return evt.touches[i];
      }
    }
  }
  return evt;
};
startDragHandler = function (e) {  
  soundInit(); //是按下滑鼠者，試著載入音效  
  //var target = e.target || e.touches[0].target;
  //var x = e.clientX || e.touches[0].clientX;
  //var y = e.clientY || e.touches[0].clientY;
  var evt = getEvt(e);
  var target = evt.target;
  var x = evt.clientX;
  var y = evt.clientY;
  
  moveToTop(target);

  e.preventDefault();
  
  var rect = target.getBoundingClientRect();
  var style = getComputedStyle(target);
  var left = style.getPropertyValue('left');
  var top = style.getPropertyValue('top');
  
  //有些瀏覽器 getComputedStyle 不會將百分比轉為 px, 只好自己轉換
  var parentRecc = target.parentElement.getBoundingClientRect();
  if(/%$/.test(left)) {  
    left = Math.floor(parseInt(left)/100*parentRecc.width)+'px';
  }
  if(/%$/.test(top)) { 
    top = Math.floor(parseInt(top)/100*parentRecc.height)+'px';
  }
  
  target.posX = Number(left==''?0:left.match(/([\d-]+)/).pop());
  target.posY = Number(top==''?0:top.match(/([\d-]+)/).pop());
  target.oldPos = [target.posX, target.posY];
  target.offsetX = x - target.posX;
  target.offsetY = y - target.posY;	 
  target.style['cursor'] = 'move';	  	  	
  target.timeStart = new Date();
  if (e.touches) {
    target.removeEventListener('mousedown', startDragHandler);
    target.addEventListener('touchend', endDragHandler);
    target.addEventListener('touchmove', dragHandler);
  } else {
    target.removeEventListener('touchstart', startDragHandler);
    target.addEventListener('mouseup', endDragHandler);	
	target.addEventListener('mouseout', endDragHandler);	
    target.addEventListener('mousemove', dragHandler);
  }
};
dragHandler = function(e) {
  //var target = e.target || e.touches[0].target;  
  //var x = e.clientX || e.touches[0].clientX;
  //var y = e.clientY || e.touches[0].clientY;
  
  var evt = getEvt(e);
  var target = evt.target;
  var x = evt.clientX;
  var y = evt.clientY;
  
  e.preventDefault();
  
  var rect = target.getBoundingClientRect();  
  if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
    target.style['cursor'] = 'move';
    //target.title = '按下後拖曳可以移動';
  } else {
    target.style['cursor'] = 'default';
    //target.title = '';
  }
  target.posX = x - target.offsetX;
  target.posY = y - target.offsetY; 
  target.style['left'] = (target.posX)+'px';	
  target.style['top'] = (target.posY)+'px';
};
endDragHandler = function(e) {  
  //var target = e.target || e.touches[0].target;      
  var evt = getEvt(e);
  var target = evt.target;
  
  target.style['cursor'] = 'default';
  var timeEnd = new Date();
  /*
  if(target.timeStart && (timeEnd - target.timeStart) < 200) {
	//click
  }
  */
  if (e.touches) {
    target.removeEventListener('touchend', endDragHandler);
    target.removeEventListener('touchmove', dragHandler);
  } else {
    target.removeEventListener('mouseup', endDragHandler);
	target.removeEventListener('mouseout', endDragHandler);
    target.removeEventListener('mousemove', dragHandler);
  }  
  //tunePosition(target);
  if((word=checkAnswer(target))) {
    if(typeof(soundCoin)!='undefined' && soundCoin!=null) {
      audioPlay(soundCoin);
    }
	//ttsSpeak(word.textContent);
    //word.innerHTML += '<br>' + target.getAttribute('value');
	word.innerHTML += '<br>' + target.innerText;
	word.setAttribute('checked', true);
	ttsSpeakForWord(word.innerText);
    target.remove();
	var finish = finishCheck();
	if(finish) {
	  addMcqPlayButton();
	}
  } else {
    if(typeof(soundFailure)!='undefined' && soundFailure!=null) {
      audioPlay(soundFailure);
    }
    target.style['left'] = target.oldPos[0]+'px';
	target.style['top'] = target.oldPos[1]+'px';
  }
};
getSelectionText = function() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
};
/**
 * 在 iOS 可能會擷取不到選取的文字，利用 onselectionchange 來保留
 **/
var lastSeletionText = '';
document.onselectionchange = function(e) { 
  var t = getSelectionText();
  if(t!='') lastSeletionText = t;
};
/**
 * 製作查字典的連結,並開啟頁面
 */
dictSearch = function(n) {
  var dictList = [
	'https://dictionary.cambridge.org/zht/dictionary/english-chinese-traditional/', 
	'https://www.merriam-webster.com/dictionary/',
	'https://www.collinsdictionary.com/dictionary/english/'
	];
  if(typeof(n)!='number') n = 0;
  var text = getSelectionText();
  if(text=='') text = lastSeletionText; //如果沒即時抓到選取的文字，用記錄的
  if(text.replace(/\s/g, '')!='') {
    //用連結並以觸發 click 來開啟字典
	var url = dictList[n]+encodeURIComponent(text);
    var anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.setAttribute('target', '_blank');
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(function(){anchor.remove()}, 50);  
  } else {
    showFadeOutMessage('.dictGroup', '請先選取要查字典的文字', 0, '70%', 1.5);
  }

};

rangeInit = function() {
  const wrap = document.querySelector(".range-wrap");
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  range.setAttribute('min', 0);
  range.setAttribute('max', questionLines.length-1);
  range.oninput = function(){setBubble(range, bubble);};
  range.onchange = function(){nextQuestion(this.value);};
  setBubble(range, bubble);
};
updateRangeValue = function(n) {
  const wrap = document.querySelector(".range-wrap");
  const range = wrap.querySelector(".range");
  const bubble = wrap.querySelector(".bubble");
  range.value = n;
  setBubble(range, bubble);
};
setBubbleColor = function(bubble, index) {
  bubble.classList.toggle('orangeQ', false);
  bubble.classList.toggle('greenQ', false);
  if(logger && logger.errors) {
    var e = logger.errors[index];
    if(e) {
	  if(Object.keys(e).length > 0) {
		bubble.classList.toggle('orangeQ', true);
	  } else {
	    bubble.classList.toggle('greenQ', true);
	  }
	}
  }
};
function setBubble(range, bubble) {
  const val = Number(range.value) + 1;
  const min = range.min ? Number(range.min) : 0;
  const max = range.max ? Number(range.max) : 100;
  const newVal = Number(((val - min) * 100) / (max - min));
  bubble.innerHTML = val;
  // Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.15}px))`;
  setBubbleColor(bubble, val-1);
}

/* 製造按鈕按下的動畫, 先縮小, 再復原 */
function clickAni(target, scale) {
  target.style.scale = (scale!=null && !isNaN(scale)?Number(scale):0.85);
  setTimeout(function() {
    target.style.scale = 1;
  }, 100);
};
function getResetedLayer(id) {
  var elm = document.querySelector(id);
  var newone = elm.cloneNode(true);
  elm.parentNode.replaceChild(newone, elm);  
  return document.querySelector(id);
};
/* 淡入後淡出的單行訊息, 在物件的中心點或偏移後顯示 */
function showFadeOutMessage(target, txt, xOffset, yOffset, delay) {
  if(typeof(target)=='string') target = document.querySelector(target);
  if(!target) target = document.querySelector('.topLayer').parentElement;
  var size = getWindowSize()
  var rect = target.getBoundingClientRect();
  if(typeof(xOffset)=='string' && /\%$/.test(xOffset)) {
    xOffset = rect.width * parseInt(xOffset)/100;
  } else if(typeof(xOffset)!='number') xOffset = 0;
  if(typeof(yOffset)=='string' && /\%$/.test(yOffset)) {
    yOffset = rect.height * parseInt(yOffset)/100;
  }else if(typeof(yOffset)!='number') yOffset = 0;
  if(typeof(delay)!='number') delay = 2;
  var cx = rect.left+rect.width/2+xOffset;
  var cy = rect.top+rect.height/2+yOffset;
  var topLayer = getResetedLayer('.topLayer');
  topLayer.setAttribute('class', 'topLayer');  
  topLayer.innerHTML = '<label>'+txt+'</label>';
  topLayer.style.width = '';
  topLayer.style.height = '';
  topLayer.style.display = 'block';
  var rect = topLayer.getBoundingClientRect();
  //新的位置如果超出可顯示的範圍就修正
  if(cx+rect.width/2 > size.width) {
    cx = size.width-rect.width/2-15;
  } else if(cx-rect.width/2 < 0) {
    cx = rect.width/2 + 15;
  }
  if(cy+rect.height/2 > size.height) {
    cy = size.height-rect.height/2-15;
  } else if(cy-rect.height/2 < 0) {
    cy = rect.height/2 + 15;
  }  topLayer.style.left = cx+'px';
  topLayer.style.top = cy+'px';
  topLayer.classList.toggle('stop-animation', false);
  topLayer.classList.toggle('fade-in-out', true);
  setTimeout(function() {
    topLayer.classList.toggle('stop-animation', true);
	topLayer.classList.toggle('fade-in-out', false);
	topLayer.style.display = 'none';
  }, delay*1000);
};
/**
 * 載入設定檔時顯示動畫
 */
loadingAnimation = function (txt, callback) {
    if (typeof(txt) == 'undefined' || txt == null) {
      var txt = "載入檔案中";
    }
    var size = getWindowSize();
    var x = size.width / 2;
    var y = size.height / 2 + 60;
    var loadingLogo = document.createElement('div');
    loadingLogo.id = 'loadingLogo';
    loadingLogo.setAttribute('class', "loading-container");
    loadingLogo.style.top = (y + window.scrollY) + 'px';
    loadingLogo.style.left = x + 'px';

    loadingLogo.innerHTML = '<div class="loading-logo"><p class="loading-label">'+txt+'</p></div>';

    document.body.appendChild(loadingLogo);

    var angle = 10;

    loadingLogoEnable = true;

    var loadingIntervalId = setInterval(function () {
      /* var loadingLogo = document.getElementById('loadingLogo'); */
      loadingLogo.style.top = (y + window.scrollY) + 'px';
      loadingLogo.style.left = x + 'px';
      var label = document.querySelector('.loading-label');
      if (angle != 10) {
        angle = 10;
      } else {
        angle = -10;
      }
      label.style['transform'] = 'translate(10px, -60px) rotate(' + angle + 'deg)';
      if (typeof(loadingLogoEnable) == 'boolean' && !loadingLogoEnable) {
        clearInterval(loadingIntervalId);
        //loadingLogo.parentNode.removeChild(loadingLogo);
	    loadingLogo.remove();
        if (typeof(callback) == 'function') {
          callback();
        }
      }
    }, 100);
};
getWindowSize = function() {
  var clientWidth = window.innerWidth && document.documentElement.clientWidth ? 
    Math.min(window.innerWidth, document.documentElement.clientWidth) 
      : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var clientHeight = window.innerHeight && document.documentElement.clientHeight ? 
    Math.min(window.innerHeight, document.documentElement.clientHeight) 
      : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  return {width:clientWidth, height:clientHeight};
};
/**
 * 
 */
setVisibility = function(enable) {
  var HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
  if(typeof(HTML5FunWrapper)!='undefined' && HTML5FunWrapper!=null) {
    if (enable) {
      //先將捲軸捲到最上方，以免無法進行按下的動作
      window.scrollTo(0,0);
      //禁用捲軸的功能
      window.onscroll = function () { window.scrollTo(0, 0); };
      //讓遊戲全畫面
      document.body.style.overflow = 'hidden';
      HTML5FunWrapper.style.visibility = "visible";
      //如果影音播放器已存在了，就加上鍵盤監控的功能
      //if(mediaPlayer && typeof(mediaPlayer.play)=='function') {
	  //  enableHotkey(true);
      //}
    } else {
      //try{mediaPlayer.pause()}catch(e){}; //試著停止在播放的影音		
      //enableHotkey(false); //移除鍵盤監控
      //重新顯示原有的內容
      HTML5FunWrapper.style.visibility = "hidden";
      //恢復捲軸的功能
      window.onscroll = null;
      document.body.style.overflow = 'visible';	  
      //
      try{if(typeof(set__scale)=='function')set__scale(1)}catch(e){};	  
    }
  }
};
/**
 * 
 */
setViewport = function() {
  //<meta name="viewport" content="initial-scale=1.0,minimum-scale=1,maximum-scale=1.0,user-scalable=no">
  var viewport = document.querySelector("meta[name=viewport]");
  if(typeof(viewport)=='undefined' || viewport==null) {
    viewport = document.createElement('meta');
    viewport.name = 'viewport';
    document.getElementsByTagName('head').item(0).appendChild(viewport);
  }
  var content = 'initial-scale=1.0,minimum-scale=1,' +
           'maximum-scale=1.0,user-scalable=no';
  if ((/android/i).test(navigator.userAgent)) {
    content += ',target-densityDpi=device-dpi';
  }
  viewport.content = content;
};
setMetaReferrer = function() {
  var metaReferrer = null;
  var meta = document.getElementsByTagName('meta');
  for(var nIndex=0; nIndex<meta.length; nIndex++) { 
    if(meta[nIndex].name=="referrer") {
      metaReferrer = meta[nIndex];
      break;
    };
  }
  if(metaReferrer==null) {
    metaReferrer = document.createElement('meta');
    metaReferrer.name = "referrer";
    document.getElementsByTagName('head')[0].appendChild(metaReferrer);
  }
  metaReferrer.content = "no-referrer";
};  
/**
 * 
 */
//取得網址中的某一個參數(已編碼過的)
var gup = function( name , url){
  if(typeof(url)!='string') url = window.location.href
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec(url); 
  if( results == null )    return "";  
  else  return results[1];
};
/**
 * 建立音效物件
 * @param {String} 音效路徑或資料
 * @param {Boolean} 是否使用 baseElement
 * @return {Object} 
 */
audioInit = function(src, isSimple) {
  if(isSimple || typeof(AudioContext)!='function') {
    var baseElement = document.createElement('audio');
    baseElement.preload = true;
    baseElement.loop = false;					
    baseElement.src = src;
    //baseElement.load();
    //baseElement.stop = baseElement.pause;
    return baseElement;
  } else {		
    var audioCtx = new AudioContext();
    var buffer = null;
    var request = new XMLHttpRequest();
    request.open("GET", src);
    request.responseType = "arraybuffer";
    request.onload = function() {
      var undecodedAudio = request.response;
      audioCtx.decodeAudioData(undecodedAudio, (data) => {
        audioCtx.buffer_ = data
      });		
    };
    request.send();
    return audioCtx;
  }
};
/**
 * 播放音效
 * @param {Object} 音效物件
 */
audioPlay = function(audioObj) {
  if( typeof(audioObj)!='undefined' && audioObj!=null ) {
    if(typeof(audioObj.buffer_)=='undefined' && typeof(audioObj.play)!='undefined') {
      audioObj.load();
      if(!audioIsPlaying(audioObj)) {
        audioObj.play();
      }
    } else {
      if(!audioIsPlaying(audioObj)) {
        var source = audioObj.createBufferSource();
        source.buffer = audioObj.buffer_;
        source.connect(audioObj.destination);
        source.start();
      }
    }
  }
};
/**
 * 是否正在播放音效
 * @param {Object} 音效物件
 * @return {Boolean} 
 */
audioIsPlaying = function (audioObj) {
  return audioObj
    && audioObj.currentTime > 0
    && !audioObj.paused
    && !audioObj.ended
    && audioObj.readyState > 2;
};
getLog = function() {
  var data;
  try {
    data = JSON.parse(localStorage.getItem('html5FunEnglish800'));
  }catch(e) {
    console.log(e);
  }  
  if(!data) {
	data = {};
  }
  return data;
};
updateLog = function(data) {
  if(data) {
    try {
      localStorage.setItem('html5FunEnglish800', JSON.stringify(data));
    }catch(e) {
      console.log(e);
    }
  }
};
updateStatistics = function() {
  var html = '';  
  if(logger && logger.errors) {
	var error = 0;
	var finish = 0;
	Object.keys(logger.errors).forEach(function(k){
		var e = logger.errors[k];
		if(e) {
		  if(Object.keys(e).length > 0) {
			error++;
		  } else {
			finish++;
		  }
		}
	});
    var todo = logger.questionLines.length - error - finish;	
	html += '<div class="greenQ">已過關: ' + finish + '</div>';
	html += '<div class="orangeQ">待加強: ' + error + '</div>';
	html += '<div class="todoQ">待完成: ' + todo + '</div>';
  }
  document.querySelector('.statistics').innerHTML = html;
};
resetLogger = function() {
  /*
  if(questionLines) {
    currentIndex = 0;
	logger = {};	
    logger['questionLines'] = questionLines;
    logger['currentIndex'] = currentIndex;
	logger['errors'] = {};
	updateLog(logger);
	nextQuestion(currentIndex);
	rangeInit();
	updateRangeValue(currentIndex);
	try{document.querySelector('.navCloseBtn').click();}catch(e){};
	setTimeout(function() {
	  showFadeOutMessage(null, '<center>已清除記錄，可以重新練習<br>請拖曳藍色的詞卡，放到配對的綠色字卡上</center>', 0, '-15%', 3);
	}, 500);
  }
  */
  localStorage.removeItem('html5FunEnglish800');
  currentIndex = 0;
  logger = {};
  loadQuestions();
  setTimeout(function() {
    showFadeOutMessage(null, '<center><p>已清除記錄，可以重新練習</p>請拖曳藍色的詞卡，放到配對的綠色字卡上</center>', 0, '-15%', 3);
  }, 500);
};
importLogger = function(enable) {
  var selector = document.querySelector('.file-selector');
  if(selector.style.display == 'block' || (typeof(enable)!='undefined' && !enable) ) {
    selector.style.display = 'none';
  } else {
    selector.style.display = 'block';
  }
};
function selectFile(ev) {
    /* 新增 input 的元件, 接收上載的檔案 */
    var inputFromFile = document.createElement('input');
    inputFromFile.setAttribute('type', 'file');
    inputFromFile.setAttribute('accept', '.json');
    inputFromFile.setAttribute('id', 'inputFromFile');
    inputFromFile.style['width'] = '1px';
    inputFromFile.style['height'] = '1px';
    document.body.appendChild(inputFromFile); //要加入頁面中才能觸發 change event
    inputFromFile.onchange = function(e) {			
      if(typeof(e.target)!='undefined' && typeof(e.target.files)!='undefined' && e.target.files.length>0) {
        readLoggerFile(e.target.files);
      }
      inputFromFile.remove();
    };
    inputFromFile.click();
};

function dropHandler(e) {
    /* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop 
       Prevent default behavior (Prevent file from being opened)
    */
    e.preventDefault();
    e.stopPropagation();
    if(typeof(e.dataTransfer)!='undefined' && typeof(e.dataTransfer.files) != 'undefined') {
      readLoggerFile(e.dataTransfer.files);
    } else {
      console.log(e);
    }
};
function dragOverHandler(e) {
    e.preventDefault();
    e.stopPropagation();
};
readLoggerFile = function(files) {
  var reader = new FileReader();
  reader.onload = function() {
    var text = reader.result;
	if(typeof(text)=='string' && text.replace(/\s/g, '')!='') {
	  var json;
	  try {
	    json = JSON.parse(text);
	  }catch(e) {
	    console.log(e);
	  }
	  if(json && typeof(json['questionLines'])!='undefined') {
	    logger = json;
	    questionLines = logger['questionLines'];
	    currentIndex = logger['currentIndex'];
	    nextQuestion(currentIndex, true);
	    rangeInit();
	    updateRangeValue(currentIndex);
		try{document.querySelector('.navCloseBtn').click();}catch(e){};
		setTimeout(function() {
		  showFadeOutMessage(null, '<center>已匯入記錄<br>請拖曳藍色的詞卡，放到配對的綠色字卡上</center>', 0, '-15%', 3);
		}, 500);
	  } else {
	    alert('匯入失敗!!\n\n內容可能有問題');
	  }
	} else {
	  alert('匯入失敗!!');
	}
  };
  reader.readAsText(files[0]);
  importLogger(false); //hide the file drop area
};
exportLogger = function() {
  var json = JSON.stringify(getLog());
  var dataURL = 'data:application/json;base64,' + base64Encode(json);
  var filename = 'english800-' + getNowDateTimeString() + '.json';
  //用連結並以觸發 click 來自動下載圖片
  var anchor = document.createElement('a');	anchor.setAttribute('download', filename);
  anchor.setAttribute('href', dataURL);
  anchor.setAttribute('target', '_blank');
  document.body.appendChild(anchor);
  anchor.click();
  setTimeout(anchor.remove, 100);
};
//get date and time string in yyyy-mm-dd_hh-mm-ss
getNowDateTimeString = function() {
  var prefixZero = function(n) {
    return (n<10 ?'0'+n : n);
  }
  var d = new Date();
  var str = d.getFullYear();
  str += '-'+prefixZero(d.getMonth()+1);
  str += '-'+prefixZero(d.getDate());
  str += '_'+prefixZero(d.getHours());
  str += '-'+prefixZero(d.getMinutes());
  str += '-'+prefixZero(d.getSeconds());
  return str;
};
function u_atob(ascii) {
  return Uint8Array['from'](atob(ascii), function(c){return c.charCodeAt(0)} );
}
function u_btoa(buffer) {
  var binary = [];
  var bytes = new Uint8Array(buffer);
  for (var i = 0, il = bytes.byteLength; i < il; i++) {
    binary.push(String.fromCharCode(bytes[i]));
  }
  return btoa(binary.join(''));
}
function base64Encode(str) {	
  return ( u_btoa(new TextEncoder()['encode'](str)) );
};
function base64Decode(base64Str) {
  if(/base64,/i.test(base64Str)) {
    base64Str = base64Str.split(/base64,/)[1];
  }
  return ( new TextDecoder()['decode'](u_atob(base64Str)) );
};

loadQuestions = function() {
  try{document.querySelector('.navCloseBtn').click();}catch(e){};
  
  if(!logger || !logger['questionLines']) {
    logger = getLog();
  }
  //console.log(logger);
    
  if(!logger['questionLines']) {
    loadJsFromExternalScript(qFile, function() {
      if(typeof(questionLines)=='string' && questionLines.replace(/\s/g, '')!='') {
        parseQuestions(questionLines);
		if(questionLines) {
		  logger['questionLines'] = questionLines;
		  logger['currentIndex'] = currentIndex;
		  logger['errors'] = {};
		}		
      } else {
        alert('question file loaded failure!');
      }	 
	  nextQuestion(currentIndex, true);
	  rangeInit();
	  updateRangeValue(currentIndex);
    });
  } else {
    questionLines = logger['questionLines'];
	currentIndex = logger['currentIndex'];
	nextQuestion(currentIndex, true);
	rangeInit();
	updateRangeValue(currentIndex);
  }
}
set__scale=function(s){
  for(var i=3; i<=10; i++) {
    try{document.querySelector('#aswift_'+i).parentElement.parentElement.style.scale= s}catch(e){};
  }
};
start = async function() {
  
  try{if(typeof(set__scale)=='function')set__scale(0.001)}catch(e){};
 
  setViewport();
  setMetaReferrer();
  setVisibility(true);
  
  window.scrollTo(0, 0);

  showFadeOutMessage(null, '<center>請將藍色卡片拖曳到綠色上</center>', 0, '-15%', 4);  
  
  loadQuestions();  
};  

gameInit = function() {
  //設定記錄檔輸入區 in SideBar 的 drop Events
  var fileSelector = document.querySelector('.file-selector');
  try{
    fileSelector.removeEventListener("drop", dropHandler);
    fileSelector.removeEventListener("dragover", dragOverHandler);
  }catch(e){};
  fileSelector.addEventListener("drop", dropHandler);
  fileSelector.addEventListener("dragover", dragOverHandler);
  
  if(typeof(soundFinish)=='undefined' || soundFinish==null) {
    soundInit();
    audioPlay(soundFinish);
    audioPlay(soundFailure);
    audioPlay(soundCoin);
    if(window['speechSynthesis']) {
	  try {
		ttsVoices = window['speechSynthesis']['getVoices']();
		//console.log(ttsVoices);
	  } catch(e) {  };
	}
  }
  //tts init
  if(window['speechSynthesis']) {
    ttsSpeak('將藍色卡片拖曳到綠色上,加油', 'zh-TW');
  }  
};

function moveHTML5FunWrapper() {
  var el = document.querySelector('#HTML5FunWrapper');
  el.remove();
  document.body.appendChild(el);
};
//為了避免在 Blogger 就執行，檢查網頁標題後再啟動
if(/english/i.test(document.title)) {
  moveHTML5FunWrapper();
}
  
//gameInit(); 
//start();
