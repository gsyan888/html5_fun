//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。";



decimal_places = 2;	//小數位數

//基本設定
optionsTotal = 6;		//共有幾個選項
optionWidth = 100;		//每個選項的寬度
optionHeight = 100;		//每個選項的高度
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	//抽出一個數
	var factor = Math.pow(10, decimal_places);
	var tempRandom = tools.makeRandomIndex(1, factor-1);
	var r = Math.floor(Math.random()*tempRandom.length);
	var n1 = tempRandom[r];
	//抽出一個數
	var tempRandom = tools.makeRandomIndex(1, factor-1);
	var r = Math.floor(Math.random()*tempRandom.length);
	var n2 = tempRandom[r];	
	
	//
	if( n1 < n2 ) {
		var smaller = n1;
		n1 = n2;
		n2 = smaller;
	}
	//組合成題幹
	var question = (n1/factor) + '-' + (n2/factor) + ' = ?';		//題幹
	//計算答案
	var answer = (n1 - n2)/factor;	//答案
		
	//製作其它非正解的選項
	var min = -3;
	//以亂數產生要由答案再加減多少
	var nRandom = tools.makeRandomIndex(min, 9);	//其它選項比解答加減多少(用亂數排)

	var op = new Object();
	op.optionsOK = new Array();
	op.optionsNG = new Array();
	
	op.question = question;
	op.optionsOK[0] = answer;
	var j = 0;
	for(var i=0; i<nRandom.length; i++) {
		var r = (n1 - n2 + nRandom[i])/factor;
		if( r != 0 && r != answer) {
			op.optionsNG[j++] = r;
		}
	}
	return op;
}
