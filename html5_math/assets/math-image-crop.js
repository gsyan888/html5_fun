/**
 * HTML5 FUN Image Crop (東拼西湊)
 * by gsyan 雄 (https://gsyan888.blogspot.com)
 * 2023.11.01
 */
 
//計算可用的最大範圍
var scenceWidth = window.innerWidth && document.documentElement.clientWidth ? 
					Math.min(window.innerWidth, document.documentElement.clientWidth) 
					: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var scenceHeight = window.innerHeight && document.documentElement.clientHeight ? 
					Math.min(window.innerHeight, document.documentElement.clientHeight) 
					: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;


var widthMax = scenceWidth - 160;
var heightMax = scenceHeight - 160; //高度稍減(放底下的工具按鈕

//element to load a image 
var imageToExplain = new Image();
//這個一定要比 .src 先設定，不然無法使用 toDataURL()
imageToExplain.setAttribute("crossOrigin",'Anonymous'); 

var sampleURL = 'https://gsyan888.github.io/html5_fun/html5_math/samples/circle-perimeter-sample.svg';

// use mouse or touch events to set a path
var selectorShape = 1; //0:free 1:rectangle
var path = []; // array to store the path points or rectangle bounding
var drawingPath = false; // flag to indicate if the user is drawing path
var croping = false; // flag to indicate the user is croping
var doodleEnable = false;
var drawing = false; // flag to indicate if the is drawing doodle

var selectedCanvas; //current selected canvas
var lastCanvas; //last base canvas for crop

var angleOffset = document.getElementById('angleList').value; //90;
var opacity = document.getElementById('opacityList').value; //0.7; // canvas opacity

var lineWidth = 5; // the stroke width for draw path

var penWidth = 5;		//stroke width for doodle
var penColor = '#4C82FF'; //stroe color for doodle

//長按偵測及顯示動畫用的變數
var longPressTime = 300;  //原地按多久算是長按
var pressTimerId = null;  //長按偵測啟動時的 setTimeout id
var scalingIntervalId = null; //長按顯示動畫的 intervale id

document.getElementById('canvas').width = Math.min(widthMax, heightMax); //-20;
document.getElementById('canvas').height = document.getElementById('canvas').width;

/* 取得網址中的參數 */
var gup = function( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec( window.location.href ); 
  if( results == null )    return "";  
  else    return results[1];
};
/* 偵測可用的大小, 並重新設定全域變數 */
function detectAndSetSize() {
  scenceWidth = window.innerWidth && document.documentElement.clientWidth ? 
                    Math.min(window.innerWidth, document.documentElement.clientWidth) 
                    : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  scenceHeight = window.innerHeight && document.documentElement.clientHeight ? 
                    Math.min(window.innerHeight, document.documentElement.clientHeight) 
                    : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;

  //根據工具列的位置調整圖形最大的尺寸
  var tools = document.getElementById('tools');
  var rect = tools.getBoundingClientRect();
  if(rect.width < rect.height) {
    //工具列是放左右兩側
    widthMax = scenceWidth - (rect.width+10)*2;
    heightMax = scenceHeight - 70;
  } else {
    //工具列是橫放
    widthMax = scenceWidth - 70;;
    heightMax = scenceHeight - (rect.height+10)*2;  
  }
};
/* 取得主要繪圖區的物件 */
function getMainCanvas() {
  return document.getElementById('canvas');
};
/* 取得設定選取範圍的物件 */
function getSelectCanvas() {
  return document.getElementById('canvasSelect');
};
/* 取得塗鴉繪圖區的物件 */
function getDoodleCanvas() {
  return document.getElementById('canvasDoodle');
};
/* 設定矩形選取區時會用的一些變數初始值 */
function canvasSelectInit(canvas) {
  canvas.movingMin = 3; //至少要移動多少才處理
  canvas.x0 = 0;
  canvas.y0 = 0;
  canvas.x1 = 0;
  canvas.y1 = 0;
  canvas.crop = {x0:0, y0:0, x1:0, y1:0};
  canvas.isDrawing = false;
  canvas.isDraging = false;
  canvas.cornerId = -1;
  canvas.hasMoved = false;
  canvas.style.display = 'block';
};
/* 回傳是否為 Google Drive 檔案的共用網址 */
function isFileOfGD(url) {
  return (typeof(url)=='string' && /https\:\/\/drive\.google\.com\/file\/d/i.test(url));
};

