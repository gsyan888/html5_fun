/*
 *=====================================================
 * HTML5 FUN 國字加注音暨語文高手題庫語法產生器
 * 2022.10.31 by gsyan (https://gsyan888.blogspot.com/)
 * update : 2022.11.09
 *=====================================================
 */

/* 要載入的注音國字對照表檔案名稱 */
/*
 //本典
 var dictFilename = 'https://gsyan888.github.io/html5_fun/editor/assets/dict_revised.js';
*/
/* 簡編版 */
var dictFilename = 'https://gsyan888.github.io/html5_fun/editor/assets/dict_concised.js';

/* 注音符號字體檔 */
var bopomofoFontUrl = 'https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/assets/bopomofo.woff';


var allPhSymbol = "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦˊˇˋ˙";

/* 題庫類型 */
var qType = 4;

/*
由字典檔中找出少掉的單字讀音(簡編版才有)
 */
appendTheLostPhToDictLines = function () {
  if (typeof(dictFilename)=='string' && dictFilename != 'dict_concised.js') {
    return;
  }
  var pattern = '^([^,]+),([^,]+),([^,]+),\\d+\\n';
  var re = new RegExp(pattern, 'gm');
  var list = {};
  var fields,
  f1,
  f2,
  ch,
  lines,
  newLine;

  lines = dictLines.replace(/\r/g, '').split('\n');
  for (var i = 0; i < lines.length; i++) {
    fields = lines[i].split(',');
    ch = fields[0];
    if (typeof(ch) != 'undefined' && ch.length > 1) {
      ch = ch.replace(/，/g, '').split('');
      f1 = fields[1];
      f2 = fields[2];
      if (typeof(f1) == 'string' && f1.replace(/\s/g, '') != '') {
        f1 = f1.split(/\s+/);
        if (typeof(f2) == 'string' && f2.replace(/\s/g, '') != '') {
          f2 = f2.split(/\s+/);
          for (var j = 0; j < f1.length; j++) {
            if (typeof(f1[j]) == 'string' && f1[j].length > 1 && !(/ㄦ$/.test(f1[j])) && f1[j].replace(/\s/g, '') != '' && typeof(f2[j]) == 'string' && f2[j].replace(/\s/g, '') != '' && f1[j] != f2[j] && typeof(ch[j]) != 'undefined') {
              newLine = ch[j] + ',' + f2[j];
              if (typeof(list[newLine]) == 'undefined') {
                if (!(dictLines.match(new RegExp(newLine, 'm')))) {
                  list[newLine] = newLine + ',,0'; //+lines[i];
                }
              }
            }
          }
        } else {
          for (var j = 0; j < f1.length; j++) {
            if (typeof(f1[j]) == 'string' && f1[j].length > 1 && !(/ㄦ$/.test(f1[j])) && f1[j].replace(/\s/g, '') != '' && typeof(ch[j]) == 'string') {
              newLine = ch[j] + ',' + f1[j];
              if (typeof(list[newLine]) == 'undefined') {
                if (!(dictLines.match(new RegExp(newLine, 'm')))) {
                  list[newLine] = newLine + ',,0'; // + lines[i];
                }
              }
            }
          }
        }
      }
    }
  }
  var ksort = function (src) {
    const keys = Object.keys(src);
    keys.sort();
    return keys.reduce((target, key) => {
      target[key] = src[key];
      return target;
    }, {});
  };
  console.log(Object.values(ksort(list)).join('\n'));
  //dictLines += Object.values(ksort(list)).join('\n');
};

/*
載入注音符號的字型
@font-face { font-family: "注音符號"; src: url('assets/bopomofo.woff') format('woff');
 */
loadBopomofoFont = function () {
  var bopomofoFont = new FontFace("注音符號", "url(" + bopomofoFontUrl + ")");
  isBpomofoFontLoaded = false;

  bopomofoFont['load']()['then'](function (font) {
    document['fonts']['add'](font);
    isBpomofoFontLoaded = true;
    /* alert('font loaded'); */
  })['catch'](function (error) {
    isBpomofoFontLoaded = false;
    /* alert(error); */
    console.log(error);
  });
};

