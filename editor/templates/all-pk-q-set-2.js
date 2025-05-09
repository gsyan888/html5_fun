﻿//=======================================================
// HTML5 FUN 題庫設定檔 pk系列[共八個遊戲] (兩欄式題庫)
//=======================================================

///基本設定
//------------------------------
//上方看板的標題字
//------------------------------
title = '投籃高手';

//------------------------------
//共有幾個選項(足球最多4個, 籃球最多5個, 棒球建議9個)
//------------------------------
optionsTotal = 9;

//------------------------------
//一列有幾個選項(pk:2, 王牌投手:3, 其它: 1)
//------------------------------
optionColTotal = 3;

//------------------------------
//答對時加幾分
//------------------------------
scoreToAdd = 10;

//------------------------------
//答錯時扣幾分
//------------------------------
scoreToMinus = -5;

//------------------------------
//pk, pk2, baseball
//開始比賽前, 說明對話框的說明文字
//------------------------------
helpText = "請找出正確的答案。";

//------------------------------
//Google TTS 文字轉語音的設定
//------------------------------
//frog, ghost 
//念[題目]時用的語言代碼:  'en-US' 'zh-TW'
//------------------------------
tts_language = 'zh-TW';

//frog, ghost 
//語音的速度 0 ~ 1 (可用小數)
tts_speed = 0.75;  

//------------------------------
//frog
//念[答案]時，使用的 TTS 語言代碼
//語言代碼:  'en-US' 'zh-TW'
//------------------------------
tts_language_of_answer = 'en-US';

//------------------------------
//frog, ghost 
//答案是文字題時，是否用 TTS 念出文字
//  true :念出文字   false :不使用此功能
//------------------------------
answer_text_speaking_enabled = false;

//------------------------------
//frog 
//題幹是文字題時，是否用 TTS 念出文字
//  true :念出文字   false :不使用此功能
//------------------------------
question_text_speaking_enabled = false;

//------------------------------
//frog 
//青蛙的圖案路徑(可不設定)
//未設定時，使用預設的圖案
//------------------------------
frogIconPath = "";

//------------------------------
//frog 總共出多少題(可不設定)
//題庫內的題目不足時，會重覆取用。
//設定為 0 表示做完題庫的所有題目即結束
//------------------------------
theNumberOfQuestions = 0;

//------------------------------
//shark
//一回合要回答幾題
//------------------------------
questionsToAnswer = 10;

//------------------------------
//shark
//一回合的答題秒數
//------------------------------
timerDefault = 120;

//------------------------------
//shark
//是否用虛擬數字鍵盤輸入答案
//true: 使用虛擬鍵盤 false: 隱藏虛擬鍵盤
//------------------------------
numberKeyPadEnabled = false;

//------------------------------
//ghost 選項出現後,停留的秒數
//------------------------------
holdTime = 2;

//------------------------------
//ghost 一題或一關必須在幾秒鐘內找到答案
//複選題需要的時間較長，單選題可設短一點
//------------------------------
timerStartSeconds = 30;

//------------------------------
//籃球/足球,
//是否預覽題目(用於同音字,多音字或形近字)
//------------------------------
preview_enable = false;

//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------
//
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//------------------------------
//多個選項的分隔符號(兩欄式題庫用不到，但還是留著)
//------------------------------
seperator2 = '~~';

//------------------------------
//題幹的欄位: 0 或 1 (0 為左欄, 1為右欄)
//------------------------------
fieldIndexNumberOfQuestion = 0;

//
// [題目設定]
//  兩欄式題庫
//  由眾多題目中，自動產生選項
//
//  一行一題, 
//  欄位左起
//    第一欄為題幹
//    第二欄為答案
//
//  支援的素材: (不能混合使用)
//    * 文字: 一般文字, 國字加注音, 分數格式
//    * 圖片: .png .jpg .gif .svg
//
questionLines = function(){/*--這一行請勿更改--

小狗##dog
杯子##cup
帽子##hat
貓咪##cat
牛##cow
馬##horse

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);



/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
//去掉空的
getValidValues = function(data) {
	var values = [];
	var rePattern = '\\s';
	if(typeof(seperator)=='string') {
		rePattern += '|'+seperator;
	}
	if(typeof(seperator2)=='string') {
		rePattern += '|'+seperator2;
	}
	var reObj = new RegExp(rePattern, 'g');
	for(var i=0; i<data.length; i++) {
		if((data[i].replace(reObj, ''))!='') {
			values.push(data[i].trim());
		}
	}
	return values;
}; 
//轉換題庫為陣列，並檢查內容
question_lines = [];
if(typeof(questionLines)!='undefined' && questionLines!=null) {
	//一行行分解
	if(typeof(questionLines)=='string') {
		if(typeof(decodeHTML)=='function') {
			questionLines = decodeHTML(questionLines); //試著對文字解碼
		}
		var lines = questionLines.replace(/\r/g, '\n').split(/\n+/);
		question_lines = getValidValues(lines);
	} else {
		question_lines = getValidValues(questionLines);
	}
	//初始亂數取題的變數
	delete questionCurrendIndex;
	delete questionIndexRandom;
}
//題幹Q、正解O、錯X的選項在題庫中的排列順序
question_format = 'QOX';  //題幹,對的,錯的
if(typeof(fieldIndexNumberOfQuestion)=='undefined' || fieldIndexNumberOfQuestion==null || isNaN(fieldIndexNumberOfQuestion) || fieldIndexNumberOfQuestion!=1) {
	fieldIndexNumberOfQuestion = 0;
	question_format = 'QOX';  //題幹,對的,錯的
} else {
	fieldIndexNumberOfQuestion = 1;
	question_format = 'OQX';  //對的,題幹,錯的
}

//抽取一題，並製作成遊戲需要的格式
getOneQuestion = function(tools) {
	return tools.getOneQuestion(question_lines, [seperator, seperator2], question_format);
};