/**
 * [原來]是用來抓取雲端硬碟公開分享資料夾的頁面  
 * [簡化為]抓取雲端硬碟公開分享檔案的內容
 * 由網頁原始碼中解析出檔案的設定
 * 回傳指定型態的網址及檔名
*/
(function(exports) {
  /* 針對一個檔案分享連結的解析結果 */
  /*
   image 1: filename 2:thumbnail 3:?? 10:original 11:mimeType (image/jpeg image/png ...)
   pdf   1: filename 2:thumbnail 9:broken JSON 11:mimeType (application/pdf)
   video 1: filename 2:thumbnail 11:mimeType (video/quicktime video/mp4 ...)
   mp3   1: filename 5:download URL 11:mimeType (audio/mpeg)	
  */
  /**
   * 由 Google 資料夾網頁中解析出檔案清單的JSON
   * @param {"網頁原始碼"} url 字串型態，頭尾必須加雙引號。
   * @return 回傳檔案設定的 JSON
   * @customfunction
  */ 
  function fileShareParse(html) {
    //抓出 window.viewerData 的內容
    var data = html.match(/<script[^>]+>\s*window\.viewerData\s*=\s*({(?:.|\n)*?});<\/script>/im).pop();
	//修正 JSON 不能用單引號, 名稱要加雙引號, 及「"viewer-web",」的最後多了個逗號的問題
    data = data.replace(/'/g, '"').replace('config:', '"config":').replace('configJson:', '"configJson":').replace('itemJson:', '"itemJson":');
    data = data.replace('"viewer-web",', '"viewer-web"');
    data = JSON.parse(data);
    //console.log(data);
    //圖片的
    var value = {
      filename: data.itemJson[1], //原始檔名
      url: data.itemJson[2],  //縮圖, 也可能是 data.itemJson[3], data.itemJson[10] (高解析度的圖)
      mimeType: data.itemJson[11] 
	};
    return value;
  };
  /**
   * @param {String} url 共用資料夾的網址
   * @param {Function} callback 抓到網頁後要執行的程序
   * @return {String} 網頁原始碼
   */
  async function getFilesFromGdrive(url, callback) {
    var result;
    //var proxyURL = 'https://corsproxy.io/?';
    var fetchURL = 'https://corsproxy.io/?'+encodeURIComponent(url);
    //var fetchURL = 'https://thingproxy.freeboard.io/fetch/'+url;
    //var fetchURL = 'https://proxy.cors.sh/'+url;
    //var fetchURL = 'https://api.allorigins.win/get?url='+encodeURIComponent(url);
    var html = await fetch(fetchURL)
        .then((response) => {
          if (response.ok) {
            if(fetchURL.match(/\.allorigins/))
              return response.json(); //for api.allorigins.win
            else
              return response.text();                    
          } else {
              //console.log('無法讀取，請確認已公開分享資料夾了');
          }
          throw new Error('無法讀取，請確認已公開分享資料夾了');
        })
        .catch(error => console.error('無法存取\n'+error))
        .then((text) => {
          if(typeof(text)!='undefined') {
            if(/window\.viewerData/i.test(text)) {
              var html = fileShareParse(text);
            } else if(fetchURL.match(/\.allorigins/)) {
              var html = getFilesJson(text.contents); //for api.allorigins.win 
            } else {
              var html = getFilesJson(text);
            }
            if(typeof(callback)=='function') {
                callback(html);
            } 
            return html;
          } else {
            console.log('請確認已公開分享資料夾了');
          }
        })
        .catch(error => console.error('無法解析\n'+error));
    return html;
  };    
  /**
   * 傳回雲端硬碟公開分享網址的檔案資料。
   * @param {"雲端硬碟的共用網址"} url 字串型態，頭尾必須加雙引號。
   * @param {'媒體類型'} mediaType 字串型態 要取得什麼類型的媒體(image, audio, imageOrAudioOrVideo)
   * @return 回傳解析到的媒體網址。
   * @customfunction
  */    
  exports.fetch = async function(url, mediaType, callback) {
    var data = await getFilesFromGdrive(url);
     if(typeof(mediaType)=='undefined' || mediaType==null) {
       //網址是單一檔案的,而不資料夾
       callback(data);
     }
  };
})(typeof exports !== 'undefined' ? exports : (window.GDFolderFiles = window.GDFolderFiles || {}));
/* 由 Google Drive 檔案共用的網址中解析出可直接存取的網址 */
tryToGetUrlFromGDFile = function(url, callback) {
  if(isFileOfGD(url)) {
    console.log('This is a file in Google Drive');
    GDFolderFiles.fetch(url, null , function(data) {
	  var imageURL = document.querySelector('.imageURL');
      var yOffset = imageURL.getBoundingClientRect().height*2;
      if(typeof(callback)=='function') {
        if(typeof(data)!=='undefined' && data!=null && data.url.replace(/\s/g, '')!='') {
          callback(data.url);
        } else {
          showFadeOutMessage(imageURL, '圖片載入失敗, 請確認是可共用的雲端硬碟圖片。', 0, yOffset, 5);
          //callback();
		}
      } else if(typeof(data)!='undefined' && data!=null) {
        console.log(data);
      } else {
        showFadeOutMessage(imageURL, '圖片載入失敗, 請確認是可共用的雲端硬碟圖片。', 0, yOffset, 5);
      }
    });
  } else if(typeof(callback)=='function') {
    callback(url);
  }
};
/* 顯示自動開啟程式並載入指定網址圖片的 QRCode */
function showQRCode(enable) {
  if(typeof(enable)!='boolean') enable = true;
  //var urlQuery = decodeURIComponent(urlQuery);
  if(enable) {
    var imageURL = document.querySelector('.imageURL');
    if(typeof(imageURL)!='undefined' && imageURL!=null) {
      if(/^http/i.test(imageURL.value)) {
	    tryToGetUrlFromGDFile(imageURL.value, addQRCodeOnTopLayer);
      } else {
        var btn = document.querySelector('.crop-logo-icon');
        var rect = btn.getBoundingClientRect();		
        var xOffset = rect.width*-1;
        var yOffset = rect.height*-1;
        showFadeOutMessage(btn, '要先指定圖片的網址，才能製作 QRCode 哦！', xOffset, yOffset, 6);
      }
    }
  } else {
	  var topLayer = getResetedLayer('.topLayer');
      topLayer.innerHTML = '';
	  topLayer.setAttribute('class', 'topLayer');
	  topLayer.style.opacity = 1;
      topLayer.style.display = 'none';  
  }
};
/* 將 QRCode 圖片加到 topLayer 中 */
function addQRCodeOnTopLayer(image_url) {
  //var url = 'https://gsyan888.blogspot.com/2023/12/html5-crop.html';
  var url = window['location']['origin']+window['location']['pathname'];
  url += '?url='+image_url;
  //取得 QRCode 的網址
  var size = 340;
  var qrCodeURL = 'https://chart.googleapis.com/chart?chs='+size+'x'+size+'&cht=qr&chl='+encodeURIComponent(url);
  var html = '<img src="'+qrCodeURL+'" title = "按一下隱藏 QRCode" class="qrcode-img" />';
  html += '<span class="qrcode-close-btn" onclick="showQRCode(false);" title="關閉">×</span>';
  html += '<img class="qrcode-img-thumbnail" src="'+image_url+'" title="圖片的縮圖" />';
  var topLayer = getResetedLayer('.topLayer');
  topLayer.setAttribute('class', 'topLayer');
  topLayer.innerHTML = html;
  topLayer.style.left = '50%';
  topLayer.style.top = '50%';
  topLayer.style.width = '480px';
  topLayer.style.height = '480px';
  topLayer.style['text-align'] = 'center';
  topLayer.style.opacity = 1;
  topLayer.style.display = 'block';
};
/* 準備等待指定圖片時的環境初始 */
function importImage() {
  var topLayer = document.querySelector('.topLayer');
  topLayer.style.display = 'none';
  topLayer.setAttribute('class', 'topLayer'); 
  document.querySelector('.canvas-close-btn').style.display = 'none';
  document.getElementById('gameWrapper').style.display = 'none';
  document.getElementById('dropMessage').style.display = 'block';
  closePopupMenu();
  clearDoodle();  
  enableDoole(true);
};
/* 輸入網址的方式指定要載入的圖片 */
function loadImageFromURL() {
  var url = document.querySelector('.imageURL').value;
  if(/^http(s)*:\/\/|base64/.test(url) && url.replace(/\s/g, '')!='') {
    //imageToExplain.src = url;
	tryToGetUrlFromGDFile(url, function(url) {
	  imageToExplain.failure = 0;
	  imageToExplain.src = url;
	});
  }
};
/* 圖片載入成功後，畫在主繪圖區中 */
imageToExplain.onload = function(e) {
  console.log('image load');
  //顯示繪圖區, 隱藏圖片輸入區
  document.getElementById('gameWrapper').style.display = 'block';  
  document.getElementById('dropMessage').style.display = 'none';
  //重新再偵測一次可用的範圍大小
  detectAndSetSize();
  
  var canvas = getMainCanvas();
  var ctx = canvas.getContext("2d");
  clearAllClip(); //先清除所有舊的繪圖區塊
  //以可用尺寸大小和圖片的尺寸大小，計算最小的縮放比，才不會超過範圍
  //console.log(widthMax + ' / '+this.naturalWidth+' , '+heightMax+' / '+this.naturalHeight);
  var scale = Math.min(widthMax/this.naturalWidth, heightMax/this.naturalHeight);
  canvas.width = this.naturalWidth*scale;
  canvas.height = this.naturalHeight*scale;
  // draw the image on the canvas
  //ctx.drawImage(this, 0, 0, this.width, this.height, 0, 0, canvas.width, canvas.height);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(this, 0, 0,  canvas.width, canvas.height);
  //
  //將內容複製到分身
  if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
    lastCanvas = document.createElement('canvas');
  }
  lastCanvas.width = canvas.width;
  lastCanvas.height = canvas.height;
  lastCanvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  lastCanvas.getContext("2d").drawImage(canvas, 0, 0, canvas.width, canvas.height);	  
  //分割選取的參數初始, 才能進行設定要分割的範圍
  newClip();
  //將繪圖區關閉的按鈕放到主繪圖區的左上角
  updateCloseBtnPosition();
};
/* 圖片載入失敗時的處理程序: 是網址就改用 corsproxy 再試一次 */
imageToExplain.onerror = function(e) {
  var imageURL = document.querySelector('.imageURL');
  var yOffset = imageURL.getBoundingClientRect().height*2;
  if(/^http(s)*:\/\//.test(this.src)) {    
    //if(/^https:\/\/corsproxy\.io\/\?'/.test(this.src)) {  
    if(typeof(this.failure)=='number' && this.failure>0) {	
      showFadeOutMessage(imageURL, '圖片載入失敗, 請確認網址是正確的。', 0, yOffset, 6);
    } else {
	  showFadeOutMessage(imageURL, '圖片載入失敗, 用代理伺服器重試一次', 0, yOffset);
	  if(typeof(this.failure)!='number') {
	    this.failure = 0;
	  } else {
	    this.failure++;
	  }
	  console.log('retry by proxy ... ');
      this.src = 'https://corsproxy.io/?'+encodeURIComponent(this.src);
    }
  } else {
    showFadeOutMessage(imageURL, '圖片載入失敗', 0, yOffset, 6);
  }  
};
/* 環境初始 */
function gameStart() {
  //重新偵測用的範圍大小
  detectAndSetSize();
  
  // add event listeners for mouse and touch events
  //設定選取區的 canvas
  var canvasDoodle = document.getElementById('canvasSelect');
  canvasSelect.width = scenceWidth;
  canvasSelect.height = scenceHeight;
  canvasSelect.addEventListener("mousedown", startPath);
  canvasSelect.addEventListener("mousemove", drawPath);
  canvasSelect.addEventListener("mouseup", endPath);
  canvasSelect.addEventListener("touchstart", startPath);
  canvasSelect.addEventListener("touchmove", drawPath);
  canvasSelect.addEventListener("touchend", endPath);
  canvasSelect.addEventListener("mouseout", endPath);
  canvasSelect.addEventListener("touchcancel", endPath);
  canvasSelect.addEventListener("drop", dropHandler);
  canvasSelect.addEventListener("dragover", dragOverHandler);
  
  canvasSelectInit(canvasSelect);
  
  //塗鴉區
  var canvasDoodle = document.getElementById('canvasDoodle');
  canvasDoodle.width = scenceWidth;
  canvasDoodle.height = scenceHeight;
  canvasDoodle.style['pointer-events'] = 'none';
  canvasDoodle.style.opacity = opacity;
  //canvasDoodle.style.border = '5px dashed #00ff00';
  
  canvasDoodle.addEventListener("mousedown", startDoodle);
  canvasDoodle.addEventListener("mousemove", drawDoodle);
  canvasDoodle.addEventListener("mouseup", endDoodle);  
  canvasDoodle.addEventListener("touchstart", startDoodle);
  canvasDoodle.addEventListener("touchmove", drawDoodle);
  canvasDoodle.addEventListener("touchend", endDoodle);  
  canvasDoodle.addEventListener("drop", dropHandler);
  canvasDoodle.addEventListener("dragover", dragOverHandler);

  //圖片輸入區
  //in dropMessage
  var dropArea = document.querySelector('.dropArea');
  dropArea.addEventListener("drop", dropHandler);
  dropArea.addEventListener("dragover", dragOverHandler);

  //工具列
  var tools = document.getElementById('tools');
  tools.addEventListener("mousedown", toolsDragStart);
  tools.addEventListener("mousemove", toolsDragMove);
  tools.addEventListener("mouseup", toolsDragEnd);  
  tools.addEventListener("touchstart", toolsDragStart);
  tools.addEventListener("touchmove", toolsDragMove);
  tools.addEventListener("touchend", toolsDragEnd);
  tools.addEventListener("touchcancel", toolsDragEnd);
  tools.addEventListener("mouseout", toolsDragEnd);  
  //橫式版面就將工具列放左側, 直式則放到底部
  if(scenceWidth > scenceHeight) {
    setToolsPosition('left');
  } else {
    setToolsPosition('bottom');
  }
  //清除未關閉的選單
  closePopupMenu();
};
/* 大叉叉放在主繪圖區左上角 */
function updateCloseBtnPosition(hintDelay) {
  var btn = document.querySelector('.canvas-close-btn');
  btn.style.display = 'block';
  var size = btn.getBoundingClientRect().width;
  var canvas = getMainCanvas();
  var rect = canvas.getBoundingClientRect();
  btn.style.left = (rect.left+rect.width)+'px';
  btn.style.top = (rect.top-size*1.5)+'px';
  if(typeof(hintDelay)!='number') hintDelay = 0;
  setTimeout(function() {
	showFadeOutMessage(btn, '按 X 可以換圖片', 0, size*1.5);
  }, hintDelay);
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
  if(typeof(xOffset)!='number') xOffset = 0;
  if(typeof(yOffset)!='number') yOffset = 0;
  if(typeof(delay)!='number') delay = 2;
  var rect = target.getBoundingClientRect();
  var cx = rect.left+rect.width/2+xOffset;
  var cy = rect.top+rect.height/2+yOffset;
  var topLayer = getResetedLayer('.topLayer'); //重建物件,可以完全去掉未執行完的動畫
  topLayer.setAttribute('class', 'topLayer');  
  topLayer.innerHTML = '<label>'+txt+'</label>';
  topLayer.style.width = '';
  topLayer.style.height = '';
  topLayer.style.display = 'block';
  var rect = topLayer.getBoundingClientRect();
  //新的位置如果超出可顯示的範圍就修正
  if(cx+rect.width/2 > scenceWidth) {
    cx = scenceWidth-rect.width/2-15;
  } else if(cx-rect.width/2 < 0) {
    cx = rect.width/2 + 15;
  }
  if(cy+rect.height/2 > scenceHeight) {
    cy = scenceHeight-rect.height/2-15;
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
function closePopupMenu() {
  var menuLayer = document.querySelector('.menuLayer');	
  //for(var i=menuLayer.children.length-1; i>=0; i--) {
  //  menuLayer.children[i].remove();
  //}
  
  //用 cloneNode 複製, 再將舊的取代掉, 
  //可以清內容物跟用 addEventListener 建立的事件(懶人法 ^.^ )
  //menuLayer.parentNode.replaceChild(menuLayer.cloneNode(true), menuLayer);
  menuLayer.parentNode.replaceChild(menuLayer.cloneNode(), menuLayer);
  //重新再抓一次物件，設定的值才有用
  menuLayer = document.querySelector('.menuLayer');
  menuLayer.style.display = 'none';
  menuLayer.style['pointer-events'] = 'none';
};
function popupMenu(target, posX, posY) {
  closePopupMenu();
  var menuLayer = document.querySelector('.menuLayer');
  var btnSize = 50;
  var isDoodle =  (target == document.getElementById('canvasDoodle'));
  
  var colors = ['#FF826F', '#4C82FF', '#FFE54F', '#BD56FF', '#4CE9AA', '#000000'];	
  var total = (isDoodle ? colors.length+3 : 7);
  var angle = Math.PI*2/total;
  var radius = (btnSize*(total<8?1.2:1)+5)*total/(2*Math.PI);
  var size = radius*2+btnSize*1.25;
  var x, y;
  var cx = size/2;
  var cy = size/2;
  var addButton = function(txt, i, background, color, otherClass) {
     if(i>=0) {
       x = Math.floor(radius*Math.cos(i*angle-Math.PI/2)+cx);  
	   y = Math.floor(radius*Math.sin(i*angle-Math.PI/2)+cy);
	 } else {
       x = Math.floor(cx);
	   y = Math.floor(cy);
	 }
	 if(typeof(otherClass)!='string') otherClass = '';
	 var btn = document.createElement('button');
	 btn.setAttribute('class', 'circleBtn '+otherClass);
	 btn.style.left = x+'px';
	 btn.style.top = y+'px';
	 btn.style.width = btnSize+'px';
	 btn.style.height = btn.style.width;
	 btn.style.color = color;
	 btn.style['background-color'] = background;
	 btn.innerHTML = txt;
	 menuLayer.appendChild(btn);
     return btn;	 
  }
  if(isDoodle) {
    //塗鴉區用的選單
    for(var i=0; i<colors.length; i++) {
      var btn = addButton('顏色<br>'+(i+1), i, colors[i%colors.length], 'white');
	  btn.onclick = function(e) {
		  e.preventDefault(); // prevent default behavior
		  penColor = this.style['background-color'];
		  clickAni(this, 0.9);
          //closePopupMenu();
	  };
    }
    addButton('細筆', i++, '#AED6F1', 'black').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
      penWidth = 5;
      //closePopupMenu();
    };
    addButton('粗筆', i++, '#AED6F1', 'black').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
      penWidth = 15;
      //closePopupMenu();
    };
    addButton('加到<br>圖上', i++, 'red', 'white').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  drawDoodleToCanvas(getMainCanvas());
      //closePopupMenu();
    };
  } else {
    //圖片分割出來的區塊用
	var i = 0;
    //刪除區塊
    addButton('刪除<br>區塊', i++, '#ff0000', 'white').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
      target.remove();	  
      if(document.querySelectorAll('.imageClip').length == 0) {	    
        newClip();
      }
      closePopupMenu();
    };	
	//逆時針轉
    addButton('↺', i++, 'C5C5C5', 'black', 'symbolBtn').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  rotate(-1);
    };
    //順時針轉
    addButton('↻', i++, 'C5C5C5', 'black', 'symbolBtn').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  rotate(1);
    };
    addButton('再次<br>分割', i++, '#4C82FF', 'white').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  newClip(target);
      closePopupMenu();
    };
    addButton('縫回<br>原圖', i++, '#FFFF00', 'black').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  recoverClip(target);
      closePopupMenu();
    };
    //垂直翻轉
    addButton('⇅', i++, '#00cc66', 'black', 'symbolBtn').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  mirror(2);
    };	
    //水平翻轉
    addButton('⇄', i++, '#00cc66', 'black', 'symbolBtn').onclick = function(e) {
      e.preventDefault(); // prevent default behavior
      clickAni(this, 0.9);
	  mirror(1);
    };
  }
  
  //中央關閉的按鈕
  var btnClose = addButton('&times', -1, '#7C7C7C', 'white');
  btnClose.style['font-size'] = Math.floor(btnSize*0.6)+'px';
  btnClose.style['font-weight'] = 400;
  btnClose.onclick = function(e) {
    e.preventDefault(); // prevent default behavior
    clickAni(this, 0.9);
    closePopupMenu(); 
  };
  
  //修正超過顯示範圍的中心點座標
  if(posX+size/2+10 >= scenceWidth) {
	posX = scenceWidth-size/2-10;
  } else if(posX-size/2-10 <= 0) {
    posX = 10+size/2;
  }
  if(posY+size/2+10 >= scenceHeight) {
	posY = scenceHeight-size/2-10;
  } else if(posY-size/2-10 <= 0) {
    posY = 10+size/2;
  }
  menuLayer.isDoodle = isDoodle; //用來判斷是否為塗鴉的繪圖區
  menuLayer.style.display = 'block';
  menuLayer.style.left = posX+'px';
  menuLayer.style.top = posY+'px';
  menuLayer.style.width = size+'px';
  menuLayer.style.height = menuLayer.style.width;
  menuLayer.style['background-color'] = '#E0DFDF70';
  menuLayer.style.border = '2px solid '+(isDoodle?'#CC993360':'#4FFF4Fa0');
  menuLayer.style['border-radius'] = '50%';
  menuLayer.style['pointer-events'] = 'auto';
  // add event listeners for mouse and touch events
  menuLayer.addEventListener("mousedown", startDragOrRotate);
  menuLayer.addEventListener("mousemove", dragOrRotate);
  menuLayer.addEventListener("mouseup", endDragOrRotate);
  menuLayer.addEventListener("touchstart", startDragOrRotate);
  menuLayer.addEventListener("touchmove", dragOrRotate);
  menuLayer.addEventListener("touchend", endDragOrRotate);  
  //
  var rect = menuLayer.getBoundingClientRect();
  menuLayer.posX = posX;
  menuLayer.posY = posY;
};
//回傳彈跳式選單是否已存在
function popupMenuIsExist() {
  return document.querySelector('.menuLayer').style.display == 'block';
}
//停止長按的動畫
function spotScalingStop() {
  if(typeof(scalingIntervalId)!='undefined' && scalingIntervalId!=null) {
  
    try {
      clearInterval(scalingIntervalId);
	  scalingIntervalId = null;
    } catch(e) { };
  }
  var longPressSpot = document.querySelector('.longPressSpot');
  longPressSpot.style.display = 'none';
};
//準備啟動長按的動畫
function spotScalingStart(x, y) {
  spotScalingStop();
  var size = 10;
  var longPressSpot = document.querySelector('.longPressSpot');
  longPressSpot.style.width = size+'px';  
  longPressSpot.style.height = size+'px';
  longPressSpot.style.top = y+'px';
  longPressSpot.style.left = x+'px';
  longPressSpot.style.transform = 'translate(-50%, -50%) scale(1)';
  longPressSpot.style.opacity = 0.5;
  longPressSpot.style.display = 'block';
  longPressSpotScale = 1;
  scalingIntervalId = setInterval(function() {
    longPressSpotScale += 0.5; // Increase the scale by 0.1
    longPressSpot.style.transform = 'translate(-50%, -50%) scale('+longPressSpotScale+')'; // Apply the new scale
	var opacity = Number(longPressSpot.style.opacity);
	opacity -= 0.05;
	if(opacity<0.2) opacity = 0.2;
	longPressSpot.style.opacity = opacity;
  }, 25);
};
function pressTimerStop() {
  //試著停止長按的動畫
  spotScalingStop();
  if(typeof(pressTimerId) && pressTimerId!=null) {
    clearTimeout(pressTimerId);
  }
  pressTimerId = null;  
};

