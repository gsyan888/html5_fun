//-------------------------------------------
//傳送成績的 JavaScript
//-------------------------------------------
sendScore = function(logger_url, score) {
	//console.log(logger_url, score);		
	if(/https:\/\/docs\.google\.com\/forms\/d\/e\//.test(logger_url)) {
		//使用 Google Form 記錄成績
		sendScoreToGoogleForm(logger_url, score);
	} else {
		//使用其它方式登錄成績
		var scoreJsonString = '';
		if(typeof(score) == 'object') {
			scoreJsonString = JSON.stringify(score);
		} else if(typeof(score) == 'string') {
			//console.log(score);
			scoreJsonString = score;
		}
		//console.log(scoreJsonString);		
		if(scoreJsonString != '') {
			var query = 'score=' + encodeURIComponent(Base64.encode(scoreJsonString));		
				query += '&';
				
			var url = logger_url + '?callback=getJsonData&' + query;
			
			//如果是用 Google Apps Script 來記錄，透過 corsproxy 才不會被 Google 加料
			if(/https:\/\/script\.google\.com\/macros\//.test(logger_url)) {
				url = 'https://corsproxy.io/?'+encodeURIComponent(url);
			}			
			loadSettingFromExternalScript(url, function(result) {			
				//由 Google Apps Script 傳回的資料以 base64 encode
				if(typeof(jsonData)!='undefined' && jsonData!=null && typeof(jsonData.dataBase64) == 'string') {
					console.log(Base64.decode(jsonData.dataBase64));
				//	var result = Base64.decode(jsonData.dataBase64);
				//	result = result.replace("\ufeff", ""); //去掉 UTF-8 BOM
				//	if(typeof(callback) == 'function') {
				//		callback(result);
				//	}
				}
			});
		}
	}
}
/**
 * 由外部的 .js 載入設檔值, 並執行 callback 的指令
 */
loadSettingFromExternalScript = function(scriptSrc, callback)  {
	if(scriptSrc.indexOf('?') > 0) {
		var nocacheVal = (/\&$/.test(scriptSrc)?'':'&')+'nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
	} else {
		var nocacheVal = '?nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
	}
	var firstScript = document.createElement('script');		//建立一個 scriptElement
	
	firstScript.setAttribute('type','text/javascript');
	firstScript.setAttribute('charset','utf-8');
	firstScript.setAttribute('src', scriptSrc + nocacheVal);
	//firstScript.setAttribute('src', scriptSrc);
	//載入成功時
	firstScript.onload = firstScript.onreadystatechange = function() {
		if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
			this.onload = this.onreadystatechange = null;
			document.getElementsByTagName('head')[0].removeChild(this);	//將變數載入後移除 script
			if( typeof callback == 'function' ) {
				callback();	//執行指定的函數
			}
        };
	};
	//無法載入時, 將設定用預設值
	firstScript.onerror = function() {
		this.onerror = null;	//將事件移除
		document.getElementsByTagName('head')[0].removeChild(this);	//移除 script
		if( typeof callback == 'function' ) {
			callback();	//執行指定的函數
		}
	}
	
	//在 head 的最前頭加上前述的 scriptElement
	var docHead = document.getElementsByTagName("head")[0];
	docHead.insertBefore(firstScript, docHead.firstChild);
}
//-------------------------------------------------
//由網路抓完的資料後要呼叫的 function
//-------------------------------------------------
var jsonData;
getJsonData = function(data) {
	jsonData = data;	//將抓回的資料餵給 settingData
}

