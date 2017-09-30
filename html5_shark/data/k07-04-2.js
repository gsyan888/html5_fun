//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找正確的答案。大家都按GO以後開始PK";


//*************************************************************************
// 語文高手題庫:
//		每一行題庫以逗號當各欄位的分隔, 
//			第一欄位為標準答案,每個之間以一個半形空白隔開
//			第二欄位起為有加上注音的題目, 每組國字注音間以一個半形空白隔開
//  [例]
//	  "選項 選項 選項,題幹,題幹,題幹,題幹"	<--第一行
//	, "選項 選項 選項,題幹,題幹,題幹,題幹"	<--第二行以後的(最左邊多了逗號)
//
//  [題庫產生器] http://mail.lsps.tp.edu.tw/~gsyan/works/getph2.php
//**************************************************************************
question_lines = new Array(
//-------------------以下開始貼您的題庫--------------------------
  'ㄇㄨˋ募 ㄇㄨˋ幕 ㄇㄨˋ慕 ㄇㄨˋ墓,ㄇㄨˋ募 ㄎㄨㄢˇ款,ㄇㄨˋ募 ㄐㄩㄢ捐,ㄐㄧㄝ揭 ㄇㄨˋ幕,ㄎㄞ開 ㄇㄨˋ幕,ㄒㄧㄢˋ羨 ㄇㄨˋ慕,ㄧㄤˇ仰 ㄇㄨˋ慕,ㄙㄠˇ掃 ㄇㄨˋ墓,ㄇㄨˋ墓 ㄅㄟ碑'
, 'ㄅㄚˊ跋 ㄅㄚˊ拔,ㄅㄚˊ跋 ㄕㄢ山 ㄕㄜˋ涉 ㄕㄨㄟˇ水,ㄅㄚˊ拔 ㄧㄚˊ牙,ㄅㄚˊ拔 ㄏㄜˊ河'
, 'ㄌㄧˋ勵 ㄌㄧˋ礪 ㄌㄧˋ厲,ㄍㄨˇ鼓 ㄌㄧˋ勵,ㄐㄧ激 ㄌㄧˋ勵,ㄉㄧˇ砥 ㄌㄧˋ礪,ㄌㄧˋ礪 ㄕˊ石,ㄧㄢˊ嚴 ㄌㄧˋ厲,ㄌㄧˋ厲 ㄏㄞˋ害'
, 'ㄐㄩㄢ捐 ㄙㄨㄣˇ損,ㄐㄩㄢ捐 ㄒㄧㄢˋ獻,ㄐㄩㄢ捐 ㄗㄥˋ贈,ㄙㄨㄣˇ損 ㄕ失,ㄎㄨㄟ虧 ㄙㄨㄣˇ損'

//--------------------題庫結束------------------------------------
);

//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項


/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
 
/******************************************************************
 語文高手題庫格式專用
	形近字的選項都是國字
	多音字的選項都是注音
	同音字的選項都是國字+注音
 ******************************************************************/
//由題庫中抓出一題回傳
getOneQuestion = function() {
	if(typeof questionCurrendIndex == 'undefined' 
		|| typeof questionIndexRandom == 'undefined'
		|| questionCurrendIndex >= question_lines.length	) {
		
		questionIndexRandom = makeRandomIndex(0, question_lines.length-1);
		questionCurrendIndex = 0;
		questionCurrentSubIndex = 0;
	}
	//以亂數取得一筆題庫
	if(questionCurrentSubIndex == 0
			|| typeof questionFields == 'undefined'
			|| questionCurrentSubIndex >= questionFields.length ) {
		qLine = question_lines[questionIndexRandom[questionCurrendIndex++]];
		questionCurrentSubIndex = 1;
	}
	//以逗號將各欄分開
	questionFields = qLine.split(',');
	var question = questionFields[questionCurrentSubIndex++];
	var ngArray = questionFields[0].split(' ');
	answer = '';
	for(var i=0; i<ngArray.length; i++) {
		var ansAt = question.indexOf(ngArray[i]);
		if(ansAt >= 0) {
			if ( typeofword(ngArray[i]) == "注音" ) {
				//如果答案是注音, 一聲的注音就可能誤判，所以再檢查下一個字是否為 2,3,4 聲
				//如果找不到 2,3,4 聲的才是真正的標準答案
				var p = question.substr(ansAt+ngArray[i].length,1);
				if ( "ˊˇˋ".indexOf(p) == -1 || p == "") {
					answer = ngArray[i];
					ngArray.splice(i,1);	//把答案由其它選項中刪除，以免重覆出現
					break;
				}
			} else {
				answer = ngArray[i];
				ngArray.splice(i,1);	//把答案由其它選項中刪除，以免重覆出現
				break;
			}
		}
	}
	
	//重組成物件,準備回傳
	var op = new Object();
	
	op.question = question;	
	op.optionsOK = new Array();	
	op.optionsOK[0] = answer;
	op.optionsNG = ngArray;
	op.type = '注音';

	return op;
	
};