/* 更改工具列擺放位置 guesture 偵測的相關事件 */
/* 按下 */
function toolsDragStart(e) {
  var target = e.target || e.touches[0].target;
  if(target == document.getElementById('tools')) {
    e.preventDefault(); // prevent default behavior
    e.stopPropagation();

    target.x0 = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
    target.y0 = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch
    target.x1 = target.x0;
    target.y1 = target.y0;
    target.isDraging = true;
  } 
};
/* 移動 */
function toolsDragMove(e) {
  var target = e.target || e.touches[0].target;
  if(target == document.getElementById('tools')) {
    e.preventDefault(); // prevent default behavior
    if(typeof(target.isDraging)=='boolean' && target.isDraging) {
      target.x1 = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
      target.y1 = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch
    }
  }
};
/* 放開 */
function toolsDragEnd(e) {
  var target = e.target || e.touches[0].target;
  if(target == document.getElementById('tools')) {
    e.preventDefault(); // prevent default behavior
    var rect = target.getBoundingClientRect();
    if(typeof(target.isDraging)=='boolean' && target.isDraging) {
      
      var dx = target.x1-target.x0;
      var dy = target.y1-target.y0;
      //var angle = Math.atan2(dy, dx) * 180 / Math.PI;
      //將換位置的目標換成工具列(以免是拉到按鈕)
      target = document.getElementById('tools');
      var size = Math.min(rect.width, rect.height);
      var offsetMin = 12;
      if(Math.abs(dx)>=offsetMin || Math.abs(dy)>=offsetMin) {
        var m = Math.abs(dy/dx);
        if(m>=0.7) {
          if(dy > 0) {
            pos = 'bottom';
          } else {
            pos = 'top';
          }
        } else {
          if(dx > 0) {
            pos = 'right';
          } else {
            pos = 'left';
          }
        }
        setToolsPosition(pos);
      }
    }
  }
  target.isDraging = false;
};
/* 依指定的位置設定工具列的 class */
function setToolsPosition(position) {
  var target = document.getElementById('tools');
  target.classList.toggle('tools-v-left', false);
  target.classList.toggle('tools-v-right', false);
  target.classList.toggle('tools-h-top', false);
  target.classList.toggle('tools-h-bottom', false);

  if(position=='top' || position=='bottom') {
    target.classList.toggle('tools-h-top', true);
    if(position=='bottom') {
      target.classList.toggle('tools-h-bottom', true);
    }
  } else {
    target.classList.toggle('tools-v-left', true);
    if(position=='right') {
      target.classList.toggle('tools-v-right', true);
    }
  }
};
function drawDoodleToCanvas(target) {
  var canvasDoodle = document.getElementById('canvasDoodle');
  var ctx = target.getContext("2d");
  var src = canvasDoodle.getBoundingClientRect();
  var dst = target.getBoundingClientRect();
  var x = dst.left - src.left;
  var y = dst.top - src.top;
  var alpha = canvasDoodle.style.opacity;
  ctx.save();
  ctx.globalAlpha = (alpha==''?0.3:Number(alpha));
  ctx.drawImage(canvasDoodle, x, y, dst.width, dst.height, 0, 0, dst.width, dst.height);
  ctx.restore();
  if(typeof(lastCanvas)!='undefined' && lastCanvas!=null && target==getMainCanvas()) {
    var ctx2 = lastCanvas.getContext("2d");
    ctx2.clearRect(0, 0, target.width, target.height);
    ctx2.drawImage(target, 0, 0);
  }
};
/* 塗鴉的相關函數 */
/* 畫筆啟用與停止 */
function enableDoole(enable) {
  var canvasDoodle = document.getElementById('canvasDoodle');
  var btn = document.getElementById('enableDooleBtn');
  if(typeof(enable)=='boolean') {
    doodleEnable = !enable; //因為是反向操作，所以先設相反
  }
  if(!(typeof(doodleEnable)=='boolean' && doodleEnable)) {
    croping = false;
    drawingPath = false;
    doodleEnable = true;
    btn.children[0].innerHTML = '停用<br />畫筆';
    btn.style.opacity = 1;
    //canvasDoodle.style.pointerEvents = 'auto';
    canvasDoodle.style['pointer-events'] = 'auto';
	//隱藏選取區的設定
	getSelectCanvas().style.display = 'none';
	
	//顯示小秘訣
	var dx = 0, dy = 0;
	var size = btn.getBoundingClientRect().width;
	var c = btn.parentNode.getAttribute('class');
	var msgOffset = 150;
	if(/tools-v/.test(c)) {
	  if(/tools-v-right/.test(c)) {
	    dx = -size*2.25-msgOffset;
	  } else {
	    dx = size*2.25+msgOffset;
	  }
	} else {
	  dx = -size-msgOffset;
	  if(/tools-h-bottom/.test(c)) {
	    dy = -1.75*size;
	  } else {
	    dy = 1.75*size;
	  }
	}
	if(document.getElementById('gameWrapper').style.display == 'block') {
	  showFadeOutMessage(btn, '[小秘訣] 在繪圖區長按, 會出現選項', dx, dy );
      //如果有開啟分割區塊的選單，就關閉
	  var menuLayer = document.querySelector('.menuLayer');
	  if(typeof(menuLayer)!='undefined' && menuLayer!=null && typeof(menuLayer.isDoodle)=='boolean' && !menuLayer.isDoodle) {
	     closePopupMenu();
	  }	  
	}
  } else {
    doodleEnable = false;
    btn.children[0].innerHTML = '啟用<br />畫筆';
    btn.style.opacity = 0.5;
    //canvasDoodle.style.pointerEvents = 'none';
    canvasDoodle.style['pointer-events'] = 'none';
	//如果有開啟塗鴉工具的選單，就關閉
	var menuLayer = document.querySelector('.menuLayer');
	if(typeof(menuLayer)!='undefined' && menuLayer!=null && typeof(menuLayer.isDoodle)=='boolean' && menuLayer.isDoodle) {
	  closePopupMenu();
	}
  }  
}
/* 清除塗鴉 */
function clearDoodle() {
  var canvasDoodle = document.getElementById('canvasDoodle');
  var ctxDoodle = canvasDoodle.getContext("2d");
  ctxDoodle.clearRect(0, 0, canvasDoodle.width, canvasDoodle.height);
};

