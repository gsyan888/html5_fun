//-------------------------------------------
//傳送成績的 JavaScript
//-------------------------------------------
sendScore = function(logger_url, score) {
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
		loadSettingFromExternalScript(url, function(result) {
			console.log(jsonData.dataBase64)
			//由 Google Apps Script 傳回的資料以 base64 encode
			if(typeof(jsonData.dataBase64) != 'undefined') {
			//	var result = Base64.decode(jsonData.dataBase64);
			//	result = result.replace("\ufeff", ""); //去掉 UTF-8 BOM
			//	if(typeof(callback) == 'function') {
			//		callback(result);
			//	}
			}
		});
	}
}
/**
 * 由外部的 .js 載入設檔值, 並執行 callback 的指令
 */
loadSettingFromExternalScript = function(scriptSrc, callback)  {
	if(scriptSrc.indexOf('?') > 0) {
		var nocacheVal = '&nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
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
//-------------------------------------------
//傳送成績用的 JavaScript 結束
//------------------------------------------- 