//=======================================================
// HTML5 FUN 題庫設定檔 football,basketball (兩欄式題庫)
//=======================================================

///基本設定
//------------------------------
//上方看板的標題字
//------------------------------
title = '足球高手';

//------------------------------
//共有幾個選項(足球高手最多4個, 籃球高手最多5個)
//------------------------------
optionsTotal = 5;

//------------------------------
//答對時加幾分
//------------------------------
scoreToAdd = 10;		

//------------------------------
//答錯時扣幾分
//------------------------------
scoreToMinus = -5;	

//------------------------------
//是否預覽題目(僅適用於同音字,多音字或形近字)
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
fieldIndexNumberOfQuestion = 1;

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