function clearSelectCanvas() {
  var canvas = getSelectCanvas();
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};



/* 塗鴉時的相關事件 */
/* 筆按下 */
function startDoodle(e) {
  if(typeof(doodleEnable)=='boolean' && doodleEnable && document.getElementById('gameWrapper').style.display=='block') {
    e.preventDefault(); // prevent default behavior
    var target = e.target || e.touches[0].target;
    var ctxDoodle = target.getContext("2d");
  
    target.isDrawing = true; // set the flag to true
    var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
    var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch

    // Get the mouse coordinates relative to the canvas
    var rect = target.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
  
    target.lastPos = {x:x, y:y};
	
    target.startTime = (new Date()).getTime();
    target.isMoved = false;
	
	if(!popupMenuIsExist()) {
	  spotScalingStart(x, y);
      pressTimerId = setTimeout(function() {
        //時間到了就認定為長按
        //e.release();	  
	    target.isDrawing = false;
        pressTimerStop(); //試著停止長按的動畫
        popupMenu(target, target.lastPos.x, target.lastPos.y);			
      }, longPressTime);	
    }

    /*
    ctxDoodle.save();
    ctxDoodle.beginPath(); // start a new path
    //ctxDoodle.globalAlpha = 0.1;
    ctxDoodle.strokeStyle = penColor; // set the stroke color to red
    //ctxDoodle.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctxDoodle.lineWidth = penWidth; // set the stroke width to 5 pixels
    //ctx.moveTo(path[0].x, path[0].y); // move to the first point of the path
    ctxDoodle.moveTo(x, y);
	*/
  }
};
// function to draw the doodle
/* 筆移動，畫出移動軌跡 */
function drawDoodle(e) {  
  var target = e.target || e.touches[0].target;
  var ctxDoodle = target.getContext("2d");
  if (target.isDrawing) { // check if the user is drawing
    e.preventDefault(); // prevent default behavior
    
    var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
    var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch
    // Get the mouse coordinates relative to the canvas
    var rect = target.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    
    if((target.lastPos.x-x)**2+(target.lastPos.y-y)**2>25 && x>=0 && x<target.width && y>=0 && y<target.height) {
      //path.push({x: x, y: y}); // add the point to the path array
	  pressTimerStop();  //試著停止長按的動畫
      if(!target.isMoved) {
        ctxDoodle.save();
        ctxDoodle.beginPath(); // start a new path
        //ctxDoodle.globalAlpha = 0.1;
        ctxDoodle.strokeStyle = penColor; // set the stroke color to red
        //ctxDoodle.strokeStyle = "rgba(255, 0, 0, 0.5)";
        ctxDoodle.lineWidth = penWidth; // set the stroke width to 5 pixels
        //ctx.moveTo(path[0].x, path[0].y); // move to the first point of the path
        ctxDoodle.moveTo(target.lastPos.x, target.lastPos.y);
      }
      ctxDoodle.lineTo(x, y);
      ctxDoodle.stroke(); // stroke the path
      target.lastPos = {x:x, y:y};
      target.isMoved = true;
    }
  }
};
// function to end drawing the doodle
/* 筆放開 */
function endDoodle(e) {
  e.preventDefault(); // prevent default behavior
  var target = e.target || e.touches[0].target;
  var ctxDoodle = target.getContext("2d");
  
  pressTimerStop(); //試著停止長按的動畫

  if(target.isDrawing) {
    if(target.isMoved) {
      ctxDoodle.closePath();
      ctxDoodle.restore();
    }
  }
  
  target.isDrawing = false; // set the flag to false
};


