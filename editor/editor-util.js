/*
 *=====================================================
 * HTML5 FUN Blogger、網頁嵌入語法產生器
 * 欄位輸入、輸出界面處理工具
 * 2022.10.19 by gsyan (https://gsyan888.blogspot.com/)
 * update : 2022.11.08
 *=====================================================
 */
 
/* 取得指定id script tag 中的各屬性，並組合為字串 */
getJSheadAttributes = function (id) {
  const attributes = document.getElementById(id).attributes;
  var str = '';
  for (var i = 0; i < attributes.length; i++) {
    var name = attributes[i].name;
    var value = attributes[i].value;
    str += ' ' + name + '="' + value + '"';
  }
  return "<script" + str + ">";
};

/* 
 顯示指定 id 的 javascript 內容 
 0 : settingJS
 1 : injectionJS
 */
showJSCode = function (n) {
  var jsID = ['settingJS', 'injectionJS'];
  var obj = document.getElementById('sourceCode');
  var qRE = /(questionLines = function\(\)\{\/\*--這一行請勿更改--)(?:.|\n|\r)*?(-----\*)/m;

  /* 
   應用時是否開在新視窗 
   像 Speaking 就需要
   */
  if(typeof(enableOpenInNewWindow)=='undefined' || enableOpenInNewWindow==null) {
	enableOpenInNewWindow = false; 
  }
  
  /* 先將圖形編輯器的更新至 questionLines */
  updateQuestionLinesValue();

  /* 由 textarea 更新 questionLines 的題庫 */
  var q = document.getElementById('questionLines');
  if (typeof(q) != 'undefined' && q != null && typeof(q.value) != 'undefined' && q.value != null && q.value.length > 0) {
    questionLines = q.value;
  }

  /* 如果按的按鈕是「查看」就將顯示代碼的區塊改為 block, 反之變 none */
  if (/查看/.test(document.getElementById('showCodeBtn' + n).innerText)) {
    obj.style.display = 'block'; /* 顯示 sourceCode */
  } else {
    obj.style.display = 'none'; /* 顯藏 sourceCode */
  }
  /* 代碼顯示區中填入原始碼 */
  if (obj.style.display == 'block') {
    var jsFoot = "<\/script>\n";
    switch (n) {
    case 0: /* 查看題庫設定原始碼 */
      var html = document.getElementById(jsID[0]).innerHTML.replace(qRE, '$1' + "\n" + questionLines + "\n" + '$2');
      html = getJSheadAttributes(jsID[0]) + html + jsFoot;
      break;
    case 1: /* 查看載入程序原始碼 */
      var html = getJSheadAttributes(jsID[1]) + document.getElementById(jsID[1]).innerHTML + jsFoot + "\n";
      break;
    case 2: /* 查看並複製所有語法 */

      /* 先取得輸出語法的選項 */
      /* Google Sites */
      var elm = document.getElementById('forGoogleSites');
      var forGoogleSites = elm != null && typeof(elm.checked) != 'undefined' && elm.checked != null ? elm.checked : false;
	  
	  /* Classroomscreen */
	  var elm = document.getElementById('forClassroomScreen');
	  var forClassroomScreen = elm != null && typeof(elm.checked) != 'undefined' && elm.checked != null ? elm.checked : false;
	
      var gameCode = document.getElementById('gameCode').value; /* 編碼模式時的密碼 */

      /* 先將 settingJS 中的題庫設定更新 */
      var html = document.getElementById(jsID[0]).innerHTML.replace(qRE, '$1' + "\n" + questionLines + "\n" + '$2');

      if (gameCode == '') {
        /* 
         題庫不加密，以明碼處理
         */

        /* 加上 settingJS 的 script tag 頭尾 */
        html = getJSheadAttributes(jsID[0]) + html + jsFoot;

        /* 加上 injectionJS 的 script tag */
        html += getJSheadAttributes(jsID[1]) + document.getElementById(jsID[1]).innerHTML + jsFoot + "\n";
      } else {
        /*
         題庫變成加密資料，使用前需輸入遊戲碼才能玩
         */
        gameCode = btoa(encodeURI(gameCode).normalise_to_ascii().crypt_symmetric());

        var encodedJS = btoa(encodeURI(html).normalise_to_ascii().crypt_symmetric()); //encode

        /* var cryptJS = document.getElementById('cryptJS').innerHTML; */
        /* html = cryptJS.match(/(\/\*-{10}\s)((?:.|\n|\r)*?)(-{10}\*\/)/m)[2]; */
        html = getTemplate(3).replace(/\$\{modulename\}/i, modulename);
        if (typeof(forGoogleSites)=='boolean' && forGoogleSites) {
          if (typeof(enableOpenInNewWindow)=='boolean' && enableOpenInNewWindow) {
            html = html.replace(/(playButton\.innerHTML\s*=\s*)\`([^\`]+)\`;/im, '$1\\\`$2\\\`;');
            html = html.replace(/(var\s+rule\s*=\s*)\`([^\`]+)\`;/im, '$1\\\`$2\\\`;');				
		    /* 在 Google Sites 中, 另新視窗的模式, 150ms 後，自動按輸入遊戲碼的按鈕, 可以少一個程序 */
		    html = html.replace(/(playButton\.innerHTML\s*=\s*.*[^\`]+\`;)/im, '$1'+'\n    setTimeout(html5FunPlayGame, 150);');
          }
        }

        html = html.replace(/(var\s+html5FunGameCode\s+=\s)([^\n]+)(\n)/m, '$1 "' + gameCode + '"; $3');
        html = html.replace(/(var\s+html5FunJsCode\s+=\s)([^\n]+)(\n)/m, '$1 "' + encodedJS + '"; $3');

        html = getJSheadAttributes(jsID[0]) + html + jsFoot;
      }

      /* =========== Google Sites 需要是完整的網頁語法 ===== */
		  
      if (forGoogleSites || forClassroomScreen) {
        html = decodeHTML(html);

         /*
        因為 Speaking 必須由 iFrame 內開新視窗，才能用麥克風
        所以加了一個按鈕執行 window.open ,
        之後啟動 autostart 才不用多按一層按鈕
        同步修改 Template1 中的 closeApp , 按叉叉時是執行 window.close()
         */
        /* 使用 Template1 將原來的語法加上 HTML 的頭尾 */
        html = getTemplate(1).replace('<!-- 這裡插入原本的語法 -->', html);
		
		if(!enableOpenInNewWindow || forClassroomScreen) {

		  html = html.replace(/isInIFrame = \\`\$\{isInIFrame\}\\`;\s*\n/, '');
		  html = html.replace(/\\\//g, '/');

		} else {

          html = html.replace(/autostart="false"/, 'autostart="true"');

          /* &符號必須轉為 &amp; \ 必須轉為 \\ 才能用 */
          html = html.replace(/\</g, '&amp;lt;').replace(/>/g, '&amp;gt;').replace(/\\/g, '\\\\');

          /* 使用 Template2 變成 Google Sites 嵌入的語法 */
          html = getTemplate(2).replace('<!-- 這裡插入編過碼的語法 -->', html).replace('<!-- 這裡插入開始玩按鈕的字樣 -->', '開始玩 HTML5 FUN '+editorOptions[modulename].caption);

		  /* \\` 變成 \` 不然無法置換變數 */ 		  
		  html = html.replace(/\\\\`/g, '\\`');

          /* 修正最後一個 </srcipt> 多了一個反斜線 */
          html = html.replace(/&amp;lt;\\\\\//g, '&amp;lt;\/').replace(/<\\\//g, '</');
		}
      }
      /* =========== Google Sites 網頁語法加料完成 ===== */

      break;

    }
    html = decodeHTML(html);
	
	if(forClassroomScreen) {
		html = '<iframe src="'+toDataURI(html,'text/html')+'"></iframe>';
	}

    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); //.replace(/\u00a0/g, ' ');
    html = html.replace(/^(.*)$/mg, "<span class=\"line\">$1</span>");
    obj.innerHTML = '<pre><code>' + html + '</code></pre>';

    /* select and copy */
    if (n == 2) {
      copyAndSelectToClipboard(obj);
    }
  }

  /* 依選取狀態，更新按鈕上的文字 */
  for (var i = 0; i < labelText.length; i++) {
    if (i == n && obj.style.display == 'block') {
      var txt = labelText[i].replace(/查看/, '隱藏');
      if (i == 2) {
        txt = txt.replace(/-自動複製到剪貼簿/g, '');
      }
      document.getElementById('showCodeBtn' + i).innerHTML = txt;
    } else {
      document.getElementById('showCodeBtn' + i).innerHTML = labelText[i];
    }
  }

};

/*
 複製指定物件的文字到剪貼簿中 (此部份與 editor.js 中的重覆, 但先保留)
 Credit : 
   https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
 target : 如果是字串，就當作是物件的 id, 再轉為物件
 */
copyAndSelectToClipboard = function (target) {
  if (typeof(target) == 'string') {
    target = document.getElementById(target);
  }
  if (typeof(target)!='undefined' && target!=null) {
    var range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges(); /* clear current selection */
    window.getSelection().addRange(range); /* to select text */
    document.execCommand("copy");
    setTimeout(function () {
      window.getSelection().removeAllRanges(); /* to deselect */
    }, 300);
  }
};

/*
 更新 settingJS 的 Script 內容，
 這樣才能由 embeded 程式 start 後，更新題庫
 */
update_settingJS = function () {
  var settingJS = document.getElementById('settingJS');

  if (typeof(settingJS) != 'undefined') {
    /* 重置顯示原始碼的三個按鈕上的文字, 隱藏原始碼 */
    if(typeof(labelText)!='undefined' && labelText!=null && typeof(labelTextResetAndHideSourceCode)=='function') {
      labelTextResetAndHideSourceCode();
    }
    
    for (var i = 0; i < varNameAndIdList.length; i++) {

      var valueString = '';
      var id = varNameAndIdList[i];
      var elm = document.getElementById(id);

      if (typeof(elm) != 'undefined' && elm != null) { // && typeof(elm.value) != 'undefined' && elm.value.length > 0) {
        //由輸入區更新變數的值
        if (id == 'helpDialogDescription') {

          window[id] = elm.value.replace(/\n/g, '\\n'); /* 遊戲說明中的換行符號得先換成\n */
          valueString = "'" + window[id] + "'";

        } else if (typeof(elm.type) != 'undefined' && /checkbox/i.test(elm.type)) {

          window[id] = (typeof(elm.checked) != 'undefined' && elm.checked != null ? elm.checked : false);
          valueString = window[id].toString();

        } else if (id == 'ttsPlaybackRate') {

          var a = elm.value.match(/[\d|\.]+/g);
          if (typeof(a) != 'undefined' && a != null) {
            window[id] = [];
            for (var k = 0; k < a.length; k++) {
              window[id].push(Number(a[k]));
            }
            valueString = '[' + a.join(', ') + ']';
          }

        } else {
			
          if (typeof(window[id]) == 'string') {
            if(elm.value.replace(/\s/g, '')!='') {  /* 為避免設定值就是空格, 先確定有值才去頭尾空格 */
			  window[id] = elm.value.trim(); /* 字串先去掉前後的空格 */
            } else {
			  window[id] = elm.value;
            }
            valueString = "'" + window[id] + "'";
          } else if(typeof(window[id])=='number') {
            valueString = elm.value;
            window[id] = Number(elm.value);
          } else {
            window[id] = elm.value;
            valueString = window[id];
          }
		  
        }

        if (id == 'questionLines') {
          /* 由 settingJS 取得題庫設定, 並將 questionLines 的部份更新 */
          var qRE = /(questionLines = function\(\)\{\/\*--這一行請勿更改--)(?:.|\n|\r)*?(-----\*)/m;
          settingJS.innerHTML = settingJS.innerHTML.replace(qRE, '$1' + "\n" + questionLines + "\n" + '$2');
        } else {
          if (id == 'helpDialogDescription') {
            var qRE = new RegExp('(' + id + '\\s?=)(?:.|\\n|\\r)*?(;\\n)', 'm');
          } else {
            var qRE = new RegExp('(' + id + '\\s?=)(?:.|\\n|\\r)*?(;)', 'm');
          }
          settingJS.innerHTML = settingJS.innerHTML.replace(qRE, '$1 ' + valueString + '$2');
        }

      }

    }
  }
};


/*
 Credit: 
   https://gist.github.com/eladkarako/738ff6791dd2e44baeb5787851f874d5
 Usage:
   btoa(String.normalise_to_ascii().crypt_symmetric());  //encode
   atob(String).normalise_to_unicode().crypt_symmetric(); //decode
 */
String.prototype.normalise_to_ascii = function () {
  return unescape(encodeURIComponent(this));
};
String.prototype.normalise_to_unicode = function () {
  return decodeURIComponent(escape(this));
};
String.prototype.crypt_symmetric = function (key) {
  var me = this + ""; /* unlink reference */
  key = Number(String(Number(key))) === key ? Number(key) : 13; /* optionaly provide key for symmetric-like-""encryption"". */
  me = me.split('') /* to array of characters. */
    .map(function (c) {
      return c.charCodeAt(0);
    }) /* to array of numbers (each is character's ASCII value) */
    .map(function (i) {
      return i ^ key;
    }); /* XOR ""ENCRYPTION"" */
  me = String.fromCharCode.apply(undefined, me); /* one-liner trick: array-of-numbers to array-of-characters (ASCII value), join to single string. may result in buffer-overflow on long string! */
  return me;
};

encodeJS = function (id) {
  var js = encodeURI(document.getElementById(id).innerHTML);
  return btoa(js.normalise_to_ascii().crypt_symmetric());
};
decodeJS = function (code) {
  return decodeURIComponent(atob(code).normalise_to_unicode().crypt_symmetric());
};

/* 由按下的物件捲動到步驟? 的位置 */
jumpTo = function (from, to) {
  if(!isNaN(to)) {
	  to = document.getElementById('step' + to);
  } else if(typeof(to)=='string') {
	  to = document.getElementById(to);
  }
  var offset = to.offsetTop - from.offsetTop;
  var y = offset + from.offsetTop - window.scrollY - from.offsetHeight / 4;

  window.scrollBy({
    top: y,
    left: 0,
    behavior: 'smooth'
  });
};

/* 下載可單獨執行的網頁檔案, 將 Google Sites 用的嵌入語法以檔案的方式下載 */
downloadHTMLFile = function() {
	var obj = document.getElementById('sourceCode');
	var forGoogleSitesCheckedOldValue = document.getElementById('forGoogleSites').checked;
	var enableOpenInNewWindowOldValue = (typeof(enableOpenInNewWindow)!='undefined'?enableOpenInNewWindow:false);
	document.getElementById('forGoogleSites').checked = true;
	enableOpenInNewWindow = false;
	document.getElementById('showCodeBtn2').innerText = labelText[2].replace(/隱藏/, '查看');
	showJSCode(2);
	var html = decodeHTML(obj.innerText||obj.textContent);
	exportHTMLFile(html);
	/* 恢復為原有的狀態 */
	showJSCode(2);
	document.getElementById('forGoogleSites').checked = forGoogleSitesCheckedOldValue;
	enableOpenInNewWindow = enableOpenInNewWindowOldValue;
};
exportHTMLFile = function (exportString) {
  /* 檔名後面加上日期時間，變成 html-modulename-20xx-xx-xx.html */
  var dateNow = new Date();
  var dateStr = dateNow.toISOString().split('T')[0];
  var filename = 'html5-'+(typeof(modulename)!='undefined'?modulename+'-':'')+ dateStr + '.html';

  /* 以 DataURI 的格式編碼 */
  var dataURI = toDataURI(exportString, 'text/html');

  /* 將資料變成超連結，並觸發它的 click，自動下載檔案 */
  var anchor = document.createElement('a');
  anchor.setAttribute('download', filename);
  anchor.setAttribute('href', dataURI);
  anchor.setAttribute('target', '_blank');
  document.body.appendChild(anchor);
  anchor.click();
  /* anchor.parentNode.removeChild(anchor); */
  document.body.removeChild(anchor);
};

/*
 將設定的區塊 settingJS 去掉尾巴的函數後
 將設定值輸出成 DataURI base64 編碼
 匯出成 questions-set-xxxx.js 
 */
exportJsFile = function () {
  /* 檔名後面加上日期時間，變成 questions-set-20xx-xx-xx.js */
  var dateNow = new Date();
  var dateStr = dateNow.toISOString().split('T')[0];
  var filename = 'questions-set-' + dateStr + '.js';

  /* 去掉 settingJS questionLines 以後的尾巴 */
  /*
  var qRe = new RegExp(/(\*--這一行請勿更改--\"\.length\+1,-9\);\n)(.*)/sm)
  var exportString = decodeHTML(document.getElementById('settingJS').innerHTML).replace(qRe, '$1\n\n');
  */
  /* 去掉網站中才需要的解碼函數 */
  var footerKeyStr = '//\n//\n//\n//=======================================================\n//以下為執行程式,不需要修改\n';
  var footerRe = new RegExp('('+escapeRegExpString(decodeHTML(footerKeyStr))+')(.*)', 'sm');
  var exportString = decodeHTML(document.getElementById('settingJS').innerHTML).replace(footerRe, '');
  
  /* 在設定檔的最前面加上匯出時間 */
  exportString = '//\n//匯出時間 : ' + dateNow + '\n//\n' + exportString;

  /* 以 DataURI 的格式編碼 */
  var dataURI = toDataURI(exportString, 'text/javascript');

  /* 將資料變成超連結，並觸發它的 click，自動下載檔案 */
  var anchor = document.createElement('a');
  anchor.setAttribute('download', filename);
  anchor.setAttribute('href', dataURI);
  anchor.setAttribute('target', '_blank');
  document.body.appendChild(anchor);
  anchor.click();
  /* anchor.parentNode.removeChild(anchor); */
  document.body.removeChild(anchor);
};

/* 將資料轉為 DataURI 的格式 */
toDataURI = function (data, mimeType) {
  /* UTF-16 to UTF-8 to Base64 */
  var dataURIString = base64_encode(utf16to8(data));

  /* 如果是 iOS 就變成 application/octet-stream , 才能自動下載 */
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator['maxTouchPoints'] > 1)) {
    mimeType = 'application/octet-stream';
  } else {
    /* mimeType = 'text/json'; */
  }
  /*
   return "data:text/json;charset=utf-8;base64," + jsonString;
   return 'data:application/octet-stream;charset=utf-8;base64," + jsonString;
   */
  return 'data:' + mimeType + ';charset=utf-8;base64,' + dataURIString;
};

utf16to8 = function (str) {
  var out,
  i,
  len,
  c;

  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i);
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
    }
  }
  return out;
};

