//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";

numberKeyPadEnabled = true;	//用按鈕輸入答案

//多少的乘法表
timesTables = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9 ); 


//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	//由 1~9 中抽出一個被乘數
	var tempRandom = tools.makeRandomIndex(1, 9);
	var n1 = tempRandom[ Math.floor(Math.random()*9) ];	//被乘數
	//由 1~9 中抽出一個乘數
	var tempRandom = tools.makeRandomIndex(0, timesTables.length-1);
	var r = tempRandom[ Math.floor(Math.random()*timesTables.length) ];
	var n2 = timesTables[ r ];	//乘數
	//組合成題幹
	var question = n1 + ' x ' + n2 + ' = ?';		//題幹
	//計算答案
	var answer = n1*n2;	//答案
	
	//製作其它非正解的選項
	if(n1*n2-1 < 5) {
		var min = 1-n1*n2;
	} else {
		var min = -5;
	}
	//以亂數產生要由答案再加減多少
	var nRandom = tools.makeRandomIndex(min, 9);	//其它選項比解答加減多少(用亂數排)
	for(var j=0; j<nRandom.length; j++) {
		if(nRandom[j] == 0) {
			nRandom.splice(j,1);	//把零的去掉, 以免同一個答案出現兩次
		}
	}
	
	var op = new Object();
	op.optionsOK = new Array();
	op.optionsNG = new Array();
	
	op.question = question;
	op.optionsOK[0] = answer;
	for(var i=0; i<nRandom.length; i++) {
		op.optionsNG[i] = answer + nRandom[i];
	}
	return op;
}