/* 設定矩形選取區用的函數 */
function isHitRectangle(target, x, y) {
  return (x>=target.crop.x0 && x<=target.crop.x1 && y>=target.crop.y0 && y<=target.crop.y1);
}
function isHitThePoint(point, offset, pos) {
  //在角落 +- offset , 這種方式比較適合觸控螢幕的直覺操作
  return (Math.abs(point-pos) < Math.abs(offset));
  /*
  //在內部的角落
  if(offset>0) {
    return (pos>=point && pos<=point+offset);
  } else {
    return (pos>=point+offset && pos<=point);
  }
  */
}
function getHitCornerId(target, x, y) {
  var offset = 20;
  var corner = -1;
  if(isHitThePoint(target.crop.x0, offset, x)) {
    if(isHitThePoint(target.crop.y0, offset, y)) {
      corner = 0;	//左上角
    } else if(isHitThePoint(target.crop.y1, -offset, y)) {
      corner = 3;	//左下角
    }
  } else if(isHitThePoint(target.crop.x1, -offset, x)) {    
    if(isHitThePoint(target.crop.y0, offset, y)) {
      corner = 1;	//右上角
    } else if(isHitThePoint(target.crop.y1, -offset, y)) {
      corner = 2;	//右下角
    }
  }
  //再看看是否在邊線的控制點
  if(isHitThePoint((target.crop.x0+target.crop.x1)/2, (target.crop.x1-target.crop.x0)/2-offset, x)) {
    if(isHitThePoint(target.crop.y0, offset, y)) {
      corner = 4;	//上
    } else if(isHitThePoint(target.crop.y1, offset, y)) {
      corner = 6;	//下
    }
  } else if(isHitThePoint((target.crop.y0+target.crop.y1)/2, (target.crop.y1-target.crop.y0)/2-offset, y)) {
    if(isHitThePoint(target.crop.x0, offset, x)) {
      corner = 7;	//左
    } else if(isHitThePoint(target.crop.x1, offset, x)) {
      corner = 5;	//右
    }
  }
  return corner;
}
function getFrame(x0, y0, x1, y1) {
  var width = Math.abs(x1-x0);
  var height = Math.abs(y1-y0);
  x0 = Math.min(x0, x1);
  y0 = Math.min(y0, y1);
  x1 = x0+width;
  y1 = y0+height;
  return {x0:x0, y0:y0, x1:x1, y1:y1, width:width, height:height};
}
function drawCorner(ctx, x0, y0, x1, y1) {  
  var f = getFrame(x0, y0, x1, y1);
  var size = 20;
  var list = [[f.x0, f.y0], [f.x1, f.y0], [f.x1, f.y1], [f.x0, f.y1]];
  var x, y;
  
  //if((f.x1-f.x0)<size*3 || (f.y1-f.y0)<size*3) return; //寬或高不足三倍控制點就不畫
  
  for(var i=0; i<list.length; i++) {
    x = list[i][0];
    y = list[i][1];
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(51, 153, 255, 0.4)';
    ctx.moveTo(x, y+size*(i<2?1:-1));
    ctx.lineTo(x, y);
    ctx.lineTo(x+size*(i==0||i==3?1:-1), y);
    //邊線中央的控制點
    /*
    if(i==0 || i==2) {
      ctx.moveTo((f.x0+f.x1-size)/2, y);
      ctx.lineTo((f.x0+f.x1+size)/2, y);
    } else {
      ctx.moveTo(x, (f.y0+f.y1-size)/2);
      ctx.lineTo(x, (f.y0+f.y1+size)/2);
    }
    */
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
  //畫九宮格的格線
  ctx.save();
  var dx = Math.floor(f.x1-f.x0)/3;
  var dy = Math.floor(f.y1-f.y0)/3;
  for(var i=1; i<=2; i++) {
    //超過控制點大小的三倍寬就畫直線
    if((f.x1-f.x0)>size*3) {
      ctx.moveTo(f.x0, f.y0+i+dy*i);
      ctx.lineTo(f.x1, f.y0+i+dy*i);
    }
    //超過控制點大小的三倍寬就畫橫線
    if((f.x1-f.x0)>size*3) {
      ctx.moveTo(f.x0+i+dx*i, f.y0);
      ctx.lineTo(f.x0+i+dx*i, f.y1);
    }
  }
  ctx.strokeStyle = 'rgba(51, 153, 255, 0.2)';
  ctx.stroke();
  ctx.closePath();
};
function drawTextAtCenter(ctx, x0, y0, x1, y1, text) {  
  //var text = "按這裡確定範圍";
  var fontSize = (Math.abs(x1-x0)>=150 && Math.abs(y1-y0)>28?24:12);
  var tx = (x1+x0)/2, ty=(y1+y0)/2-fontSize/2;
  ctx.save();  
  ctx.font = fontSize+"px serif";
  ctx.textBaseline = "hanging";
  ctx.textAlign = "center";
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 14;
  ctx.strokeText(text, tx, ty);
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 8;
  ctx.strokeText(text, tx, ty);
  ctx.fillStyle = 'white';
  ctx.fillText(text, tx, ty);
  ctx.restore();  
};
function getBounding(target) {
  if (target.isDrawing) {
    //ctx.strokeRect(target.x0, target.y0, target.x1 - target.x0, target.y1 - target.y0);
    x0 = target.x0;
    y0 = target.y0;
    x1 = target.x1;
    y1 = target.y1;
  } else {
    //ctx.strokeRect(x0, y0, width, height);
    
    if(target.cornerId>=0) {
      x0 = target.crop.x0;
      y0 = target.crop.y0;
      x1 = target.crop.x1;
      y1 = target.crop.y1;
      switch(target.cornerId) {
        case 0 :	//左上角
          x0 = target.x1;
          y0 = target.y1;
          break;
        case 1 :	//右上角
          x1 = target.x1;
          y0 = target.y1;
          break;
        case 2 :	//右下角
          x1 = target.x1;
          y1 = target.y1;
          break;
        case 3 :	//左下角
          x0 = target.x1;
          y1 = target.y1;
          break;
        case 4 :	//上中
          y0 = target.y1;
          break;
        case 5 :	//右中
          x1 = target.x1;
          break;
        case 6 :	//下中
          y1 = target.y1;
          break;
        case 7 :	//左中
          x0 = target.x1;
          break;
        }
        target.crop.x0 = x0;
        target.crop.y0 = y0;
        target.crop.x1 = x1;
        target.crop.y1 = y1;
    } else {
        x0 = target.x1-(target.x0-target.crop.x0);
        y0 = target.y1-(target.y0-target.crop.y0);
        width = Math.abs(target.crop.x1-target.crop.x0);
        height = Math.abs(target.crop.y1-target.crop.y0);
        x1 = x0+width;
        y1 = y0+height;
    }
  }
  return getFrame(x0, y0, x1, y1);
}
//---------矩形選取區用結束

// function to start drawing the path
function startPath(e) {
  var target = e.target || e.touches[0].target;
  var ctx = target.getContext("2d");
  
  if(typeof(selectedCanvas)!='undefined') {
    selectedCanvas.classList.toggle("selectedObj", false);
  }

  //還沒載入圖片，或是已設定選取區(path)者，就不繼續
  if(!isImageLoaded() || (typeof(path)=='undefined' || path.length>0)) return;
  //如果正在拖曳工具列, 就不繼續
  var tools = document.getElementById('tools');
  if(typeof(tools.isDraging)=='boolean' && tools.isDraging) return;
  
  e.preventDefault(); // prevent default behavior
  
  drawingPath = true; // set the flag to true
  var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
  var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch

  // Get the mouse coordinates relative to the canvas
  var rect = target.getBoundingClientRect();
  x -= rect.left;
  y -= rect.top;

  target.x0 = x;
  target.y0 = y;
  target.x1 = x;
  target.y1 = y;
 
  path.push({x: x, y: y}); // add the point to the path array
  
  if(selectorShape == 0) { 
    //套索的方式選取
    ctx.save();
    ctx.beginPath(); // start a new path
    ctx.globalAlpha = 0.1;
    // set the stroke color
    if(croping) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "green";
    }
    //ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
    ctx.lineWidth = lineWidth; // set the stroke width to 5 pixels
    ctx.moveTo(path[0].x, path[0].y); // move to the first point of the path
  } else if(selectorShape == 1) { 
    //矩形選取區 
    target.cornerId = getHitCornerId(target, target.x0, target.y0);
    // Start drawing the cropping rectangle
    //console.log(isHitRectangle(target, target.x0, target.y0) , target.cornerId);
    if(isHitRectangle(target, target.x0, target.y0) || target.cornerId>=0) {
      target.isDraging = true;
    } else {
      target.isDrawing = true;
    }
  }
  target.hasMoved = false;
}

// function to draw the path
function drawPath(e) {
  e.preventDefault(); // prevent default behavior
  var target = e.target || e.touches[0].target;
  var ctx = target.getContext("2d");
  if (drawingPath) { // check if the user is drawing
    var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
    var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch
    // Get the mouse coordinates relative to the canvas
    var rect = target.getBoundingClientRect();
    x -= rect.left;
    y -= rect.top;
    //target.x0 = x;
    //target.y0 = y;
    
    if(selectorShape == 0) {
      //套索的方式選取
      var last = path[path.length-1];
      if((last.x-x)**2+(last.y-y)**2>25 && x>=0 && x<target.width && y>=0 && y<target.height) {
        path.push({x: x, y: y}); // add the point to the path array
        ctx.lineTo(x, y);
        ctx.stroke(); // stroke the path
      }
    } else if(selectorShape == 1) { 
      //矩形選取區
      if (target.isDrawing || target.isDraging) {
        if((x-target.x1)**2+(y-target.y1)**2 > target.movingMin**2) {
          target.hasMoved = true;
          target.x1 = x;
          target.y1 = y;
          
          // Clear the canvas and redraw the image
          ctx.clearRect(0, 0, target.width, target.height);			  
		  /*
          //圖片重繪
          if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
            ctx.drawImage(imageToExplain, 0, 0,  target.width, target.height);
          } else {			
            ctx.drawImage(lastCanvas, 0, 0,  target.width, target.height);
          }
		  */
		  
          // Draw the cropping rectangle
          //ctx.strokeStyle = "rgba(51, 153, 255, 0.25)";
          if(croping) {
            ctx.strokeStyle = "red";
          } else {
            ctx.strokeStyle = "green";
          }
          
          var b = getBounding(target);
          ctx.strokeRect(b.x0, b.y0, b.x1-b.x0, b.y1-b.y0);

          if(target.isDraging) {
            drawCorner(ctx, b.x0, b.y0, b.x1, b.y1);
            drawTextAtCenter(ctx, b.x0, b.y0, b.x1, b.y1, "按這裡"+(croping?'執行剪截':'分割區塊'));
          }
        }
      }
    }	
  }
}

