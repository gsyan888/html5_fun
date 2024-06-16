var js_stroke_parts_data = 'https://gsyan888.github.io/html5_fun/html5_stroke_parts/stroke_parts_data.js';	//HTML5 FUN 部件設定檔
var js_stroke_component = 'https://gsyan888.github.io/html5_fun/html5_stroke_parts/stroke_component.js'; //HTML5 FUN CNS 部件設定檔
var pinyinJSFilename = 'https://gsyan888.github.io/html5_fun/assets/pinyin.js'; //國字拼音對照表
var soundFailureURL = 'https://gsyan888.github.io/html5_fun/html5_wheel/assets/sound_spin.mp3';
var soundCoinURL = 'https://gsyan888.github.io/html5_fun/assets/sound-coin.mp3';
var soundFinishURL = 'https://gsyan888.github.io/html5_fun/assets/sound-ding-dong-ding-dong.mp3';
var defaultURL = 'https://docs.google.com/spreadsheets/d/1kBueULlojPOH9E3EZYEUcUAv1HfJm_wULQT1hT2m1nM/edit?usp=sharing';
  
var parts_set_separator = '~';	//部件設定生字與筆順間的分隔符號
var colors = ['#ff6699',  "#56B4E9", "#009E73", "#F0E442", '#ff9933', '#FFBAA3', '#9169EC', '#7B92BE'];

var soundFinish, soundFailure, soundCoin;
var questionList = [];
var isFirstGame = true;
var wordIndexList = [];
var qTotalNumber;

var words = '筆順練習';

var xStart = 0;
var yStart = 1024;
var wordSpacing = 40;

//是否將中文轉拼音
var enableTransToPinyin = true;
var speechRecognitionLang = 'zh-TW'; //語音辨識的語言
var speechRecognitionInterimResults = true; //是否有辨識結果就立即語音回報
var eventType = 'mousedown';  //mousedown or touchstart, auto detect


tableUpdateSelectedCol = function(index) {
	var td = Array.from(document.querySelectorAll('.preview td'));
	td.forEach(c=>c.classList.toggle('selected', c.cellIndex==index));
	//更新網址及 QRcode
	var gameURL = document.querySelector('.gameURL');
	if(gameURL && gameURL.innerHTML != '') {
		submitOnClickHandler();
	}
};
tableClickHandler = function(e) {
	var cell = e.target;
	if(cell.tagName.toLowerCase()!='td' && cell.parentElement.tagName.toLowerCase()=='td') {
		cell = cell.parentElement;
	}
	tableUpdateSelectedCol(cell.cellIndex);
};
clearPreview = function() {
	//移除預覽，隱藏輸出區
	try {
		Array.from(document.querySelector('.preview').children).forEach(c=>c.remove());
		document.querySelector('.resultBlock').style.display = 'none';
	}catch(e) {};
};
/**
 *
 */