base64_encode = function (data) {
  /*
   // http://kevin.vanzonneveld.net
   // +   original by: Tyler Akins (http://rumkin.com)
   // +   improved by: Bayron Guevara
   // +   improved by: Thunder.m
   // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
   // +   bugfixed by: Pellentesque Malesuada
   // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
   // +   improved by: Rafa? Kukawski (http://kukawski.pl)
   // *     example 1: base64_encode('Kevin van Zonneveld');
   // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
   // mozilla has this native
   // - but breaks in 2.0.0.12!
   //if (typeof this.window['btoa'] === 'function') {
   //    return btoa(data);
   //}
   */
  var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var o1,
  o2,
  o3,
  h1,
  h2,
  h3,
  h4,
  bits,
  i = 0,
  ac = 0,
  enc = "",
  tmp_arr = [];

  if (!data) {
    return data;
  }

  do { /* pack three octets into four hexets */
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    /* use hexets to index into b64, and append result to encoded string */
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

};

/*
 由題庫設定檔中，找出所有的變數名稱，及註解中的文字
 */
getAllVarNames = function(data) {
  var captions = [];
  var names = [];
  var caption = '';
  var lines = data.replace(/\r/g, '').split(/\n/);
  for(var i=0; i<lines.length; i++) {
    var line = lines[i].trim();
    if(line.replace(/\s/g, '')=='') {
      caption = '';
    } else {
      if(match = line.match(/^\/\/([^----].*)/)) {
        if (caption != '') {
          caption += '\n';
        }
        caption += match[1];
      } else if(match = line.match(/([^\/\/][^=]+)=/)) {
        var n = match[1];
        if(n.replace(/\s/g)!='') {
          names.push(n.trim());
          captions.push(caption.trim());
          if(/questionLines/i.test(n)) {
            break;
          }
        }
      }
    }
  }
  return [names, captions];
};

get_file_content = function(text_url, callback, param) {
  if (window.XMLHttpRequest) {     
    var req = new XMLHttpRequest(); 
  }     
  else if (window.ActiveXObject) {     
    var req = new ActiveXObject("Microsoft.XMLHTTP");     
  }     
  
  req.open('GET', text_url);

  req.onreadystatechange = function() {     
    if (req.readyState == 4) {
      if (req.status == 200) {  /* 200 為成功讀入資料; 404 : Not Found */
        if ( typeof callback == 'function' ) {
          if ( typeof param != 'undefined' ) {
            callback(req.responseText, param);
          } else   {
            callback(req.responseText);
          }
        }
      } else {
        if ( typeof callback == 'function' ) {
          if ( typeof param != 'undefined' ) {
            callback("", param);
          } else {
            callback("");
          }
        }
      }
    }
  }
  try {
    req.send(null);
  } catch(e) {
    /*
     錯誤發生時
     //alert(e);
     */
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

/*
 重新載入 <script> 的 innerHTML
 不適合用 src 指定路徑的
 */
reloadJS = function(id) {
  var settingJS = document.getElementById(id);
  if (typeof(settingJS)!='undefined' && settingJS != null) {
    var js = settingJS.innerHTML;
    if (typeof(js)=='string' && js.length>0) {
      var scriptTag = document.createElement('script');
      scriptTag.id = 'jsForReload';
      scriptTag.innerHTML = js+'\n debugTestFunction=function(){console.log("Debug:settingJS reload.")}';
      var  head = document.getElementsByTagName('head')[0];
      head.appendChild(scriptTag);
      /* debugTestFunction 已存在或是 10 秒後移除 reload 的 JS object */
      debugStartTime = new Date();			
      debugIntervaleId = setInterval(function() {
        if (typeof(debugTestFunction)!='undefined' || ((new Date())-debugStartTime)>10000) {
          clearInterval(debugIntervaleId);

          var scriptTag = document.getElementById('jsForReload');
          if (typeof(scriptTag)!='undefined') {
            document.getElementsByTagName('head')[0].removeChild(scriptTag);
          }
        }
      },100);
    }
  }
}; 

/*
 重新載入 injectionJS (html5_fun_embeded.js)
 modulename: HTML5 FUN 的模組名稱 (定義在 html5_fun_embeded.js)
 */ 
reloadEmbededJS = function(modulename, attributes, debug) {
  var parentNode;
  var oldJS = document.getElementById('injectionJS');
  if(typeof(oldJS)!='undefined' && oldJS!=null) {
    parentNode = oldJS.parentNode;
    oldJS.parentNode.removeChild(oldJS);
  } else {
    parentNode = document.getElementsByTagName('head')[0];
  }
  var scriptTag = document.createElement('script');
  scriptTag.type = "text/javascript";
  scriptTag.charset = "utf-8";
  scriptTag.id = 'injectionJS';
  scriptTag.src = (debug ? "./" : "https://gsyan888.github.io/html5_fun/")+"html5_fun_embeded.js";
  scriptTag.setAttribute('autostart', "false");
  if(typeof(attributes)=='object' && attributes!=null) {
	var keys = Object.keys(attributes);
	for(var i=0; i<keys.length; i++) {
		scriptTag.setAttribute(keys[i], attributes[keys[i]]);
	}
  }
  scriptTag.setAttribute('modulename', modulename);
  parentNode.appendChild(scriptTag);
};

loadJsToScriptInnerHTML = function(id, src) {
  var parentNode;
  var oldJS = document.getElementById(id);
  if(typeof(oldJS)!='undefined' && oldJS!=null) {
    parentNode = oldJS.parentNode;
    oldJS.parentNode.removeChild(oldJS);
  } else {
    parentNode = document.getElementsByTagName('head')[0];	
  }
  var scriptTag = document.createElement('script');
  scriptTag.type = "text/javascript";
  scriptTag.charset = "utf-8";
  scriptTag.id = id;
  get_file_content(src, function(html) {
    scriptTag.innerHTML = html;
	parentNode.appendChild(scriptTag);
  });
};

/* 將物件的 innerText 設給同層最後一個元件的 value */
setThisValue = function(elm) {
  if(typeof(elm.parentNode.lastChild.value)!='undefined' && elm.parentNode.lastChild.value!=null) {
    elm.parentNode.lastChild.value = elm.innerText;
	if(typeof(update_settingJS)=='function') {
		update_settingJS();
	}
  }
};

/* 其它選項按鈕的切換 */
showOtherOptions = function(btn, isHidden) {
  if(typeof(isHidden)=='boolean') {
    document.getElementById('otherOptions').classList.toggle('hidden', isHidden);
  } else {
    isHidden = document.getElementById('otherOptions').classList.toggle('hidden');
  }
  /* if(/設定/.test(btn.textContent)) { */
  if(!isHidden) {
    btn.textContent = '按這裡收合其它選項';
    btn.style['background-color'] = '#ffcc66';
  } else {
    btn.textContent = '按這裡展開並設定其它選項';
    btn.style['background-color'] = 'yellow';
  }
};

/*
 將變數內容填入已存在的表單各欄位中
 如果欄位不存在者，就新增至其它選項中
 */
varInit = function() {
    var otherOptions = document.getElementById('otherOptions');
    var html = '',
    id,
    elm,
    caption,
    type,
    input,
    option,
    value,
    size,
    counter = 0;

    for(var i=0; i<varNameAndIdList.length; i++) {
      id = varNameAndIdList[i];
      //caption = varCaptions[i].replace(/\n/g, '<br>')+'<br>('+id+')';
      elm = document.getElementById(id);
      type = typeof(window[id]);
      value = window[id];

	  var optionValue = editorOptions[modulename].options[id];

      if (typeof(elm)=='undefined' || elm==null) {
        elm = document.createElement('div');
        elm.setAttribute('class', 'setting');
		
		if(typeof(value)=='undefined' || value==null) {
			value = '';
		}
		
        var option = '';
		
		type = optionValue[0];
		opCaption = optionValue[1];
		opDescription = optionValue.length>2 && optionValue[2]!=''?optionValue[2]+'<br>':''; 
		
		var inputLabel = '';
		
        if (type=='checkbox') {
          type = "checkbox"
          option = window[id]? 'checked' : '';
		  inputLabel = optionValue.length>3 ? optionValue[3] : '';
        } else if(type=='text') {
          option = 'size="'+(isNaN(value)? (value.length*1.5>30? 30: Math.round(value.length*1.5)) : 10)+'"';
        }
        counter++;
		if (type=='textarea') {
          value = value.replace(/\\n/g,'\n'); //遊戲說明中的\n 得先換成換行符號
          input = `<textarea id="${id}" onchange="update_settingJS();" wrap="off">${value}<\/textarea>`;
		} else {
          input = `<input type="${type}" id="${id}" value="${value}" onchange="update_settingJS();" ${option}>${inputLabel}`;
		}
		/*
        html = `<p class="bold">1-2-${counter}<\/p><p>${caption}<br>${input}<\/p>`;
		*/
        html = `<p class="bold">1-2-${counter} ${opCaption}<\/p><p>${opDescription}${input}<\/p>`;
        elm.innerHTML = html;
        otherOptions.appendChild(elm);
      } else if (type!='undefined' && window[id]!=null && window[id].nodeType==null) {	  
        if (id=='helpDialogDescription') {		
          elm.value = window[id].replace(/\\n/g,'\n'); //遊戲說明中的\n 得先換成換行符號		  
        } else if (type=='boolean') {		
          elm.checked = window[id];		  
        } else if (id=='ttsPlaybackRate') {		
          elm.value = window[id].join("  ,  ");		  
        } else {		
          elm.value = window[id];	
        }		
      }
    }
};

/* 顯示或隱藏語法產生器 */
editorOnOff = function(elm, id) {
  if(typeof(id)=='undefined' || id==null) {
    id = 'editorWrapper';
  }
  document.getElementById(id).classList.toggle('hidden');
  var txt = elm.innerText;
  if(/開啟/.test(txt)) {
    elm.innerText = txt.replace(/開啟/, '關閉');
    elm.style.opacity = 0.5;
    elm.style.border = '1px dashed';
  } else {
    elm.innerText = txt.replace(/關閉/, '開啟');
    elm.style.opacity = 1;
    elm.style.border = '1px solid';
  }
};

/*
 按完右上角的叉叉後，將畫面捲回輸出的區塊
 */
callbackAfterClosed = function() {
  setTimeout( function() {
    var elm = document.getElementById('step3');
    if (typeof(elm)!='undefined' && elm!=null) {
      window.scrollBy({
        top:  elm.offsetTop,
        left: 0,
        behavior: 'smooth'
      });
    }
  },100);
};

/*
將 RegExp 中的保留符號先加上反斜線
 */
escapeRegExpString = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/*
 附加到 setttingJS 後面的函數
 主要是用來將 innerHTML 解碼為一般的字元
 檢查是否要修改 meata 的 referrer 為 no-referrer
 */
var footerOfSettingJS = `//
//
//
//=======================================================
//以下為執行程式,不需要修改
//=======================================================
//將題庫先進行 HTML 解碼, 標點符號才不會變 &#???;
decodeHTML = function(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};
//將指定清單中的變都先進行 HTML 解碼(文字型態的才需要)
var decodeList = ['questionLines', 'topTitle', 'helpDialogCaption', 'helpDialogDescription', 'helpDialogButtonCaption', 'gameMode_1_Caption', 'gameMode_2_Caption', 'gameMode_3_Caption'];
for(var nIndex=0; nIndex<decodeList.length; nIndex++) {
  var varName = decodeList[nIndex];
  if(typeof(window[varName])=='string') {
    window[varName] = decodeHTML(window[varName]);
  }
}  
\/* 
 <meta name="referrer" content="no-referrer" /> 
*\/
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
`;