// function to end drawing the path
function endPath(e) {
  e.preventDefault(); // prevent default behavior  
  var target = e.target || e.touches[0].target;
  var ctx = target.getContext("2d");  
  if(drawingPath) {
    if(selectorShape == 0) {
      //套索的方式選取
      ctx.closePath();
      ctx.restore();
    } else if(selectorShape == 1) { 
      //矩形選取區
      if(target.hasMoved) {
        target.crop = getBounding(target);
        if (target.isDrawing) {
          //isDraging 本就會重繪控制點了，只有 isDraging 才需要，以免透明的部份變色
          drawCorner(ctx, target.crop.x0, target.crop.y0, target.crop.x1, target.crop.y1); 
          drawTextAtCenter(ctx, target.crop.x0, target.crop.y0, target.crop.x1, target.crop.y1, "按這裡"+(croping?'執行剪截':'分割區塊'));
        }
      }
      if(!(target.isDraging && !target.hasMoved)) {
        //如果是在已設好的框內(target.isDraging)按一下(!target.hasMoved)
        //就不清空 path, 這樣子就可以繼續移動方框、調整方框大小，或是重新設定範圍
        path = []; //設為空的，就可以重新設定或是移動方框
      }
    }
    //使用矩形選取區者，要在中央按一下才會進行剪裁
    if(selectorShape == 0 || (selectorShape == 1 && target.isDraging && !target.hasMoved)) {
	
	  //getSelectCanvas().style['pointer-events'] = 'none';
	  getSelectCanvas().style.display = 'none';
	  
      if(croping) {
        imageCrop();
      } else {
		/*
        ctx.clearRect(0, 0, target.width, target.height);
        //圖片重繪		
        if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
          ctx.drawImage(imageToExplain, 0, 0,  target.width, target.height);
        } else {
          ctx.drawImage(lastCanvas, 0, 0,  target.width, target.height);
        }
		*/
        imageSplit();
      }
    }
  }  
  // Stop drawing the cropping rectangle
  target.isDrawing = false;
  target.isDraging = false;
  target.cornerId = -1;
  
  drawingPath = false; // set the flag to false

}
function crop() {
    croping = true;
    reset();
}
function imageCrop() {
	var canvasSelect = getSelectCanvas();
	
    var canvas = getMainCanvas();
    var ctx = canvas.getContext("2d");	

    //換算回原始圖片尺寸時的比例
    var scaleToImgSource = imageToExplain.naturalWidth/canvas.width;

	//計算選取座標和圖形來源之間的轉換(left , top 的差)
	var rectSelect = canvasSelect.getBoundingClientRect();
	var rectTarget = canvas.getBoundingClientRect();
	var xOffset = rectTarget.left - rectSelect.left;
	var yOffset = rectTarget.top - rectSelect.top;
    
    var width, height;
    var xMin=canvasSelect.width, xMax=0, yMin=canvasSelect.height, yMax=0;
    if(selectorShape == 0) {
      //套索的方式選取
	  var canvas1 = document.createElement("canvas");
	  var ctx1 = canvas1.getContext("2d");
	  canvas1.width = imageToExplain.naturalWidth;
	  canvas1.height = imageToExplain.naturalHeight;
	  
	  ctx1.beginPath();
	  var x = Math.floor(path[0].x-xOffset);
	  var y = Math.floor(path[0].y-yOffset);
      ctx1.moveTo(x*scaleToImgSource, y*scaleToImgSource);
      for (var i = 1; i < path.length; i++) {
		x = Math.floor(path[i].x-xOffset);
		y = Math.floor(path[i].y-yOffset);
        ctx1.lineTo(x*scaleToImgSource, y*scaleToImgSource);
		
        xMin = Math.min(x, xMin);
        xMax = Math.max(x, xMax);
        yMin = Math.min(y, yMin);
        yMax = Math.max(y, yMax);
      }
	  ctx1.closePath();
      //擷取路徑內的圖形
      ctx1.clip();
      ctx1.drawImage(imageToExplain, 0, 0, canvas1.width, canvas1.height);
	//console.log(canvas1.width, canvas1.height);
      //canvas1 = cropCanvas(canvas1, xMin*scaleToImgSource, yMin*scaleToImgSource, (xMax-xMin)*scaleToImgSource, (yMax-yMin)*scaleToImgSource);
    //var gameWrapper = document.getElementById('gameWrapper');
    //gameWrapper.appendChild(canvas1);	
	//canvas1.style.border = '1px dashed #ff0000';
	//console.log(canvas1);

	  /*
      for (var i = 1; i < path.length; i++) {	
        xMin = Math.min(path[i].x, xMin);
        xMax = Math.max(path[i].x, xMax);
        yMin = Math.min(path[i].y, yMin);
        yMax = Math.max(path[i].y, yMax);
      }
	  */
    } else if(selectorShape == 1) {
      //矩形選取區
      // Set the size of the second canvas to the cropping size
      //width = Math.abs(canvas.crop.x1 - canvas.crop.x0);
      //height = Math.abs(canvas.crop.y1 - canvas.crop.y0);
      xMin = Math.min(canvasSelect.crop.x1, canvasSelect.crop.x0);
      xMax = Math.max(canvasSelect.crop.x1, canvasSelect.crop.x0);
      yMin = Math.min(canvasSelect.crop.y1, canvasSelect.crop.y0);
      yMax = Math.max(canvasSelect.crop.y1, canvasSelect.crop.y0);
      if(xMin<0) xMin = 0;
      if(xMax>canvasSelect.width) xMax = canvasSelect.width;
      if(yMin<0) yMin = 0;
      if(yMax>canvasSelect.height) yMax = canvasSelect.height;
	  
  	  //修正為圖內的座標
	  xMin -= xOffset;
	  xMax -= xOffset;
	  yMin -= yOffset;
	  yMax -= yOffset;
    }
	if(xMin<0) xMin = 0;
	if(yMin<0) yMin = 0;
    if(xMax>canvas.width) xMax = canvas.width;
	if(yMax>canvas.height) yMax = canvas.height;	  
	
    width = xMax-xMin;
    height = yMax-yMin;
	
    //var scale = Math.min((widthMax-20)/width, (heightMax-20)/height);
    var scale = Math.min(widthMax/width, heightMax/height);
    canvas.width = width*scale;
    canvas.height = height*scale;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
	//由原圖依比例剪截縮放到主繪圖區
	if(selectorShape == 0) {
	  ctx.drawImage(canvas1, xMin*scaleToImgSource, yMin*scaleToImgSource,  width*scaleToImgSource, height*scaleToImgSource, 0, 0, canvas.width, canvas.height);
	} else {
	  ctx.drawImage(imageToExplain, xMin*scaleToImgSource, yMin*scaleToImgSource,  width*scaleToImgSource, height*scaleToImgSource, 0, 0, canvas.width, canvas.height);
    }
	//將主繪圖區的內容製作一個副本(後面都以這個副本當來源)
    if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
      lastCanvas = document.createElement('canvas');
    }
    lastCanvas.width = canvas.width;
    lastCanvas.height = canvas.height;
    lastCanvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    lastCanvas.getContext("2d").drawImage(canvas, 0, 0, canvas.width, canvas.height);	
	
    croping = false;
    newClip();    
	showFadeOutMessage(getMainCanvas(), '已經將圖片截切並縮放到最大尺寸');
    updateCloseBtnPosition(2000); //先調按鈕位置, 等 2000ms 後才顯示提示
}
//剪裁 canvas
function cropCanvas(sourceCanvas, left, top, width, height) {
    var destCanvas = document.createElement('canvas');
    destCanvas.width = width;
    destCanvas.height = height;
    destCanvas.getContext("2d").drawImage(
        sourceCanvas,
        left,top,width,height,  // source rect with content to crop
        0,0,width,height);      // newCanvas, same size as source rect
    return destCanvas;
}

