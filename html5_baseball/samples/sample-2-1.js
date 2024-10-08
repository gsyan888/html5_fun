﻿//=======================================================
// HTML5 FUN 題庫設定檔 Baseball (兩欄式題庫)
//=======================================================

//基本設定
//------------------------------
//共有幾個選項
//------------------------------
optionsTotal = 9;

//------------------------------
//一列有幾個選項(pk, 王牌投手用)
//------------------------------
optionColTotal = 3;

//------------------------------
//每個選項的寬度
//------------------------------
optionWidth = 100;

//------------------------------
//每個選項的高度
//------------------------------
optionHeight = 100;

//------------------------------
//開始比賽前, 說明對話框的說明文字
//------------------------------
helpText = "請找成語中少的那個字。";

//---------------------------------------------------
// [題庫]
//---------------------------------------------------

//------------------------------
//欄位分隔符號為兩個井字號(##)
//------------------------------
seperator = '##';

//------------------------------
//多個選項的分隔符號
//------------------------------
seperator2 = '~~';

// [題目設定]
//  兩欄式題庫
//  由眾多題目中，自動產生選項
//
//  一行一題, 
//  每一題以欄位分隔符號(##)分隔為兩欄
//  欄位左起
//    第一欄為題幹
//    第二欄為答案
//
//  底下的範例
//	  1.採用兩欄式的題庫
//	  2.有使用「國字加注音」的格式，可以在國字旁加上直式注音
//
question_lines = function(){/*--這一行請勿更改--

ㄋㄨㄥˋ弄 ㄑㄧㄠˇ巧 ㄔㄥˊ成 ㄓㄨㄛˊ拙##ㄋㄨㄥˋ弄
ㄌㄠˊ勞 ㄧㄢˋ燕 ㄈㄣ分 ㄈㄟ飛##ㄧㄢˋ燕
ㄧㄥ鶯 ㄕㄥ聲 ㄧㄢˋ燕 ㄩˇ語##ㄧㄥ鶯
ㄈㄤˊ防 ㄨㄟˊ微 ㄉㄨˋ杜 ㄐㄧㄢˋ漸##ㄉㄨˋ杜
ㄐㄩㄢ涓 ㄉㄧ滴 ㄍㄨㄟ歸 ㄍㄨㄥ公##ㄐㄩㄢ涓
ㄕ詩 ㄑㄧㄥˊ情 ㄏㄨㄚˋ畫 ㄧˋ意##ㄕ詩

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);



/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	return tools.getOneQuestion(question_lines, [seperator, seperator2]);
};