/*
Copyright (c) 2008 Fred Palmer fred.palmer_at_gmail.com

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
function StringBuffer()
{ 
    this.buffer = []; 
} 

StringBuffer.prototype.append = function append(string)
{ 
    this.buffer.push(string); 
    return this; 
}; 

StringBuffer.prototype.toString = function toString()
{ 
    return this.buffer.join(""); 
}; 

var Base64 =
{
    codex : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    encode : function (input)
    {
        var output = new StringBuffer();

        var enumerator = new Utf8EncodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var chr1 = enumerator.current;

            enumerator.moveNext();
            var chr2 = enumerator.current;

            enumerator.moveNext();
            var chr3 = enumerator.current;

            var enc1 = chr1 >> 2;
            var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            var enc4 = chr3 & 63;

            if (isNaN(chr2))
            {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3))
            {
                enc4 = 64;
            }

            output.append(this.codex.charAt(enc1) + this.codex.charAt(enc2) + this.codex.charAt(enc3) + this.codex.charAt(enc4));
        }

        return output.toString();
    },

    decode : function (input)
    {
        var output = new StringBuffer();

        var enumerator = new Base64DecodeEnumerator(input);
        while (enumerator.moveNext())
        {
            var charCode = enumerator.current;

            if (charCode < 128)
                output.append(String.fromCharCode(charCode));
            else if ((charCode > 191) && (charCode < 224))
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;

                output.append(String.fromCharCode(((charCode & 31) << 6) | (charCode2 & 63)));
            }
            else
            {
                enumerator.moveNext();
                var charCode2 = enumerator.current;

                enumerator.moveNext();
                var charCode3 = enumerator.current;

                output.append(String.fromCharCode(((charCode & 15) << 12) | ((charCode2 & 63) << 6) | (charCode3 & 63)));
            }
        }

        return output.toString();
    }
}
function Utf8EncodeEnumerator(input)
{
    this._input = input;
    this._index = -1;
    this._buffer = [];
}
Utf8EncodeEnumerator.prototype =
{
    current: Number.NaN,

    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = Number.NaN;
            return false;
        }
        else
        {
            var charCode = this._input.charCodeAt(++this._index);

            // "\r\n" -> "\n"
            //
            if ((charCode == 13) && (this._input.charCodeAt(this._index + 1) == 10))
            {
                charCode = 10;
                this._index += 2;
            }

            if (charCode < 128)
            {
                this.current = charCode;
            }
            else if ((charCode > 127) && (charCode < 2048))
            {
                this.current = (charCode >> 6) | 192;
                this._buffer.push((charCode & 63) | 128);
            }
            else
            {
                this.current = (charCode >> 12) | 224;
                this._buffer.push(((charCode >> 6) & 63) | 128);
                this._buffer.push((charCode & 63) | 128);
            }

            return true;
        }
    }
}
function Base64DecodeEnumerator(input)
{
    this._input = input;
    this._index = -1;
    this._buffer = [];
}
Base64DecodeEnumerator.prototype =
{
    current: 64,

    moveNext: function()
    {
        if (this._buffer.length > 0)
        {
            this.current = this._buffer.shift();
            return true;
        }
        else if (this._index >= (this._input.length - 1))
        {
            this.current = 64;
            return false;
        }
        else
        {
            var enc1 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc2 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc3 = Base64.codex.indexOf(this._input.charAt(++this._index));
            var enc4 = Base64.codex.indexOf(this._input.charAt(++this._index));

            var chr1 = (enc1 << 2) | (enc2 >> 4);
            var chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            var chr3 = ((enc3 & 3) << 6) | enc4;

            this.current = chr1;

            if (enc3 != 64)
                this._buffer.push(chr2);

            if (enc4 != 64)
                this._buffer.push(chr3);

            return true;
        }
    }
};

//記錄在 Google Form 時，需要以下欄位
//遊戲標題	設定檔檔名	使用者	總秒數	答錯次數	得分	回答歷程
//title file	username	timeTotal	faultTotal	score	report
//題目	作答秒數	錯的次數	回答1	回答2	回答3	回答4	回答5	回答6
//report[index].question, report[index].time, report[index].fault], report[index].selected

sendScoreToGoogleForm = function(url, score) {
	google_form_getFormParams(url, function(params) {
		if(typeof(params)!='undefined' && params!=null) {
			if(params.length>=7) {
				var report = [];
				var values = Object.values(score.report);
				for(var i=0; i<values.length; i++) {
					var r = values[i].question+',';
					r += values[i].time+',';
					r += values[i].fault+',';
					r += values[i].selected.join(',');
					report.push(r);
				}
				
				//準備送給表單的資料
				var formData = {};
				formData[params[0][1]] = score.title;
				formData[params[1][1]] = score.file;
				formData[params[2][1]] = score.username;
				formData[params[3][1]] = score.timeTotal
				formData[params[4][1]] = score.faultTotal
				formData[params[5][1]] = score.score
				formData[params[6][1]] = report.join('\n');
				//傳送回應給表單
				google_form_formPost(url, formData);
			} else {
				console.log('表單的欄位需要有 7 個, 查到的只有: ', params);
			}
		} else {
			console.log('無法查詢表單，請檢查網址及是否已開放給未登入的使用者填寫。');
		}
	});
};
/**
 * 將資料傳給 Google Form, 讓它存在試算表中
 * @param {String} url		公開的表單填寫網址
 * @param {String} formData 傳送的資料格式 ex. a=1&b=2
 */
