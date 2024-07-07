/**
 * Weekly calendar
 * @author gsyan < https://gsyan888.blogspot.com/ >
 * @version 2024.07.07.15.25
 * @since 2024.07.04 
 */
 
  //Google 行事曆的識別碼或是公開網址
  var calendarId = 'happy2011.lsps@gmail.com';  

  // 從哪一天開始(開學日, 格式: yyyy-mm-dd)
  var startDate = '2012-02-07'; 
  // 要產生幾週的行事曆
  var numWeeks = 21; 

  var loadingLogoEnable = false;
  
  // 製作行事暦
  generateWeeklyCalendar = async function() {
    var chMonth = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
    const calendar = document.getElementById('calendar');
	
    //startDate = new Date(2024,1,11,0,0); // Set your desired start date
    //const numWeeks = 20; // Set the number of weeks to generate
    // 從哪一天開始由字串轉為日期格式
    if(typeof(startDate)=='string') {				
      startDate = startDate.substring(0, 10)+'T00:00:00';
      startDate = new Date(startDate); 
    }

    //由 Google Calendar 取得行事曆的起迄日期
    var  timeMin =  new Date(startDate);
    var timeMax = new Date(startDate);
    timeMax.setDate(timeMax.getDate() + (numWeeks*7) + 1);

    loadingLogoEnable = true;
    loadingAnimation('載入日曆');

    //取得 Google 行事曆
    var calendarEvents = await getEvents(calendarId, timeMin, timeMax);
    //console.log(calendarEvents);

    var weekHTML = '\t<tbody>\n';
    var lastMonth = -1;
    for (let week = 0; week < numWeeks; week++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(weekStart.getDate() + (week * 7));

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      if(week == 0) {
        var h = ['週次', '月份'].concat(Array.from('日一二三四五六'), '重要行事');
        var header = '\n<thead>\n';
		header += '\t<tr class="table-tr">';
        h.forEach(w=>header+='<th class="table-th">'+w+'</th>');
        header += '</tr>\n';
		header += '</thead>\n';
        calendar.insertAdjacentHTML('beforeend', header);
      }
      var month =  1 + Math.max(new Date(weekStart).getMonth(), new Date(weekEnd).getMonth());
      //if(lastMonth == month) {
      //  month = '';
      //} else {
      //  lastMonth = month;
      //}				
      weekHTML += '\t<tr class="table-tr">';
      weekHTML += '<td class="table-td bold">' + (week+1) + '</td>';
      weekHTML += '<td class="table-td bold">' + Array.from(chMonth[month]+'月').join('<br>') +  '</td>';
      weekHTML += generateDays(weekStart, weekEnd);
      weekHTML += '<td class="table-td event">';
      weekHTML += getWeekEvents(calendarEvents, weekStart, weekEnd);
      weekHTML += '</td>'
      weekHTML += '</tr>\n';
    }
	weekHTML += '</tbody>\n';
	calendar.insertAdjacentHTML('beforeend', weekHTML);
	
	loadingLogoEnable = false;
	
    if(calendarEvents && Object.keys(calendarEvents).length == 0) alert('找不到行事曆內容');	
  };

  /**
     * 產生一週的日期語法
     * @param {Date} 一週開始日期
     * @param {Date} 一週結束日期
     * @return {String} HTML 語法
     */	
  generateDays = function(weekStart, weekEnd) {
    let daysHTML = '';
    const currentDate = new Date(weekStart);

    while (currentDate <= weekEnd) {
      daysHTML += '<td class="table-td">';
      daysHTML += currentDate.getDate();
      daysHTML += '</td>';
      //計算下一個日期
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysHTML;
  };
  /**
     * 取得該週的行事
     * @param {Object} 行事曆的資料
     * @param {Date} 第一天的日期
     * @param {Date} 最後一天的日期
     * @return {String} HTML
     */
  getWeekEvents = function(calendarEvents, weekStart, weekEnd) {
    if(!calendarEvents) calendarEvents = {};
    let html = '';
    const currentDate = new Date(weekStart);    
    while (currentDate <= weekEnd) {
      var d = getLocalISOString(currentDate);
      d = d.substring(0, 10);
      if(calendarEvents[d]) {
        var short = d.substring(5,10).replace(/-/g, '.');
        if(calendarEvents[d].length>1) {
          html += '<li><b>'+short+'</b><ul>';
          calendarEvents[d].forEach(e=>html+='<li>'+e+'</li>');
          html += '</ul></li>';
        } else {
          html += '<li><b>'+short+'</b>&nbsp;'+calendarEvents[d][0]+'</li>';
        }
      }
      //日期改為下一天
      currentDate.setDate(currentDate.getDate() + 1);
    }
    if(html!='') {
      html = '<ul>'+html+'</ul>';
    }
    return html;
  };
  /**
     * 取得本地時間的 isoString
     * @param {Date} 日期
     * @return {String}
     */
  getLocalISOString = function(date) {
    const offset = date.getTimezoneOffset()
    const offsetAbs = Math.abs(offset)
    const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString()
    return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`;
  };
  isCalendarURL=function (d) {return /google\.com/.test(d) && /\/calendar\//.test(d) && /embed/.test(d)};
  extractCalURL=function(html) {
    var url = '';
    var pattern = '(src|href)\\s*=\\s*"(http\\w*:\\/\\/[^"]+)"';
    try {
      html.match(new RegExp(pattern, 'g')).some(u=>{t=isCalendarURL(u);if(t)url=u; return t;});
    }catch(e) {console.log('找不到日曆網址:\n',e);};
    if(url!='' && (match=url.match(new RegExp(pattern))) ) url=(match[2]);
    return decodeHTML(url);
  }; 
  decodeHTML = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };  
  /**
     * 透過Google 日曆公開資料取得指定時間區段的資料
     * @param {String} 日曆 ID, 如果是公開網址就解析出 id
     * @param {String} 起始日期字串, ex. 2024-07-01T00:00:00+08:00
     * @param {String} 結束日期字串, ex. 2024-08-31T00:00:00+08:00
     * @return {Object} 回傳以日期為 keys , 行事曆摘陣列要為 values
     */
  getEvents = async function(id, timeMin, timeMax) {
    var url = 'https://clients6.google.com/calendar/v3/calendars/{id}/events?';
    var maxResults = 999;  //最多抓取多少筆資料
    var timeZone = 'Asia/Taipei'; //時區

    //如果是公開網址就解析出 id
    if( /http\w*:\/\//.test(id) ) {
      if( (match=id.match(/[\?\&]src=([^\&]+)\&/)) && /@/.test(decodeURIComponent(match[1])) ) {
        id = decodeURIComponent(match[1]);
      } else if( (match=id.match(/ical\/([^\/]+)\//)) ) {
        id = decodeURIComponent(match[1]);
      } else {
        var u = 'https://corsproxy.io/?'+encodeURIComponent(id);
		var html = '';
		try {
          var res = await fetch(u);
          html = await res.text();
		}catch(e) {console.log('error: \n',e);};
		var isEmbedPage = false;
		/*
        var u = extractCalURL(html);
		if(u=='' && html.match(/_init\((\{(?:.|\n)*?\})?\)/) ) {
		  u = id;
		  isEmbedPage = true;
		} else if( u!='' && !(/@/.test(decodeURIComponent(u))) ) {
		  isEmbedPage = true;
		}
		*/
		if( html.match(/_init\((\{(?:.|\n)*?\})?\)/) ) {
		  u = id;
		  isEmbedPage = true;
		} else {
          u = extractCalURL(html);
		  if( u!='' && !(/@/.test(decodeURIComponent(u))) ) {
		    isEmbedPage = true;
          }
		}
		console.log('==\n', isEmbedPage, '\n', u);
		if( ( u!='' && (match=u.match(/[\?\&]src=([^\&]+)/g)) ) || isEmbedPage ) {
		  if(match.length > 1 || isEmbedPage ) {
            var cfg = await getCalendarCfg(u);
            console.log('====\n',id,);console.log(cfg);console.log('=======\n\n');
			if(cfg && cfg['cids']) {
			  id = Object.keys(cfg['cids']);
              //alert(id.join('\n\n'));
			}
          } else {
		    id = match[0].match(/[\?\&]src=([^\&]+)\&*/)[1];
			id = decodeURIComponent(id.replace(/\r|\n/g, ''));
		  }		  
        } else {
          return {}; //不是日曆就直接回傳空值
        }
      }
	  //id = id.replace(/\r|\n/g, '');
    }

    //var timeMin = '2024-02-11T00:00:00+08:00';
    //var timeMax = '2024-07-01T00:00:00+08:00';
    if( timeMin instanceof Date ) {
      timeMin = getLocalISOString(timeMin);
    }
    if( timeMax instanceof Date ) {
      timeMax = getLocalISOString(timeMax);        
    }
	if(typeof(id)=='string') id = [id];
    var errorMsg = '';
    var e = {};
	for(var idx=0; idx<id.length; idx++) {
      var calUrl = url.replace('{id}', encodeURIComponent(id[idx]));
      calUrl += 'eventTypes=default&eventTypes=focusTime&eventTypes=outOfOffice&%24unique=gc456';
      var params = {
        singleEvents: 'true',
        //eventTypes: 'default',
        //eventTypes: 'focusTime',
        //eventTypes: 'outOfOffice',
        timeZone: timeZone,
        maxAttendees: 1,
        sanitizeHtml: 'true',
        calendarId: id[idx],
        maxResults: maxResults,
        timeMin: timeMin,
        timeMax: timeMax,
        key: 'AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs'
      };
      //組合查詢公開日曆的參數
      var keys = Object.keys(params);
      keys.forEach(k=>calUrl += '&'+k+'='+encodeURIComponent(params[k]));
      var data = null;
      //calUrl = 'https://corsproxy.io/?'+encodeURIComponent(calUrl);
	  try {
        var res = await fetch(calUrl);
        data = await res.json();
	  }catch(e) {console.log(e); data=null;};
      //console.log(data);
      //解析出要的日曆欄位
      if(data && typeof(data.items)!='undefined') {
        for(var i=0; i<data.items.length; i++) {
          var item = data.items[i];
          //console.log(start, item['summary']);
          //整日的活動開始時間只有日期, 否則為 dataTime, 兩種都要抓, 後著再去掉時間
          var start = item['start']['dateTime'] || item['start']['date'];
          start = start.substring(0, 10); //只留日期
          if(!e[start]) {
            e[start] = [];
          }
          e[start].push(item['summary']);
        }
      } else if(typeof(data['error']['errors'][0]['message'])!='undefined') {      
        errorMsg += '\n'+data['error']['errors'][0]['message'];
      }
	}
	//console.log(e);
	if(errorMsg!='' && Object.keys(e).length == 0) {
	  alert('找不到公開的 Google 日曆資料:\n' + errorMsg + '\n\n請確認日曆有公開');
	  e = null;
	}
    return e;
  };
  /**
     * 由公開日曆的內篏網頁中解析出設定
     * @param {String} 內篏網頁的網址
     * @return {Object}
     */	
  getCalendarCfg = async function(url) {
    var cfg = {};
	var data = '';
	if(/^http\w*:\/\//.test(url)) {
      //url = 'https://calendar.google.com/calendar/embed?src=1jmuu6e088gti15dlf336eqijg@group.calendar.google.com&ctz=Asia/Taipei';
      url = 'https://corsproxy.io/?'+encodeURIComponent(url);
      try {
        res = await fetch(url);
        data = await res.text();
	  }catch(e) {console.log('無法存取:\n', e)};
	} else {
	  data = url;
	}
    //console.log(data);
    if(typeof(data)=='string' && data!='' && (match = data.match(/_init\((\{(?:.|\n)*?\})?\)/) ) ) {
      cfg = JSON.parse(match[1]);
    }
    //console.log(cfg);
    return cfg;
  };
  /**
   * 將 iCal 格式轉為 JSON
   * @param {string}
   * @return {object}
   */
  parseICalData = function (icalStr) {
    if(!/BEGIN:VEVENT(?:.|\r|\n)*?END:VEVENT/.test(icalStr)) return [];
    const lines = icalStr.replace(/\r/g,'\n').trim().split(/\n+/);
    const events = [];
    let currentEvent = {};
    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        currentEvent = {};
      } else if (line.startsWith('END:VEVENT')) {
        events.push(currentEvent);
      } else if (line.startsWith('SUMMARY:')) {
        currentEvent.summary = line.substring(8);
      } else if (line.startsWith('DTSTART:')) {
        currentEvent.startDate = line.substring(8);
      } else if (line.startsWith('DTSTART;VALUE=DATE:')) {
        currentEvent.startDate = line.substring(19);
      } else if (line.startsWith('DTEND:')) {
        currentEvent.endDate = line.substring(6);
      } else if (line.startsWith('DTEND;VALUE=DATE:')) {
        currentEvent.endDate = line.substring(17);
      }			
    };
    return events;
  };  
  /**
   * 複製指定物件的文字到剪貼簿中
   * Credit : 
   *  https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
   *
   * @param {Object} target 如果是字串，就當作是物件的 id, 再轉為物件
   */
  copyAndSelectToClipboard = function (target, copyHTML) {
    if (typeof(target) == 'string') {
      target = document.getElementById(target);
    }
    if (typeof(target)!='undefined' && target!=null) {
      if(/input|textarea/i.test(target.tagName)) {
	    /* input, textarea 直接複製 */
	    target.select();
        document.execCommand("copy");
	  } else {
        if(typeof(copyHTML)!='undefined') {
          window.getSelection().removeAllRanges(); /* clear current selection */
          var range = document.createRange()
          range.selectNode(target);
          window.getSelection().addRange(range); /* to select text */		  
          document.execCommand("copy");
		} else {
	      /* 利用 textarea 達到只複製文字的目的 */
          var tempElm = document.createElement('textarea');
          tempElm.style = 'width:1;height:1;border:0;';
		  tempElm.textContent = target.textContent;
	      document.body.append(tempElm);
	      tempElm.select();
          document.execCommand("copy");
	      tempElm.remove();
	      tempElm = null;
        }
	    /* 改選取原來的物件, 這樣後面取消選取時才有閃一下的效果 */
        var range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges(); /* clear current selection */
        window.getSelection().addRange(range); /* to select text */
	  }
	  /* 稍間隔才取消選取, 有閃一下的效果 */
      setTimeout(function () {
        window.getSelection().removeAllRanges(); /* to deselect */
      }, 300);
    }
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
  exportCalendar = function() {
    var calTitle = document.querySelector('#calTitle').value;
    var css = document.querySelector('#calendar-css').outerHTML;
    var calendar = document.querySelector('#gameWrapper').innerHTML;
    var html = `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${calTitle}</title>
  ${css}
</head>
<body>${calendar}</body>
</html>`;
    var dataURL = 'data:text/html;base64,' + base64Encode(html);
    var filename = calTitle + '.html';
    //用連結並以觸發 click 來自動下載圖片
    var anchor = document.createElement('a');	anchor.setAttribute('download', filename);
    anchor.setAttribute('href', dataURL);
    anchor.setAttribute('target', '_blank');
    document.body.appendChild(anchor);
    anchor.click();
    setTimeout(function(){anchor.remove()}, 100);
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
        HTML5FunWrapper.style.visibility = "hidden";
        //恢復捲軸的功能
        window.onscroll=null;
        //重新顯示原有的內容
        document.body.style.overflow = '';
        //
        try{if(typeof(set__scale)=='function')set__scale(1)}catch(e){};
      }
    }
  };
  /**
   * 
   */
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
   * 載入設定檔時顯示動畫
   */
  loadingAnimation = function (txt, callback) {
    if (typeof(txt) == 'undefined' || txt == null) {
      var txt = "載入檔案中";
    }
    var size = getWindowSize();
    var x = size.width / 2;
    var y = size.height / 2 +60;
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
      label.style['transform'] = 'translate(10px, -40px) rotate(' + angle + 'deg)';
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
  set__scale=function(s){
    for(var i=3; i<=10; i++) {
      try{document.querySelector('#aswift_'+i).parentElement.parentElement.style.scale= s}catch(e){};
    }
  };
  applyDemo = function() {    
    calendarId = 'happy2011.lsps@gmail.com';  
    startDate = '2012-02-07'; 
    numWeeks = 21; 
    try{document.querySelector('#calId').value=calendarId}catch(e){};
    try{document.querySelector('#startDate').value=startDate}catch(e){};
    try{document.querySelector('#numWeeks').value=numWeeks}catch(e){};
  };
  /**
   * 
   */
  start = function() {    
    var t, id, d, w;
    try{t = document.querySelector('#calTitle').value}catch(e){};
    try{id = document.querySelector('#calId').value}catch(e){};
    try{d = document.querySelector('#startDate').value}catch(e){};
    try{w = document.querySelector('#numWeeks').value}catch(e){};
    if(!t || !id || !d || !w) {
      alert('請先輸入各欄位的資料後再繼續');
      return;
    }
    calendarTitle = t;
    calendarId = id;
    startDate = d;
    numWeeks = Number(w);
    try{document.querySelector('#calendarTitle').textContent = t;}catch(e){};
    try{document.querySelector('#calendar').innerHTML='';}catch(e){};
    
    try{if(typeof(set__scale)=='function')set__scale(0.001)}catch(e){};

    setViewport();

    setVisibility(true);

    window.scrollTo(0, 0);

  	// 開始製作行事曆  
  	generateWeeklyCalendar();  

  };
  