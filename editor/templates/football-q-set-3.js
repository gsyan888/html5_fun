//=======================================================
// HTML5 FUN 題庫設定檔 football (三欄式題庫)
//=======================================================

//基本設定
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
scoreToMinus = -10;	

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
//多個選項的分隔符號
//------------------------------
seperator2 = '~~';

//
//【題目設定】
//  
//  一行一題, 
//  三欄式題庫，每一題以欄位分隔符號(##)分隔為三欄
//    [例] 題幹##正確選項##錯誤選項
//
//  正確選項及錯誤選項可再利用選項分隔符號(~~)分隔多個
//    [例] 題幹##正確1~~正確2##錯誤1~~錯誤2~~錯誤3
//
//
questionLines = function(){/*--這一行請勿更改--

他的惡作劇，讓大家(　)。##很生氣~~很討厭~~受不了~~發火##開心~~佩服~~喜歡~~喜愛~~感動
大自然的優美景色，叫人(　)。##開心~~驚訝~~喜歡~~喜愛~~感動~~感覺舒暢##臉色變青~~發抖~~手腳發軟~~昏倒~~尖叫

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
	//三欄式題庫使用 pk 系列內建的函數來隨選題目
	return tools.getOneQuestion(question_lines, [seperator, seperator2]);
};

