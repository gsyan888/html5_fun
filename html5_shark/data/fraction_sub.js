//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";

denominatorMin = 2;	//分母最小
denominatorMax = 9;	//分母最大

numeratorMaxScale = 3;	//分子最大是分母的幾倍



//基本設定
optionHeight = 90;		//每個選項的高度
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	//分數相減
	
	//抽出一個分母
	var tempRandom = tools.makeRandomIndex(denominatorMin, denominatorMax);
	var r = Math.floor(Math.random()*tempRandom.length);
	var denominator = tempRandom[r];	//分母
	
	//抽出二個分子
	var tempRandom = tools.makeRandomIndex(1, Math.round(denominator*numeratorMaxScale));
	var r = Math.floor(Math.random()*tempRandom.length);
	var numerator1 = tempRandom[r];	//分子1
	var r = Math.floor(Math.random()*tempRandom.length);
	var numerator2 = tempRandom[r];	//分子2
	
	if(numerator2 > numerator1) {
		var t = numerator1;
		numerator1 = numerator2;
		numerator2 = t;
	}
	
	//組合成題幹
	var question = '';		//題幹
	// a+b/c => [a:b:c]
	var a = Math.floor(numerator1/denominator);
	var b = numerator1%denominator;
	if(b != 0) {
		question += '['+a+':'+b+':'+denominator+']';
	} else {
		question += a;
	}

	question += '-';
	
	var a = Math.floor(numerator2/denominator);
	var b = numerator2%denominator;
	if(b != 0) {
		question += '['+a+':'+b+':'+denominator+']';
	} else {
		question += a;
	}
	question += '= ?';
	
	//計算答案
	var answer = '';
	var numerator = numerator1 - numerator2;
	var a = Math.floor(numerator/denominator);
	var b = numerator%denominator;
	if(b != 0) {
		answer += '['+a+':'+b+':'+denominator+']';
	} else {
		answer += a;
	}
	
	//製作其它非正解的選項
	if(numerator-1 < 5) {
		var min = 1-numerator;
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
	/*
		a:c:b,
	*/
	
	var op = new Object();
	op.type = '分數';
	op.optionsOK = new Array();
	op.optionsNG = new Array();
	
	op.question = question;
	op.optionsOK[0] = answer;
	for(var i=0; i<nRandom.length; i++) {
		var ng = '';
		var n = numerator + nRandom[i];
		var a = Math.floor(n/denominator);
		var b = n%denominator;
		if(b != 0) {
			ng += '['+a+':'+b+':'+denominator+']';
		} else {
			ng += a;
		}	
		op.optionsNG[i] = ng;
	}
	//console.log(op);
	return op;
}
