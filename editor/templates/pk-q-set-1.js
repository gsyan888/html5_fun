//=======================================================
// HTML5 FUN PK 題庫設定檔
//=======================================================

//基本設定
//------------------------------
//共有幾個選項
//------------------------------
optionsTotal = 6;

//------------------------------
//一列有幾個選項
//------------------------------
optionColTotal = 3;

//------------------------------
//開始比賽前, 說明對話框的說明文字
//------------------------------
helpText = "請找出正確的答案。";

//------------------------------
//語文高手題型是否預覽題目
//------------------------------
preview_enable = false;

//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------
//
//欄位分隔符號為兩個井字號(##)
seperator = '##';


//
//【題目設定】
//  一行一題, 
//  欄位左起
//    第一欄為題幹
//    第二欄為答案(數字, 選項的第幾個)
//    第三欄以後為選項，包括對的跟錯的
//
questionLines = function(){/*--這一行請勿更改--

小狗##1##dog##hat##cup##cat
杯子##3##dog##hat##cup##cat
帽子##2##dog##hat##cup##cat
貓咪##4##dog##hat##cup##cat

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);


/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
//去掉空的
getValidValues = function(data) {
	var values = [];
	for(var i=0; i<data.length; i++) {
		if((data[i].replace(/\s/g, ''))!='') {
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
//抽取一題，並製作成遊戲需要的格式
getOneQuestion = function(tools) {
	var question,
		answer,
		answerAt,
		okArray,
		ngArray,
		questionAndOptions;
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
		//以亂數取得一筆題庫
		var line = question_lines[questionIndexRandom[questionCurrendIndex++]];
		//以欄位分隔符號將各欄分開
		var fields = getValidValues(line.split(seperator));
		if(fields.length>=4 && !isNaN(fields[1])) {
			//題幹
			question = fields[0];
			//對的答案
			answerAt = 1+Number(fields[1]);
			okArray = [fields[answerAt]]; //單選的正解
			//錯的答案
			ngArray = [];
			for(var i=2; i<fields.length; i++) {
				if(i!=answerAt ) {
					ngArray.push(fields[i]);
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