function imageSplit() {
	var canvasSelect = getSelectCanvas(); //選擇區

    // split the image into two parts with the path
	if(typeof(canvasSelect.sourceCanvas)=='undefined' || canvasSelect.sourceCanvas==null) {
		var canvas = getMainCanvas();
	} else {
		var canvas = canvasSelect.sourceCanvas;
	}
    var ctx = canvas.getContext("2d");

	//計算選取座標和圖形來源之間的轉換(left , top 的差)
    var rectSelect = canvasSelect.getBoundingClientRect();
    var rectTarget = canvas.getBoundingClientRect();
    var xOffset = rectTarget.left - rectSelect.left;
    var yOffset = rectTarget.top - rectSelect.top;

    // create two new canvases for each part of the image
    var canvas1 = document.createElement("canvas");
    var canvas2 = document.createElement("canvas");
    var ctx1 = canvas1.getContext("2d");
    var ctx2 = canvas2.getContext("2d");
    

    // variables to store the position and angle of each part of the image
    canvas1.posX = 0;
    canvas1.posY = 0;
    canvas1.angle = 0;
    canvas2.posX = canvas.width / 2;
    canvas2.posY = 0;
    canvas2.angle = 0;

    // variables to store the mouse or touch position relative to each part of the image
    canvas1.offsetX = 0;
    canvas1.offsetY = 0;
    canvas2.offsetX = 0;
    canvas2.offsetY = 0;

    // variables to store the flags for dragging and rotating each part of the image
    canvas1.dragging = false;
    canvas1.rotating = false;
    canvas2.dragging = false;
    canvas2.rotating = false;
    
    // set their width and height to match the original canvas
    canvas1.width = canvas.width;
    canvas1.height = canvas.height;
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;


    // draw each part of the image onto a new canvas using clipping regions


    // for canvas1, clip along the path and draw from (0, 0) to (canvas.width / 2, canvas.height)

    var xMin=canvasSelect.width, xMax=0, yMin=canvasSelect.height, yMax=0;
    
    ctx1.beginPath();
    //ctx1.lineWidth = 0.000000000000001;
	
    // for canvas2, clip along the inverse of the path and draw from (canvas.width / 2, 0) to (canvas.width, canvas.height)
    ctx2.beginPath();
	//ctx2.lineWidth = 0.000000000000001;
    ctx2.rect(0, 0, canvas.width, canvas.height); // draw a rectangle covering the whole canvas
    
    if(selectorShape == 0) {
      //套索的方式選取
	  var x = Math.floor(path[0].x-xOffset);
	  var y = Math.floor(path[0].y-yOffset);
      ctx1.moveTo(x, y);
      ctx2.moveTo(x, y);
      for (var i = 1; i < path.length; i++) {
		x = Math.floor(path[i].x-xOffset);
		y = Math.floor(path[i].y-yOffset);
        ctx1.lineTo(x, y);
        ctx2.lineTo(x, y);
		
        xMin = Math.min(x, xMin);
        xMax = Math.max(x, xMax);
        yMin = Math.min(y, yMin);
        yMax = Math.max(y, yMax);
      }
      if(xMin<0) xMin = 0;
      if(yMin<0) yMin = 0;
	  if(xMax>canvas.width) xMax = canvas.width;
	  if(yMax>canvas.height) yMax = canvas.height;
      xMin = Math.floor(xMin);
	  xMax = Math.floor(xMax);
	  yMin = Math.floor(yMin);
	  yMax = Math.floor(yMax);	  
    } else if(selectorShape == 1) {
      //矩形選取區
      xMin = Math.min(canvasSelect.crop.x1, canvasSelect.crop.x0);
      xMax = Math.max(canvasSelect.crop.x1, canvasSelect.crop.x0);
      yMin = Math.min(canvasSelect.crop.y1, canvasSelect.crop.y0);
      yMax = Math.max(canvasSelect.crop.y1, canvasSelect.crop.y0);
      if(xMin<0) xMin = 0;
      if(xMax>canvasSelect.width) xMax = canvasSelect.width;
      if(yMin<0) yMin = 0;
      if(yMax>canvasSelect.height) yMax = canvasSelect.height;
      xMin -= xOffset;
      xMax -= xOffset;
      yMin -= yOffset;
      yMax -= yOffset;
      if(xMin<0) xMin = 0;
      if(yMin<0) yMin = 0;
	  if(xMax>canvas.width) xMax = canvas.width;
	  if(yMax>canvas.height) yMax = canvas.height;	  
      xMin = Math.floor(xMin);
	  xMax = Math.floor(xMax);
	  yMin = Math.floor(yMin);
	  yMax = Math.floor(yMax);
      ctx1.rect(xMin, yMin, xMax-xMin, yMax-yMin);
      ctx2.rect(xMin, yMin, xMax-xMin, yMax-yMin);
    }
    //擷取路徑內的圖形
	ctx1.closePath();
    ctx1.clip();
    //ctx1.drawImage(image, 0, 0, canvas.width / 2, canvas.height, 0, 0, canvas.width / 2, canvas.height);
    //ctx1.drawImage(image, 0, 0, canvas.width, canvas.height);
	ctx1.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    ctx2.closePath();
    //擷取路徑以外的內容
    ctx2.clip("evenodd"); // use the evenodd rule to clip the inverse of the path
	ctx2.drawImage(canvas, 0, 0, canvas.width, canvas.height);

    //lastCanvas = canvas2;
    if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
      lastCanvas = document.createElement('canvas');
    }
    lastCanvas.width = canvas.width;
    lastCanvas.height = canvas.height;
	lastCanvas.getContext("2d").drawImage(canvas2, 0, 0); 
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);	
    ctx.drawImage(canvas2, 0, 0);
   
    // use mouse or touch events to drag or rotate each part of the image
    //crop the canvas1 to min and append to gameWrapper
    canvas1 = cropCanvas(canvas1, xMin, yMin, xMax-xMin, yMax-yMin);
    ctx1 = canvas1.getContext("2d");	
    //console.log(canvas1.width, canvas1.height);
    var rect = canvas.getBoundingClientRect();
    canvas1.posX = xMin+rect.left;
    canvas1.posY = yMin+rect.top;
   
    canvas1.xOrigin = xMin;
    canvas1.yOrigin = yMin;
    
    canvas1.angle = 0;
    canvas1.scaleX = 1;
    canvas1.scaleY = 1;
    
    //canvas1.setAttribute('draggable', 'true');
    canvas1.setAttribute('class', 'imageClip');	
    canvas1.style['left'] = canvas1.posX+'px';
    canvas1.style['top'] = canvas1.posY+'px';
    canvas1.style['opacity'] = opacity;
    
    var gameWrapper = document.getElementById('gameWrapper');
    gameWrapper.appendChild(canvas1);	

    // add event listeners for mouse and touch events
    canvas1.addEventListener("mousedown", startDragOrRotate);
    canvas1.addEventListener("mousemove", dragOrRotate);
    canvas1.addEventListener("mouseup", endDragOrRotate);
    canvas1.addEventListener("touchstart", startDragOrRotate);
    canvas1.addEventListener("touchmove", dragOrRotate);
    canvas1.addEventListener("touchend", endDragOrRotate);
	
	
	canvas1.sourceCanvas = canvas;
    //if(typeof(selectedCanvas)!='undefined') {
    //  selectedCanvas.classList.toggle("selectedObj", false);
    //}
	var selected = document.querySelectorAll('.selectedObj');
	for(var i=0; i<selected.length; i++) {
		selected[i].classList.toggle("selectedObj", false);
	}
	var topObj = document.querySelectorAll('.topObj');
	for(var i=0; i<selected.length; i++) {
		topObj[i].classList.toggle("topObj", false);
	}
    selectedCanvas = canvas1;
    selectedCanvas.classList.toggle("selectedObj", true);
	selectedCanvas.classList.toggle("topObj", true);
	
	showFadeOutMessage(canvas1, '[小秘訣] 長按可以縫回原處');
    //console.log(canvas1.toDataURL());
};
function isCanvas(target) {
  return (target.tagName.toLowerCase()=='canvas');
};
function startDragOrRotate(e) {  
  var target = e.target || e.touches[0].target;
  
  if((/circleBtn/i.test(target.getAttribute('class')))) return; //prevent popupMenu buttons to continue

  e.preventDefault(); // prevent default behavior  
  
  target.dragging = false;
  target.rotating = false;  
  var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
  var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch
  target.x0 = x; target.y0 = y;
  target.x1 = x; target.y1 = y;
  var rect = target.getBoundingClientRect();
  target.posX = Number(target.style.left==''?0:target.style.left.match(/([\d-]+)/).pop());
  target.posY = Number(target.style.top==''?0:target.style.top.match(/([\d-]+)/).pop());
  //if (x >= target.posX && x <= target.posX + rect.width && y >= target.posY && y <= target.posY + rect.height) {
  if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {    
    // check if the mouse or touch is near the center of canvas1	
    //if (x >= target.posX+target.width/2-10 && x <= target.posX+target.width/2+10 && y >=target.posY+target.height/2-10 && y <= target.posY+target.height/2+10) {
      // set the flag for rotating canvas1
    //  target.rotating = true;
    //  target.style['cursor'] = 'pointer';
    //} else {
      // set the flag for dragging canvas1
      target.dragging = true;
      // calculate the offset of the mouse or touch relative to canvas1
      target.offsetX = x - target.posX;
      target.offsetY = y - target.posY;

      target.style['cursor'] = 'move';	  	  
    //}
	
    //將取消前一物件最上層的設定
    if(isCanvas(target)) {
      if(typeof(selectedCanvas)!='undefined'  && selectedCanvas!=null && typeof(selectedCanvas.classList)!='undefined') {
        selectedCanvas.classList.toggle("topObj", false);
        selectedCanvas.classList.toggle("selectedObj", false);
      }
      selectedCanvas = target;
      //將按下的物件變成最上層
      selectedCanvas.classList.toggle("topObj", true);
      selectedCanvas.classList.toggle("selectedObj", true);
	  //關閉選單
	  if(popupMenuIsExist()) {
		closePopupMenu();
	  }	  
    }
	
    if(!popupMenuIsExist()) {
	  spotScalingStart(x, y);
      pressTimerId = setTimeout(function() {
        //時間到了就認定為長按
        //e.release();	  
        target.style['cursor'] = 'default';
        target.dragging = false;
        target.rotating = false;
        pressTimerStop(); //試著停止長按的動畫
	    //長按，跳出選單
        popupMenu(target, x, y);			
      }, longPressTime);	
    }
	
  }
};
function dragOrRotate(e) {
  var target = e.target || e.touches[0].target;
  var x = e.clientX || e.touches[0].clientX; // get the x coordinate of the mouse or touch
  var y = e.clientY || e.touches[0].clientY; // get the y coordinate of the mouse or touch

  if(!(target.dragging || target.rotating)) return;
  
  e.preventDefault(); // prevent default behavior
  
  //set the cursor of canvas1
  var rect = target.getBoundingClientRect();
  //if (x >= target.posX && x <= target.posX + target.width && y >= target.posY && y <= target.posY + target.height) {
  if (x >= rect.left && x <= rect.left + rect.width && y >= rect.top && y <= rect.top + rect.height) {
    // check if the mouse or touch is near the center of canvas1
    //if (x >= target.posX+target.width/2-10 && x <= target.posX+target.width/2+10 && y >=target.posY+target.height/2-10 && y <= target.posY+target.height/2+10) {
    //  target.style['cursor'] = 'pointer';
    //  target.title = '按下後拖曳可以旋轉';
    //} else {
      target.style['cursor'] = 'move';
      target.title = '按下後拖曳可以移動';
    //}
  } else {
    target.style['cursor'] = 'default';
    target.title = '';
  }
  if(isCanvas(target) && target.dragging) {
    var dx = x-target.x0;
    var dy = y-target.y0;
    if(dx*dx + dy*dy > 10)   {
	  pressTimerStop(); //試著停止長按的動畫
	}
  }
  if(target.dragging) {
    target.posX = x - target.offsetX;
    target.posY = y - target.offsetY;
  
    target.style['left'] = (target.posX)+'px';	
    target.style['top'] = (target.posY)+'px';

    target.x1 = x; 
    target.y1 = y;
    //console.log('dragging');
  }
  if (isCanvas(target) && target.rotating) {
    // calculate the angle of rotation based on the mouse or touch position relative to the center of canvas1
    var dx = x - (target.posX + target.width / 2);
    var dy = y - (target.posY + target.height / 2);
    target.angle = Math.round(Math.atan2(dy, dx)*180)%360;
    updateTransform(target);
  }  
};
function endDragOrRotate(e) {
  var target = e.target || e.touches[0].target;  

  
  if(!(target.dragging || target.rotating)) return;
  
  e.preventDefault(); // prevent default behavior
  
  pressTimerStop(); //試著停止長按的動畫
    
  target.style['cursor'] = 'default';
  target.dragging = false;
  target.rotating = false;
};

