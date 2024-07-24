var srtFilename;
var subList;
var mediaPlayer;
var activeIntervalId = null;
var activeInterval = 200;
var ccLang = '';

var bingIG, bingIID, bingKey, bingToken;

appendTrans = async function() {
  var textIsAt = 1;
  var srt = document.querySelectorAll('#gameWrapper .content p');
  var lang = document.querySelector('.langSelect').value;
  if(!srt || srt.length > 0 ) {
    var transBtn = document.querySelector('.transBtn');
    if(transBtn) {
      if(typeof(transBtn.lock)=='boolean' && transBtn.lock) {
        showFadeOutMessage(transBtn, '尚在翻譯中, 請稍候', 150, 25, 1.5);
        return;
      }
      transBtn.lock = true;
      showFadeOutMessage(transBtn, '翻譯中, 請稍候', 150, 25, 1.5);
    }
    if(typeof(bingIG)!='string' || typeof(bingIID)!='string' || typeof(bingKey)!='string' || typeof(bingToken)!='string') {
      await bingTransInit();
    }
    if(typeof(bingIG)!='string' || typeof(bingIID)!='string' || typeof(bingKey)!='string' || typeof(bingToken)!='string') {
      transBtn.lock = false;
      showFadeOutMessage(transBtn, '目前連不上 Bing 翻譯服務', 150, 25, 1.5);
      return;
    }
    try{document.querySelector('.trans-progress-bar').style.display='block'}catch(e){};
    var result = [];
    var text = '';
    for(var i=0; i<srt.length; i++) {
      var n = (i+1) * 100 / srt.length;
      updateProgress('.trans-progress-bar', n);
      document.querySelector('.percentage').innerHTML = Math.ceil(n) + '%';
    
      var subs = srt[i].children[textIsAt].textContent;
      //最多只能翻譯 1000 個字，滿了就翻譯
      if ( (text + subs).length > 1000-100 || i>=srt.length-1 ) {
        if( i>=srt.length-1 ) {
          text += subs.trim() + ' ==--== \n';
        }
        //console.log(text);
        
        var trans = await bingTranslate(text, 'auto-detect', lang);
        //console.log(trans);
        //console.log('--> ',i);
        if(typeof(trans)=='string') {
          var t = trans.trim().split(/\n/);
          if(t.length == text.trim().split(/\s*==-*==\s*/).length-1 ) {
            trans = t;
          } else {
            trans = trans.trim().split(/\s*==-*==\s*/);
          }
          trans.forEach( t=>result.push(t.replace(/\s*==(\s*-\s*)*==\s*/g, '').trim()) );
        }
        text = subs.trim() + ' ==--== \n';
      } else {
        text += subs.trim() + ' ==--== \n';
      }
    }
    
    updateProgress('.trans-progress-bar', 100);
    try{document.querySelector('.trans-progress-bar').style.display='none'}catch(e){};
    
    result = result.filter(t=>t.replace(/\s/g,'')!='');
    var text = '';
    for(var i=0; i<srt.length; i++) {
      var subs = srt[i];
      if( subs && typeof(result[i])=='string' && result[i].replace(/\s/g, '') != '' ) {
        subs.innerHTML += '<label class="trans lang-' + lang  +'">' + result[i] + '</label>';	
      }
    }
    var langGroup = document.querySelector('.langGroup');
    var btn = document.createElement('button');
    btn.setAttribute('class', 'roundBtn');
    btn.setAttribute('lang', lang);
    btn.innerHTML = '<label>隱藏-' + langCodes[lang].substring(0, 2) + '</label>';
    btn.setAttribute('onclick', 'displayLang(this)');
    langGroup.appendChild(btn);
    if(transBtn) {
      transBtn.lock = false;
      transBtn.title = '按這裡加入新的翻譯';
    }
  }	
};
displayLang = function(el) {
  var lang = el.getAttribute('lang');
  var label = el.children[0].textContent;
  if(/隱藏/.test(label)) {
    el.children[0].textContent = label.replace(/隱藏/, '顯示');
    document.querySelectorAll('.lang-'+lang).forEach(t=>t.style.display='none');
    try{document.querySelector('.playerWrapper .caption2').innerHTML=''}catch(e){}; //試著清除影片的翻譯字幕
  } else {
    el.children[0].textContent = label.replace(/顯示/, '隱藏');
    document.querySelectorAll('.lang-'+lang).forEach(t=>t.style.display='block');
  }
  //document.querySelectorAll('.lang-'+lang).forEach(t=>t.classList.toggle('hidden'));
};
var langCodes = {"zh-Hant":"中文 (繁体)","en":"英语","ja":"日语","ko":"韩语","fr":"法语","fr-CA":"法语 (加拿大)","de":"德语","it":"意大利语","zh-Hans":"中文 (简体)","vi":"越南语","bho":"Bhojpuri","brx":"Bodo","hne":"Chhattisgarhi","lzh":"Chinese (Literary)","doi":"Dogri","lug":"Ganda","ikt":"Inuinnaqtun","iu-Latn":"Inuktitut (Latin)","ks":"Kashmiri","gom":"Konkani","mn-Cyrl":"Mongolian (Cyrillic)","mn-Mong":"Mongolian (Traditional)","nya":"Nyanja","run":"Rundi","st":"Sesotho","nso":"Sesotho sa Leboa","tn":"Setswana","hsb":"上索布语","dsb":"下索布语","da":"丹麦语","uk":"乌克兰语","uz":"乌兹别克语","ur":"乌尔都语","nb":"书面挪威语","hy":"亚美尼亚语","ig":"伊博语","ru":"俄语","bg":"保加利亚语","sd":"信德语","si":"僧伽罗语","tlh-Latn":"克林贡语 (拉丁文)","hr":"克罗地亚语","otq":"克雷塔罗奥托米语","is":"冰岛语","gl":"加利西亚语","ca":"加泰罗尼亚语","hu":"匈牙利语","af":"南非荷兰语","kn":"卡纳达语","rw":"卢旺达语","hi":"印地语","id":"印度尼西亚语","gu":"古吉拉特语","kk":"哈萨克语","iu":"因纽特语","tk":"土库曼语","tr":"土耳其语","ty":"塔希提语","sr-Latn":"塞尔维亚语 (拉丁文)","sr-Cyrl":"塞尔维亚语 (西里尔文)","or":"奥里亚语","cy":"威尔士语","bn":"孟加拉语","yua":"尤卡特克玛雅语","ne":"尼泊尔语","ba":"巴什基尔语","eu":"巴斯克语","he":"希伯来语","el":"希腊语","ku":"库尔德语 (中)","kmr":"库尔德语 (北)","lv":"拉脱维亚语","cs":"捷克语","ti":"提格利尼亚语","fj":"斐济语","sk":"斯洛伐克语","sl":"斯洛文尼亚语","sw":"斯瓦希里语","pa":"旁遮普语","ps":"普什图语","ln":"林加拉语","ky":"柯尔克孜语","ka":"格鲁吉亚语","mi":"毛利语","to":"汤加语","fo":"法罗语","pl":"波兰语","bs":"波斯尼亚语","fa":"波斯语","te":"泰卢固语","ta":"泰米尔语","th":"泰语","ht":"海地克里奥尔语","ga":"爱尔兰语","et":"爱沙尼亚语","sv":"瑞典语","zu":"祖鲁语","xh":"科萨语","lt":"立陶宛语","yue":"粤语 (繁体)","so":"索马里语","yo":"约鲁巴语","sn":"绍纳语","ug":"维吾尔语","my":"缅甸语","ro":"罗马尼亚语","lo":"老挝语","fi":"芬兰语","mww":"苗语","nl":"荷兰语","fil":"菲律宾语","sm":"萨摩亚语","pt":"葡萄牙语 (巴西)","pt-PT":"葡萄牙语 (葡萄牙)","bo":"藏语","es":"西班牙语","ha":"豪萨语","prs":"达里语","mai":"迈蒂利语","dv":"迪维希语","az":"阿塞拜疆语","am":"阿姆哈拉语","sq":"阿尔巴尼亚语","ar":"阿拉伯语","as":"阿萨姆语","tt":"鞑靼语","mk":"马其顿语","mg":"马拉加斯语","mr":"马拉地语","ml":"马拉雅拉姆语","ms":"马来语","mt":"马耳他语","km":"高棉语"};
makeLangSelector = function() {
  var selector = document.querySelector('.langSelect');
  var html = '';
  if(selector.children.length == 0) {
    var codes = Object.keys(langCodes);
    for(var i=0; i<codes.length; i++) {
      html += '<option value="' + codes[i] + '">' + langCodes[codes[i]] + '</option>\n';
    }
    selector.innerHTML = html;
  }
};
getLangCode = function(tl) {
  // Automatic ISO country code
  if( tl.match(/^ar/) )  
    tl = "ar-EG";
  else if( tl.match(/^da/) ) 
    tl = "da-DK";
  else if( tl.match(/^de/) ) 
    tl = "de-DE";
  else if( tl.match(/^en/) ) 
    tl = "en-US";
  else if( tl.match(/^es/) ) 
    tl = "es-ES";
  else if( tl.match(/^fi/) ) 
    tl = "fi-FI";
  else if( tl.match(/^fr/) ) 
    tl = "fr-FR";
  else if( tl.match(/^it/) ) 
    tl = "it-IT";
  else if( tl.match(/^ja/) ) 
    tl = "ja-JP";
  else if( tl.match(/^ko/) ) 
    tl = "ko-KR";
  else if( tl.match(/^nl/) ) 
    tl = "nl-NL";
  else if( tl.match(/^nb/) ) 
    tl = "nb-NO"; // Norwegian Bokmål
  else if( tl.match(/^pl/) ) 
    tl = "pl-PL";
  else if( tl.match(/^pt/) ) 
    tl = "pt-PT";
  else if( tl.match(/^ru/) ) 
    tl = "ru-RU";
  else if( tl.match(/^sv/) ) 
    tl = "sv-SE";
  else if( tl.match(/^zh/) ) 
    tl = "zh-CN";
  return tl; 
};
bingTransInit = async function() {	
  var timeout = 2500; 
  var html = '';
  var nocache = '&nocache=' + new Date().getTime();
  var url = 'https://www.bing.com/translator/?from=en&to=zh-Hant&text=TEST'+nocache;
  url = 'https://corsproxy.io/?'+encodeURIComponent(url);
  try {
    var controller = new AbortController();
    var timeoutId = setTimeout(()=>controller.abort(), 2500);
    var res = await fetch(url, {signal:controller.signal});
    clearTimeout(timeoutId);
    //var cookie = await res.headers.get('Set-cookie')
    //console.log(cookie)
    html = await res.text();
    //console.log(html)
  } catch(e) {
    html = '';
    //alert(e);
  }
  if(html!='') {
    bingIG = html.match(/IG:"([^"]+)"/)[1]
    bingIID = html.match(/data-iid="([^"]+)"/)[1]
    tokens = html.match(/params_AbusePreventionHelper\s*=\s*\[(\d+),"([^"]+)",\d+\];/)
    bingKey = tokens[1];
    bingToken = tokens[2];
  }
};
/**
 * https://www.bing.com/ttranslatev3?isVertical=1&&IG=B5A9CA9E83F7495D9ABE7757267BF0C7&IID=translator.5026
 */ 
