/*
 HTML5 FUN Editor by gsyan(https://gsyan888.blogspot.com/)
 2022.10.29 update
 
 使用時，id 設為 editorJS；
 需事先建立好 <OL>(id: editor)，及 <textarea>(id: questionLines)
 */
const fieldsSeparator = "##"; /* 欄位分隔符號 */
//const autoSplitPattern = ' '; /* 當發現文字和媒體路徑相連時,自動填入的文字(空字串就不處理) */
const autoSplitPattern = '~~'; /* 當發現文字和媒體路徑相連時,自動填入的文字(空字串就不處理) */

const editorId = "editor"; /* 圖形編輯區 id */
const questionLinesId = "questionLines"; /* 文字編輯區 id */

var assetsBaseURL = "https://gsyan888.github.io/html5_fun/editor/assets/";

var iconSeparator = assetsBaseURL+"icon-separator.png";
var iconMicRed = assetsBaseURL+"icon-mic-red.png";
var iconThumbnail = assetsBaseURL+"icon-thumbnail.png";


var base64Images = [];

//var lineDefaultValue = Array(3+1).join(fieldsSeparator); /* repeat FS 3 times */
var lineDefaultValue = fieldsSeparator;

/* 在游標處插入分隔符號 */
insertSeparator = function () {
  insertStringAtCursor(editorId, fieldsSeparator);
  document.getElementById(editorId).focus();
  document.getElementById(editorId).blur();
};

