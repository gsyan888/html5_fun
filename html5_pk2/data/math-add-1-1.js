//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";


//number1 operator number2 = ?
number1Min = 1;  //number1 最小
number1Max = 9;  //number1 最大

number2Min = 1;  //number2 最小
number2Max = 9;  //number2 最大

operator = '+';  //運算子


//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	var question, 
		answer,
		n1,
		n2,
		offset,
		r,
		temp,
		opSymbol,
		ngMin,
		ngOffset;
		
	
	
	//抽出 number1
	//r = tools.makeRandomIndex(number1Min, number1Max);
	//n1 = r[tools.makeRandomIndex(0, r.length*2)[0]%r.length];
	offset = number1Max-number1Min;	
	n1 = number1Min+Math.floor(Math.random()*offset*3)%offset+1;
	
	//抽出 number2
	//r = tools.makeRandomIndex(number2Min, number2Max);
	//n2 = r[tools.makeRandomIndex(0, r.length*2)[0]%r.length];
	offset = number2Max-number2Min;
	n2 = number2Min+Math.floor(Math.random()*offset*3)%offset+1;


	//計算答案
	if(operator=='+') {
		opSymbol = '＋';
		answer = n1+n2;	//答案
	} else if(operator=='-') {
		opSymbol = '－';
		if(n1-n2<0) {
			temp = n1;
			n1 = n2;
			n2 = temp;
		}
		answer = n1-n2;	//答案
	}	
	
	//組合成題幹
	var question = n1 +' '+opSymbol+' '+ n2 + ' = ?';		//題幹

	//製作其它非正解的選項
	//以亂數產生要由答案再加減多少
	if(answer-4>0) {
		ngMin = -4;
	} else {
		ngMin = 1-answer;
	}
	if(number1Max<10) {
		ngOffset = 11;
	} else {
		ngOffset = 21;
	}
	var nRandom = tools.makeRandomIndex(ngMin, ngMin+ngOffset);	//其它選項比解答加減多少(用亂數排)
	for(var j=0; j<nRandom.length; j++) {
		if(nRandom[j] == 0 ) {
			nRandom.splice(j,1);	//將是答案者去掉
			break;
		}
	}

	var op = new Object();
	op.optionsOK = [];
	op.optionsNG = [];
	
	op.question = question;
	op.optionsOK[0] = answer;
	for(var i=0; i<nRandom.length; i++) {
		op.optionsNG[i] = answer+nRandom[i];
	}
	return op;
}