google_form_formPost = function(url, formData) {
  /* 試著由網址中抓出 ID, 並重組網址 */
  if(/\/viewform/.test(url)) {
	url = url.replace('viewform', 'formResponse');
  } else  if(/\/d\/\w\/([^\/]+)\//.test(url)) {
    var id = window['RegExp']['lastParen'];
    url = 'https://docs.google.com/forms/d/e/'+id+'/formResponse';
  }
  var submitNotFound = true;
  if(typeof(formData)!='string') {    
    var data = '';
    var keys = Object.keys(formData)
    for(var i=0; i<keys.length; i++) {
      if(/submit/i.test(keys[i])) {
        submitNotFound = false;
      }
      if(data!='') {
        data += '&'
      }
      data += keys[i]+'='+encodeURIComponent(formData[keys[i]]);
    }
    formData = data;
  } else if(/submit=/i.test(formData)) {
    submitNotFound = false;
  }
  if(submitNotFound) {
    formData += '&submit=Submit';
  }
  /* post data to the Google Form */
  try {
    fetch(url, {
      "method": "POST",
      "cache": "no-cache",
      "headers": {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      "body": formData
    })
      ['then'](function(res) {
        console.log(res);
        return res.json();
      })
	  ['catch'](function(e) { console.log('===== 放心，有錯誤訊息是正常的 XDDD ====='); })
      ['then'](function(rep) {
        console.log(rep, ' ===== 出現 undefined 也是正常的 =====');
      });
  } catch(e) {console.log(e)};
};
/**
 * 由 Google Form 的表單填寫網址中解析出各欄位的名稱,代碼
 * [
 *   ['遊戲標題', 'entry.1118155418'] ,
 *   ['設定檔檔名', 'entry.1787930417'] ,
 *   ['使用者代號', 'entry.656846942'] ,
 *   ['總秒數', 'entry.1765910709'] ,
 *   ['答錯次數', 'entry.201878260'] ,
 *   ['得分', 'entry.799625733'] ,
 *   ['作答歷程', 'entry.1453805812']
 * ]
 * @param {String} url
 * @param {Function} callback
 * @return {Array} data 二維陣列
 */
google_form_getFormParams = function(url, callback) {
  //試著由網址中抓出 ID, 並重組網址
  if(/\/d\/\w\/([^\/]+)\//.test(url)) {
    var id = window['RegExp']['lastParen'];
    url = 'https://docs.google.com/forms/d/e/'+id+'/viewform';
  }
  //使用 CORS proxy 
  //url = 'https://corsproxy.io/?'+encodeURIComponent(url);
  url = 'https://corsproxy.io/?'+url;
  fetch(url)
    ['then'](function(res) {
      return res.text();
    })
	['catch'](function(e) {
      return null;
	})
    ['then'](function(html) {
      var params;
      if(typeof(html)=='string') {
        params = google_form_parseFormHTML(html);
      }
      if(typeof(callback)=='function') {
        callback(params);
      } else {
        console.log(params);
      }
    });
};

/**
 * 由 Google Form 網頁原始碼中解析出表單各欄位設定
 * @param {String} html
 * @return {Array} params 二維陣列放欄位標籤, 識別名稱
 */
google_form_parseFormHTML = function(html) {
  var params = [];
  var list = [];  
  var dataParams = html.match(/data-params=\"([^\"]+)\"/gmi);
  if(typeof(dataParams)!='undefined' && dataParams!=null && dataParams.length>0) {
    for(var i=0; i<dataParams.length; i++) {
      var param = dataParams[i].replace(/data-params=\"%.@.([^\"]+)\"/g, '$1').replace(/&quot;/g, '"');
      if(param.replace(/\s/g, '')!='') {
        param = '['+param; //最前面的 %.@. 應該是少了的左括號, 補上
        list.push(param); 
        //console.log(param);
      }
    }
    if(list.length>0) {
      //各參數以逗號串接，頭尾加上括號，變成陣列
      list = '['+list.join(',')+']';
      //將字串轉為陣列
      var json = JSON.parse(list);
      //console.log(json);
      
      //抓出各參數的文字標籤及ID	  
      for(var i=0; i<json.length; i++) {
        var param = json[i];
        var fieldName = param[0][1];
        var fieldId = param[0][4][0][0];
        params.push([fieldName, 'entry.'+fieldId]);
      }
    }
  }
  //console.log(params);
  return params;
};

//-------------------------------------------
//傳送成績用的 JavaScript 結束
//------------------------------------------- 