/* 利用 <textarea> 來將 innterHTML 解碼為一般文字 */
decodeHTML = function (html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

/*
textarea 中的題庫轉到圖形編輯區<OL>
參數: fromTarget(textarea), toTarget(OL); 使用 id 或是物件均可
 */
convertToEditor = function (fromTarget, toTarget) {

  fromTarget = (typeof(fromTarget) != 'undefined' && fromTarget != null) ? (typeof(fromTarget) == 'string' ? document.getElementById(fromTarget) : fromTarget) : document.getElementById(questionLinesId);
  toTarget = (typeof(toTarget) != 'undefined' && toTarget != null) ? (typeof(toTarget) == 'string' ? document.getElementById(toTarget) : toTarget) : document.getElementById(editorId);

  var lines = fromTarget.value.replace(/\r/g, '').split(/\n/);
  var html = '',
  fields,
  txt;

  for (var i = 0; i < lines.length; i++) {

    if (lines[i].replace(/\s/g, '') != '') {

      html += '<li>' + inputChangeHandler(lines[i]) + '</li>';
    }
  }

  if (html == '') {
    html = '<li>' + lineDefaultValue + '</li>';
  }
  toTarget.innerHTML = html;

  return;
};

/*
圖形編輯區<OL>轉為一行行的題庫格式
參數: id (<OL>的 id)
回傳: 字串
 */

convertToLines = function (id) {

  if(typeof(autoSplitPattern)=='undefined' || autoSplitPattern==null) {
    autoSplitPattern = '';
  }

  if (typeof(id) != 'string') {
    return null;
  }

  var fromTarget = document.getElementById(id);

  if (typeof(fromTarget) == 'undefined' || fromTarget == null) {
    return null;
  }

  var list = decodeHTML(fromTarget.innerHTML).replace(/&nbsp;/g, ' ');
  var lines = list.split('</li>');

  var result = '',
  resultLine,
  fields,
  txt;

  for (var i = 0; i < lines.length; i++) {

    resultLine = '';
    lines[i] = lines[i].replace(/<li>|<span>(<br>)?<\/span>|<br>/ig, '');
    lines[i] = lines[i].replace(/&nbsp;/g, ' ');
    lines[i] = lines[i].replace(/<img[^>]+title=\"_這是欄位分隔符號_\">/g, fieldsSeparator); /* 先將手動設空欄的圖換成## */

    fields = lines[i].split('</span>');

    for (var f = 0; f < fields.length; f++) {
      txt = fields[f].replace(/<li>|<span>|<br>/g, '');

      if (txt != '') {
        while (/<img\s(?:.)*?\">/i.test(txt)) {
          txt = txt.replace(/<img\s(?:.)*?\">/i, function (p1) {
            /*
            圖片、聲音與分隔符號均是 <img>, 依特徵分離出來
            聲音的 title 屬性有路徑或是 base64 編碼的資料
            分隔符號的 title 屬性有「_這是欄位分隔符號_」
             */
            var replacement = '';

            if (/title\s*=\s*\"[^\"]+\.mp3\"/i.test(p1)) {
              replacement = p1.match(/title\s*=\s*\"([^\"]+\.mp3)\"/i)[1];
            } else if (/title\s*=\s*\"[^\"]+\.tts\"/i.test(p1)) {
              replacement = p1.match(/title\s*=\s*\"([^\"]+\.tts)\"/i)[1];
            } else if (/title\s*=\s*\"data\:audio\/mpeg\;base64[^\"]+\"/i.test(p1)) {
              replacement = p1.match(/title\s*=\s*\"(data\:audio\/mpeg\;base64[^\"]+)\"/i)[1];
            } else if (match = p1.match(/title\s*=\s*\"id-(\d+)\"/i)) {
              var id = parseInt(match[1]);
              replacement = (typeof(base64Images) != 'undefined' && typeof(base64Images[id]) != 'undefined' ? base64Images[id] : '');
            } else if (/title\s*=\s*\"_這是欄位分隔符號_\"/i.test(p1)) {
              replacement = ' ';
            } else {
              replacement = p1.match(/src\s*=\s*\"([^\"]+)\"/i)[1];
            }

            return (autoSplitPattern != '' ? '\t' + replacement + '\t' : replacement);

          });
        }
        resultLine += txt;
      }
    }
    if (resultLine != '') {
      if (autoSplitPattern != '') {
        /* resultLine = resultLine.replace(/\t{2}/g, '\t').replace(/(##)\s+/g, '$1').replace(/\s+(##)/g, '$1').replace(/^\s+|\s+$/g, '').replace(/\t/g, autoSplitPattern); */
        resultLine = resultLine.replace(/\t{2}/g, '\t').replace((new RegExp('('+fieldsSeparator+')\\s+', 'g')), '$1').replace((new RegExp('\\s+('+fieldsSeparator+')', 'g')), '$1').replace(/^\s+|\s+$/g, '').replace(/\t/g, autoSplitPattern);
      }
      resultLine += '\n';
    }
    result += resultLine;
  }
  return result;
};

/* 將圖形編輯區的題庫轉到文字編輯區 */
updateQuestionLinesValue = function () {
  if (lines = convertToLines(editorId)) {
    var q = document.getElementById(questionLinesId);
    if(typeof(q)!='undefined' && q!=null) {
      q.value = lines;
      questionLines = q.value;
	}
  }
};

/* 
 一行行檢查圖形編輯區的格式
 最後更新至文字編輯區
 isTriggrByBlur : 是否由圖形編輯區呼叫的，是就保留游標位置
 excludeNode : 跳過不檢查的
 */
checkListNodes = function (isTriggrByBlur, excludeNode) {
  var list = document.getElementById(editorId);

  /*
  保留 blur event 觸發前, 游標所在的相關資訊,
  給 insertStringAtCursor 用的。
   */
  if (typeof(isTriggrByBlur) != 'undefined') {
    var selectionOld = [];
    selectionOld['anchorNode'] = window.getSelection().anchorNode;
    selectionOld['anchorNodeParent'] = window.getSelection().anchorNode.parentNode; /* for #text node, get <OL> */
    selectionOld['anchorNodeParent'].pNode = window.getSelection().anchorNode.parentNode.parentNode; /* for #text node, get <OL> */
    var p = selectionOld['anchorNodeParent'].parentNode;
    for (var i = 0; i < p.children.length; i++) {
      if (p.children[i] == selectionOld['anchorNodeParent']) {
        selectionOld['anchorNodeParent'].index = i;
        break;
      }
    }
    selectionOld['anchorOffset'] = window.getSelection().anchorOffset;
    selectionOld['focusNode'] = window.getSelection().focusNode;
    selectionOld['focusOffset'] = window.getSelection().focusOffset;
    list['selectionOld'] = selectionOld;
  }

  if (list.innerHTML.replace(/&nbsp;|\s|<br>/g, '') == '') {
    list.innerHTML = '<li>' + lineDefaultValue + '</li>';
  } else {
    var nodes = list.childNodes;
    for (var i = 0; i < nodes.length; i++) {
      if (typeof(excludeNode) != 'undefined' && excludeNode != null && nodes[i] == excludeNode) {
        /* continue; */
      } else {
        inputChangeHandler(nodes[i]);
      }
    }
  }

  /*
  //console.log(list_values);
  //console.log(convertToLines(editorId));
   */
  updateQuestionLinesValue();
};

/*
 檢查語法，將語法轉為對應的文字、圖示
 node : 要檢查的元素或是字串
 回傳值: 如果 node 是物件，就設定它的 innerHTML, 否則回傳 HTML 語法字串
 */
inputChangeHandler = function (node) {
  var match,
  tag,
  txt;
  var imgTagFound = false,
  audioTagFound = false,
  blankFound = false; ;
  var stack = [];
  var html = '';
  var loopCounter = 0;
  var debug = !true;
  var isString = false;

  /* console.log(node.nodeName); */
  if (typeof(node) == 'undefined' || node == null) {
    return;
  } else {
    if (typeof(node) == 'string') {
      isString = true;
    } else if (typeof(node.innerHTML) == 'undefined' || node.innerHTML == null) {
      return;
    } else if (!(/li/i.test(node.nodeName))) {
      return;
    }
  }

  var value = !isString ? node.innerHTML : node;

  if (debug) {
    console.log(value);
  };

  value = value.replace(/<span>(<br>|\s+|&nbsp;)?<\/span>|&nbsp;|<br>/ig, '');
  if (value === '') {
    value = lineDefaultValue; /* '######'; */
  }

  //將素材媒體分隔符號換成跳格 2022.11.26 加入
  value = value.replace((new RegExp(autoSplitPattern, 'g')), '\t');
  
  /* value = value.replace(/&nbsp;/g, ' '); */

  /* match = value.match(/^(<[^>]+>)((?:.)*?)(<\/[^>]+>$)/); */
  while (value != '' && loopCounter++ < 99999) {

    blankFound = false;
    imgTagFound = false;
    audioTagFound = false;

    txt = '';
    tag = '';
    if (match = value.match(/^(<[^>]+>)(.*)/)) {
      /* tag 在左側 */

      tag = match[1];
      value = match[2];

      if (debug) {
        console.log('===> ' + tag);
      }

      if (/span|img/i.test(tag)) {
        if (stack.length > 0) {
          var spanText = stack.join('');
          if (/<span/i.test(stack[0])) {
            if (stack.length > 1) { /* 如果只有一個 <span> , 就全扔了 */
              /* html += stack.join('')+'</span>'; */
              html += (spanText != '' ? (spanText + '</span>') : '');
            }
          } else {
            /* html += '<span>'+stack.join('')+'</span>'; */
            html += (spanText != '' ? ('<span>' + spanText + '</span>') : '');
          }
          stack = [];
        } else if (/<span/i.test(tag)) {
          stack.push(tag);
        }

        if (/<img\s/i.test(tag)) {
          html += tag;
        }
      } else {
        /* strip other tags */
        if(debug) { console.log('strip: '+tag); }
      }
    } else if (match = value.match(/^([^<]+)(<.*)/)) {
      /* tag 在右側 */

      txt = match[1];
      value = match[2];
      tag = '???';

      if (debug) {
        console.log(txt + ' <===');
      }

      if ((new RegExp(fieldsSeparator)).test(txt)) {
        blankFound = true;
        txt = replaceWithBlankIcon(txt);
        value = txt + value;
      }

      if (!blankFound) {
        [txt, imgTagFound] = replaceWithImgTag(txt);
        if (imgTagFound) {
          value = txt + value;
        }
      }

      if (!blankFound && !imgTagFound) {
        [txt, audioTagFound] = replaceWithAudioTag(txt);
        if (audioTagFound) {
          value = txt + value;
        } else {
          stack.push(txt);
        }
      }

    } else {
      /* 都沒有找到任何 tag */
      txt = value;

      if (debug) {
        console.log('===' + value + '===');
      }

      if (value != '') {
        if ((new RegExp(fieldsSeparator)).test(value)) {
          blankFound = true;
          value = replaceWithBlankIcon(value);
        }
        if (!blankFound) {
          [value, imgTagFound] = replaceWithImgTag(value);
        }
        if (!blankFound && !imgTagFound) {
          [value, audioTagFound] = replaceWithAudioTag(value);
          if (!audioTagFound) {
            value = value + '</span>';
          }
        }
      }
    }
  }

  /*
  //console.log('value : '+value);
  //console.log('stack : '+stack);
   */
  if (stack.length > 0) {
    var spanText = stack.join('');
    if (/<span/i.test(stack[0])) {
      if (stack.length > 1) { /*如果只有一個 <span> , 就全扔了 */
        html += (spanText != '' ? (spanText + '</span>') : ''); ;
      }
    } else {
      html += (spanText != '' ? ('<span>' + spanText + '</span>') : ''); ;
    }
    stack = [];
  }

  /* console.log(html); */
  if (!isString) {
    observerDisconnect();

    node.innerHTML = html;

    observerConnect();

    return true;

  } else {

    return html;

  }
};

/*
 檢查語法，如果是圖片的網址，就轉為 <img>
 txt : 文字
 回傳: 陣列 [ 轉好的文字, 是否找到圖片 ]
 */
replaceWithImgTag = function (txt) {

  var imgTagFound = false;

  /*
  //左側是空白或是小於(tag的右邊), 且帶有圖片檔名者
  //data:image/???; 故意不取完整(去掉data), 這樣可以捕捉到 src="data:...
   */
  var rePattern = '(\\s|^\\>)?(([^\\s|\\>]+\\.(jpg|png|gif|svg|jpeg|bmp))|([^\\s|\\>]+\:image\\/[^;]+;base64,[^\\s|<]+))';

  txt = txt.replace((new RegExp(rePattern, 'i')), function (match, p1, p2, p3) {

    imgTagFound = true;

    if (/src\s*=/i.test(p2)) { /* <img src="...."> 已加過的，跳過 */
      /* console.log('img has src .. skip'); */

      return match;

    } else {
      /* console.log('found .. append img tag'); */

      p2 = p2.trim();

      if (false && (/data\:image\//.test(p2)) && p2.length > 1024 * 30) { /* base64 image > 30kb 者特別 */
        var id = 0;
        var found = false;

        for (var j = 0; j < base64Images.length; j++) {
          if (base64Images[j] == p2) {
            id = j;
            found = true;
            break;
          }
        }
        if (!found) {
          id = base64Images.length;
          base64Images.push(p2);
        }
        return '<img src="' + iconThumbnail + '" title="id-' + id + '">';
      } else {
        return ('<img src="' + p2 + '">'); /* 只有圖片路徑者，變成 <img> */
      }
    }
  });
  return [txt, imgTagFound];
};

/*
 檢查語法，如果是聲音的網址，就轉為 <img>，並將聲音路徑放到 title 屬性中
 txt : 文字
 回傳: 陣列 [ 轉好的文字, 是否找到聲音 ]
 */
replaceWithAudioTag = function (txt) {

  var vocarooMp3Base = 'https://media.vocaroo.com/mp3';

  /*
  //https://voca.ro/11Awpb8WHGNI
  //https://vocaroo.com/11Awpb8WHGNI
  // (https\:\/\/voca\.ro|https\:\/\/vocaroo\.com)\/\w{14})

  //txt = txt.replace(/&nbsp;/g, ' ');

  // /(\s|^\>)?(([^\s|\>]+\.mp3)|((https\:\/\/voca\.ro|https\:\/\/vocaroo\.com)\/\w{12}))/i
   */

  var rePattern = '(\\s|^\\>)?(([^\\s|\\>]+\\.mp3)|([^\\s|\\>]+\\.tts)|((https\\:\\/\\/voca\\.ro|https\\:\\/\\/vocaroo\\.com)\\/\\w{12}))';

  var imgTagFound = false;

  txt = txt.replace((new RegExp(rePattern, 'i')), function (p0, p1, p2) {

    imgTagFound = true;

    if (/title\s*=\s*\"[^\"]+\.mp3/i.test(p2)) { /* 已加過音檔者，不能再加 */
      return p0;
    } else if (/title\s*=\s*\"[^\"]+\.tts/i.test(p2)) { /* 已加過音檔者，不能再加 */
      return p0;
    } else {
      var url = /\.mp3|\.tts/i.test(p2) ? p2 : vocarooMp3Base + (p2.substr(p2.lastIndexOf('/')) + '?my.mp3');
      return '<img src="' + iconMicRed + '" title="' + url + '">';
    }
  });
  /* console.log('====== .mp3 ===') */
  return [txt, imgTagFound];
};

/*
 檢查語法，將所有為分隔符號者，都轉為 <img>，並將符號放到 title 屬性中
 txt : 文字
 回傳: 轉好的文字
 */
replaceWithBlankIcon = function (txt) {
  return txt.replace((new RegExp(fieldsSeparator, 'g')), '<img src="' + iconSeparator + '" class="separator" title="_這是欄位分隔符號_">');
};

/*
 //複製指定物件的文字到剪貼簿中
 // credit:
 // https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
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
 //在游標處插入字串
 //  targetID {String} : element's id
 //  stringToInsert {String} : string to insert
 */
insertStringAtCursor = function (targetID, stringToInsert) {
  var isOK = false;
  var node = window.getSelection().anchorNode;
  var offset = window.getSelection().anchorOffset;
  var focusNode = window.getSelection().focusNode;
  var anchorNodeParent = node.parentNode;
  /*
  //console.log([window.getSelection().anchorNode, window.getSelection().anchorOffset, window.getSelection().focusNode, window.getSelection().focusOffset]);
  //console.log(document.getElementById(targetID)['selectionOld']);
   */

  /*
  針對 HTML5 FUN editor 特別設計的
  在 blur Event 之前保留資料
   */
  var target = document.getElementById(targetID);
  if (typeof(target) != 'undefined' && target != null && typeof(target['selectionOld']) != 'undefined' && target['selectionOld'] != null) {
    node = target['selectionOld']['anchorNode'];
    offset = target['selectionOld']['anchorOffset'];
    anchorNodeParent = target['selectionOld']['anchorNodeParent'];
    anchorNodeParent = anchorNodeParent.pNode.children[anchorNodeParent.index];
  }
  var anchorNodeTopParent = anchorNodeParent.parentNode.parentNode;

  /*
  //對 HTML5 Fun Editor 來說，幾種情形:
  // - nodeName: "LI" , 游標在 <li> 中
  // - nodeName: "#text" , 游標在 <span> 中
  // - offset = 0 新增到前面; 否則加在現有的後面
   */
  if (typeof(node) != 'undefined' && node != null) {
    if (node.nodeName.toUpperCase() == 'LI' && anchorNodeParent.id == targetID) {
      var child = node.childNodes[offset];
      if (typeof(child) != 'undefined' && child != null) {
        node.insertBefore(document.createTextNode(stringToInsert), child);
      } else {
        /* text node 不存在, 就新增一個 */
        var newtext = document.createTextNode(stringToInsert);
        node.appendChild(newtext);
      }
      isOK = true;
    } else if (node.nodeName.toUpperCase() == '#TEXT' && anchorNodeTopParent.id == targetID) {
      /* 游標停在文字之間 */
      if (offset > 0) {
        var head = node.nodeValue.substr(0, offset);
        var tail = node.nodeValue.substr(offset);
        node.nodeValue = head + stringToInsert + tail;
      } else {
        node.nodeValue = stringToInsert + node.nodeValue;
      }
      anchorNodeParent.innerHTML = node.nodeValue;
      isOK = true;
    }
  }
  if (typeof(target) != 'undefined' && target != null && typeof(target['selectionOld']) != 'undefined' && target['selectionOld'] != null) {
    target['selectionOld'] = null;
  }
  return isOK;
};

/*
 //--------------------------------------------------
 // drag & drop image object to textarea start
 //--------------------------------------------------
 */
editorDragAndDropEventsInit = function() {
  /* 圖片限定大小, 如果太大就縮小 */
  var imageMaxSizeWidth = 640;
  var imageMaxSizeHeight = 480;

  /* 接受 drop 的物件 */
  var dropTarget = document.getElementById(editorId);

  /* 內部從個部份拖曳的(主要針對內部) */
  var draggedEvent;

  function cancel(e) {
    /*
     //非 editor 內部的 drag & drop 就照原有程序不更動
     //由其它地方 drag 過來的，則跳過預設動作(preventDefault)，讓它執行 drop 完成後的程序
     */
    if (typeof(draggedEvent) == 'undefined' || draggedEvent == null) {
      if (e.preventDefault) {
        e.preventDefault();
      }
    }
    return false;
  };

  /* https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event */
  dropTarget.addEventListener('dragstart', function (e) {
    draggedEvent = e;
  });
  /* 讓物件可以接受 darg & drop */
  dropTarget.addEventListener('dragover', cancel);
  dropTarget.addEventListener('dragenter', cancel);

  /* 拖曳檔案在上面後的動作 */
  dropTarget.addEventListener('drop', function (e) {
    var target = this;

    e = e || window.event;

    var dataTransfer = e.dataTransfer;

    if (typeof(draggedEvent) != 'undefined' && draggedEvent != null) {
      /*
       //editor 內部的 drag & drop 就照系統原有程序不更動
       //所以接下來的程序都不執行了
       //如果由外部拖曳文字進來，也比照辦理(2022.01.23 add)
       */

      draggedEvent = null;
      return;

    } else if (e.preventDefault) {
      /*
       //由其它地方 drag 過來的，則先跳過預設動作(preventDefault)
       //讓它執行接下來自訂的處理程序
       */

      e.preventDefault();
    }

    if (typeof(dataTransfer) && dataTransfer != null) {
      /*
       //console.log('ok 1');
       //如果是檔案，就取得 Data URI base64 編碼的資料
       */
      if (typeof(dataTransfer.files) != 'undefined' && dataTransfer.files.length > 0) {
        var files = dataTransfer.files;
        var acceptTypes = ['image', 'audio'];
        readFilesAndAppendToTarget(target, files, acceptTypes);
      } else {
        /*
         var url = dataTransfer.getData("URL");
         //如果是網址，而且是圖片的附檔名，就將網址附加到後面
         if (typeof(url)=="string" && url.length > 0 && game.Util.isImage(url)) {
           inputTextarea.getTextarea().value += "\n"+url+"\n";
         }
         */
        var txt = dataTransfer.getData("TEXT").trim();
        if (typeof(txt) != 'undefined' && txt.length > 0) {
          txt = txt.replace(/\r/g, ''); /* 將 \r 去掉 */
          /* 直接將資料插入到游標處 */
          insertStringAtCursor('questionEditor', txt);
        }
      }
    }
    /* 清掉在 dragstart event 中建立的變數 */
    draggedEvent = null;

    return false;
  });

  /*
   //--------------------------------------------------
   // drag & drop image object to textarea end
   //--------------------------------------------------
   //由上載的檔案取得 Data URI base64 編碼的資料, 並附加到 textarea
   */
  var readFilesAndAppendToTarget = function (target, files, acceptTypes) {

    if (typeof(target) == 'undefined' || target == null) {
      return;
    }

    /* 建立符合檔案型態的規則 */
    if (typeof(acceptTypes) == 'undefined') {
      var acceptTypes = ['image'];
    }
    if (acceptTypes.length > 1) {
      var reAcceptType = new RegExp('(' + acceptTypes.join("|") + ')\/', 'i');
    } else {
      var reAcceptType = new RegExp(acceptTypes[0], 'i');
    }

    var appendTotalNumber = 0;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      /* 如果是符合的類型(image/audio)就讀取 DataURI 編碼的資料 */
      if (typeof(file) != 'undefined' && file.type.match(reAcceptType)) {

        var imageType = file.type;
        var reader = new FileReader();
        reader.mimeType = file.type; /* 記錄一下 file.type */
        reader.readAsDataURL(file); /* 以 DataURL base64編碼的資料 */
        reader.addEventListener('loadend', function (e) {
          appendTotalNumber++;
          var mimeType = this.mimeType; /* 編碼的類型 */
          var base64 = this.result; /* 取得資料 */
          /*
           //圖片如果太大就縮小, 其它類型的則直接輸出
           //SVG 不進行縮小, 直接輸出
           //jpeg|png|gif 如果太大會先行縮小
           */
          if (mimeType.match(/image\/(jpeg|png|gif)/i)) {
            var img = new Image();
            img.src = base64; /* 圖形資料 */
            img.mimeType = mimeType; /* 圖片的類型 */
            img.addEventListener('load', function (e) {
            var imageType = this.mimeType; /* 圖片的類型(原來沒有這個屬性) */
            /* 圖片如果太大就縮小 */
            if (typeof(imageMaxSizeWidth) == 'number' && typeof(imageMaxSizeHeight) == 'number') {
              var scaleX = imageMaxSizeWidth / this.width;
              var scaleY = imageMaxSizeHeight / this.height;
              /* console.log(scaleX + ' , ' +scaleY); */
              if (scaleX < 1 || scaleY < 1) {
                  var xStart = 0;
                  var yStart = 0;
                  /* enableImageCrop = true; */
                  if (typeof(enableImageCrop) != 'undefined' && enableImageCrop) {
                    var scale = Math.max(scaleX, scaleY);
                    var width = Math.floor(this.width * scale);
                    var height = Math.floor(this.height * scale);
                    if (scaleX < scaleY) { /* width 過大要裁切 */
                      xStart = (imageMaxSizeWidth - width) / 2;
                      var newWidth = imageMaxSizeWidth;
                      var newHeight = height;
                    } else { /* height 過大要裁切 */
                      yStart = (imageMaxSizeHeight - height) / 2;
                      var newWidth = width;
                      var newHeight = imageMaxSizeHeight;
                    }
                  } else {
                    var scale = Math.min(scaleX, scaleY);
                    var width = Math.floor(this.width * scale);
                    var height = Math.floor(this.height * scale);
                    var newWidth = width;
                    var newHeight = height;
                  }

                  /* 縮小後重新編碼 */
                  var canvas = document.createElement('canvas');
                  canvas.width = newWidth; /* width; */
                  canvas.height = newHeight; /* height; */
                  canvas.getContext('2d').drawImage(img, xStart, yStart, width, height);
                  base64 = canvas.toDataURL(imageType);
                  /* console.log(scale + ' : ' + this.width + ' , ' + this.height+' : ' + width+' , ' + height); */
                }
              }
              /*
               //將資料附加到 target 中
               //inputTextarea.getTextarea().value += "\n"+base64+"\n";
               */

               /* console.log(target); */

              target.focus();

              document.execCommand('insertImage', false, base64);
              /* insertStringAtCursor(editorId, '##'+base64+'##');  */
            });

          } else if (/audio\//i.test(mimeType)) {
            target.focus();
            document.execCommand('insertHTML', false, '<img src="' + iconMicRed + '" title="' + e.target.result + '">');
          } else {
            /*
            //SVG 直接將資料附加到 target 中
            //其實它的類型的也是用 <img> 來包，會變成破圖，剛好把 base64 的資料藏起來
            */
            target.focus();
            document.execCommand('insertImage', false, e.target.result);
          }
        });

      } else {
        /*
         //show not support mime type message
         //var msg = poke.showMessage('檔案處理', '抱歉!此項目不支援 '+file.name+' 的檔案類型 <'+file.type+'>', 5);
         //topLayer.appendChild(msg);
         */
      }
    }

    checkListNodes();

  };
};

/* 監聽 editor 的貼上事件, 事先轉換為文字或是圖示 */
document.getElementById(editorId).addEventListener('paste', function (e) {

  /* get text from the clipboard */
  var txt = e.clipboardData
     ? (e.originalEvent || e).clipboardData.getData('text/plain')
     : /* For IE */
    window.clipboardData
     ? window.clipboardData.getData('Text')
     : '';
  txt = txt.replace(/\r/g, '\n').replace(/\n+/g, '\n'); /* 去掉多餘的換行 */
  txt = txt.replace(/\t+\n|\t+$/g, '\n'); /* 將行末的跳格都去掉 */
  txt = txt.trim();	/* 去掉頭尾的換行字元及空白 */
  if( typeof(editorOptions)!='undefined' && typeof(modulename)!='undefined'
      && typeof(editorOptions[modulename])!='undefined'
      && typeof(editorOptions[modulename].enableDoubleTabConvert)=='boolean'
      && editorOptions[modulename].enableDoubleTabConvert
	  ) {
    /* enableDoubleTabConvert=true */
    /* 試著將 兩個tab 轉為分隔符號(試算表) */
    /* 將 tab 轉為素材分隔符號(試算表) */
    txt = txt.replace(/\t{2}/g, fieldsSeparator); 
    txt = txt.replace(/\t/g, autoSplitPattern);
  } else {
    /* 試著將 tab 轉為分隔符號(試算表) */
    txt = txt.replace(/\t/g, fieldsSeparator); 
  }
  var lines = txt.replace(/\r/g, '').split(/\n/);
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].replace(/\s/g, '') === '') {
      lines.splice(i, 1);
      i--;
    } else {
      lines[i] = lines[i].trim();
    }
  }

  if (lines.length < 1) {
    return;
  } else {

    /* Prevent the default action */
    e.preventDefault();

    /*
    //convert to HTML5 FUN HTML format
    //support multiline parsing
     */
    if (lines.length <= 1) {
      txt = inputChangeHandler(lines[0]);
    } else {
      txt = '';
      for (var i = 0; i < lines.length; i++) {
        if (lines[i].replace(/s/g, '') != '') {
          txt += '<li>' + inputChangeHandler(lines[i]) + '</li>';
        }
      }
    }

    if (lines.length > 1) {
      document.getElementById(editorId).innerHTML += txt;
    } else if (document.queryCommandSupported('insertHTML')) {
      document.execCommand('insertHTML', false, txt);
    } else if (document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, txt);
    } else {
      /* Insert text at the current position of caret */
      const range = document.getSelection().getRangeAt(0);
      range.deleteContents();
      const textNode = document.createTextNode(txt);
      range.insertNode(textNode);
      range.selectNodeContents(textNode);
      range.collapse(false);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    updateQuestionLinesValue();

  }
});

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

/* 將 #text 轉為 <span> */
function wrapTextNode(textNode, parentNode) {
  var spanNode = document.createElement('span');
  var newTextNode = document.createTextNode(textNode.textContent);
  spanNode.appendChild(newTextNode);
  if (typeof(parentNode) != 'undefined' && parentNode != null) {
    if (typeof(parentNode.parentNode) != 'undefined' && parentNode.parentNode != null) {
      parentNode.parentNode.replaceChild(spanNode, textNode.parentNode);
    } else {
      textNode.parentNode.replaceChild(spanNode, textNode);
    }
  } else {
    textNode.parentNode.replaceChild(spanNode, textNode);
  }
  return spanNode;
};

/*
 //==============================================
 // 監聽並處理 <OL> 中的資料
 //==============================================
 */
updateTextNode = function(lastText) {
              var html;
			  var parentNodeIsSpanTag = typeof(lastText.parentNode)!='undefined' && lastText.parentNode!=null && /span/i.test(lastText.parentNode.nodeName);

              if (parentNodeIsSpanTag) {
                html = lastText.parentNode.innerHTML;
              } else {
                html = lastText.textContent;
              }

              html = html.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
              html = inputChangeHandler(html).replace(/<span>/gi, '').replace(/<\/span>/gi, '');

              if (parentNodeIsSpanTag) {
                lastText = wrapTextNode(lastText, lastText.parentNode);
              } else {
                lastText = wrapTextNode(lastText);
              }
              lastText.innerHTML = html; 
  return lastText;
}
mutationObserverInit = function() {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

  var lastText; /* 記錄哪一個 #text 有異動 */
  var isNodeChanged = false; /* 避免在 characterData 中更新過, 又觸發的第二次異動 */
  
  /* 先偷懶，用全域變數 */
  observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      var debug = false;

      if (debug) {
        console.log(mutation);
      }

      /* ver.2022.10.24 */
      if (mutation.type === 'characterData') {
        if (debug) {
          console.log(mutation);
          console.log(mutation.target);
          console.log(mutation.target.parentNode);
          console.log(lastText);
          console.log('---------------\n\n');
        }

        if (typeof(lastText) == 'undefined' || lastText == null) {
          lastText = mutation.target;
        }

        if (typeof(lastText) != 'undefined' && lastText != null && lastText.nodeType == 3 && lastText.parentNode != mutation.target.parentNode) {

          if (!isNodeChanged) {
            if (typeof(lastText.textContent) != 'undefined' && lastText.textContent != null) {
              if (debug) {
                console.log('1===>' + lastText.textContent);
                console.log(lastText.parentNode.nodeName);
                console.log(lastText.children);
              }

              var html;
			  var parentNodeIsSpanTag = typeof(lastText.parentNode)!='undefined' && lastText.parentNode!=null && /span/i.test(lastText.parentNode.nodeName);

              if (parentNodeIsSpanTag) {
                html = lastText.parentNode.innerHTML;
              } else {
                html = lastText.textContent;
              }

              html = html.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
              html = inputChangeHandler(html).replace(/<span>/gi, '').replace(/<\/span>/gi, '');

              if (parentNodeIsSpanTag) {
                lastText = wrapTextNode(lastText, lastText.parentNode);
              } else {
                lastText = wrapTextNode(lastText);
              }
              lastText.innerHTML = html;

              /* lastText = updateTextNode(lastText); */
              setTimeout(function () {
                updateQuestionLinesValue();
              }, 250);
            }
            lastText = mutation.target;
          }
          isNodeChanged = true;
        } else {
          isNodeChanged = false;
        }

      } else if (mutation.type === 'childList') {

        if (debug) {
          console.log('\n=');
          console.log(mutation);
          console.log(mutation.target);
          console.log(mutation.target.parentNode);
          console.log(lastText);
          console.log(isNodeChanged);
          console.log('==\n');
        }

        isNodeChanged = false;
      }

      return;
    });
  });
  return observer;
}

