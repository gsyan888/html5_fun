//上方標題欄的標題
caption = "九族E樂園";

//遊戲模式選單按鈕上的文字
item_button1_caption = "聽音找族語";	//第1個按鈕
item_button2_caption = "聽音找中文";	//第2個按鈕
item_button3_caption = "看中文找族語";	//第3個按鈕
item_button4_caption = "看族語找中文";	//第3個按鈕

//下方資料出處的文字
credit_caption = "資料&MP3來源: https://web.klokah.tw";		

//載入題庫等候的最大秒數
numberOfSecondToLoadQuestionLines = 5;


//每題有幾個選項
numberOfOptions = 2;

//每列最多可以有幾個選項
numberOfOptionsPerRow = 1;	

//是否自動顯示選項供作答(預設為 true; false 時需按[開始作答]鈕才會出現選項)
auto_show_options = true;

//每回合抽幾題題目
numberOfQuestionsPerRound = 10;

//出題時選擇題目的方式 true:亂數選題  false:按題庫順序
select_questions_in_random = true; 



//是否使用 TTS 的語音
tts_enabled = false;

//----------------
//Google TTS 文字轉語音的設定
//----------------
tts_language = 'en';  // en : 英語,   zh_tw : 中文
tts_speed = 0.3;  //語音的速度 0 ~ 1 (可用小數)
tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed='+tts_speed+'&q=';

//題庫
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//-------------------------------------------------
//九族E樂園的課程代碼
//-------------------------------------------------
var klokah_lang_id = 14;		//族語代碼
var klokah_level = 1;			//階級
var klokah_chapter = 1;			//課別


// *********************************************************************
//     以下為解析並重組九族E樂園用的程式碼, 不需要更動
// *********************************************************************
//
//聲音檔路徑的前置網址
//也就是會為 questionLines 的左欄前面自動加上的字串
//
soundBaseURL = "http://klokah.tw/nine/sound/"+klokah_lang_id+"/"+klokah_level+"/"+klokah_chapter+"/";

//題庫 XML 網址
var url = "https://web.klokah.tw/nine/php/getText.php?d="+klokah_lang_id+"&l="+klokah_level+"&c="+klokah_chapter;


//-------------------------------------------------
// 
//-------------------------------------------------
//將 XML 解析為資料陣列
parseXML = function(xmlDoc) {
	var question = "";
	var items = new Array();
	var nodes = xmlDoc.getElementsByTagName("item");
	//var items = xmlDoc.getElementsByTagName("item");
	for(var n=0; n<nodes.length; n++) {
		if(nodes[n].nodeType == 1) {	
			var nodeItems = nodes[n].childNodes;
			var text = nodes[n].getElementsByTagName("text")[0].childNodes[0].nodeValue;
			var chinese = nodes[n].getElementsByTagName("chinese")[0].childNodes[0].nodeValue;
			var wordChinese = nodes[n].getElementsByTagName("wordChinese")[0].childNodes[0].nodeValue;
			var sound = nodes[n].getElementsByTagName("sound")[0].childNodes[0].nodeValue;
			var order = nodes[n].getElementsByTagName("order")[0].childNodes[0].nodeValue;

			if(order > 0) {
				items[order-1] = new Object();
				items[order-1]['text'] = text;
				items[order-1]['chinese'] = chinese;
				items[order-1]['wordChinese'] = wordChinese;
				items[order-1]['sound'] = sound;
				items[order-1]['order'] = order;
				//左欄為聲音檔路徑
				//中間欄為中文
				//右欄為族語				
				question += order+".mp3"+seperator+chinese+seperator+text+"\n";
			}
		}
	}
	//console.log(items);
	//return items;
	return question;
}
/**
 * 讀入外部檔案, 並執行 callback 的指令
 * @private
 */
get_file_contents = function(text_url, callback ) {
	if (window.XMLHttpRequest) {     
      req = new XMLHttpRequest(); 
	}     
	else if (window.ActiveXObject) {     
      req = new ActiveXObject("Microsoft.XMLHTTP");     
	}     
	
	req.open('GET', text_url);

	req.onreadystatechange = function() {     
   		if (req.readyState == 4) {
			if(req.status == 200) {	//200 為成功讀入資料; 404 : Not Found
				callback(req.responseText);
			} else {
				callback("");
			}
		}
	}
	try {
		req.send(null);
	} catch(e) {
		//alert(e);
	}
}
//-------------------------------------------------
//
//-------------------------------------------------
convert_string_to_xml = function(strXML)  
{  
	var xmlDoc;
    if (window.ActiveXObject) {  
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");  
        xmlDoc.async="false";  
        xmlDoc.loadXML(strXML);  
    } else {  
        parser=new DOMParser();  
        xmlDoc=parser.parseFromString(strXML,"text/xml");  
    }  
    return xmlDoc;  
}
//-------------------------------------------------
//
//-------------------------------------------------
get_file_contents(url, function(data) {
	//console.log(parseXML(convert_string_to_xml(data)));	
	questionLines = parseXML(convert_string_to_xml(data));	
	//console.log(questionLines);	
});