bingTranslate = async function(text, from='en', to='zh-Hant') {
  text = encodeURIComponent(text)
  var payload = `key=${bingKey}&token=${bingToken}&fromLang=${from}&to=${to}&text=${text}&tryFetchingGenderDebiasedTranslations=true`;
  var headers = {
    "Content-Type" : "application/x-www-form-urlencoded",
    //"Cookie" : cookie,
  };
  var url = 'https://www.bing.com'; 
  var path = `/ttranslatev3?isVertical=1&IG=${bingIG}&IID=${bingIID}`;
  url += path;
  var nocache = '&nocache=' + new Date().getTime();
  url += nocache;
  //url = 'https://api.cors.lol/?url='+url;	//這個只能用在 .text() 的
  url = 'https://corsproxy.io/?'+encodeURIComponent(url);
  var data;
  try {
    var res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: payload
    });
    data = await res.json();
  }catch(e) {
    data = null;
  }
  if(data && data[0] && data[0]['translations']) {
    data = data[0]['translations'][0]['text'];
  }
  return data;
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
    } else {
      try{mediaPlayer.pause()}catch(e){}; //試著停止在播放的影音		
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


srtParser = function(lines) {
	//var pattern = '\\d+\\n([\\d\\:\\-\\>\\,\\.\\ ]+)\\n([^\\n\\n]+)\\n\\n';
	var pattern = '\\d+\\n([\\d\\:\\,\\.]+)\\s*-->\\s*([\\d\\:\\,\\.]+)\\s*\\n(([^\\n]+\\n)+)\\n';
	var re = new RegExp(pattern, 'g');
	subs = lines.replace(/\r/g, '').match(re);
	var srt = [];
	if(subs) {
		for(var i=0; i<subs.length; i++) {
			var match = subs[i].match(new RegExp(pattern));
			if(match && match.length >= 3) {
				srt.push({start:match[1], end:match[2], text:match[3]});
			}
		}
	}	
	return srt;
};
clickHandler = function (ev) {
  /* 新增 input 的元件, 接收上載的檔案 */
  var inputFromFile = document.createElement('input');
  inputFromFile.setAttribute('type', 'file');
  inputFromFile.setAttribute('multiple', 'multiple');
  inputFromFile.setAttribute('accept', '.txt,.srt,.mp3,.mp4,.mkv,.mov,.avi,.webm');
  inputFromFile.setAttribute('id', 'inputFromFile');
  inputFromFile.style['width'] = '1px';
  inputFromFile.style['height'] = '1px';
  inputFromFile.onchange = function (e) {
    if (typeof(e.target) != 'undefined' && typeof(e.target.files) != 'undefined' && e.target.files.length > 0) {
      readFiles(e.target.files);
    }
  };
  inputFromFile.click();
};

dragOverHandler = function (ev) {
  ev.preventDefault();
};

dropHandler = function (ev) {
  /* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  Prevent default behavior (Prevent file from being opened)
   */

  ev.preventDefault();
  if (typeof(ev.dataTransfer) != 'undefined' && typeof(ev.dataTransfer.files) != 'undefined' && ev.dataTransfer.files != null) {
    readFiles(ev.dataTransfer.files);
  } else {
    alert('請上載字幕檔，才能處理');
  }
};

readFiles = function (files) {
  if (typeof(files) != 'undefined' && files.length > 0) {
    for(var i=0; i<files.length && i<2; i++) {
      var file = files[i];
      if (file.size > 0) {
        var reader = new FileReader();
        //console.log(file);
        mimeType = file.type;
        reader.mimeType = file.type; /* 記錄一下 file.type */
        if( (mimeType!='' && /audio|video/i.test(mimeType)) || /\.(mp3|mp4|mkv|mov|avi|webm)$/i.test(file.name) ) {
          var blob = window.URL.createObjectURL(file);
          //updateMediaPlayer(file.name, file.type);
          if(mimeType=='' && /\.(mp4|mkv|mov|avi|webm)$/i.test(file.name)) mimeType = 'video';
          updateMediaPlayer(blob, mimeType);
        } else {
          reader.readAsText(file); //reader.readAsDataURL(file);	/* 以 DataURL base64編碼的資料 */
          reader.onloadend = function (e) {
            updateContent(this.result, file.name); /* 取得資料,並轉換格式 */
          };
        }
      } else {
        alert('請上載文字檔，才能處理');
      }
    }
  }
  openImportPanel(); //關閉新增媒材的選單
};
applyYTsample = function() {
  var input = document.querySelector('.ext-input-field input');
  if(input) {
    input.value = 'https://www.youtube.com/watch?v=sKXEfmV6xro';
    showFadeOutMessage('.yt-sample', '已將網址填好，請按 [下一步] 鈕', '50%', '300%', 1);
  }  
};
updateYTurl = async function() {
  var ytLangSelector = document.querySelector('.yt-lang-selector');
  var input = document.querySelector('.ext-input-field input');
  if(input && input.value.replace(/\s/g, '')!='' ) {
    if( parseYoutubeURL(input.value) && ytLangSelector ) {
      var ytUrl = input.value;
      //擷取字幕,並製作選單
      if(ytLangSelector.innerHTML == '') {
        var captionTracks = await getYTcaptionTracks(ytUrl);
        console.log(captionTracks);
        if(captionTracks) {
          var html = '<label>字幕語言: </label>';
          html += '<select id="subtitle">';
		  var option = '';
          for(var i=0; i<captionTracks.length; i++) {
            option += '<option value="' + captionTracks[i]['baseUrl'] + '">';
            option += captionTracks[i]['name']['simpleText'];
            option += '</option>';
          }
          html += option;
          html += '</select>';
          if(captionTracks.length > 1) {
            html += '<br>';
            html += '<label>第二字幕: </label>';
            html += '<select id="subtitle2">';
            html += '<option value="">XXX 不使用 XXX</option>';
            html += option;
            html += '</select>';
          }
        } else {
          var html = '<br><label>此影片無任何字幕，影片載入後請自行匯入</label>';
        }
        ytLangSelector.innerHTML = html;
        try{document.querySelector('.yt-sample').classList.toggle('hidden', true)}catch(e){};
      } else {
        var lang = ytLangSelector.querySelector('#subtitle');
        if(lang && lang.value!='') {
          //var checked = Array.from(ytLangSelector.querySelectorAll('option')).find(o=>o.selected);
          ccLang = gup('lang', lang.value);
          //var srt = await getYTsubtitle(ytUrl, lang);
          var srt = await getYTcaptionByBaseUrl(lang.value);
          //console.log(srt);
          updateContent(srt);
          //2nd SRT
          var lang2 = ytLangSelector.querySelector('#subtitle2');
          if(lang2 && lang2.value!='') {
            ccLang2 = gup('lang', lang2.value);
            var srt2 = await getYTcaptionByBaseUrl(lang2.value);
            //console.log(srt2);
            //var langName = lang2.options[lang2.selectedIndex].textContent;
            appendSrt2(srt2, ccLang2);
          }
        }
        updateMediaPlayer(ytUrl);
        inputYTurl(false); //close input box
      }
    } else if(/\.(mp3|mp4|mkv|mov|avi|webm)/i.test(input.value) ) {
      //非 YT 的網址,但網址中帶有影音的附檔名, 試著載入
      var type = /\.mp3/i.test(input.value)?'audio':'video';
      updateMediaPlayer(input.value, type);
      inputYTurl(false); //close input box
    } else {
      inputYTurl(false); //close input box
    }
  } else {
    inputYTurl(false); //close the input block
  }
};
appendSrt2 = function(srt2, lang) {
  if(srt2) {
    var srt = document.querySelectorAll('#gameWrapper .content p');
    for(var i=0, j=0; i<srt.length; i++) {
      var start = Number(srt[i].getAttribute('start'));
      var end = Number(srt[i].getAttribute('end'));
      var txt = '';
      for(var k=j; k<srt2.length; k++) {
        var s2 = srt2[k];
        var start2 = toSecond(s2.start);
        var end2 = toSecond(s2.end);
        if(start2 >= start && start2 < end) {
          txt += s2.text.trim();
        } else if(start2 >= end) {
          j = k;
          break;
        }
      }
      if(txt!='') {
        var label = '<label class="trans lang-' + lang  +'">' + txt + '</label>';
        srt[i].insertAdjacentHTML('beforeend', label);
      }
    }
    var langGroup = document.querySelector('.langGroup');
    var btn = document.createElement('button');
    btn.setAttribute('class', 'roundBtn');
    btn.setAttribute('lang', lang);
    btn.innerHTML = '<label>隱藏-' + lang + '</label>';
    btn.setAttribute('onclick', 'displayLang(this)');
    langGroup.appendChild(btn);	
  }
};
updateMediaPlayer = function(mediaPath, type) {
	if(typeof(mediaPlayer)!='undefined' && typeof(mediaPlayer.destroy)=='function') {
		mediaPlayer.destroy();
		delete mediaPlayer;
	}
	var p = document.querySelector('.playerWrapper');
	if(p) {
		p.classList.toggle('hidden', true);
		p.classList.toggle('video-player-large', false);
		try{p.removeEventListener('touchstart', startDragHandler);}catch(e){};
		try{p.removeEventListener('mousedown', startDragHandler);}catch(e){};
	}
	var speedBox = document.querySelector('.speed-box');
	if(speedBox) {
		try{speedBox.removeEventListener('touchstart', startDragHandler);}catch(e){};
		try{speedBox.removeEventListener('mousedown', startDragHandler);}catch(e){};			
	}
	if( typeof(mediaPath)=='string' && parseYoutubeURL(mediaPath) ) {
		mediaPlayer = new YOUTUBE(mediaPath, () => {
			if (mediaPlayer.onPlayPauseCallback) {
				mediaPlayer.onPlayPauseCallback(mediaPlayer.getStatus());
				mediaPlayHandler();
			}
		});
	} else if(/audio|video/i.test(type)) {
		mediaPlayer = new AVplayer(mediaPath, type);
		mediaPlayHandler();
	} else {
		try{document.querySelector('.playBtnGroup').classList.toggle('hidden', true);}catch(e){};
	}
	if(mediaPlayer) {
	   try{document.querySelector('.play-progress-bar').classList.toggle('hidden', false)}catch(e){};
	
		var playBtn = document.querySelector('.playBtn');
		if(playBtn) {
			playBtn.onclick = mediaPlayHandler;
			try{document.querySelector('.playBtnGroup').classList.toggle('hidden', false);}catch(e){};
		}
		var speedBox = document.querySelector('.speed-box');
		if(speedBox) {
			speedBox.classList.toggle('hidden', false);
			speedBox.querySelector('input').value = 1;
			speedBox.addEventListener('touchstart', startDragHandler);
			speedBox.addEventListener('mousedown', startDragHandler);
		}
		showFadeOutMessage(null, '<center>加上字幕文字後<br>按文字左側的「三角形」可播放<br>按空白的地方可暫停</center>', 0, '-5%', 5);
		
		mediaPlayer.onPlayPause = function(callback) {
			mediaPlayer.onPlayPauseCallback = callback;
		};
		mediaPlayer.onPlayPause(status => {
			if (status === 'playing'){
				console.log('>>> playing');
				if(activeIntervalId == null) {
					activeIntervalId = setInterval(activeHandler, activeInterval);
				}				
			} else {
				console.log('>>> pause');
				if(activeIntervalId != null) {
					clearInterval(activeIntervalId);
					activeIntervalId = null;
				}
			}
		});		
		/*
		mediaPlayer.playPause = function () {
			if (mediaPlayer.getStatus() !== 'playing'){
				mediaPlayer.play();
				console.log('> play');
			} else {
				mediaPlayer.pause();
				console.log('> pause');
			}
		};
		*/
	}
    openImportPanel(false);	
	return;
};
toSecond = function(str) {
	//var n = str.split(/[:,.]/);
	var n = 0;
	if(typeof(str)=='string') {
		var t = str.split(':');
		var max = t.length;		
		if(max>0) {
			var s = t[max-1].split(/[\.,]/);
			n = Number(s[0]);
			if(typeof(s[1])!='undefined') {
				n += Number(s[1])/1000;
			}
			if(max-2 >= 0) n += Number(t[max-2])*60;
			if(max-3 >= 0) n += Number(t[max-3])*60*60;
			if(max-4 >= 0) n += Number(t[max-3])*60*60*24;
		}
	} else {
		n = str;
	}
	return n; 
};
updateContent = function(src, filename) {
	try{mediaPlayer.pause()}catch(e){console.log(e)}; //試著停止在播放的影音	
	var content = document.querySelector('#gameWrapper .content');
	if(typeof(src)=='string') {
		subList = srtParser(src); 
	} else if(typeof(src)!='undefined'){
		subList = src;
	}
	srtFilename = filename;
	var html = '';
	if(content && subList && subList.length > 0) {
		subList.forEach(s=>{
			html += '<p ' + 'start="' + toSecond(s.start) + '" end="' + toSecond(s.end) + '">';
			//html += s.start + '~' + s.end;
			//html += '<br>';
			html += '<span class="arrow-left" title="從這裡開始播放"></span>';
			var t = s.text.trim().split(/\n/);
			t.forEach(tt=>{
				html += '<label>';
				html += tt;
				html += '</label>'
				//html += '<br>';
			});
			html += '</p>';
		});
		content.innerHTML = html;
		content.scrollTop = 0;
		
		//'camels-04-05.srt'.math(/(.*)\.srt$/)
		/*
		if(typeof(srtFilename)=='string') {
			var mediaFile = ''
			if( (match=srtFilename.match(/([^-]+)(-.*)\.srt$/)) ) {
				mediaFile = match[1] + '/' + match[1]+match[2]+'.mp3';
			}
			if( (match=srtFilename.match(/([^-]+)(-.*)\.srt$/)) ) {
				mediaFile =  match[1]+match[2]+'.mp4';
			}
			if(typeof(mediaPlayer)=='undefined' || mediaPlayer == null) {			
				//mediaPlayer = audioInit(mediaFile, true);
				mediaPlayer = new AVplayer(mediaFile);
			} else {
				//mediaPlayer.src = mediaFile;
				mediaPlayer.setSrc(mediaFile);
			}
		}
		*/

		var fileUpload = document.querySelector('.fileUpload');
		if(fileUpload) fileUpload.classList.toggle('hidden', true);
		var uploadBtn = document.querySelector('.uploadBtn');
		if(uploadBtn) {
			uploadBtn.classList.toggle('hidden', false);
			uploadBtn.onclick = function() { 
				var fileUpload = document.querySelector('.fileUpload');
				if(fileUpload) fileUpload.classList.toggle('hidden', false);
			};
		}
		var transBtn = document.querySelector('.transBtn');
		if(transBtn) {
			transBtn.classList.toggle('hidden', false);
			transBtn.onclick = appendTrans;
		}
		var langSelect = document.querySelector('.langSelect');
		if(langSelect) {
			langSelect.classList.toggle('hidden', false);
		}
		var langGroup = document.querySelector('.langGroup');
		if(langGroup) {
			langGroup.classList.toggle('hidden', false);
		}
		var langGroup = document.querySelector('.langGroup');
		if(langGroup) {
			//langGroup.innerHTML = '';
			langGroup.querySelectorAll('button').forEach(e=>e.remove());
			try{document.querySelector('.trans-progress-bar').style.display='none'}catch(e){};
	
		}
		//if(activeIntervalId == null) {
		//	activeIntervalId = setInterval(activeHandler, activeInterval);
		//}
		
		showFadeOutMessage(null, '<center>加上影音後<br>按文字左側的「三角形」可播放該句<br>按空白的地方可暫停</center>', 0, '-5%', 4);
	}
		
	//console.log(subList);
	//console.log(srtFilename);
};
autoScroll = function(el) {
	var c = document.querySelector('#gameWrapper .content');
	var vHeight = c.offsetHeight;
	var y = el.getBoundingClientRect().y;
	var h = el.clientHeight;
	var bottom = parseInt(getComputedStyle(el)['marginBottom']);
	//console.log(y + h + bottom , vHeight);
	if( y + h + bottom >= vHeight ) {
		c.scrollBy({
			top: y - (h + bottom)*2,
			behavior: "smooth",
		});
	} else if( y < 0 ) {
		c.scrollBy({
			top: y - (h + bottom)*2
		});
	}
};
mediaPlayHandler = function(e) {
	if(e) {
		//如果有傳 e , 表示為按播放鈕的, 就控制播放、暫停
		if( mediaPlayer.getStatus() != 'playing' ) {
			mediaPlayer.play();
		} else {
			mediaPlayer.pause();
		}
	}
	//改變按鈕上的文字及控制是否監聽播放狀態後設定播放中的字幕
	var label = document.querySelector('.playBtn label');
	var status = mediaPlayer.getStatus();
	if (status === 'playing'){
		if(label) label.innerHTML = '停止';		
		if(activeIntervalId == null) {
			activeIntervalId = setInterval(activeHandler, activeInterval);
		}
	} else {
		if(label) label.innerHTML = '播放';
		if(activeIntervalId != null) {
			clearInterval(activeIntervalId);
			activeIntervalId = null;
			
		}
	}
	activeHandler();
};
updateProgress = function(e, n) {
  var bar = document.querySelector(e);
  if(bar) {
    var bg = 'radial-gradient(closest-side, white 79%, transparent 80% 100%),';
    bg += 'conic-gradient(#F7DC6F ' + n + '%, palegreen 0)';
    bar.style.background = bg;
  }
};
activeHandler = function() {
  if( mediaPlayer && mediaPlayer.getStatus()=='playing' ) {
    var currentTime = mediaPlayer.getTime();
    var dur = mediaPlayer.getLength();
    if(typeof(currentTime)=='number' && currentTime<dur) {
      var n = dur>0?currentTime*100/dur:0;
      updateProgress('.play-progress-bar', n);
      var content = document.querySelector('#gameWrapper .content');
      if( content && content.children.length > 1 ) {
        for(var i=0; i<content.children.length; i++) {
          var p = content.children[i];
          var start = Number(p.getAttribute('start'));
          var end = Number(p.getAttribute('end'));
          if(currentTime >= start && currentTime <= end) {
            document.querySelectorAll('.timeActive').forEach(a=>a.classList.toggle('timeActive', false));
            p.classList.toggle('timeActive', true);
					
            autoScroll(p);
					
            //更新影片第二字幕的內容
            var cc2 = document.querySelector('.playerWrapper .caption2');
            var isLarge = document.querySelector('.playerWrapper.video-player-large');
            var trans = p.querySelector('.trans');
            if(cc2) {
              var displayTrans = (trans && trans.style.display!='none');
              cc2.innerHTML = displayTrans && isLarge?trans.innerHTML:'';
            }
            break;
          }
        }
      }
    } else {
      mediaPlayer.pause();
      updateProgress('.play-progress-bar', 100);
      mediaPlayHandler();
    }
  } else {
		//非播放中或沒字幕，就全部設為非正播放中的字句
		document.querySelectorAll('.timeActive').forEach(a=>a.classList.toggle('timeActive', false));
  }
};
contentOnClickHandler = function(e) {
	var target = e.target;	
	//if(target.tagName.toLowerCase() == 'label') {
	if(target.classList.contains('arrow-left')) {
		target = target.parentElement;
		var start = target.getAttribute('start');
		if(mediaPlayer && typeof(start)!='undefined' && start != null && !isNaN(start)) {
			//if( !audioIsPlaying(mediaPlayer) ) {
			//	audioPlay(mediaPlayer);
			//}
			//mediaPlayer.currentTime = Number(start);
			if(mediaPlayer.getStatus() != 'playing') {
				mediaPlayer.play();
			}
			mediaPlayer.setTime(Number(start));
			mediaPlayHandler();
		} else {
			showFadeOutMessage(target.parentElement, '無法播放, 請先載入影音', 0, 0, 1);
		}
	} else {
	    if(mediaPlayer && typeof(mediaPlayer.pause)=='function') {
			mediaPlayer.pause();
			mediaPlayHandler();
		}
	}
};

/**
 * audio / video Player
 */
var AVplayer = function(src, type) {
	//var type = /\.mp3$/i.test(src.trim()) ? 'audio' : 'video';
	if((type && /audio/i.test(type)) || /\.mp3$/i.test(src.trim())) {
		type = 'audio';
	} else {
		type = 'video';
	}
	var player = {};
    player.element = document.createElement(type);
    player.element.preload = true;
    player.element.loop = false;					
    player.element.src = src;
	if(type=='video') {
		player.element.className = 'video-player';
		//document.querySelector('#gameWrapper').appendChild(player.element);
		//player.element.onclick = function(e) {player.element.classList.toggle('video-player-large')};
		var p = document.querySelector('.playerWrapper');
		p.classList.toggle('hidden', false);
		p.appendChild(player.element);
		//p.onclick = function(e) {p.classList.toggle('video-player-large')};
		p.addEventListener('touchstart', startDragHandler);
		p.addEventListener('mousedown', startDragHandler);
	}
	player.setSrc = function(src) {
		player.element.src = src;
	};
    player.play = function() {
        player.element.play();
        player.status = 'playing';
    }
    player.pause = function() {
        player.element.pause();
        player.status = 'paused';
    }
    player.getTime = function() {
        return player.element.currentTime;
    }
    player.setTime = function(time) {
        player.element.currentTime = time;
    }
    player.getStatus = function() {
        return player.status;
    }
    player.getLength = function() {
        return player.element.duration;
    }
    player.isReady = function() {
        return (!player.element.destroyed && (!isNaN(player.element.duration)) && (player.element.readyState === 4));
    }
    player.getSpeed = function() {
        return player.element.playbackRate;
    }
    player.setSpeed = function(speed){
        return player.element.playbackRate = speed;
    }
    player.destroy = function(){
		player.pause();
        player.element.remove();
    	delete player.element;
    	player.destroyed = true;
    }
	return player;
};

var YOUTUBE = function(source, playPauseCallback) {        
	var player = {};
	player.element = document.createElement('div');
	player.element.setAttribute('id','oTplayerEl');
	player.element.className = 'video-player';
	//document.querySelector('#gameWrapper').appendChild(player.element); 
	document.querySelector('.playerWrapper').classList.toggle('hidden', false);
	document.querySelector('.playerWrapper').appendChild(player.element); 
	
			
	loadScriptTag(() => {        
		var videoId = parseYoutubeURL(source);
		player._ytEl = new YT.Player('oTplayerEl', {
			width: '100%',
			videoId: videoId,
			playerVars: {
				// controls: 0,
				cc_load_policy: 1,
				hl: ccLang,
				cc_lang_pref: ccLang,
				disablekb: 1,
				fs: 0,
				rel: 0,
				modestbranding: 1
			},
			events: {
				'onReady': onYTPlayerReady.bind(player),
				'onStateChange': onStateChange.bind(player)
			}
		});        
		function onStateChange (ev){
			var status = ev.data;
			if (status === 1) {
				player.status = 'playing';
			} else {
				player.status = 'paused';
			}
			playPauseCallback();
		}
		function onYTPlayerReady() {
			// fix non-responsive keyboard shortcuts bug
			//$('input.speed-slider').val(0.5).change().val(1).change();

			// Some YouTube embeds only support normal speed
			//if (player._ytEl.getAvailablePlaybackRates()[0] === 1) {
			//    $('.speed-box').html('This media only supports 1x playback rate. Sorry.');
			//}

			player.duration = player._ytEl.getDuration();
			
			setTimeout(() => {
				// kickstart youtube
				player.play();
				setTimeout(() => {
					player.pause();
					
					player._isReady = true;
					window._ytEl = player._ytEl;
				},500);
				
				//var v = document.querySelector('.video-player');
				//v.onclick = function(e) {v.classList.toggle('video-player-large')};
				var p = document.querySelector('.playerWrapper');
				//p.onclick = function(e) {p.classList.toggle('video-player-large')};
				p.addEventListener('touchstart', startDragHandler);
				p.addEventListener('mousedown', startDragHandler);

	
			},1000);
		}
	});
	function loadScriptTag(callback) {
		// import YouTube API
		if ( window.YT === undefined ) {
			var tag = document.createElement('script');
			tag.setAttribute('id','youtube-script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		} else {
			callback();
		}
		window.onYouTubeIframeAPIReady = callback;
	};	
    player.play = function(){
        player._ytEl.playVideo();
    }
    player.pause = function(){
        player._ytEl.pauseVideo();
    }
    player.getTime = function(){
        return player._ytEl.getCurrentTime();
    }
    player.setTime = function(time){
        player._ytEl.seekTo( time );
    }
    player.getStatus = function(){
        return player.status;
    }
    player.getLength = function(){
        return player.duration;
    }
    player.isReady = function(){
        return player._isReady;
    }
    player.getSpeed = function(){
        if ('getPlaybackRate' in player._ytEl) {
            return player._ytEl.getPlaybackRate();
        } else {
            return 1;
        }
    }
    player.setSpeed = function(speed){
        if ('setPlaybackRate' in player._ytEl) {
            player._ytEl.setPlaybackRate(speed);
        }
    }
    player.getName = function() {
    }
    player.destroy = function(){
        document.querySelector('#oTplayerEl').remove();
        delete player.element; 
    }
	return player;
};

parseYoutubeURL = function(url){
    if (url.match) {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[2].length===11){
            return match[2];
        }
    }
    return false;
};
getYTcaptionTracks = async function(url) {
  var captionTracks=null, data=null;
  //var url = 'https://www.youtube.com/watch?v=bKetUdtTw0g';
  url = 'https://corsproxy.io/?'+encodeURIComponent(url);
  try {
    var res = await fetch(url);
    var data = await res.text();
  }catch(e) {console.log(e);};
  if( data && (match=data.match( /"captionTracks":(\[.*?\])/) ) ) {
    captionTracks =JSON.parse(match[1]);
  }
  return captionTracks;
};
getYTcaptionByBaseUrl = async function(baseUrl) {
  var srt = [];
  var appendSub = function(start, dur, txt) {
	txt = txt.replace(/\n/g, ' ');
    var start = parseInt(start);
    var end = start + parseInt(dur);
    srt.push({start:start, end:end, text:txt});
  };
  var data;
  try {
    var res = await fetch('https://corsproxy.io/?'+encodeURIComponent(baseUrl));
    var data = await res.text();
  }catch(e) {console.log(e);};
  //console.log(data);
  if(data) {
    var parser = new DOMParser();
    var subs = parser.parseFromString(data, "text/xml");
    subs.querySelectorAll('text').forEach(s=>appendSub(s.getAttribute('start'), s.getAttribute('dur'), s.textContent));
  }	
  //console.log(srt);
  return srt;
}; 

getYTsubtitle = async function(url, lang='zh-TW') {
  var srt = [];
  var captionTracks = await getYTcaptionTracks(url);
  if(captionTracks) {
    console.log(captionTracks);
    var re = new RegExp(lang);
    var subtitle = captionTracks.find(c=>c['vssId'].match(re));
    if(subtitle && subtitle.baseUrl) {
	  srt = await getYTcaptionByBaseUrl(subtitle.baseUrl);
    }
  }
  //console.log(srt);
  return srt;
}; 
openImportPanel = function(enable) {
  if(typeof(enable)!='boolean') enable = true;
  var importPanel = document.querySelector('.import-panel');
  if(importPanel) {
     if(enable) {
	   importPanel.classList.toggle('hidden', false);
       importPanel.style.left = '2vmin';
       importPanel.style.top = 'calc(100% - 18vmin)';
       var active = importPanel.classList.toggle('active');
	 } else {
	   importPanel.classList.toggle('hidden', true);
	 }
  }
};
changeSpeed = function(value) {
  if(mediaPlayer && typeof(mediaPlayer.setSpeed)=='function') {
    mediaPlayer.setSpeed(Number(value));
  }
};
inputYTurl = function(enable) {
	if(typeof(enable)!='boolean') enable = true;
	try{document.querySelector('.yt-sample').classList.toggle('hidden', false)}catch(e){};
	var inputField = document.querySelector('.ext-input-field');
	if(inputField) {
		inputField.classList.toggle('hidden', !enable);
		openImportPanel(false);
		//清除字幕語言選取區
		try{document.querySelector('.yt-lang-selector').innerHTML='';}catch(e){};

	}
};
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
startDragHandler = function (e) {  
  var target = e.target || e.touches[0].target;
  
  if( !target.classList.contains('playerWrapper') &&
	  !target.classList.contains('speed-box')  ) return;
  
  e.preventDefault();
  
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;
  var rect = target.getBoundingClientRect();
  var style = getComputedStyle(target);
  var left = style.getPropertyValue('left');
  var top = style.getPropertyValue('top');
  target.posX = Number(left==''?0:left.match(/([\d-]+)/).pop());
  target.posY = Number(top==''?0:top.match(/([\d-]+)/).pop());
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
  var target = e.target || e.touches[0].target;
  
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;
  
  e.preventDefault();
  
  var rect = target.getBoundingClientRect();  
  if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
    target.style['cursor'] = 'move';
    target.title = '按下後拖曳可以移動';
  } else {
    target.style['cursor'] = 'default';
    target.title = '';
  }
  target.posX = x - target.offsetX;
  target.posY = y - target.offsetY; 
  target.style['left'] = (target.posX)+'px';	
  target.style['top'] = (target.posY)+'px';
};
endDragHandler = function(e) {
  var target = e.target || e.touches[0].target;      
  target.style['cursor'] = 'default';
  var timeEnd = new Date();
  if(target.classList.contains('playerWrapper') && target.timeStart && (timeEnd - target.timeStart) < 200) {
	//click
    var p = document.querySelector('.playerWrapper');
    if(p) {
      p.classList.toggle('video-player-large');	  
      var cc2 = document.querySelector('.playerWrapper .caption2');
      if(cc2) {
        cc2.innerHTML = '';
	  }
    }
  }
  if (e.touches) {
    target.removeEventListener('touchend', endDragHandler);
    target.removeEventListener('touchmove', dragHandler);
  } else {
    target.removeEventListener('mouseup', endDragHandler);
	target.removeEventListener('mouseout', endDragHandler);
    target.removeEventListener('mousemove', dragHandler);
  }  
  tunePosition(target);
};
tunePosition = function(el) {
  var size = getWindowSize();
  var b = el.getBoundingClientRect();
  var isCenter = getComputedStyle(el)['transform'] != 'none'; //假設有設定就是置中的
  if(b.left < 0) 
    el.style.left = Math.floor((isCenter?b.width/2:0) + 5)+'px';
  else if(b.left > size.width - b.width) 
    el.style.left = Math.floor(size.width - (isCenter?b.width/2:b.width) - 5)+'px';
  if(b.top < 0) 
    el.style.top = Math.floor((isCenter?b.height/2:0) + 5)+'px';
  else if(b.top > size.height - b.height) 
    el.style.top = Math.floor(size.height - (isCenter?b.height/2:b.height) -5)+'px';  
};
showPlayerInfo = function() {
  showFadeOutMessage('.playerWrapper', '<ul><li>放大縮小: 按一下邊框</li><li>移動: 拖曳邊框</li></ul>', 0, 0, 2);
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

}
set__scale=function(s){
  for(var i=3; i<=10; i++) {
    try{document.querySelector('#aswift_'+i).parentElement.parentElement.style.scale= s}catch(e){};
  }
};
start = async function() {
  
  try{if(typeof(set__scale)=='function')set__scale(0.001)}catch(e){};
  
  setViewport();
  
  setVisibility(true);
  
  window.scrollTo(0, 0);
  
  //try{document.querySelector('#gameWrapper .content').innerHTML = ''}catch(e) {};
  document.querySelector('#gameWrapper .content').onclick = contentOnClickHandler;
  makeLangSelector();
  
  var slider = document.querySelector('.speed-slider');
  if(slider) {
    slider.setAttribute('min', 0.5)
    slider.setAttribute('max', 2);
    slider.setAttribute('step', 0.125);
  }

  loadingLogoEnable = true;
  loadingAnimation('HTML5 FUN<br>PLAYER');
  
  setTimeout(function() {  
    loadingLogoEnable = false;
    setTimeout(function() {
       showFadeOutMessage('.addMediaBtn', '按 + 號加影音、字幕', '100%', '-100%', 1);
       setTimeout(openImportPanel, 1000);
    }, 600);
  }, 1500);
};

var autostart = gup('autostart');
if(autostart == '1' || autostart == 'true') {
  start();
}

