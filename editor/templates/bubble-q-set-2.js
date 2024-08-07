﻿//=======================================================
// HTML5 FUN 題庫設定檔 Bubble 量詞大挑戰
//=======================================================

//-------------------------------
//上方的標題字
//-------------------------------
title = "名詞找量詞";


//-------------------------------
//由題庫中抽幾道題目來作答
//(0:表示使用全部的題庫)
//-------------------------------
numberOfQuestionsPerGame = 0;

//-------------------------------
//題目類型
// 0: 無論題幹或對,錯選項都不加數字
// 1: 隨選一個數字加到題庫的題幹欄位中
// 2: 隨選一個數字加到題庫對的選項和錯的選項欄位中
//-------------------------------
question_type = 2;	

//-------------------------------
//可使用的數字列表, 多個間用逗號分隔
//-------------------------------
question_number_string = "一,兩,三,四"; 

//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------

//-------------------------------
//[欄位分隔符號]
//題幹, 正確選項, 錯的選項, 解說對話框文字之間的欄位分隔符號
//將一行題庫分割為四個欄位
//-------------------------------
question_O_X_seperator = "##";

//-------------------------------
//[項目分隔符號]
//多個選項之間的分隔符號
//對, 錯都可多個, 都用同樣的符號
//-------------------------------
options_seperator = "~~";

//
//[題目設定]
//
// 一行一題
//   每一行以 [欄位分隔符號] ## 分為四欄
//   四欄由左而右, 分別是: 題幹, 正確選項, 錯的選項, 說明
//   正確選項和錯的選項都可以有多個, 用 [項目分隔符號] ~~ 分隔
//
questionLines = function(){/*--這一行請勿更改--

甘蔗##根##朵~~粒~~顆~~朵~~片##通常用「根」。
梅花##朵##個~~隻~~條~~粒~~份##朵是用於「花」。
松樹##棵##個~~隻~~條~~粒~~顆##通常是用「棵」。
絲瓜##條##粒~~朵~~顆~~片~~個##通常是用「條」。

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);
