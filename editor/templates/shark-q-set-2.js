﻿//=======================================================
// HTML5 FUN 題庫設定檔 搶救公主 (兩欄式題庫)
//=======================================================

//基本設定
//------------------------------
//共有幾個選項
//------------------------------
optionsTotal = 4;

//------------------------------
//一回合要回答幾題
//------------------------------
questionsToAnswer = 10;	

//------------------------------
//一回合的答題秒數
//------------------------------
timerDefault = 120;

//------------------------------
//是否用虛擬數字鍵盤輸入答案
//true: 使用虛擬鍵盤 false: 隱藏虛擬鍵盤
//------------------------------
numberKeyPadEnabled = false;

//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------
//
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//------------------------------
//題目的欄位: 0 或 1 (0 為左欄, 1為右欄)
//------------------------------
fieldIndexNumberOfQuestion = 0;

//
//【題目設定】
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
if(!(typeof(questionLines)=='undefined' || questionLines==null)) {
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
//抽取一題，並製作成遊戲需要的格式
getOneQuestion = function(tools) {
	var question,
		answer,
		answerAt,
		okArray,
		ngArray,
		questionAndOptions;
	var fieldIndexNumberOfAnswer = 1; //答案的欄位(由0起算)
	//修正有問題的欄位序號
	if(typeof(fieldIndexNumberOfQuestion)=='undefined' || fieldIndexNumberOfQuestion==null || isNaN(fieldIndexNumberOfQuestion) || fieldIndexNumberOfQuestion!=1) {
		fieldIndexNumberOfQuestion = 0;
	} else {
		fieldIndexNumberOfQuestion = 1;
	}
	if(fieldIndexNumberOfQuestion==1) {
		fieldIndexNumberOfAnswer = 0;
	}		
	if(typeof(question_lines)!='undefined' && question_lines!=null && question_lines.length>0) {
		//以亂數取用某一題題目，用完了再重新取用
		if(typeof questionCurrendIndex == 'undefined' 
			|| questionCurrendIndex == null
			|| typeof questionIndexRandom == 'undefined'
			|| questionIndexRandom == null
			|| questionCurrendIndex >= question_lines.length	) {
			
			questionIndexRandom = tools.makeRandomIndex(0, question_lines.length-1);
			questionCurrendIndex = 0;
		}
		//以亂數取得一筆題庫當題幹及正確選項
		var qIndex = questionIndexRandom[questionCurrendIndex++];
		var line = question_lines[qIndex];
		//以欄位分隔符號將各欄分開
		var fields = getValidValues(line.split(seperator));
		if(fields.length>=2) {
			//題幹
			//題幹
			question = fields[fieldIndexNumberOfQuestion];
			//對的答案
			okArray = [fields[fieldIndexNumberOfAnswer]]; //單選的正解
			//錯的答案
			//利用題庫中的其它題的答案當作錯誤的選項
			ngArray = [];
			var ngRandom = tools.makeRandomIndex(0, question_lines.length-1);
			for(var i=0; i<ngRandom.length; i++) {
				//不是正解那題就拿來當錯誤的選項
				if(ngRandom[i]!=qIndex) {
					line = question_lines[ngRandom[i]];
					fields = getValidValues(line.split(seperator));
					if(typeof(fields)!='undefined' && fields!=null && fields.length>1) {
						ngArray.push(fields[fieldIndexNumberOfAnswer]);
						if(ngArray.length>=optionsTotal) {
							break;
						}
					}
				}
			}
		}
	}
	//重組成物件,準備回傳
	if(typeof(question)!='undefined' 
		&& typeof(okArray)!='undefined' 
		&& typeof(ngArray)!='undefined'
		&& question!=null && okArray!=null && ngArray!=null) {
			
		questionAndOptions = {};
		questionAndOptions.question = question;		//題幹
		questionAndOptions.optionsOK = okArray;		//答案
		questionAndOptions.optionsNG = ngArray;		//錯的選項		
		//console.log(questionAndOptions);
	}
	return questionAndOptions;
};
