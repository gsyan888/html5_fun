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
preview_enable = true;

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
//  語文高手題庫支援同音字、多音字及形近字
//  題庫可以利用 [雄:HTML5:語文高手題庫&國字加注音產生器] 製作
//    https://gsyan888.blogspot.com/2022/11/html5-bopomofo-format-generator.html
//
questionLines = function(){/*--這一行請勿更改--

伶 玲,ㄌㄧㄥˊ伶 ㄌㄧˋ俐,ㄍㄨ孤 ㄌㄧㄥˊ伶 ㄌㄧㄥˊ伶,ㄌㄧㄥˊ玲 ㄌㄨㄥˊ瓏
ㄈㄥˋ ㄈㄥˊ,ㄇㄣˊ門 ㄈㄥˋ縫,ㄌㄧㄝˋ裂 ㄈㄥˋ縫,ㄒㄧㄝˊ鞋 ㄈㄥˋ縫,ㄈㄥˊ縫 ㄖㄣˋ紉,ㄈㄥˊ縫 ㄓˋ製,ㄈㄥˊ縫 ㄏㄜˊ合
ㄇㄨˋ募 ㄇㄨˋ幕 ㄇㄨˋ慕 ㄇㄨˋ墓,ㄇㄨˋ募 ㄎㄨㄢˇ款,ㄇㄨˋ募 ㄐㄩㄢ捐,ㄐㄧㄝ揭 ㄇㄨˋ幕,ㄎㄞ開 ㄇㄨˋ幕,ㄒㄧㄢˋ羨 ㄇㄨˋ慕,ㄧㄤˇ仰 ㄇㄨˋ慕,ㄙㄠˇ掃 ㄇㄨˋ墓,ㄇㄨˋ墓 ㄅㄟ碑

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
	//語文高手使用 pk 系列內建的函數來隨選題目(指定類型為"語文高手")
	return tools.getOneQuestion(question_lines, "語文高手");
};