fileURL_onBlurHandler = function(elm) {
  if(elm.value.replace(/\s/g, '') != '') {
    var id = '';
    if( (/^https:\/\//i.test(elm.value)) && (/spreadsheets/.test(elm.value)) ) {
      id = gdGetSpreadSheetID(elm.value);
    }
    if(id == '') {
       clearPreview(); //清除預覽結果及輸出區
	   setTimeout(function() {
	     showMessage('請輸入 Google 試算表的共用網址');
	   }, 100);
	   return;
    }
	getQuestioLinesFromSpreadSheet(elm.value, null, 'SELECT * LIMIT 2', true, function(data) {
		var errorMsg = '';
		if(typeof(data)!='undefined' && data!=null && typeof(data['status'])=='string' && data['status']=='ok') {
			var table = data['table'];
			if(typeof(table['rows'])!='undefined' && table['rows']!=null && table['rows'].length>0) {
				var tableElem = document.createElement('table');
				//加入欄名
				if(typeof(table['cols'])!='undefined' && table['cols']!=null) {
					var row = tableElem.insertRow();
					table['cols'].forEach(c=>{row.insertCell().innerHTML='<b>'+c['id']+'</b>'});
				}
				//加入預覽的資料
				table['rows'].forEach(r=>{
					var row = tableElem.insertRow();
					r['c'].forEach(c=>{row.insertCell().innerHTML=(c?c['v']:'&nbsp;')});
				});				
				if(typeof(table['cols'])!='undefined' && table['cols']!=null) {
					var row = tableElem.insertRow();
					table['cols'].forEach(c=>{row.insertCell().innerHTML='...以下省略'});
				}
				var preview = document.querySelector('.preview');
				preview.innerHTML = '<h3>請點選想要使用的欄位</h3>';
				preview.appendChild(tableElem);
				tableElem.onclick = tableClickHandler;
				tableUpdateSelectedCol(0);
			} else {
				errorMsg = '工作表沒有資料<br>請確認試算表中的內容後再試';
			}
		} else {
			errorMsg = '無法載入題庫<br>請確認試算表中的內容後再試';
		}
		if(errorMsg!='') {
            clearPreview(); //清除預覽結果及輸出區
			setTimeout(function() {
				showMessage(errorMsg, 'red', 10);
			},100);
			console.log('debug', data);
		}
	});
  }
};
/**
 * 按送出紐後要處理的程序
 */
submitOnClickHandler = function() {
  var fileURL = document.getElementById('fileURL');
  if(fileURL) {
    fileURL = fileURL.value.trim()
    var id = '';
    if( (/^https:\/\//i.test(fileURL)) && (/spreadsheets/.test(fileURL)) ) {
      id = gdGetSpreadSheetID(fileURL);
    }
	if(id == '') {
       showMessage('請先輸入 Google 試算表的共用網址後，再重試一次');
	   return;
    }
    var gid = fileURL.match(/[\#\&\?]gid=(\d+)/); //工作表的 id
    if( gid && gid.length > 1 ) {
	  gid = gid[1];
	} else {
	  gid = '';
	}
    var gameURL = getGameURL(id, gid);
	var colSelected = document.querySelector('.preview .selected');
	if(colSelected && colSelected.cellIndex > 0) {
		gameURL += (/\&$/.test(gameURL)?'':'&') + 'col=' + document.querySelector('.preview .selected').textContent + '&';
	}
    try {
      document.querySelector('.gameURL').innerHTML = gameURL;
    }catch(e) {console.log(e); };
    var gameQRcode = document.querySelector('.gameQRcode');
    if(gameQRcode) {
      var size = 200;
      var qrcodeURL = 'https://api.qrserver.com/v1/create-qr-code/?size='+size+'x'+size+'&data='+encodeURIComponent(gameURL);
	  gameQRcode.innerHTML = '<a href="' + gameURL +'" target="_blank"><img src="'+ qrcodeURL + '"/></a>';
	}
    try {
      document.querySelector('.resultBlock').style.display = 'block';
    }catch(e) {};
  }
};
/**
 * 取得遊戲啟動的網址
 * @param {String} 試算表ID
 * @return {String} 遊戲啟動的網址
 */
getGameURL = function(id, gid) {
  var gameURL = window.location.href;
  gameURL = new URL(gameURL);
  gameURL.hash = '';
  gameURL.search = '';
  if( typeof(id)=='string' && id.replace(/\s/g, '')!='' ) {
    gameURL = gameURL.toString()+'?id='+id+(gid==''?'':'&gid='+gid)+'&autostart=1&';
  }	
  return gameURL;
};
/**
 * 由外部的 .js 載入設檔值, 並執行 callback 的指令
 * @param {string} .js path
 * @param {function} callback 
 * @private
 */
loadSettingFromExternalScript = function(scriptSrc, callback)  {
	var nocacheVal = '?nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
	var scriptToAdd = document.createElement('script');		//建立一個 scriptElement
	
	scriptToAdd.setAttribute('type','text/javascript');
	scriptToAdd.setAttribute('charset','utf-8');
	//scriptToAdd.setAttribute('src', scriptSrc + nocacheVal);	//避免 cache 時用的
	scriptToAdd.setAttribute('src', scriptSrc);
	//載入成功時
	scriptToAdd.onload = scriptToAdd.onreadystatechange = function() {
		if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
			scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
			document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//將變數載入後移除 script
			callback();	//執行指定的函數
        } 
	};
	//無法載入時, 將設定用預設值
	scriptToAdd.onerror = function() {
		scriptToAdd.onerror = null;	//將事件移除
		document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//移除 script
		if( typeof callback == 'function' ) {
			callback();	//執行指定的函數
		}
	}
	
	//在 head 的最前頭加上前述的 scriptElement
	var docHead = document.getElementsByTagName("head")[0];
	docHead.insertBefore(scriptToAdd, docHead.firstChild);
};
/**
 * 將 RegExp 中的保留符號先加上反斜線
 */
escapeRegExpString = function (str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
/**
 * 將一行部件設定字串解析為多組部件字串陣列
 * 以stroke_parts.parts_set_separator (~)分解多個部件
 * 2021.12.23 add
 * @param {string} multi parts setting string
 * @return {string array}
 */
splitParts = function(partsString) {
	var list = partsString.split(parts_set_separator);
	if(typeof(list)!='undefined' && list!=null) {
		var i=0;
		do {
			if(list[i]=='') {
				list.splice(i, 1);
			} else {
				i++;
			}
		} while(i<list.length);
	}
	return list;
};
/**
 * 由多組部件設定字串中, 將指定的部件設定字串轉為陣列
 * 取得一組後, 先以分號分各部件, 再以逗號分各筆畫
 * 2021.12.23 modified
 * @param {String} multi parts group setting string
 * @param {Number} which parts group
 * @return {Array{Array}}
 */
parseParts = function(partsString, partSelectIndex) {
	var result = [];
	if(typeof(partSelectIndex)!='number' || partSelectIndex<0) {
		var partSelectIndex = 0;
	}	
	if( typeof(partsString)=='string' && partsString.replace(/\s/g, '') != '' ) {
		//先試著分解為多部件字串 2021.12.23 add
		var partsStringList = splitParts(partsString);
		//取得指定的一組部件字串來處理
		if( partSelectIndex < partsStringList.length ) {			
			partsString = partsStringList[partSelectIndex];
			//把非數字、減號、逗號、分號的，通通去掉(2021.12.25 add)
			partsString = partsString.replace(/[^0-9\-\,\;]/g, '');
			if( partsString != '' ) {
				var parts = partsString.split(';');
				for(var i=0; i<parts.length; i++) {
					var orderNumbers = parts[i].split(',');
					for(var j=0; j<orderNumbers.length; j++) {
						if( orderNumbers[j].length > 0 ) {
							if(typeof(result[i]) == 'undefined') {
								result[i] = [];
							}
							//用單一數字或是 x-y 指定範圍的
							var range = orderNumbers[j].match(/(\d+)-(\d+)/);
							if(range != null && range.length >=3) {
								var min = parseInt(range[1]);
								var max = parseInt(range[2]);
								if( min > max ) {
									var t = max;
									max = min;
									min = t;
								}
								for(var n=min; n<=max; n++) {
									result[i].push(n);
								}
							} else {
								var orderNumber = parseInt(orderNumbers[j]);
								if(!isNaN(orderNumber)) {
									result[i].push(orderNumber);
								}
							}
						}
					}
				}
			}
		}
	}
	return result;
};
/**
 * 將字串解析為 XML 物件
 * @param {String}
 * @return {Object} 
 */
convert_string_to_xml = function(strXML)  
{  
	var xmlDoc;
    if (window.ActiveXObject) {  
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
        xmlDoc.async="false";  
        xmlDoc.loadXML(strXML);  
    } else {  
        parser = new DOMParser();  
        xmlDoc = parser.parseFromString(strXML,"text/xml");  
    }  
    return xmlDoc;  
};
/** 
 * 將 XML 解析為筆順資料物件
 * 包括: strokeArray, trackArray, sound(String), parts(String)
 * @param {Object} XML
 * @return {Object} Stroke Object: 
 */
parseXML = function(xmlDoc) {
	var strokeArray = new Array();
	var trackArray = new Array();
	var strokeIndex = 0;
	var nodes = xmlDoc.getElementsByTagName("Stroke");
	for(var n=0; n<nodes.length; n++) {
		if(nodes[n].nodeType == 1) {	
			strokeArray[strokeIndex] = new Array();
			trackArray[strokeIndex] = new Array();
			var nodeStroke = nodes[n].childNodes;
			var outlineIndex = 0;
			var trackIndex = 0;
			for(var s=0; s<nodeStroke.length; s++) {
				if(nodeStroke[s].nodeType == 1) {
					if(nodeStroke[s].nodeName == 'Outline') {
						//strokeArray[strokeIndex][outlineIndex] = new Array();
						var targets = nodeStroke[s].childNodes;
						for(var t=0; t<targets.length; t++) {
							if(targets[t].nodeType == 1) {
								strokeArray[strokeIndex][outlineIndex]= targets[t];
								outlineIndex++;
							}
						}
						
					} else if(nodeStroke[s].nodeName == 'Track') {
						trackArray[strokeIndex][trackIndex] = new Array();
						var targets = nodeStroke[s].childNodes;
						for(var t=0; t<targets.length; t++) {
							if(targets[t].nodeType == 1) {
								trackArray[strokeIndex][trackIndex] = targets[t];
								trackIndex++;
							}
						}
					}
				}
			}
			strokeIndex++;
		}
	}
	//手動修正教育部筆順網有問題的字: 懂, 贐, 榻, 瞞 2024.05.27
	var unicode = xmlDoc.getElementsByTagName("Word")[0].getAttribute('unicode');
	if(typeof(unicode)=='string' && strokeArray && trackArray) {
		if(unicode == '懂' && strokeArray.length == 32 && trackArray.length == 32) {
			strokeArray.splice(16);
			trackArray.splice(16);
			console.log('刪除-懂-16畫後多出的16筆資料');
		} else if(unicode == '贐') {
			var temp = strokeArray[11].splice(0);
			strokeArray[11] = strokeArray[12].splice(0);
			strokeArray[12] = temp;
			var temp = trackArray[11].splice(0);
			trackArray[11] = trackArray[12].splice(0);
			trackArray[12] = temp;
			console.log('交換-贐-的12, 13 畫');
		} else if(unicode == '榻'&& strokeArray.length == 15 && trackArray.length == 15) {
			strokeArray.splice(14, 1);
			trackArray.splice(14, 1);
			console.log('刪除-榻-多出的第15筆資料');
		} else if(unicode == '瞞'&& strokeArray.length == 17 && trackArray.length == 17) {
			strokeArray.splice(16, 1);
			trackArray.splice(16, 1);
			console.log('刪除-瞞-多出的第17筆資料');
		} else if(unicode == '慰' && strokeArray.length == 18 && trackArray.length == 18) {
			strokeArray.splice(15);
			trackArray.splice(15);
			console.log('刪除-慰-15畫後多出的3筆資料');			
		} else if(unicode == '叫' && trackArray[4] && trackArray[4].length==3) {
			var temp = trackArray[4][1];
			trackArray[4][1] = trackArray[4][2];
			trackArray[4][2] = temp;
			console.log('交換-叫-5畫的步驟2, 3');
		} else if(unicode == '啊' && trackArray[8] && trackArray[8].length==5) {
			var temp = trackArray[8][3];
			trackArray[8][3] = trackArray[8][4];
			trackArray[8][4] = temp;
			console.log('交換-啊-9畫的步驟4, 5');
		}
	}	
	var data = new Object();
	data.strokeArray = strokeArray;
	data.trackArray = trackArray;
	data.sound = xmlDoc.getElementsByTagName("Word")[0].getAttribute('sound');
	
	data.parts = xmlDoc.getElementsByTagName("Word")[0].getAttribute('parts');

	return data;
}
/**
 * base64 encoding and decoding for UTF-8 
 * rf. https://stackoverflow.com/questions/30106476/using-javascripts-atob-to-decode-base64-doesnt-properly-decode-utf-8-strings
 */
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
/**
 * 依設定匯出某一筆順
 * 由 drawOneStroke, strokeToPath 發展而來的 
 * @param {Object} 筆順資料
 * @param {Object} 部件設定 number or number list
 * @param {Number} 將 x 範圍位移多少
 * @param {Number} 將 y 範圍位移多少
 * @retrun {Sting} SVG
 */
strokeToSVG = function (strokeArray, strokeNumberList, offsetX, offsetY) {
	var x,y,x1,y1,x2,y2;
  
	//沒有筆順資料就不進行接下來的程序
	if( typeof(strokeArray) == 'undefined' || strokeArray == null ) return;
	//
	if(typeof(offsetX) != 'number') {
		var offsetX = 0;
	}
	if(typeof(offsetY) != 'number') {
		var offsetY = 0;
	}
	if(typeof(strokeNumberList)=='number') {
		strokeNumberList = [strokeNumberList];
	}
	var svg = '';
	//全字筆畫的繪圖指令
	for(var i=0; i<strokeNumberList.length; i++) {
		var actions = strokeArray[strokeNumberList[i]-1];	//strokeNumberList 的內容是由 1 起算的，所以要減一
		//
		for(var j=0; j<actions.length; j++) {
			//取得一道指令
			var action = actions[j];
			//轉譯教育部筆順繪圖指令為 SVG 的		
			switch(action.nodeName) {
				case 'MoveTo' :
					x = Number(action.getAttribute('x'))+offsetX;
					y = Number(action.getAttribute('y'))+offsetY;
					svg += ' M' + x + ' ' + y;
					break;
				case 'LineTo' :
					x = Number(action.getAttribute('x'))+offsetX;
					y = Number(action.getAttribute('y'))+offsetY;
					svg += ' L' + x + ' ' + y;
					break;
				case 'QuadTo' :
					x1 = Number(action.getAttribute('x1'))+offsetX;
					y1 = Number(action.getAttribute('y1'))+offsetY;
					x2 = Number(action.getAttribute('x2'))+offsetX;
					y2 = Number(action.getAttribute('y2'))+offsetY;
					svg += ' Q' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2
					break;
				case 'CubicTo' :
					x1 = Number(action.getAttribute('x1'))+offsetX;
					y1 = Number(action.getAttribute('y1'))+offsetY;
					x2 = Number(action.getAttribute('x2'))+offsetX;
					y2 = Number(action.getAttribute('y2'))+offsetY;
					x3 = Number(action.getAttribute('x3'))+offsetX;
					y3 = Number(action.getAttribute('y3'))+offsetY;
					svg += ' C' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + x3 + ' ' + y3;
					break;
			}
		}
		svg += ' Z';
	}
	svg = svg.trim();
	return svg;
};
/**
 * 將指定的字，以部件為單位，整字輸出為 SVG 格式
 */
allPartsToSVG = function(word, data, partSetIndex, byPart, addStroeNumber, addAnimation) {
	//是否以部件為單位輸出
	if(typeof(byPart)!='boolean') {
		byPart = true;
	}
	//第幾組部件設定, 一個字最多可以有三組部件設定 (0~2)
	if(typeof(partSetIndex)!='number' || partSetIndex > 2) {
		partSetIndex = 0;
	}
	if(typeof(addStroeNumber)!='boolean') {
		addStroeNumber = false;
	}
	if(typeof(addAnimation)!='boolean') {
		addAnimation = true;
	}
	if(data || ( typeof(localStorage[word])!='undefined' && localStorage[word].match(/<stroke>/i) ) ) {
		//將筆順文字資料轉為 XML 物件
		if(!data) {
			var xmlDoc = localStorage[word];
			data = parseXML(convert_string_to_xml(xmlDoc));
		}
		//console.log(data);

		//將筆順資料中的部件設定字串轉為數字陣列
		//
		var  trackTotal = data.trackArray.length;	//字的筆畫數
		//如果原來沒有設定部件的，就設為一到最後一畫
		if(typeof(data.parts)!='string') {
			data.parts = "1-"+trackTotal;
		}
		//取得第一組部件設定(一個字最多可以有三組部件設定)
		var partsList = parseParts(data.parts, partSetIndex);	
		
		//檢查一下分析出來的部件設定是否有問題
		//計算陣列元素的總數
		var strokeTotalNumber = 0;
		var i=0;
		if(typeof(partsList)!='undefined' && partsList!=null && partsList.length>0) {
			do {
				var j=0;
				do {
					//筆畫序號必須大於0，不大於總筆畫數
					if(partsList[i][j]>0 && partsList[i][j]<=trackTotal) {
						strokeTotalNumber++;
						j++;
					} else {
						partsList[i].splice(j, 1);
					}
				} while(partsList[i].length>0 && j<partsList[i].length);
				//部件至少要有一個筆畫
				if(partsList[i].length>0) {
					i++;
				} else {
					partsList.splice(i, 1);
				}
			} while(partsList.length>0 && i<partsList.length);
		}
		//筆畫數如果超過範圍，就當沒有設定部件來處理
		if(strokeTotalNumber<1 || strokeTotalNumber>trackTotal) {
			var partsString = "1-"+trackTotal;
			partsList = parseParts(partsString);
		} else {
			if( strokeTotalNumber < trackTotal ) {
				//檢查哪些筆畫沒在部件設定的
				//找到後，全部合在一起，並新增部件
				var noneSetParts = {};
				for(var i=0; i<trackTotal; i++) {
					noneSetParts[(i+1)] = i+1;
				}
				for(var i in partsList)
					for(var j in partsList[i])
						delete noneSetParts[(partsList[i][j])];
				if(Object['values'](noneSetParts).length>0) {
					partsList.push(Object['values'](noneSetParts));
				}
			}
		}
		var svg = '<svg id="'+word+'" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">\n';
		for(var i=0; i<partsList.length; i++) {
			var color = colors[i];
			svg += '<g fill="'+color+'" fill-opacity="1" stroke="#000000" stroke-width="0" stroke-linejoin="round" stroke-opacity="0">';
			if(byPart) {
				//將部件的筆畫合併
				var d = strokeToSVG(data.strokeArray, partsList[i], 0, 0);
				svg += '<path d="' + d +'" />';
			} else {
				//所有筆畫是獨立的
				svg += '\n';
				for(var j=0; j<partsList[i].length; j++) {
					var strokeNumber = partsList[i][j];
					var d = strokeToSVG(data.strokeArray, strokeNumber, 0, 0);
					svg += '<path d="' + d + '" id="t' + strokeNumber + '" />\n';
				}
			}
			svg += '</g>\n';
		}
		//加筆順序號
		if(addStroeNumber) {
			svg += strokeNumberToSVG(word, data);
		}
		//加動畫
		if(addAnimation) {
			svg += '\n'+strokeTrackAni(word, data)+'\n';
		}
		
		svg += '</svg>\n';
		return svg;
	}
	return '';
};
/**
 * 加筆順序號
 */
strokeNumberToSVG = function(word, data, offsetX, offsetY) {
	if(typeof(offsetX)!='number') {
		offsetX = 0;
	}
	if(typeof(offsetY)!='number') {
		offsetY = 0;
	}
	var textNodes = '';
	var fontSize = 100;
	if(data || ( typeof(localStorage[word])!='undefined' && localStorage[word].match(/<stroke>/i) ) ) {
		//將筆順文字資料轉為 XML 物件
		if(!data) {
			var xmlDoc = localStorage[word];
			data = parseXML(convert_string_to_xml(xmlDoc));
		}
		//console.log(data);

		var  trackTotal = data.trackArray.length;	//字的筆畫數
		for(var i=0; i<trackTotal; i++) {
			var track = data.trackArray[i][0];
			var x = Number(track.getAttribute('x'))+offsetX;
			var y = Number(track.getAttribute('y'))+offsetY;
			textNodes += '<text class="number" style="font-size:'+fontSize+'px;font-style:bold;" x="'+x+'" y="'+y+'">'+(i+1)+'</text>\n';
		}
	}
	return textNodes;
};
/**
 * 加筆順動畫
 */
strokeTrackAni = function(word, data, offsetX, offsetY) {
	if(typeof(offsetX)!='number') {
		offsetX = 0;
	}
	if(typeof(offsetY)!='number') {
		offsetY = 0;
	}
	var path = '';
	if(data || ( typeof(localStorage[word])!='undefined' && localStorage[word].match(/<stroke>/i) ) ) {
		//將筆順文字資料轉為 XML 物件
		if(!data) {
			var xmlDoc = localStorage[word];
			data = parseXML(convert_string_to_xml(xmlDoc));
		}
		//console.log(data);
		var  trackTotal = data.trackArray.length;	//字的筆畫數
		for(var i=0; i<trackTotal; i++) {
			for(var j=0; j<data.trackArray[i].length; j++) {
				var track = data.trackArray[i][j];
				if(track.nodeName == 'MoveTo') {
					var x = Number(track.getAttribute('x'))+offsetX;
					var y = Number(track.getAttribute('y'))+offsetY;
					path += (j==0?' M':' L') + x + ' ' + y;
				}
			}
		}
	}
	path = path.trim();
	if(path != '') {
		var dur = trackTotal < 15 ? (trackTotal<10? '5s':'8s') : '10s';
		var ani = '<circle cx="0" cy="0" r="120" style="fill:#ff0000a0;">';
		ani += '<animateMotion begin="0s" dur="' + dur + '" path="' + path + '"  repeatCount="indefinite" />';
		ani += '</circle>';
	}
	return ani;
};
/**
 * 取得字的 Unicode
 */
String.prototype.getUnicode = function(){   
    return (this.length==1?(this.charCodeAt(0)):(((this.charCodeAt(0)-0xD800)*0x400) + (this.charCodeAt(1)-0xDC00) + 0x10000)).toString(16).toUpperCase();
};
/**
 * 由筆順網抓筆順資料
 * @param {String} 國字
 * @param {Function}
 */
async function fetchStrokeData(word, callback) {
	var data = '';
	var urlMOE = 'https://stroke-order.learningweb.moe.edu.tw/provideStrokeInfo.do?ucs=';
	//重組筆順資料擷取的網址，moe 以UTF-8(要大寫的字母)網址取筆順
	//var url = urlMOE + word.charCodeAt(0).toString(16).toUpperCase();
	var url = urlMOE + word.codePointAt(0).toString(16).toUpperCase();	//codePointAt 支援 UTF-32 的字
	try {
		var res = await fetch(url);
		data = await res.text();
	} catch(e) {
		data = '';
	}
	if(typeof(callback)=='function') {
		callback(data);
	}
	return data;
};
/**
 * 由筆順網抓筆順資料後,加入語音路徑及部件設定
 * @param {String} 國字
 * @param {Function}
 */
async function fetchStroke(word, callback) {
	if(typeof(word)!='string') {
		word = '雄';
	}
	var xmlDoc = null;
	var txt = await fetchStrokeData(word);
	if(typeof(txt) == 'string' && txt.length > 0 && txt.match(/<Stroke>/i)) {
		xmlDoc = parseXML(convert_string_to_xml(txt));
		//var re = new RegExp(word+'\\t([^\\t]+)\\t([^\\t]+)\\t([^\\n]*)\n*');
		var re = new RegExp(escapeRegExpString(word)+'\\t([^\\t]+)\\t([^\\t]+)\\t([^\\n]*)\n*');
		if((match=stroke_parts_data.match(re)) && match.length>3) {
			xmlDoc.sound = '/sound/'+(/\.m4a/.test(match[2])?match[2]:match[2]+'.mp3');
			xmlDoc.parts = match[3];
		}
	}
	//console.log(xmlDoc);
	if(typeof(callback)=='function') {
		callback(xmlDoc);
	} else {
		return xmlDoc;
	}
};
/**
 * 下載 HTML5 FUN 部件設定
 * @param {Function}
 */
get_stroke_parts_data = function(callback) {
	loadSettingFromExternalScript(js_stroke_parts_data, function() {
		//單字	Uicode	音檔id	部件
		//stroke_parts_data = stroke_parts_data.trim().replace(/\r/g, '\n').split(/\n+/);;
		if(typeof(stroke_parts_data)!='undefined' && stroke_parts_data!=null) {
		  stroke_parts_data = stroke_parts_data.trim().replace(/\r/g, '\n').replace(/\n+/g, '\n');
		}
		if(typeof(callback)=='function') {
			callback();
		}
	});
};
/**
 * 下載 HTML5 FUN 部件設定
 * @param {Function}
 */
load_stroke_component = function(callback) {
	var result = '';
	loadSettingFromExternalScript(js_stroke_component, function() {
		//單字	CNS部件圖片編號清單
		if(typeof(stroke_component)=='string') {
			stroke_component = stroke_component.trim().replace(/\r/g, '\n').replace(/\n+/g, '\n');
		}
		if(typeof(callback)=='function') {
			callback();
		}
	});
};
/**
 * 新增 SVG 的元件
 * @param {String} 要新增的標籤名稱
 * @param {Object} 元件的屬性清單 JSON 格式
 * @return {Object}
 */
createSvgElm = function(tag, attributes) {
	var elm = document.createElementNS("http://www.w3.org/2000/svg", tag);
	if(attributes) {
		var names = Object.keys(attributes);
		for(var i=0; i<names.length; i++) {
			var name = names[i];
			elm.setAttribute(name, attributes[name]);
		}
	}
	return elm;
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
 * 檢測 other 是否在 box 中, 利用 left, right, top, bottom, x, y 來檢查
 * 參考 Closure Library: goog.math.Box.contains
 * @param {Object} 矩形範圍
 * @param {Object} 矩形範圍或是一個點的座標
 * @return {Booolean} 是否在範圍內
 */
boxContains = function(box, other) {
  if (!box || !other) {
    return false;
  }
  // other is a box
  if (other.left && other.right && other.top && other.bottom) {
    return other.left >= box.left && other.right <= box.right &&
        other.top >= box.top && other.bottom <= box.bottom;
  }

  // other is a Coordinate.
  return other.x >= box.left && other.x <= box.right &&
         other.y >= box.top && other.y <= box.bottom;
};
/**
 * 幫矩形範圍擴大，加入容錯後回傳
 * @param {Object}
 * @return {Object}
 */
addTolerance = function(box) {
	var tolerance = 0.1;
	box.left -= box.width * tolerance;
	box.right += box.width * tolerance;
	box.top -= box.height * tolerance;
	box.bottom += box.height * tolerance;
	return box;
};
/**
 * 檢測兩個物件是否疊在一起
 * @param {Object}
 * @param {Object}
 * @return {Boolean}
 */
hitTest = function(obj1, obj2) {
	var rect1 =  obj1.getClientRects()[0].toJSON();
	var rect2 = obj2.getClientRects()[0].toJSON();
	return boxContains(addTolerance(rect1), rect2);
};
/**
 * 讓按鈕指定時間內不能按
 * @param {Object} 哪一個按鈕
 * @param {Number} 1/1000 秒
 */
var btnSleep = function(btn, t) {
	btn.disabled = true;
	setTimeout( function(){
		btn.disabled = false;
	},t);
};
/**
 * 建立音效物件
 * @param {String} 音效路徑或資料
 * @param {Boolean} 是否使用 baseElement
 * @return {Object} 
 */
audioInit = function(src, isSimple) {
  if(isSimple) {
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
/**
 * 遊戲場景及變數的初始
 */
sceneInit = function() {
	questionList = [];
	
	var gameWrapper = document.querySelector('#gameWrapper');
	var practice = document.querySelector('#practice');
	if(!practice) {
		var practice = document.createElement('div');
		practice.id = 'practice';
		//practice.setAttribute('style', 'position:absolute;left:50%;top:50%;width:100%;height:100%;padding:0;translate: -50% -50%');
		document.body.appendChild(practice);
	}
	var svg = document.querySelector('#practiceSVG');
	if(!svg) {
	  //var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
	  var svg = createSvgElm('svg', {viewBox:"0 0 2048 2048"});
	  svg.setAttribute('id', 'practiceSVG');
	  svg.setAttribute('width', '100%');
	  svg.setAttribute('height', '100%');
	  //svg.style.border = '1px solid red';
	  practice.appendChild(svg);
    } else {
      //remove all elements of SVG
	  try { Array.from(svg.children).forEach(e=>e.remove()); }catch(e){};
    }
  	try { svg.removeEventListener("mousedown", penDown); } catch(e) {};
	try { svg.removeEventListener("mousemove", penMove); } catch(e) {};
	try { svg.removeEventListener("mouseup", penUp); } catch(e) {};
	try { svg.removeEventListener("mouseleave", penUp); } catch(e) {};
	//try { svg.removeEventListener("mouseout", penUp); } catch(e) {};
	
	try { svg.removeEventListener("touchstart", penDown); } catch(e) {};
	try { svg.removeEventListener("touchmove", penMove); } catch(e) {};
	try { svg.removeEventListener("touchend", penUp); } catch(e) {};
	try { svg.removeEventListener("touchleave", penUp); } catch(e) {};
	try { svg.removeEventListener("touchcancel", penUp); } catch(e) {};

	var pos1 = null;
	var penList = [];
	var getPenIndex = function(e) {
		var index = -1;
		if(typeof(e.changedTouches)!='undefined' && e.changedTouches!=null && e.changedTouches.length>0) {		
			var id = e.changedTouches[0].identifier;
			for(var i=0; i<penList.length; i++) {
				if(penList[i].id!=null && penList[i].id == id) {
					index = i;
				}
			}
		} else {
		  index = 0;
		}
		return index;
	};
	var addToPenList = function(e) {
		var pen = {};
		if(typeof(e.changedTouches)!='undefined' && e.changedTouches!=null && e.changedTouches.length>0) {
			pen['id'] = e.changedTouches[0].identifier;
		}
		pen['target'] = e.target;
		pen['position'] = getMousePosition(e);;
		penList.push(pen);		
	};
	/**
    * 將按下的位置轉換為 SVG 內的座標
     * @param {Object} Event
     * @return {Object} position
     */
    var getMousePosition = function(evt) {
      var svgElement = document.getElementById("practiceSVG");
      var CTM = svgElement.getScreenCTM();
      if (evt.touches) { 
        //evt = evt.touches[0];
		var id = evt.changedTouches[0].identifier;
		var found = -1;
    	for(i=0; i<evt.touches.length; i++) {		  
          if(evt.touches[i].identifier == id) {
            found = i;
			break;
		  }
    	}
        if(found < 0) found = 0;
        evt = evt.touches[found];
      }
      return {
        x: (evt.clientX - CTM.e) / CTM.a,
        y: (evt.clientY - CTM.f) / CTM.d
      };
    };
	penDown = function(e) {		
		soundInit();
		
		//console.log(e);		
		var target = e.target;

		//if(target.tagName != 'path' && target.tagName != 'rect') {
		//if(target.tagName != 'path' && (target.tagName=='rect' && target.getAttribute('class') != 'bgRect')) {
		//if(target.tagName != 'path' && target.tagName!='circle' ) {
		//if(target.tagName != 'path' && target.tagName!='ellipse' ) {
		if( target.tagName != 'path' && !target.classList.contains('pathBg') && !target.classList.contains('wordNG') ) {
			return;
		}
		e.preventDefault();
		e.stopPropagation();
		
		//pos1 = getMousePosition(e);
		//pos1.target = target;
		
		addToPenList(e);

		//document.querySelector('.debug').textContent += JSON.stringify(penList)+ ' ';
		
		
		//加一個半透明的矩形，比較判斷是否已按對地方
		var b = target.parentElement.getBBox();
		var rect = createSvgElm('rect', {id:'tempRect',width:b.width, height:b.height, x:b.x, y:b.y, style:'fill:#ffffff80;stroke:#0000ff;stroke-width:4;stroke-opacity:0.35'});
		target.parentElement.appendChild(rect);
		
		if(target.parentElement.tagName == 'g') {
			moveToTop(target.parentElement);
		}

		//if(target.parentElement.parentElement.tagName == 'g') {
		//	moveToTop(target.parentElement.parentElement);
		//}
		
	};
	penMove = function(e) {
		e.preventDefault();
		e.stopPropagation();

		var target = e.target;

		var penIndex = getPenIndex(e);
		var pen = penList[penIndex];
	
		//if(typeof(pos1)=='undefined' || pos1==null ) {
		if(typeof(pen)=='undefined' || pen==null ) {
			return;
		}		
		//e.preventDefault();
		//e.stopPropagation();
		var pos2 = getMousePosition(e);
		//移動整個部件，所以取 path 的上一層 <g>
		//target = target.parentElement;
		//target = pos1.target.parentElement;
		target = pen.target.parentElement;
		var translate = target.getAttribute("transform");
		if( translate && ( match = translate.match(/translate\s*\(\s*([^\)]+)\s*\)/i) ) ) {
			var t = match[1].trim().split(/\s+/);
			if(t.length == 2) {
				translate = {x:Number(t[0]), y:Number(t[1])};
			} else {
				translate = {x:0, y:0};
			}
		} else {
			translate = {x:0, y:0};
		}
		//var x = translate.x + pos2.x - pos1.x;
		//var y = translate.y + pos2.y - pos1.y;
		var x = translate.x + pos2.x - pen.position.x;
		var y = translate.y + pos2.y - pen.position.y;
		
		target.setAttribute("transform", 'translate('+ x +' '+ y +')');
		
		//pos1.x = pos2.x;
		//pos1.y = pos2.y;
		penList[penIndex].position = pos2;
	};
	penUp = function(e) {
		//去掉半透明的方框
		var rect = document.querySelector('#tempRect');
		if(rect) rect.remove();
		
		//pos1 = null;
		var penIndex = getPenIndex(e);
		if(penIndex >=0) {
			penList.splice(penIndex, 1);
		}
		//console.log('penUp');
	};
	svg.addEventListener("mousedown", penDown);
	svg.addEventListener("mousemove", penMove);
	svg.addEventListener("mouseup", penUp);
	svg.addEventListener("mouseleave", penUp);
	//svg.addEventListener("mouseout", penUp);
	
	svg.addEventListener("touchstart", penDown);
	svg.addEventListener("touchmove", penMove);
	svg.addEventListener("touchend", penUp);
	//svg.addEventListener("touchleave", penUp);
	//svg.addEventListener("touchcancel", penUp);
	
    var nextBtn = document.querySelector('#nextBtn')
	if(typeof(nextBtn)=='undefined' || nextBtn==null) {
	  var nextBtn = document.createElement('button');
  	  nextBtn.setAttribute('id', 'nextBtn');
	  nextBtn.setAttribute('class', 'circleBtn nextBtn hidden');
	  nextBtn.setAttribute('onclick', 'btnSleep(this, 500);newGame();');
	  nextBtn.innerHTML = '<label>下一題</label>';
	  gameWrapper.appendChild(nextBtn);
	
	  var checkBtn = document.createElement('button');
	  checkBtn.setAttribute('class', 'circleBtn checkBtn hidden');
	  checkBtn.setAttribute('onclick', 'btnSleep(this, 500);checkAnswer();');
	  checkBtn.innerHTML = '<label>送出<br>答案</label>';
	  gameWrapper.appendChild(checkBtn);
	  
	  //for debug
      if(gup('debug') == '1') {
        var btnBlock = document.createElement('div');
        //btnBlock.setAttribute('style', 'position:absolute;left:30px;top:30px;');
        btnBlock.setAttribute('style', 'position:absolute;right:0;bottom:0.25em;transform:translate(-100% , 0%);');
        gameWrapper.appendChild(btnBlock);

        var showAnsBtn = document.createElement('button');
        showAnsBtn.setAttribute('style', 'margin:0.5em');
        showAnsBtn.setAttribute('onclick', 'showAnswer();');
        showAnsBtn.innerHTML = '<label>Answer</label>';
        btnBlock.appendChild(showAnsBtn);

        var randomBtn = document.createElement('button');
        randomBtn.setAttribute('style', 'margin:0.5em');
        randomBtn.setAttribute('onclick', 'randomPosition();');
        randomBtn.innerHTML = '<label>Random</label>';
        btnBlock.appendChild(randomBtn);
      }
    }
		
	var message = gameWrapper.querySelector('.message');
	if(typeof(message)=='undefined' || message == null) {
	  message = document.createElement('div');
	  message.setAttribute('class', 'message');
	  gameWrapper.appendChild(message);
	}
	message.setAttribute('style', 'opacity:0;');
};
/**
 * 以位置的編號計算在 SVG 中的位置
 * @param {Number} 要放在第幾個位置
 * @return {Object} 在 SVG 中的座標
 */
getPositionByIndex = function(index) {
  var x=xStart, y=yStart;
  var svg = document.querySelector('#practiceSVG');
  if(svg) {
    var viewBox = svg.viewBox.baseVal;
    var x0 = Math.floor( ( viewBox.width - 2048 * words.length - wordSpacing * (words.length-1) ) /2 );
	x = x0 + (2048+wordSpacing) * index;
  }
  return {x:x, y:y};
};
/**
 * 將所有部件放在正確答案的位置中
 */
var showAnswer = function() {
	var svg = document.querySelector('#practiceSVG');
	if(svg) {
		for(var i=0; i<svg.children.length; i++) {
			var g = svg.children[i];
			var id = g.getAttribute('id');
			if(g.tagName == 'g' && typeof(id)=='string' && (match=id.match(/([^-]+)-(\d+)-(\d+)/)) ) {
				var index = Number(match[2]);
				var pos = getPositionByIndex(index);

				g.setAttribute('transform', 'translate(' + pos.x + ' ' + pos.y + ')');
				//g.setAttribute('fill', colors[Number(match[3])]);
			}
		}
	}
};
/**
 * 
 */
function insertBackground() {
	var svg = document.querySelector('#practiceSVG');
	if(svg) {
		for(var i=0; i<words.length; i++) {
			var pos = getPositionByIndex(i);
			var transform = 'translate(' + pos.x + ' ' + pos.y + ')';
			var g = createSvgElm('g', {transform:transform, 'stroke-width':3});
			var bg = '';
			bg += '<rect width="2048" height="2048" fill="none" stroke="green" rx="150" ry="150" />\n';
			bg += '<line x1="0" x2="2048" y1="1024" y2="1024" stroke="red" stroke-dasharray="50" />\n';
			bg += '<line y1="0" y2="2048" x1="1024" x2="1024" stroke="red" stroke-dasharray="50" />\n';
			g.innerHTML = bg;
			svg.appendChild(g);
		}
	}
};

function addPathBackground(path){
  var bb = path.getBBox();
  var [x, y, width, height] = [bb.x, bb.y, bb.width, bb.height];
  var getScale = function(s){return s<500?1.5:(s<2048*0.66?1:0.75);};
  var sx = getScale(width);
  var sy = getScale(height);
  var rx = sx * width/2;
  var ry = sy * height/2;
  var cx = x + width/2;
  var cy = y + height/2;
  var style = 'fill:#ffffff;fill-opacity:0.001; stroke:none;stroke-opacity:0;';
  if(gup('debug') == '1') {
    style = 'fill:#ffff00;fill-opacity:0.1; stroke:none;stroke-opacity:0;';
  }
  var bg = createSvgElm('ellipse', {'class':'pathBg', cx:cx, cy:cy, rx:rx, ry:ry, style:style});
  var p = path.parentElement;
  p.insertBefore(bg, p.children[0]);
};

/**
 * 
 */
async function inertWords(callback) {
	if(wordIndexList.length > 0) {
		var r = Math.floor(Math.random()*wordIndexList.length);
		var currentIndex = wordIndexList[r];
		wordIndexList.splice(r, 1);
		var word = words[currentIndex];
		var xmlDoc = await fetchStroke(word);
		//第1組部件設定, 用筆畫模式, 無筆順序號, 無動畫
		var strXML = allPartsToSVG(word, xmlDoc, 0, false, false, false); 
		var parser = new DOMParser();  
        var svgDoc = parser.parseFromString(strXML, "text/html");  
		
		//strXML = strXML.replace(/<svg[^>]+>|<\/svg>/g, '');
		
		var component = get_stroke_component(word);
		
		var svg = document.querySelector('#practiceSVG');
		var viewBox = svg.viewBox.baseVal;
		var x = xStart + 2048 * currentIndex ;
		var y = yStart;
		var transform = 'translate(' + x + ' ' + y + ')';
		var g = svgDoc.querySelectorAll('g');
		
		if(g.length==0) {
			//抓不到筆順資料者，改以 text 元件來顯示全字
			var fontSize = Math.floor(2048*0.82);
			var gNG = createSvgElm('g');
			var tNG = createSvgElm('text',{'font-size':fontSize, 'class':'wordNG', style:'pointer-events:all;', x:1024, y:1024, "dominant-baseline":"central", "text-anchor": "middle"});
			tNG.innerHTML = word;
			gNG.appendChild(tNG);
			g = [gNG];
		}		
		
		for(var i=0; i<g.length; i++) {
			g[i].setAttribute('id', word+'-'+currentIndex+'-'+i);
			g[i].setAttribute('transform', transform);
			svg.appendChild(g[i]);
			
			//加一個半透明的圓形，比較判斷是否已按對地方
			/*
			var b = g[i].getBBox();
			//var rect = createSvgElm('rect', {class:'bgRect',width:b.width, height:b.height, x:b.x, y:b.y, style:'fill:#ffffff;fill-opacity:0.01;stroke:none;stroke-opacity:0'});
			var size = Math.max(b.width, b.height);
			var r = size*0.5*(size<500?1.5:(size>1024?0.5:0.6));
			var cx = b.x + b.width/2;
			var cy = b.y + b.height/2;
			var circle = createSvgElm('circle', {class:'bgRect', r:r, cx:cx, cy:cy, style:'fill:#ffffff;fill-opacity:0.001; stroke:none;stroke-opacity:0;'});
			g[i].insertBefore(circle, g[i].children[0]);
			*/
			Array.from(g[i].querySelectorAll('path')).forEach(p=>addPathBackground(p));
			
			//記錄CNS部件代號
			if(component && component[i]) {
				g[i].setAttribute('cns', component[i]);
			}
						
			var box = g[i].getBBox();
			if( !window.randomPos || window.randomPos.length < 1 ) {
				window.randomPos = Array.from({length: get_partsTotal(words)}, (x, i) => i);				
			}
			var width = viewBox.width / get_partsTotal(words);
			var r = Math.floor(Math.random()*window.randomPos.length);
			var rPos = window.randomPos[r];
			var rndX = rPos * width- box.x;
			//檢查 x 是否太左或太右並修正
			if(rndX-box.width/2 < 0) {
				rndX = box.width/2 - box.x;
			} else {
				rndX -= box.width/2;
			}
			if(rndX+box.width+box.x*2 > viewBox.width) {
				rndX = viewBox.width - box.width - box.x - 50;
			}
			var rndY = y - 1024 + (1-Math.floor(Math.random()*3))*2048/5 - box.y - box.height/2;
			if(rndY + box.y + box.height > y ) {
				rndY = y - 50 - box.height - box.y;
			}
			window.randomPos.splice(r, 1);

			g[i].setAttribute('transform', 'translate(' + rndX + ' ' + rndY + ')');
			
			//g[i].setAttribute('fill', colors[Math.floor(Math.random()*colors.length)]);
			g[i].setAttribute('fill', colors[rPos%colors.length]);						
		}
		
		//g.setAttribute('style', 'outline: 3px solid red;');
		
		inertWords(callback);
	} else {
		if(typeof(callback)=='function') {
			callback();
		}
	}
};
/**
 * 
 */
randomPosition = function() {
	var svg = document.querySelector('#practiceSVG');
	if(svg) {
		var viewBox = svg.viewBox.baseVal;
		var width = viewBox.width / get_partsTotal(words);
		var randomPos = Array.from({length: get_partsTotal(words)}, (x, i) => i);
		var group = svg.querySelectorAll('g');
		for(var i=0; i<group.length; i++) {
			var g = group[i];
			if( /[^-]+-\d+-\d+/.test(g.getAttribute('id')) ) {							
				var box = g.getBBox();				
				var r = Math.floor(Math.random()*randomPos.length);
				var rPos = randomPos[r];
				var rndX = rPos * width - box.x;
				//檢查 x 是否太左或太右並修正
				if(rndX-box.width/2 < 0) {
					rndX = box.width/2 - box.x;
				} else {
					rndX -= box.width/2;
				}
				if(rndX+box.width+box.x*2 > viewBox.width) {
					rndX = viewBox.width - box.width - box.x - 50;
				}
				//y
				var rndY = yStart - 1024 + (1-Math.floor(Math.random()*3))*2048/5 - box.y - box.height/2;
				if(rndY + box.y + box.height > yStart ) {
					rndY = yStart - 50 - box.height - box.y;
				}				
				randomPos.splice(r, 1);

				g.setAttribute('transform', 'translate(' + rndX + ' ' + rndY + ')');
				//g.setAttribute('fill', colors[Math.floor(Math.random()*colors.length)]);
				g.setAttribute('fill', colors[rPos%colors.length]);
			}
		}
		
		bringSmallToTop(); //將比較小的放頂層
	}
};
/**
 * 
 */  
get_parts = function(word) {
	var parts = '';
	//var re = new RegExp(word+'\\t([^\\t]+)\\t([^\\t]+)\\t([^\\n]*)\n*');
	var re = new RegExp(escapeRegExpString(word)+'\\t([^\\t]+)\\t([^\\t]+)\\t([^\\n]*)\n*');
	
	if(( match = stroke_parts_data.match(re) ) && match.length>3) {
		//xmlDoc.sound = '/sound/'+(/\.m4a/.test(match[2])?match[2]:match[2]+'.mp3');
		parts = match[3];
	}
	return parts;
};
/**
 * 
 */
get_partsTotal = function(words) {
	var total = 0;
	for(var i=0; i<words.length; i++) {
		var p = get_parts(words[i]);
		if(p!=='') {
			total += parseParts(p, 0).length;
		} else {
			total++;
		}
	}
	return total;
};
/**
 * 
 */
get_stroke_component = function(word) {	
	var component = [];
	if(typeof(stroke_component)=='undefined' || stroke_component == null) {
		load_stroke_component();
	} else {
		//var re = new RegExp(word+'\\t([^\\n]*)\n*');
		var re = new RegExp(escapeRegExpString(word)+'\\t([^\\n]*)\n*');		
		if((match=stroke_component.match(re)) && match.length>=2) {
			component = match[1].trim().split(';')[0].split(',');
		} else {
			//找不到部件者，就用全字
			component.push(word);
		}
	}
	return component;
};
/**
 * 
 */
checkAnswer = function(answerTxt) {
	var isFinish = true;	
	var partsTotal = 0;
	var hitTotal = 0;
	var checkList = [];
    soundInit();
	if( typeof(answerTxt) == 'string' ) {
		//比對語音辨識傳來的字串
		var question = ( typeof(words)=='string'? words : words.join('') ).trim();
		answerTxt = answerTxt.trim();
		if( answerTxt.length >= question.length ) {
			//var re = new RegExp(question);
			var re = new RegExp(escapeRegExpString(question));			
			if( !re.test(answerTxt) ) {
				if(typeof(enableTransToPinyin) == 'boolean' && enableTransToPinyin && typeof(toPinyin)=='function' ) {
					question = toPinyin(question);
					answerTxt = toPinyin( answerTxt );
					//console.log(question, answerTxt);
					//alert(question + '\n'+ answerTxt);
					//var re = new RegExp(question);
					var re = new RegExp(escapeRegExpString(question));					
					if( !re.test( answerTxt )) {
						isFinish = false;
					}
				} else {
					isFinish = false;
				}
			}
		} else {
			return false;	//字數不足時，不進行比對
		}
	} else {
		//檢查方格內的部件是否正確
		//準備標準答案
		for(var i=0; i<words.length; i++) {
			checkList[i] = {};
			checkList[i]['q'] = get_stroke_component(words[i]);
			checkList[i]['a'] = [];
			partsTotal += checkList[i]['q'].length;
		}
		//記錄方格中有哪些部件
		var svg = document.querySelector('#practiceSVG');
		if(svg) {
			for(var i=0; i<svg.children.length; i++) {
				var g = svg.children[i];
				var id = g.getAttribute('id');
				if(g.tagName == 'g' && typeof(id)=='string' && (match=id.match(/([^-]+)-(\d+)-(\d+)/)) ) {
					var index = match[2];
					var cns = g.getAttribute('cns');
					for(var j=0; j<checkList.length; j++) {
						if( hitTest(svg.children[j], g) ) {
							checkList[j]['a'].push(g);
							hitTotal++;
							break;
						}
					}
				}
			}
		}
		//console.log(checkList);
		//檢查部件是否為答案
		for(var i=0; i<checkList.length; i++) {
			var target = checkList[i];
			//先檢查部件個數是否夠
			if(target['a'].length != target['q'].length) {
				isFinish = false;
				break;
			}
			//檢查 CNS 部件代碼是否對
			var q = target['q'].slice(0);
			for(var j=0; j<target['a'].length; j++) {
				var cns = target['a'][j].getAttribute('cns');
				for(var k=0; k<q.length; k++) {
					if(cns == q[k] ) {
						q.splice(k, 1);
						break;
					}
				}
			}
			if(q.length > 0) {
				isFinish = false;
				break;
			}
		}
	}
	//最後回饋
	if(isFinish) {
		showAnswer();
		var score = 100;
		var color = 'green';
		var delay = 1.5;
		if(questionList.length==0) {
			txt = '已經全部挑戰完～加5000分';
			score = 5000;
			color = '#56B4E9';
			delay = 3;
		} else {
			txt = '恭喜過關!!';
		}
		showMessage('<span style="color:#99cc33;font-size:1.25em;">太棒了</span><br>'+txt, color, delay, function() {
			//顯示下一題的按鈕
			var nextBtn = document.querySelector('#nextBtn');
			if(nextBtn) {
				nextBtn.classList.toggle('hidden', false);
			}
			updateDicLink(words);
		});
		if(typeof(soundFinish)!='undefined' && soundFinish!=null) {
			audioPlay(soundFinish);
		}
		//隱藏送出答案的按鈕
		var checkBtn = document.querySelector('.checkBtn');
		if(checkBtn) {
			checkBtn.classList.toggle('hidden', true);
		}
		updateScore(score);
	} else {
		if(hitTotal < partsTotal && typeof(answerTxt)!='string') {
			txt = '請檢查部件是否都完整地在方格內<br>有 '+(partsTotal-hitTotal)+' 個需要調整位置';
		} else {
			txt = '哦~ 哦~~ 再試試';
		}
		showMessage('<span style="color:yellow;font-size:1.25em;">加油</span><br>'+txt, 'red', 3);
		if(typeof(soundFailure)!='undefined' && soundFailure!=null) {
			audioPlay(soundFailure);
		}
	}
	return isFinish;
};
/**
 * 
 */
decodeHTML = function(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};
/**
 * 
 */
showMessage = function(txt, bgColor, delay, callback) {
	if(!delay) {
		delay = 2;
	}
	if(typeof(bgColor)=='undefined'||bgColor==null) {
		bgColor = '#44AF49';
	}
	var elm = document.querySelector('.message');
	if( getComputedStyle(elm).getPropertyValue('visibility')!='hidden' ) {
		elm.innerHTML = txt;
		elm.style.display = 'block';
		elm.style['background-color'] = bgColor;
		elm.style.opacity = 0.75;
		elm.style.transition = 'opacity '+delay+'s ease-out';
		setTimeout(function() {
			elm.style.opacity = 0;
			//elm.style.display = 'none';		
			if(typeof(callback)=='function') {
				callback();
			}
		}, Math.floor(delay*1000));
	} else {
	  alert(decodeHTML(txt).replace(/<br>/g, '\n'));
	}
};
/**
 * 每次取出一題題目
 * @return {String} 語詞的字串 
 */
partLevel = 1;
nextLevel = 1;
getOneQuestion = function() {
  var qLine, r;
  if( typeof(questionLines)!='undefined' && questionLines!=null && questionLines.length > 1 ) {
    if( typeof(questionList)=='undefined' || questionList==null || questionList.length==0 ) {
	  //將題庫依總部件數排序
      var lines=questionLines.split(/\n+/).filter(s=>s.replace(/\s/g, '')!='');
      questionList = Array.from({length:lines.length}, (a, i)=>{return {q:lines[i], p:get_partsTotal(lines[i])}});
      questionList.sort((a, b)=>(a.p-b.p));      
	  //questionList=[ {q:':=)', p:3}, {q:'^_^', p:3} ];	  
      qTotalNumber = questionList.length;
	  partLevel = questionList[0].p;
	  nextLevel = partLevel+1;
    }
	var t = questionList.length;
	var max = questionList[t-1].p;
	var qList;
	var i = 0;
	var totalMin = 3;
	while(partLevel <= max && questionList.length>0) {
		qList = questionList.filter(a=>a.p>=partLevel && a.p<=nextLevel);
		if(qList.length == 0) {
			partLevel++;
			nextLevel++;
		} else if(questionList.length > totalMin && qList.length <= totalMin) {
			nextLevel++;
		} else {
			break;
		}
	}
	if(partLevel != questionList[0].p) {
		showMessage('恭喜升級<br>加發點數 1000', 'blue', 2);
		updateScore(1000);
		partLevel = questionList[0].p;
	}
	qList = qList.filter(a=>a.p==partLevel);
    r = Math.floor(Math.random()*qList.length);
    qLine = Array.from(qList[r].q.trim());	
    questionList = questionList.filter(a=>a.q!=qList[r].q);
	if(typeof(updateQlabel)=='function') {
      updateQlabel(qTotalNumber - questionList.length); //更新右上角題數
	}
  }
  return qLine;
};
getOneQuestionOld = function() {
  var qLine, r;
  if( typeof(questionLines)!='undefined' && questionLines!=null && questionLines.length > 1 ) {
    if( typeof(questionList)=='undefined' || questionList==null || questionList.length==0 ) {
      questionList = questionLines.trim().replace(/\r/g, '\n').split(/\n+/);
	  //questionList=[':=)','^_^'];	  
      qTotalNumber = questionList.length;
    }
    r = Math.floor(Math.random()*questionList.length);
    qLine = Array.from(questionList[r].trim());
    questionList.splice(r, 1);
	if(typeof(updateQlabel)=='function') {
      updateQlabel(qTotalNumber - questionList.length); //更新右上角題數
	}
  }
  return qLine;
};
/**
 * 
 */
bringSmallToTop = function() {
	var svg = document.querySelector('#practiceSVG');
	var children = Array.from(svg.children);
	children.splice(0, words.length); //去掉方框的
	//比較面積大小，由大排到小
	var compareSize = function(a, b) {
		var boxA = a.getBBox(); 
		var boxB = b.getBBox(); 
		return boxB.width * boxB.height - boxA.width * boxA.height;
	}
	children.sort(compareSize);	////比較面積大小，由大排到小
	children.forEach(e=>e.remove()); //先移掉部件
	children.forEach(e=>svg.appendChild(e)); //重新加入, 小後加入，會在上層
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
 * 以字數在來計算比例，設定 SVG 的可視範圍
 * 會使用到全域變數 words, wordSpacing
 */
updateSVGviewBox = function() {
  var svgContainer = document.querySelector('#practice');
  var svg = document.querySelector('#practiceSVG');
  if(svg && svgContainer && typeof(words)!='undefined' && words!=null && typeof(wordSpacing)=='number') {
    //檢查一下橫向時, 以橫的為基準取大小，直的會不會太大
    //如果太大，將橫的再放大
    var size = svgContainer.getClientRects()[0];
    var w = size.width/words.length;
    var h = size.height/2.25;
    var scale = 1;
    if(w > h) scale = w/h;

    var width = Math.floor(2048 * words.length * scale + wordSpacing*(words.length+1));
    var height = 2048;
    svg.setAttribute('viewBox', '0 0 ' + width + ' '+ height);
    //svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute("width", '100%');
    svg.setAttribute("height", '100%');
  }
};
/**
 * 遊戲場景初始並填入新題目
 */
newGame = function() {
  var svg = document.querySelector('#practiceSVG');

  //場景的一些物件初始
  //remove all elements of SVG
  Array.from(svg.children).forEach(e=>e.remove());
  //隱藏下一題的按鈕
  var nextBtn = document.querySelector('#nextBtn');
  if(nextBtn) {
    nextBtn.classList.toggle('hidden', true);
  }
  //清掉字典的連結
  updateDicLink();

  //get question
  words = getOneQuestion();
  if(typeof(words)!='undefined' && words!=null && words.length > 0) {
    //如果題目是字串, 轉為陣列, 一個字一個元素
    if(typeof(words)=='string') {
      words = Array.from(words.trim());
    }

    updateSVGviewBox();
    
    //字的方框(答案區)
    insertBackground(); 
    //開始製作並以亂數填入字的部件
	//先產生字的可用序號
	wordIndexList = Array.from({ length: words.length }, (value, index) => index);
    inertWords( function() {
      //將小的部件放最上層
      bringSmallToTop();
      //顯示送出答案的按鈕
      var checkBtn = document.querySelector('.checkBtn');
      if(checkBtn) {
	    checkBtn.classList.toggle('hidden', false);
      }
      //顯示開始闖關的訊息
      if(isFirstGame) {
	    showMessage('<span style="color:#ffff00;font-size:1.25em;">開始闖關</span><br>請將部件拖曳到方框中拼成字<br>語詞拼好了，就按 [送出答案] 鈕', 'orange', 3);
		isFirstGame = false;
      }
    });	
  }
};


/* ------語音辨識------- */
/**
 * 
 */
stopSpeechRecognition = function() {
	//將 MIC 按鈕設為禁用的顏色
	var micButton = document.getElementById('micButton');
	if( micButton ) {
		micButton.style['background-color'] = 'dodgerblue';
	}
	//停止辨識
	if( recognition && typeof(recognition.stop)=='function' ) {
		//recognition.abort();
		recognition.stop();				
	}
};
/**
 * 
 */
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
		//console.log(event);
		var atIndex = event.resultIndex;
		var theLast = event.results[atIndex].length-1;
		var txt = event.results[atIndex][theLast].transcript;
		//document.getElementById('micButton').textLabel.innerText = txt;
		console.log(txt);
		
		//如果按鈕是 viole 色，而且有辨識出字來，就試著檢查答案是否正確
		var micButton = document.getElementById('micButton');
		var micIsEnable = /Viole/i.test(micButton.style['background-color']);
		if(txt && micIsEnable) {
			var msg = txt;
			var dalayTime = 300;
			if( checkAnswer(txt) ) {
				//答對了，就停止辨識
				stopSpeechRecognition();
			} else {
				dalayTime = 1000;
			}
			document.getElementById('micButton').textLabel.innerText = msg;
			setTimeout(function() {
				document.getElementById('micButton').textLabel.innerText = '';
			}, dalayTime);				
		}
	};
	recognition['onerror'] = function(event) {
		//no-speech, aborted, audio-capture, network, not-allowed, service-not-allowed, bad-grammar, language-not-supported		
		//alert('Error occurred in recognition: ' + event.error + '\n'+event.message);
		var msg = '錯誤代碼及訊息: ['+event.error+'] ['+event.message+']';
		if(/not-allowed/i.test(event.error)) {
			showMessage('無法使用語音辨識(可能需要檢查麥克風設定、安全、隱私設定；或是請換一種瀏覽器再試試)<br>'+msg);
		} else if((/aborted/i.test(event.error))) {
			if(/kAFAssistantErrorDomain/i.test(event.message)) {
				showMessage('無法使用語音辨識(等一下；或是先[儲存]進度、關閉瀏覽器並重開後再[載入]進度試)<br>'+msg);
			}
		} else if(!(/no\-speech/i.test(event.error))) {
			showMessage('Error<br>'+msg);
		}
	};	
}
/**
 * 
 */
addMicButton = function() {
	var gameWrapper = document.getElementById('gameWrapper');
	var micButton = document.createElement("button");
	micButton.id = 'micButton';
	micButton.setAttribute('class', 'circleBtn micBtn');
	micButton.title = '按這裡啟用/關閉語音辨識';
	micButton.innerHTML = 'MIC';
	//var micTxt = document.createTextNode('MIC');
	//micButton.appendChild(micTxt);
	gameWrapper.appendChild(micButton);
	
	var labelText = document.createTextNode('');
	micButton.textLabel = document.createElement("div");
	micButton.textLabel.id = 'speechText';
	micButton.textLabel.appendChild(labelText);
	micButton.appendChild(micButton.textLabel);
		
	return micButton;
};
/**
 * 
 */	
enableSpeech2Text = function(e) {
	if(typeof(soundInit)=='function') {
		soundInit();
	}
	
	e.preventDefault();
	//
	//detect mousedown or touchstart
	if(typeof(e.type)!='undefined') {
		eventType = e.type;
	}
	//
	var micButton = document.getElementById('micButton');	

	//如果有支援語音辨識, 進行語音辨識初始化
	speechRecognitionReady = (typeof(window.SpeechRecognition)=='function' || typeof(window.webkitSpeechRecognition)=='function' || typeof(window.mozSpeechRecognition)=='function' || typeof(window.msSpeechRecognition)=='function');
	if(speechRecognitionReady) {
		//進行語音辨識初始化
		if(typeof(recognition)=='undefined' || recognition==null) {
			recognition =  new (window.webkitSpeechRecognition || window.SpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
			//recognition = new webkitSpeechRecognition();
			recognition.continuous = true;		//持續辨識,不自動停
			recognition.interimResults = true;	//立即辨識,不等待
			//recognition.lang='cmn-Hant-TW'; 	//'en-US'
			recognition.lang='zh-TW';
			//recognition.lang='en-US';
			if(typeof(speechRecognitionLang)=='string' && speechRecognitionLang!='') {
				recognition.lang = speechRecognitionLang 
			}
			if(typeof(speechRecognitionInterimResults)=='boolean') {
				recognition.interimResults = speechRecognitionInterimResults;
			}
			speech2TextEventsInit();
		}
		var btnColor = micButton.style['background-color'].toLowerCase();		//'Violet'  DodgerBlue
		if(btnColor=='dodgerblue') {
			var checkBtn = document.querySelector('.checkBtn');
			if( checkBtn && checkBtn.classList.contains('hidden') ) {
				showMessage('請先按下一題<br>才能啟動語音輸入的功能', 'red');
			} else {
				try {
					//recognition.stop();				
					recognition.start();
				} catch(e) { 
					//console.log(e)
					setTimeout( function() {
						recognition.start();
					}, 100);
				};
			}			
		} else {
			//停止辨識
			try {
				stopSpeechRecognition();
			} catch(e) { };
		}
	} else {
		alert('抱歉~ 您的瀏覽器不支援語音辨識(webkitSpeechRecognition)的功能');
		micButton.removeEventListener('mousedown', enableSpeech2Text);
		micButton.removeEventListener('touchstart', enableSpeech2Text);
		micButton.remove();
	}
}
/**
 * 
 */
loadPinyin = function(callback) {
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
/**
 * 
 */
toPinyin = function(source) {
	var result = '';
	if(typeof(pinyinDic)=='string' && pinyinDic.length>0) {
		var i=0;
		while(i<source.length) {
			var c = source.substr(i++,1);
			if(/[^a-z|A-Z|0-9|,|\+|\$|\^|\(|\)|\*|\.|\|]/.test(c)) {  //跳過字母、數字及 RE 會用到的特殊符號 ()*.|
				//pinyinDic.match(/顏([^,]+),/);
				//var re = new RegExp(c+'([^,]+)');
				var re = new RegExp(escapeRegExpString(c)+'([^,]+)');				
				var match = pinyinDic.match(re);
				c = (typeof(match)!='undefined' && match!=null ? match[1]:c);
			}
			result+=c;
		}
	}
	return (result==''?source:result);
};
/**
 * 
 */
//取得網址中的某一個參數(已編碼過的)
var gup = function( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null )    return "";  
	else    return results[1];
};
/**
 * 
 */
var speechRecognitionInput = function(callback) {
	//偵測是否指定辨識的語言
	var lang = gup('lang');
	if(lang != '') {
		speechRecognitionLang = lang;
	}
	//
	//先載入原有的 LimeJS 程式
	if(typeof(callback)=='function') {
		callback();	
	}	
	//如果有支援語音辨識, 進行語音辨識初始化
	speechRecognitionReady = (typeof(window.SpeechRecognition)=='function' || typeof(window.webkitSpeechRecognition)=='function' || typeof(window.mozSpeechRecognition)=='function' || typeof(window.msSpeechRecognition)=='function');
	if(speechRecognitionReady) {
		if(typeof(micButton)!='undefined' && micButton != null) {
			try { micButton.removeEventListener('mousedown', enableSpeech2Text); } catch(e) {};
			try { micButton.removeEventListener('touchstart', enableSpeech2Text); } catch(e) {};
			try { micButton.remove(); } catch(e) {}
		}
		//add Mic button on left bottom after 1 sec.
		setTimeout( function() {
			var micBtn = addMicButton();
			micBtn.addEventListener('mousedown', enableSpeech2Text);
			micBtn.addEventListener('touchstart', enableSpeech2Text);
			//btn.addEventListener('touchend', enableSpeech2Text);
			if(enableTransToPinyin && (typeof(pinyinDic)!='string' || pinyinDic.length<=0) ) {
				loadPinyin();
			}
		}, 1000);
	}
};
//----------------------------------------
//Google SpreadSheet Query
/**
 * 解析出 SpreadSheet 的文件 ID
 * @param {String} url 試算表的網址
 * @return {String} id
 */
gdGetSpreadSheetID = function(url) {
  var id = '';
  if(!(/^https:\/\//.test(url)) && url.length>20) {
    id = url;
  } else if(/\/d\/([^\/]{20}[^\/]+)\//.test(url)) {
    id = window['RegExp']['lastParen'];
  }
  return id;
};
/**
 * 製作 SpreadSheet 的查詢資料網址
 * @param {String} url 試算表的網址
 * @param {String} sheet 工作表名稱
 * @param {String} query SQL string
 * @param {Number} headers total number
 * @return {String} url 如果不是試算表的網址就回傳空字串
 */
gdGetSpreadSheetQueryURL = function(url, sheet, query, headers) {
  var id = gdGetSpreadSheetID(url);
  var gid = url.match(/[\#\&\?]gid=(\d+)/); //工作表的 id
  if( gid && gid.length > 1 ) {
	gid = gid[1];
  } else {
    gid = '-1';
  }
  url = '';
  if(id != '') {
    //預設使用 tqx=out:json
	url = 'https://docs.google.com/spreadsheets/d/'+id+'/gviz/tq?tqx=out:json';
	//如果有指定工作表名稱，就不使用 gid 
	//似乎 gid, sheet 同時存在的話，就看誰放前面
	//都不指定的話，就會取用在試算表中的第一個工作表
    if(typeof(sheet)=='string' && sheet.replace(/\s/g, '')!='') {
      url += '&sheet='+encodeURIComponent(sheet);  //指定工作表(sheet)
    } else if( gid != '-1' ) {
	  url += '&gid='+gid;
	}
    if(typeof(query)=='string' && query.replace(/\s/g, '')!='') {
      //query = 'Select *';
      //query = `Select * where A = '${gameID}'`;
      query = encodeURIComponent(query);
      url += '&tq='+query;  //指定查詢的 SQL 指令(tq)
    }
	if(typeof(headers)=='number') {
	  url += '&headers='+headers;
	}
	//console.log(url);
  }
  return url;
};
/**
 * JSONP 以新增 script 的方式，來執行試算表的查詢後的函數
 * callback 變成查詢後執行的函數，這樣參數可以取得試算表的查詢結果
 *
 * @param {String} url 試算表的共用必須任何人都可以檢視
 * @param {Function} callback 查到資料後要執的程序
 */
gdGetSpreadSheetQueryResponse = function(url, callback)  {
  var nocacheVal = '?nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
  var scriptToAdd = document.createElement('script');		//建立一個 scriptElement

  //delete spreadSheetQueryData; //先清除儲存試算表查詢結果用的變數
  //JSONP 呼叫 callback
  if(typeof(google)=='undefined') { google = {}; }
  if(typeof(google['visualization'])=='undefined') { google['visualization'] = {}; }
  if(typeof(google['visualization']['Query'])=='undefined') { google['visualization']['Query'] = {};}
  google['visualization']['Query']['setResponse'] = callback;

  scriptToAdd.setAttribute('type','text/javascript');
  scriptToAdd.setAttribute('charset','utf-8');
  //scriptToAdd.setAttribute('src', url + nocacheVal);	//避免 cache 時用的
  scriptToAdd.setAttribute('src', url);
  //載入成功時
  scriptToAdd.onload = scriptToAdd.onreadystatechange = function() {
    if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
      scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
      document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//將變數載入後移除 script
      //if(typeof(callback)=='function') {
      //	callback();	//執行指定的函數
      //}
    };
  };
  //無法載入時, 將設定用預設值
  scriptToAdd.onerror = function() {
    scriptToAdd.onerror = null;	//將事件移除
    document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//移除 script
    if( typeof callback == 'function' ) {
      callback();	//執行指定的函數
    } else {
      var msg = '無法載入設定.';
      var resultBlock = document.querySelector('.resultBlock');
      if(typeof(resultBlock)!='undefined' && resultBlock!=null) {
        msg += '\n\n請確認一下:\n\n* 試算表共用連結的網址是否正確, \n\n* 是否開放任何人都可以檢視.';
        resultBlock.style.display = 'none';			
      }
      setTimeout(function() {
        alert(msg);
      }, 100);
    }
  }

  //在 head 的最前頭加上前述的 scriptElement
  var docHead = document.getElementsByTagName("head")[0];
  docHead.insertBefore(scriptToAdd, docHead.firstChild);
};
/**
 * 由 Google SpreadSheet 取得資料
 * @param {String} 試算表網址
 * @param {String} 工作表名稱
 * @param {String} SQL
 * @param {Boolean} 是否不解析結果, 直接回傳取回的資料
 * @param {Function}
 */
getQuestioLinesFromSpreadSheet = function(spreadSheetURL, sheet, sql, rawResult, callback) {
	if(typeof(spreadSheetURL)!='string') {
		spreadSheetURL = '';
	} else if(!(/^https:\/\//i.test(spreadSheetURL))) {
		//不是網址, 可能是用 ID
		spreadSheetURL = 'https://docs.google.com/spreadsheets/d/'+spreadSheetURL+'/edit?usp=sharing';
	}
	if( !(/^https:\/\//i.test(spreadSheetURL)) || !(/spreadsheets/.test(spreadSheetURL)) ) {
		loadingLogoEnable = false; //停止載入的動畫
		showMessage('無法載入題庫<br>網址似乎不是試算表的，請確認後再試', 'red', 10, function(){setVisibility(0);});
		return ;
	}
	var questionLines = '';
	var headers = null;
	if(typeof(rawResult)=='boolean' && rawResult) {
		headers = 0;
	}
	var queryURL = gdGetSpreadSheetQueryURL(spreadSheetURL, null, sql, headers);
	gdGetSpreadSheetQueryResponse(queryURL, function(data) {
		if(typeof(rawResult)=='boolean' && rawResult) {
			//如果是想取回完整資料者，就不再往下解析資料
			if(typeof(callback)=='function') {
				callback(data);
			} else {
				console.log(data);
			}
			return;
		}
		if(typeof(data)!='undefined' && data!=null && typeof(data['status'])=='string' && data['status']=='ok') {
			if(typeof(data['table']['rows'])!='undefined' && data['table']['rows']!=null && data['table']['rows'].length>0) {				
				//題庫先設為空的
				questionLines = '';
				//找出成語在哪一欄中
				var qAtCol = -1;
				var firstRow = 0;
				var cols = data['table']['cols'];
				if( data['table']['parsedNumHeaders'] == 0 ) {
					//如果第 0 列不是設定為欄位標題者, parsedNumHeaders = 0
					//只好利用 ['rows'][0] 來看 '成語' 是在第幾欄
					var fields = data['table']['rows'][0]['c'];
					for(var i=0; i<fields.length; i++) {
						var v = data['table']['rows'][0]['c'][i]['v'];
						if( typeof(v)=='string' && v.trim() == '成語' ) {
							qAtCol = i;
							firstRow = 1;
							break;
						}
					}
				} else {
					//工作表有設定欄名者(parsedNumHeaders=1), label 不為空白					
					for(var i=0; i<cols.length; i++) {
						if( cols[i]['label'].trim() == '成語' ) {
							qAtCol = i;
							found = true;
							break;
						}
					}
				}
				if( qAtCol < 0 ) {
					qAtCol = 0;
					if( data['table']['parsedNumHeaders'] > 0 ) {
						//最上面的那列被當成headers(欄名)了，要先加入題庫
						var v = data['table']['cols'][qAtCol]['label'];
						if( typeof(v)=='string' && v.replace(/\s/g, '')!='' ) {
							questionLines += v.trim();
						}
					}
				}
				console.log('get @'+qAtCol, 'from '+firstRow, cols);
				//table = data['table'];
				//取試算表成語欄位的內容
				if( qAtCol >= 0 ) {
					for(var i=firstRow; i<data['table']['rows'].length; i++) {
						var cell = data['table']['rows'][i]['c'][qAtCol];
						if( typeof(cell) != 'undefined' && cell != null ) {
							if( typeof(cell['v'])=='string' && cell['v'].replace(/\s/g, '')!='' ) {
								questionLines += cell['v'].trim() + '\n';
							}
						}
					}
				}				
			}
		}
		if(questionLines!='') {
			if( typeof(callback) == 'function' ) {
				callback(questionLines);
			} else {
				console.log(questionLines);
			}
		} else {
			if(typeof(data)!='undefined' && data!=null && typeof(data['table'])!='undefined') {
				console.log(data['table']);
			}
			loadingLogoEnable = false; //停止載入的動畫
			showMessage('無法載入題庫<br>請確認試算表中的內容後再試', 'red', 10, function(){setVisibility(0);});
		}
	});
};
/**
 * 複製指定物件的文字到剪貼簿中
 * Credit : 
 *  https://stackoverflow.com/questions/36639681/how-to-copy-text-from-a-div-to-clipboard
 *
 * @param {Object} target 如果是字串，就當作是物件的 id, 再轉為物件
 */
copyAndSelectToClipboard = function (target) {
  if (typeof(target) == 'string') {
    target = document.getElementById(target);
  }
  if (typeof(target)!='undefined' && target!=null) {
    if(/input|textarea/i.test(target.tagName)) {
	  /* input, textarea 直接複製 */
	  target.select();
      document.execCommand("copy");
	} else {
	  /* 利用 textarea 達到只複製文字的目的 */
      var tempElm = document.createElement('textarea');
      tempElm.style = 'width:1;height:1;border:0;';
	  //tempElm.innerHTML = target.innerHTML;
	  tempElm.textContent = target.textContent;
	  document.body.append(tempElm);
	  tempElm.select();
      document.execCommand("copy");
	  tempElm.remove();
	  tempElm = null;
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
/**
 * 
 */
animateValue = function(obj, start, end, duration, callback) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
	  if(typeof(callback)=='function') {
		callback();
	  }	
	}
  };
  window.requestAnimationFrame(step);
};
/**
 * 
 */
updateScore = function(score) {  
  var scoreLabel = document.querySelector('.score');
  var playSound = function() {
    if(typeof(soundCoin)!='undefined' && soundCoin!=null) {
      audioPlay(soundCoin);
    }			  
  }
  if(typeof(score)!='number') {
    scoreLabel.innerHTML = '0';  //reset to 0
	playSound();
  } else {
    var oldScore = parseInt(scoreLabel.innerHTML);
    var t = (score < 50 ? 500 : 1000);
    animateValue(scoreLabel, oldScore, oldScore+score, t, function() {
	  //加完分再放一次音效
	  playSound();
    });
  }
};
/**
 * 
 */
updateQlabel = function(n) {
  var qNumber = document.querySelector('.q-number');
  var txt = '^_^';
  if(qNumber) {
    if(typeof(n)=='number') {
      txt = n + ' / ' + qTotalNumber;
	}
    qNumber.innerHTML = txt;
  }
};
/**
 * 
 */
updateDicLink = function(txt) {
  var dicLink = document.querySelector('.dicLink');
  var url = 'https://pedia.cloud.edu.tw/Entry/Detail?title=';
  if(dicLink) {
    if(typeof(txt)=='undefined' || txt == null) {	  
	  txt = '';
    } else {
	  if(typeof(txt) != 'string') {
	    txt = txt.join('');
	  }
	  txt = '<a href="'+url+encodeURIComponent(txt)+'#" target="_blank">查看教育雲-教育百科 ['+txt+'] 的解釋</a>';
    }
	dicLink.innerHTML = txt;
  }
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
/*
載入設定檔時顯示動畫
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
    label.style['transform'] = 'translate(10px, -24px) rotate(' + angle + 'deg)';
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
/**
 * 載入題庫後, 進行遊戲場景初始化
 */
loadQuestionAndStartGame = function() {
  if( typeof(stroke_parts_data) != 'undefined' && stroke_parts_data != null ) {
    var loadingLabel = document.querySelector('.loading-label');
    loadingLabel.innerHTML = '載入題庫';
  
    sceneInit(); //場景的一些物件初始	
    var id = gup('id');
	var gid = gup('gid');
	var col = gup('col');
	if(id.replace(/\s/g, '') == '') {
		url = defaultURL;
	} else {
		url = 'https://docs.google.com/spreadsheets/d/'+id+'/edit?'+(gid=='' ? 'usp=sharing' : '?gid='+gid+'#'+gid);
	}
	var sql = null;
	if(col.replace(/\s|[^a-z]/ig, '') != '') {
		sql = 'SELECT '+col.toUpperCase();
	}
    getQuestioLinesFromSpreadSheet(url, null, sql, false, function(q) {	
      loadingLogoEnable = false; //停止載入的動畫
	
      questionLines = q;
	  isFirstGame = true;
      newGame();
    });

    speechRecognitionInput();
  } else {
	//HTML5 FUN 部件設定未載入,顯示錯誤並關閉遊戲場景
    setTimeout(function() {  
      loadingLogoEnable = false; //停止載入的動畫
      showMessage('HTML5 FUN 部件設定載入失敗<br>請檢查後再試', 'red', 5, function(){setVisibility(0);});
	}, 500);
  }
};
/**
 * 載入遊戲所需要的設定檔
 */
loadSettings = function() {
  var loadingLabel = document.querySelector('.loading-label');
  loadingLabel.innerHTML = '載入設定';
  //1.載入 CNS stroke_component
  //2.載入 HTML5 FUN stroke_parts_data
  //3.載入 Google Spreasheet 成語 questionLines
  //
  //stage 2
  var loadSettingStage2 = function() {
    if(typeof(stroke_component)!='undefined' && stroke_component!=null) {
      if( typeof(stroke_parts_data) == 'undefined' || stroke_parts_data == null ) {
	    get_stroke_parts_data(loadQuestionAndStartGame)
	  } else {
	    loadQuestionAndStartGame();
	  }
	} else {
	  //CNS部件設定未載入,顯示錯誤並關閉遊戲場景
	  setTimeout(function() {
	    showMessage('CNS 部件設定載入失敗<br>請檢查後再試', 'red', 5, function(){setVisibility(0);});
	    loadingLogoEnable = false; //停止載入的動畫
	  }, 500);
	}
  }
  //starget 1
  if(typeof(stroke_component)=='undefined' || stroke_component==null) {
    load_stroke_component(loadSettingStage2);
  } else {
	loadSettingStage2();
  }
	
};
/**
 * 
 */
start = function() {
  setViewport();
  
  setVisibility(true);
  
  window.scrollTo(0, 0);

  document.querySelector('.debug').innerHTML = '';

  loadingLogoEnable = true;
  loadingAnimation('PARTDLE');

  //soundInit();
  
  setTimeout(function() {
    updateScore();//reset the score to 0
	updateQlabel(); //reset the question total number label
	updateDicLink();
  }, 100);
  
  loadSettings();
  
};

var autostart = gup('autostart');
if(autostart == '1' || autostart == 'true') {
  start();
}
