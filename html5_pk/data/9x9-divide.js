//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。兩邊都按GO以後開始PK";


//多少的乘法表
timesTables = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9 ); 


//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	//以九九乘法表為基礎的除法
	//由 1~9 中抽出一個商
	var tempRandom = tools.makeRandomIndex(1, 9);
	var answer = tempRandom[ Math.floor(Math.random()*9) ];
	//由 1~9 中抽出一個除數
	var tempRandom = tools.makeRandomIndex(0, timesTables.length-1);
	var r = tempRandom[ Math.floor(Math.random()*timesTables.length) ];
	var n2 = timesTables[ r ];
	//計算被除數
	var n1 = n2*answer;
	
	//組合成題幹
	var question = n1 + ' ÷ ' + n2 + ' = ?';		//題幹
		
	//以亂數產生錯的選項
	var ngOptions = tools.makeRandomIndex(0, 9);	//其它選項比解答加減多少(用亂數排)
	for(var j=0; j<ngOptions.length; j++) {
		if(ngOptions[j] == answer) {
			ngOptions.splice(j,1);	//把正解的去掉
		}
	}
	
	var op = new Object();
	op.optionsOK = new Array();
	op.optionsNG = new Array();
	
	op.question = question;
	op.optionsOK[0] = answer;
	op.optionsNG = ngOptions;

	return op;
}