/* 暫停監聽內部異動 */
observerDisconnect = function () {
  /* observer 為全或變數 */
  observer.disconnect();
}

/* 讓指定的物件開始監聽內部的異動 */
observerConnect = function () {
  /* observer 為全或變數 */
  var list = document.getElementById(editorId);
  observer.observe(list, {
    /* attributes: true, */
    /* attributeOldValue: true, */
    subtree: true,
    childList: true,
    characterDataOldValue: true,
    characterData: true
  });
};

/* 
 ===========================================
 執行一些初始的程序
 ===========================================
 */

var list = document.getElementById(editorId);

/* set default value (a blank input area) */
//list.innerHTML = '<li>' + lineDefaultValue + '</li>';

setTimeout(function () {
  /* 
   記錄一下: 用這個等於是觸發 change Event
   list.focus(); list.blur(); 
   */
  //convertToEditor(); /* 先由文字編輯區來更新圖形式編輯區 */

  /* 將圖示說明區的內容更新一下 */
  var iconDescription = document.getElementById('iconDescription');
  if(typeof(iconDescription)!='undefined' && iconDescription!=null) {
    iconDescription.innerHTML = '<span style="font-weight:bolder;">圖示：</span>&nbsp;' + '<img src="' + iconSeparator + '" onclick="insertSeparator();" title="按一下新增分欄符號">欄位分隔(輸入 '+fieldsSeparator+' 新增)&nbsp;&nbsp;' + '<a href="https://vocaroo.com/" target="_blank" title="按一下去 Vocaroo 錄音"><img src="' + iconMicRed + '"></a>聲音檔';
  }
}, 100);

 
/* 啟動監看 <OL> 內容異動的程序 */
mutationObserverInit();
//observerConnect(); 

/* 啟動監聽圖形編輯區的 drag & drop */
editorDragAndDropEventsInit(); 

/* 調整兩個輸入區的大小 */

var editorJS = document.getElementById('editorJS');

if (typeof(editorJS) != 'undefined' && editorJS != null) {
  var width = editorJS.parentNode.clientWidth;
  document.getElementById(editorId).style.width = (width - 100) + 'px';
  document.getElementById(questionLinesId).style.width = (width - 40) + 'px';
}
document.getElementById(questionLinesId).setAttribute('wrap', 'off');

/* loadingAnimation('載入中...'); */
/* 播放動畫 */

setTimeout(function () {
  loadingLogoEnable = false; /* 結束動畫 */
}, 1000);

