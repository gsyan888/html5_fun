//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";


denominatorMin = 2;	//分母最小
denominatorMax = 9;	//分母最大

numeratorMaxScale = 1.5;	//分子最大是分母的幾倍

multiplierMaxScale = 1;		//乘數最大是分母的幾倍; 

mixedNumeralEnabled	= false;	//被乘數是否用帶分數


//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	//分數乘以整數
	
	//抽出一個分母
	var tempRandom = tools.makeRandomIndex(denominatorMin, denominatorMax);
	var r = Math.floor(Math.random()*tempRandom.length);
	var denominator = tempRandom[r];	//分母
	
	//抽出一個分子
	if( Math.random()*10 <= 5) {	//出真分數的(50%)
		var tempRandom = tools.makeRandomIndex(1, denominator-1);
	} else {	//出假分數
		var tempRandom = tools.makeRandomIndex(1, Math.round(denominator*numeratorMaxScale));
	}
	var r = Math.floor(Math.random()*tempRandom.length);
	var numerator1 = tempRandom[r];	//分子1
	
	//以亂數出乘數
	var tempRandom = tools.makeRandomIndex(2, Math.round(denominator * multiplierMaxScale));
	var r = Math.floor(Math.random()*tempRandom.length);
	var multiplier = tempRandom[r];
	
	//組合成題幹
	var question = '';		//題幹
	// a+b/c => [a:b:c]
	if(numerator1%denominator == 0) {	//如果為整數(整除)就加一
		numerator1++;
	}
	var a = Math.floor(numerator1/denominator);
	var b = numerator1%denominator;
	if(mixedNumeralEnabled) {
		question += '['+a+':'+b+':'+denominator+']';		//帶分數
	} else {
		question += '['+numerator1+':'+denominator+']';		//假分數
	}

	question += 'x' + multiplier + '= ?';
	
	//計算答案
	var answer = '';
	var numerator = numerator1 * multiplier;
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
	return op;
}