function selectFileOrTakePicture(ev) {
    /* 新增 input 的元件, 接收上載的檔案 */
    var inputFromCamera = document.createElement('input');
    inputFromCamera.setAttribute('type', 'file');
    inputFromCamera.setAttribute('accept', 'image/*');
    //inputFromCamera.setAttribute('multiple', 'true');
    inputFromCamera.setAttribute('id', 'inputFromCamera');
    inputFromCamera.style['width'] = '1px';
    inputFromCamera.style['height'] = '1px';
    document.body.appendChild(inputFromCamera); //要加入頁面中才能觸發 change event
    inputFromCamera.onchange = function(e) {			
      if(typeof(e.target)!='undefined' && typeof(e.target.files)!='undefined' && e.target.files.length>0) {
        readFiles(e.target.files);
      }
      inputFromCamera.remove();
    };
    inputFromCamera.click();
};

function dropHandler(e) {
    /* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop 
       Prevent default behavior (Prevent file from being opened)
    */
    e.preventDefault();
    e.stopPropagation();
    if(typeof(e.dataTransfer)!='undefined' && typeof(e.dataTransfer.files) != 'undefined') {
      readFiles(e.dataTransfer.files);
    } else {
      console.log(e);
    }
};
function dragOverHandler(e) {
    e.preventDefault();
    e.stopPropagation();
};
function readFiles(files) {
    if(typeof(files) != 'undefined' && files.length>0) {
      if(files[0].type.match(/image/i)) {
        var reader = new FileReader()
        reader.readAsDataURL(files[0]);
        reader.onloadend = function() {
        	//clearAllClip();
			imageToExplain.failure = 0;
        	imageToExplain.src = reader.result;
        };
      }
      //使用拖曳的或是選取檔案後，將網址輸入區清空，以免混淆
	  //也可避免產生 QRCode
	  var imageURL = document.querySelector('.imageURL');
      if(typeof(imageURL)!='undefined' && imageURL!=null) {
        imageURL.value = '';
      }
    }
};
function rotate(dir) {
  //隱藏選取區的設定
  getSelectCanvas().style.display = 'none';

  if(typeof(selectedCanvas)!='undefined' && selectedCanvas!=null) {
    if(selectedCanvas.scaleX<0 && selectedCanvas.scaleY>0) {
      //如果只有水平鏡像沒有垂直鏡像時，順時針轉和逆時針轉相反
      dir *= -1;
    }
    selectedCanvas.angle = (selectedCanvas.angle+dir*angleOffset)%360;
    updateTransform(selectedCanvas);
  }
}
function mirror(value) {
  //隱藏選取區的設定
  getSelectCanvas().style.display = 'none';
  
  if(typeof(selectedCanvas)!='undefined' && selectedCanvas!=null) {
    if(value == 1) {
      selectedCanvas.scaleX *= -1;
    } else {
      selectedCanvas.scaleY *= -1;
    }
    updateTransform(selectedCanvas);
  }
}

function updateTransform(target) {
  enableDoole(false);
  if(typeof(target)!='undefined' && target!=null) {
    var transform = 'scale('+target.scaleX+','+target.scaleY+') rotate('+target.angle+'deg)';
    target.style['-moz-transform'] = transform;
    target.style['-o-transform'] = transform;
    target.style['-webkit-transform'] = transform;
    target.style['transform'] = transform;
  }
}

function recoverClip(target) {
  if(typeof(target.sourceCanvas)=='undefined' || target.sourceCanvas==null) {
	var canvas = getMainCanvas();
  } else {
    var canvas = target.sourceCanvas;
  }
  if(typeof(canvas.parentNode)!='undefined' && canvas.parentNode!=null) {  
    canvas.getContext("2d").drawImage(target, target.xOrigin, target.yOrigin);
    if(typeof(lastCanvas)!='undefined' && lastCanvas!=null) {
      lastCanvas.getContext("2d").drawImage(target, target.xOrigin, target.yOrigin);
    }
    target.remove();
    if(document.querySelectorAll('.imageClip').length == 0) {	    
      //lastCanvas.width = canvas.width;
      //lastCanvas.height = canvas.height;
      //lastCanvas.getContext("2d").drawImage(canvas, 0, 0, canvas.width, canvas.height);	
      newClip();
    }
  } else {
    showFadeOutMessage(target, '此區塊的來源已不存在，無法復原');
  }
};

function clearAllClip() {
  var imageClipList = document.querySelectorAll('.imageClip');
  for(var i=0; i<imageClipList.length; i++) {
    imageClipList[i].remove();
  }
  //lastCanvas = null;
}
function reset() {
  if(!isImageLoaded()) return;
  
  enableDoole(false);
  clearDoodle();
  clearAllClip();
  closePopupMenu();

  var canvas = getMainCanvas();
  var ctx = canvas.getContext("2d");

  if(typeof(imageToExplain)!='undefined' && typeof(imageToExplain.naturalWidth)!='undefined') {
    //var scale = Math.min((widthMax-20)/imageToExplain.naturalWidth, (heightMax-20)/imageToExplain.naturalHeight);
    var scale = Math.min(widthMax/imageToExplain.naturalWidth, heightMax/imageToExplain.naturalHeight);
    canvas.width = imageToExplain.naturalWidth*scale;
    canvas.height = imageToExplain.naturalHeight*scale;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageToExplain, 0, 0,  canvas.width, canvas.height);
  //將內容複製到分身
  if(typeof(lastCanvas)=='undefined' || lastCanvas==null) {
    lastCanvas = document.createElement('canvas');
  }
  lastCanvas.width = canvas.width;
  lastCanvas.height = canvas.height;
  lastCanvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  lastCanvas.getContext("2d").drawImage(canvas, 0, 0, canvas.width, canvas.height);	  

  //將繪圖區關閉的按鈕放到主繪圖區的左上角
  updateCloseBtnPosition();
  
  newClip();
}
function newClip(target) {
  if(!isImageLoaded()) return;  
  
  //顯示並清除選取區
  //getSelectCanvas().style['pointer-events'] = 'auto';
  //getSelectCanvas().style.display = 'block';
  clearSelectCanvas();
  getSelectCanvas().sourceCanvas = target;
  
  enableDoole(false);
  setTimeout(function() {
    path = [];
    //canvasSelectInit(getMainCanvas());  //幫選取物件設定初始值
	canvasSelectInit(getSelectCanvas());
  }, 100);
}
function setAngleOffset(n) {
  enableDoole(false);
  angleOffset = n;
}
function setOpacity(elm) {
  //enableDoole(false);
  opacity = elm.value;
  if(!(typeof(doodleEnable)=='boolean' && doodleEnable)) {
    selectedCanvas.style.opacity = opacity;
  } else {
    document.getElementById('canvasDoodle').style.opacity = opacity;
  }
}
function isImageLoaded() {
 return (typeof(imageToExplain)!='undefined' && imageToExplain.src != '');
}

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

  var x = scenceWidth / 2;
  var y = scenceHeight / 2 +60;
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
    label.style['transform'] = 'translate(10px,-24px) rotate(' + angle + 'deg)';
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
    }
  }
};
function applyTheUrlAndAutoStart(url) {
  var imageURL = document.querySelector('.imageURL');
  if(typeof(imageURL)!='undefined' && imageURL!=null) {
    imageURL.value = url;
    autostart = 'true';
	start();
	//setTimeout(loadImageFromURL, 5000);
	setTimeout(function() {
		document.querySelector('.imageURL').nextElementSibling.click();
	}, 4000);
  }
};
function start() {

  setViewport();
  
  setVisibility(true);
  
  window.scrollTo(0, 0);
    
  gameStart();

  importImage();
  
  loadingLogoEnable = true;
  loadingAnimation('東拼西湊');
  setTimeout(function() {
	loadingLogoEnable = false;
	showFadeOutMessage(document.querySelector('.closeButton'), '[小秘訣] 按&times可以結束程式', 50, 50, 5);
  }, 1200);
  setTimeout(function() {
    var imageURL = document.querySelector('.imageURL');
    if(typeof(imageURL)!='undefined' && imageURL!=null && imageURL.value == '') {
      imageURL.value = sampleURL;
    }
  }, 5000);
};

//檢查網址中是否帶有名為 autostart 的參數，用來自動啟動工具
var autostart = gup('autostart');

//檢查網址中是否帶有名為 url 的參數, 是網址就自動載入圖片
var urlQuery = '';
if(/[\?\&]url=/.test(window.location.search)) {
  urlQuery = window.location.search.replace(/[\?\&]autostart=[a-zA-z]+/, '').replace(/[\?\&]url=/, '');
}
/*  
if(typeof(URLSearchParams)=='function') {
  var searchParams = new URLSearchParams(window.location.search);  
  if(searchParams.has('url')) {
    urlQuery = searchParams.get('url')
  }
}
*/
if(urlQuery == '') {
  urlQuery = gup('url');
}
//console.log(urlQuery);
if(/^http/i.test(urlQuery)) {
  var urlQuery = decodeURIComponent(urlQuery.replace(/\*/g, '%'));
  //var urlQuery = decodeURIComponent(urlQuery);
  var imageURL = document.querySelector('.imageURL');
  if(typeof(imageURL)!='undefined' && imageURL!=null) {
    imageURL.value = urlQuery;
    autostart = 'true';
	//setTimeout(loadImageFromURL, 5000);
	setTimeout(function() {
		document.querySelector('.imageURL').nextElementSibling.click();
	}, 4000);
  }
}

if(autostart!='') {
  start();
}