/*
載入 .js 檔案
 */
loadSettingFromExternalScript = function (scriptSrc, callback) {
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
複製指定物件的文字到剪貼簿中 (此部份與 editor.js 中的重覆, 但先保留)
Credit :
https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
target : 如果是字串，就當作是物件的 id, 再轉為物件
 */
copyAndSelectToClipboard = function (target) {
  if (typeof(target) == 'string') {
    target = document.getElementById(target);
  }
  if (typeof(target) != 'undefined' && target != null) {
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

/* 由按下的物件捲動到步驟? 的位置 */
jumpTo = function (from, to) {
  if (!isNaN(to)) {
    to = document.getElementById('step' + to);
  } else if (typeof(to) == 'string') {
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

/* 利用 <textarea> 來將 innterHTML 解碼為一般文字 */
decodeHTML = function (html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/*
將 RegExp 中的保留符號先加上反斜線
 */
escapeRegExpString = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

/*
改變題庫類型的變數, 並更新結果
 */
setQType = function (value) {
  qType = Number(value);
  convertToGameQuestionLines();
};

/*
以查表的方式，取得字詞的注音
 */
getPhrasePh = function (str) {
  var match,
  fields,
  re,
  output,
  ph;
  output = '';
  ph = [];
  re = new RegExp('^' + escapeRegExpString(str) + ',(.*),', 'gm');
  if (match = dictLines.match(re)) {
    for (var j = 0; j < match.length; j++) {
      fields = match[j].split(',');
      ph.push((fields.length>3&&fields[2]!=''?fields[2]:fields[1]).trim());
    }
  }

  if (ph.length > 1) {
    /*
    找到多組注音，
    如果國字是單字者，直接準備輸出；
    如果是多字者，將注音以空格分割後分析各國字的注音，
    是多音的才列選單(用中括號及逗號 [ , ] 列表)
     */
    if (str.length == 1) {
      output = (output != '' ? ' ' : '') + str + '[' + ph.join(',') + ']';
    } else {
      var phList = [];
      for (var i = 0; i < ph.length; i++) {
        var p = (ph[i].trim()).split(/\s/);
        for (var j = 0; j < p.length; j++) {
          if (typeof(phList[j]) == 'undefined' || phList[j] == null) {
            phList[j] = {};
          }
          /*
          j 為第幾組注音(第幾個國字)
          注音(p[j])當物件的 key
          最後分析 phList[j] 如果有多個者，就是多音字
           */
          phList[j][p[j]] = p[j];
        }
      }
      /* 分析結果 */
      for (var i = 0; i < str.length; i++) {
        var ch = str.substr(i, 1);
        var keys = Object.keys(phList[i]);
        if (keys.length > 1) {
          output += (output != '' ? ' ' : '') + ch + '[' + keys.join(',') + ']';
        } else {
          output += (output != '' ? ' ' : '') + ch + keys[0];
        }
      }
    }
  } else if (ph.length == 1) {
    /* 只有一組注音者，直接準備輸出 */
    ph = ph[0].split(/\s+/);
    for (var i = 0; i < str.length; i++) {
      output += (output != '' ? ' ' : '') + str.substr(i, 1) + ph[i];
    }
  }
  return output;
};

/*
將查不到的語詞, 一個字一個字拆開來重查
 */
getCharacterPh = function (str) {
  var line,
  ch,
  ph,
  phStr,
  re,
  match;
  output = '';
  str = str.trim();
  for (var j = 0; j < str.length; j++) {
    phStr = '';
    ph = [];
    ch = str.substr(j, 1);
    phStr = getPhrasePh(ch);
    output += phStr + ' ';
  }
  return output;
};

/*
更新最後輸出區的內容
 */
updateQuestionLines = function (str) {
  if (typeof(str) == 'undefined' || str == null) {
    var output = document.getElementById('outputLines');
    if (typeof(output) != 'undefined' && output != null) {
      var str = output.innerText; ;
    }
  }
  var q = document.getElementById('questionLines');
  if (typeof(str) == 'string' && typeof(q) != 'undefined' && q != null) {
    if (/ph-warning/i.test(str)) {
      /* 如果轉換時發現問題的,就用 innerHTML 標顏色 */
      q.innerHTML = str.replace(/\n/g, "<br>");
    } else {
      q.innerText = str;
    }

    /* 如果是語文高手格式, 就顯示複製語法的區塊 */
    var elm = document.getElementById('embededCode');
    if (typeof(elm) != 'undefined' && elm != null) {
      if (qType < 4 && str.replace(/\s/g, '') != '' && !(/ph-warning/i.test(str))) {
        elm.style.display = 'block';
      } else {
        elm.style.display = 'none';
      }
    }

    questionLines = decodeHTML(q.innerText);

    varNameAndIdList = ['questionLines'];
    update_settingJS();
  }
};

/*
更新 settingJS 的 Script 內容，
這樣才能由 embeded 程式 start 後，更新題庫
 */
update_settingJS = function () {
  var settingJS = document.getElementById('settingJS');
  if (typeof(settingJS) != 'undefined') {
    var elm = document.getElementById('questionLines');
    if (typeof(elm) != 'undefined' && elm != null) {
      questionLines = decodeHTML(elm.innerText).trim();

      /*
      formatForPreview();
      改由投籃高手 preview 中轉換
       */
      parseQuestionLinesByLineFeed(questionLines);

      /* 由 settingJS 取得題庫設定, 並將 questionLines 的部份更新 */
      var qRE = /(questionLines = function\(\)\{\/\*--這一行請勿更改--)(?:.|\n|\r)*?(-----\*)/m;
      settingJS.innerHTML = settingJS.innerHTML.replace(qRE, '$1' + "\n" + questionLines + "\n" + '$2');
    }
  }
}

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
}

/*
顯示指定 id 的 javascript 內容
0 : settingJS
1 : injectionJS
 */
showJSCode = function (n) {
  /*
  應用時是否開在新視窗
  像 Speaking 就需要
   */
  var enableOpenInNewWindow = false;

  var jsID = ['settingJS', 'injectionJS'];
  var obj = document.getElementById('sourceCode');
  var qRE = /(questionLines = function\(\)\{\/\*--這一行請勿更改--)(?:.|\n|\r)*?(-----\*)/m;

  /* 三個顯示用的區塊, 看是要顯示哪一個，就先清空當標記 */
  if (/查看/.test(document.getElementById('showCodeBtn' + n).innerText)) {
    obj.style.display = 'block'; /* 顯示 sourceCode */
  } else {
    obj.style.display = 'none'; /* 顯藏 sourceCode */
  }
  /* 在空的顯示區中填入原始碼 */
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
        html = html.replace(/(var\s+html5FunGameCode\s+=\s)([^\n]+)(\n)/m, '$1 "' + gameCode + '"; $3');
        html = html.replace(/(var\s+html5FunJsCode\s+=\s)([^\n]+)(\n)/m, '$1 "' + encodedJS + '"; $3');
        html = getJSheadAttributes(jsID[0]) + html + jsFoot;
      }

      /* =========== Google Sites 需要是完整的網頁語法 ===== */
      var elm = document.getElementById('forGoogleSites');
      var forGoogleSites = elm != null && typeof(elm.checked) != 'undefined' && elm.checked != null ? elm.checked : false;
      if (forGoogleSites) {
        html = decodeHTML(html);

        /*
        因為 Speaking 必須由 iFrame 內開新視窗，才能用麥克風
        所以加了一個按鈕執行 window.open ,
        之後啟動 autostart 才不用多按一層按鈕
        同步修改 Template1 中的 closeApp , 按叉叉時是執行 window.close()
         */
        /* 使用 Template1 將原來的語法加上 HTML 的頭尾 */
        html = getTemplate(1).replace('<!-- 這裡插入原本的語法 -->', html);

        if (!enableOpenInNewWindow) {
          html = html.replace(/isInIFrame = \\`\$\{isInIFrame\}\\`;\s*\n/, '');
          html = html.replace(/\\\//g, '/');
        } else {
          html = html.replace(/autostart="false"/, 'autostart="true"');
          /* &符號必須轉為 &amp; \ 必須轉為 \\ 才能用 */
          html = html.replace(/\</g, '&amp;lt;').replace(/>/g, '&amp;gt;').replace(/\\/g, '\\\\');
          /* 使用 Template2 變成 Google Sites 嵌入的語法 */
          html = getTemplate(2).replace('<!-- 這裡插入編過碼的語法 -->', html);
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

formatForPreview = function () {
  var result = '',
  line,
  lines,
  list,
  match,
  phrases,
  phrase,
  words,
  word,
  ph,
  phraseList,
  isSpeaking;

  /* 用來找注音的規則 */
  //var allPhSymbol = "ㄅㄆㄇㄈㄉㄊㄋㄌㄍㄎㄏㄐㄑㄒㄓㄔㄕㄖㄗㄘㄙㄧㄨㄩㄚㄛㄜㄝㄞㄟㄠㄡㄢㄣㄤㄥㄦˊˇˋ˙";
  var re = new RegExp('[' + allPhSymbol + ']+');

  lines = questionLines.replace(/\r/g, '').split(/\n/);
  for (var i = 0; i < lines.length; i++) {
    line = lines[i].trim();

    isSpeaking = false;

    /* 如果是 Speaking , 將格式還原成國字旁加注音 */
    if (/##/.test(line)) {
      list = line.split('##');
      word = list[0].split('');
      ph = list[1].split(/\s/);
      if (word.length == ph.length) {
        list = [];
        for (var j = 0; j < word.length; j++) {
          list.push(word[j] + ph[j]);
        }
        result += (result != '' ? '\n' : '') + list.join(' ');
        isSpeaking = true;
      }
    }

    if (!isSpeaking && line.replace(/\s/g, '') != '') {
      phraseList = [];

      phrases = line.split(',');

      for (var j = 0; j < phrases.length; j++) {

        phrase = phrases[j].trim();

        if (phrase.replace(/\s/g, '') != '') {

          //字和字間，照說會有空格，重新分解再組合
          words = phrase.split(/\s+/);
          list = [];

          for (var k = 0; k < words.length; k++) {

            word = words[k].trim();
            target = word;
            while (match = target.match(re)) {
              ph = match[0];

              if (word.length <= (ph.length + 1)) { //正常的
                list.push(word);
                target = '';
              } else {
                //中間有雜質的
                if (match.index > 0) { /* 注音在後 */
                  ph = (word.substr(match.index - 1, 1)).trim() + ph; //重組國字+注音
                  word = (word.substr(0, match.index - 1).split('').join(' ')).trim();
                  if (word != '')
                    list.push(word);
                  if (ph != '')
                    list.push(ph);
                  target = target.substr(match.index + match[0].length);
                } else { /* 注音在前 */
                  ph = word.substr(0, ph.length + 1);
                  if (ph != '')
                    list.push(ph);
                  target = word.substr(ph.length);
                }
                word = target;
              }
            }
            if (target.length > 0) {
              list.push(target);
            }
          }
          phraseList.push(list.join(' '));
          //console.log(txt);
        }
      }
      result += (result != '' ? '\n' : '') + phraseList.join(',');
    }
  }
  questionLines = result;
  //console.log(questionLines);
};

/*
將選定的注音更新到該字中
 */
setPh = function (item, parentNode) {
  target = item.parentNode.target;
  target.innerHTML = item.textContent;
  var div = document.getElementById('phSelector');
  div.parentNode.removeChild(div);
  /* updateQuestionLines(); */
  convertToGameQuestionLines();
};

/*
彈出多音字的選單供選取
 */
selectPh = function (elm) {
  var phList = elm.title.replace(/\[/g, '').replace(/\]/g, '').split(',');
  var div = document.getElementById('phSelector');
  if (typeof(div) == 'undefined' || div == null) {
    var div = document.createElement('div');
  }
  div.id = 'phSelector';
  div.setAttribute('class', 'phSelector');
  div.target = elm;
  var html = '';

  for (var i = 0; i < phList.length; i++) {
    html += `<div class="phItem" onclick="setPh(this);">${phList[i]}</div>`;
  }
  /* selectorCloseBtn */
  html += '<div class="selectorCloseBtn"><span id="close" onclick="this.parentNode.parentNode.remove();">&times;</span></div>';

  div.innerHTML = html;
  //elm.parentNode.parentNode
  document.body.appendChild(div);

  var scenceHeight = window.innerHeight && document.documentElement.clientHeight ?
    Math.min(window.innerHeight, document.documentElement.clientHeight)
     : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

  div.style.top = ((scenceHeight / 2) + window.scrollY) + 'px';
};

/*
將校正區加好注音的內容轉為指定題庫的格式
 */
convertToGameQuestionLines = function () {
  var output;
  var elm = document.getElementById('outputLines');
  if (typeof(elm) != 'undefined' && elm != null) {
    var str = decodeHTML(elm.innerText);
    str = str.replace(/\s+,/g, ',').replace(/,\s+/g, ',');
    if (qType == 5) {
      output = convertToSpeakingFormat(str);
    } else if (qType >= 1 && qType <= 3) {
      output = convertToBasketballFormat(str);
    } else {
      output = str; /* 國字旁加注音, 不用改格式 */
    }
    updateQuestionLines(output);
  }
};

/*
轉為 HTML5 Speaking 格式, 第一欄放國字，將注音附加在後一欄
 */
convertToSpeakingFormat = function (str) {
  var output = '';
  var lines = str.replace(/\r/g, '').split(/\n/); ;
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var result = '';
    var phStr = '';
    if (line.replace(/\s/g, '') != '') {
      var preIsPh = false;
      for (var j = 0; j < line.length; j++) {
        var c = line.substr(j, 1);
        if (allPhSymbol.indexOf(c) < 0) {
          if (c == ' ' && preIsPh) {
            c = '';
          }
          result += c;
          preIsPh = false;
        } else {
          if (!preIsPh) {
            phStr += ' ';
          }
          phStr += c;
          preIsPh = true;
        }
      }
      output += (result.trim()) + '##' + (phStr.trim()) + '\n';
    }
  }
  return output;
};

/*
轉為語文高手的格式
 */
convertToBasketballFormat = function (str) {
  /*
  語文高手以逗號分欄位
  語文高手只要處理第一欄的內容，後面的都不用動
  形近字: 第一欄只有國字
  同音字: 第一欄轉為國字注音
  多音字: 第一欄轉為純注音，由注音查詢結果來找
  ex.
  1.形近字: 摩 磨,ㄇㄛˊ摩 ㄘㄚ擦,ㄢˋ按 ㄇㄛˊ摩,ㄇㄛˊ磨 ㄌㄧㄢˋ練
  2.同音字: ㄇㄛˊ摩 ㄇㄛˊ磨,ㄇㄛˊ摩 ㄘㄚ擦,ㄢˋ按 ㄇㄛˊ摩,ㄇㄛˊ磨 ㄌㄧㄢˋ練
  3.多音字: ㄌㄨˋ ㄌㄡˋ,ㄓㄠ朝 ㄌㄨˋ露,ㄌㄡˋ露 ㄇㄧㄢˋ面
   */
  var output = '';
  var lines = (str.trim()).replace(/\r/g, '').split(/\n/);
  for (var n = 0; n < lines.length; n++) {
    var line = lines[n];
    var result = '';
    if (line.replace(/\s/g, '') !== '') {

      var fields = (line.trim()).split(',');

      if (fields.length < 2) {
        /* 欄位不足兩個，肯定不是語文高手的格式, 標紅色 */
        result = '<span class="ph-warning" title="欄位不足，請確認是否為語文高手的題庫格式。">' + line + '</span>';
        console.log('Error: ' + line);
      } else if (qType == 2) {
        var re = new RegExp('[' + allPhSymbol + ']+', 'g');
        var match;
        var isAllMatch = true;
        if (match = fields[0].match(re)) {
          /* 檢查第一欄中的注音是否都一樣 */
          var firstMatch = match[0];
          for (var m = 0; m < match.length; m++) {
            if (match[m] != firstMatch) {
              isAllMatch = false;
              break;
            }
          }
        } else {
          /* 找不到注音的 */
          isAllMatch = false;
        }
        if (isAllMatch) {
          result = line; /* 同音字為預設的格式了，不變動 */
        } else {
          result = '<span class="ph-warning" title="首欄的字不是全部同音，請確認是否為語文高手的題庫格式。">' + line + '</span>';
          console.log('Error: ' + line);
        }
      } else {
        /* 第一欄中又以空格分隔各字 */
        var words = (fields[0].trim()).split(/\s/);
        for (var i = 0; i < words.length; i++) {
          var word = words[i];
          var w = '';
          words[i] = '';
          for (var j = 0; j < word.length; j++) {
            var ch = word.substr(j, 1);
            if (allPhSymbol.indexOf(ch) < 0) {
              words[i] += ch; /* 只取不是注音者 */
            }
          }
        }
        fields[0] = words.join(' '); /* 將不是注音者組合回去 */
        if (qType == 1) {
          result = fields.join(',');
        } else if (qType == 3) {
          var target = words[0];
          var foundError = false; /* 多音字的第一欄, 國字應該要一樣 */
          for (var i = 0; i < words.length; i++) {
            if (target != words[i]) {
              foundError = true;
              break;
            }
          }
          if (foundError) {
            /* 多音字在第一欄中卻找到不同的國字, 標紅色 */
            result = '<span class="ph-warning" title="請檢查第一欄位的國字，確定是「多音字」的格式。">' + line + '</span>';
            console.log('Error: ' + line);
          } else {
            var phList = {};
            var re = RegExp(target);
            for (var i = 1; i < fields.length; i++) {
              var words = (fields[i].trim()).split(/\s/);
              for (var j = 0; j < words.length; j++) {
                if (re.test(words[j])) {
                  var ph = words[j].replace(re, '');
                  phList[ph] = target;
                }
              }
            }
            fields[0] = Object.keys(phList).join(' ');
            result = fields.join(',');
          }
        }
      }
    }
    output += (result.trim()) + '\n';
  }
  return output;
};

/*
將輸入區的內容轉為國字注音
 */
convert = function () {
  var elmIn = document.getElementById('sourceLines');
  var elmOut = document.getElementById('outputLines');
  if (!elmIn || !elmOut) {
    alert('error');
    return;
  }
  var lines = elmIn.value.replace(/\r/).split(/\n/);
  var line,
  ch,
  term,
  ph,
  phStr,
  re,
  match;

  var chPunc = decodeHTML('，、。；．？！︰「」『』…～＄％＠＆＃＊‧【】《》（）＜＞◎○●⊕⊙△▲☆★◇◆□');
  var punc = '!()-[]{};:\'"\\,<>./?@#$%^&*_~' + chPunc;
  var notChinese = 'a-zA-Z0-9' + escapeRegExpString(punc)+'\\s'; /* 加上空白 */
  var reTermAtLeft = new RegExp('^([^' + notChinese + ']+)(.*)');
  var reTermAtRight = new RegExp('^([' + notChinese + ']+)(.*)');
  var output = '';
  var outputPh = '';
  var outputLine = '';

  /*
  一行行拆解
  一字詞一字詞拆解(a-zA-Z
   */
  for (var i = 0; i < lines.length; i++) {
    outputPh = '';
    outputLine = '';
    line = lines[i].trim();
    while (line.replace(/\s/g, '') != '') {
      /* if( (match=line.match(/^([^a-zA-Z0-9,;\s\'\"\#\*\(\)\.\-\+\=\&\!\:]+)(.*)/)) )  { */
      if ((match = line.match(reTermAtLeft))) {
        term = match[1];
        line = match[2] ? match[2] : '';

        /* 以語詞查注音 */
        ph = getPhrasePh(term);
        if (ph == '') {
          /* 以字查注音 */
          ph = getCharacterPh(term);
        }
        /* 附加處理好的國字注音 */
        outputLine += ph;
        /* } else if( (match=line.match(/^([a-zA-Z0-9,;\s\'\"\#\*\(\)\.\-\+\=\&\!\:]+)(.*)/)) ) { */
      } else if ((match = line.match(reTermAtRight))) {
        /* 不是國字注音者，直接附加 */
        outputLine += match[1];
        line = match[2] ? match[2] : '';
      }
    }

    output += outputLine + '<br>';
  }
  elmOut.innerHTML = output.replace(/(\[[^\]]+\])/g, function (p0, p1) {
    var phList = p1.replace(/\[/g, '').replace(/\]/g, '').split(',');
    return '<span class="ph-red" title="' + p1 + '" onclick="selectPh(this);">' + phList[0] + '</span>';
  });
  /* updateQuestionLines(); */
  convertToGameQuestionLines();
};

/*
將設定的區塊 settingJS 去掉尾巴的函數後
將設定值輸出成 DataURI base64 編碼
匯出成 questions-set-xxxx.js
 */
exportJsFile = function (exportString) {
  /* 檔名後面加上日期時間，變成 questions-set-20xx-xx-xx.js */
  var dateNow = new Date();
  var dateStr = dateNow.toISOString().split('T')[0];
  var filename = 'questions-set-' + dateStr + '.js';

  if (typeof(exportString) == 'undefined' || exportString == null) {
    /* 去掉 settingJS questionLines 以後的尾巴 */
    /* 語文高手的需要轉換,所以不去掉
    var qRe = new RegExp(/(\*--這一行請勿更改--\"\.length\+1,-9\);\n)(.*)/sm)
    var exportString = decodeHTML(document.getElementById('settingJS').innerHTML).replace(qRe, '$1\n\n');
     */
    var exportString = decodeHTML(document.getElementById('settingJS').innerHTML);
  }
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
}

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
將多音的字詞整合在同一行
並打包下載檔案
 */
compressAndDownlodDictFile = function () {
  var lines = dictLines.replace(/\r/g, '').split(/\n/);
  var dict = {};
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.replace(/\s/g, '') != '') {
      var fields = line.split(',');
      if (typeof(dict[fields[0]]) == 'undefined' || dict[fields[0]] == null) {
        dict[fields[0]] = '';
      }
      if (dict[fields[0]] != '') {
        dict[fields[0]] += ', ';
      }
      dict[fields[0]] += fields[1];
    }
  }
  var result = '';
  var keys = Object.keys(dict);
  for (var i = 0; i < keys.length; i++) {
    result += keys[i] + ',' + dict[keys[i]] + '\n';
  }
  result = 'dictLines = function(){\/*--這一行請勿更改--\n' + result;
  result += '-----*\/}.toString().replace(/\\r/g,"").slice("function(){\/*--這一行請勿更改--".length+1,-9);\n';
  exportJsFile(result);
};
/*
載入設定檔時顯示動畫
 */
loadingAnimation = function (txt, callback) {
  if (typeof(txt) == 'undefined' || txt == null) {
    var txt = "載入檔案中";
  }
  var scenceWidth = window.innerWidth && document.documentElement.clientWidth ?
    Math.min(window.innerWidth, document.documentElement.clientWidth)
     : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var scenceHeight = window.innerHeight && document.documentElement.clientHeight ?
    Math.min(window.innerHeight, document.documentElement.clientHeight)
     : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

  var loadingLogo = document.createElement('div');
  loadingLogo.id = 'loadingLogo';
  loadingLogo.setAttribute('style', "width:240px;height:24px;z-index:10000;position:absolute;margin:auto;transform: translate(-50%, -150px);opacity:0.85;");
  loadingLogo.style.top = ((scenceHeight / 2) + window.scrollY) + 'px';
  loadingLogo.style.left = (scenceWidth / 2) + 'px';

  loadingLogo.innerHTML = `
  	<div style="position:absolute;
  		transform:translate(50px,32px);
  		width:140px;height:140px;
  		background-color:white;
  		border-radius:140px;
  		background-image: url('https://gsyan888.github.io/html5_fun/assets/icon.png');
  		background-repeat: no-repeat;
  		background-size: 100px 100px;
  		background-position: center;"
  		>
  	<p id="loadingLabel" style="width:120px;height:24px;
  		position:absolute;
  		transform:translate(10px,-64px);
  		text-align:center;
  		font-size: 20px;
  		color: red; /* #cc3300 */;"
  		text-shadow: 5px 5px 10px black;
  		margin:auto;
  		padding:4px;
  		>${txt}</p>
  	</div>
  	`;

  document.body.appendChild(loadingLogo);

  var angle = 10;

  loadingLogoEnable = true;

  var loadingIntervalId = setInterval(function () {
    /* var loadingLogo = document.getElementById('loadingLogo'); */
    loadingLogo.style.top = ((scenceHeight / 2) + window.scrollY) + 'px';
    loadingLogo.style.left = (scenceWidth / 2) + 'px';
    var label = document.getElementById('loadingLabel');
    if (angle != 10) {
      angle = 10;
    } else {
      angle = -10;
    }
    label.style['transform'] = 'translate(10px,-64px) rotate(' + angle + 'deg)';
    if (typeof(loadingLogoEnable) == 'undefined' || loadingLogoEnable == null || !loadingLogoEnable) {
      clearInterval(loadingIntervalId);
      loadingLogo.parentNode.removeChild(loadingLogo);
      if (typeof(callback) == 'function') {
        callback();
      }
    }
  }, 100);
};

//依據格式分析出 title 跟題庫
function parseQuestionLines(data) {
  if (typeof(data) != 'undefined' && data != null) {
    if (data.match(/qCount/)) {
      parseQuestionLinesOfFlashFormat(data);
    } else if (data.match(/\"[^\"]+\"/)) {
      parseQuestionLinesOfArrayElements(data);
    } else {
      parseQuestionLinesByLineFeed(data);
    }
  } else {
    alert('題庫的格式可能有誤哦!');
  }
  if (typeof(question_lines) == 'undefined' || question_lines == null || question_lines.length < 1) {
    question_lines = null;
  }
};

/*------======語文高手用的題庫解析函數=====-----*/
/* 將 Flash 格式分析出 title 跟題庫 */
function parseQuestionLinesOfFlashFormat(data) {
  var isFirst = true;
  if (data != '') {
    data = data.replace(/\r|\n/g, '');
    var src = data.split('&');
    for (var i in src) {
      if (src[i] != '') {
        var query = src[i].split('=');
        switch (query[0]) {
        case 'title':
          title = query[1];
          break;
        default:
          if (query[0].match(/q\d+/)) {
            if (isFirst) {
              isFirst = false;
              question_lines = [];
            }
            question_lines.push(query[1]);
          }
        }
      }
    }
  }
};

/* 題庫本身已是陣列了(有引號)，就將字串轉為變數 */
function parseQuestionLinesOfArrayElements(data) {
  data = data.replace(/\r|\n/g, '');
  question_lines = [];
  title = '語文高手';
  var lines = data.match(/\"[^\"]+\"/gm);
  if (typeof(lines) != 'undefined' && lines != null && lines.length > 0) {
    for (var line of lines) {
      if (str = line.match(/[^"]+/)) {
        if (str[0].length > 0) {
          question_lines.push(str[0]);
        }
      }
    }
  }
};
