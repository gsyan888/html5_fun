﻿//-----------------------------------------------------------
// BINGO 題庫設定檔
//-----------------------------------------------------------
seperator = ",";	//題目字串中，各欄位的分隔符號

//指定答案、題幹
answer_field_number = 0;		//答案在第幾欄位(由 0 起算)
question_field_number = 3;		//題幹在第幾欄位(由 0 起算)

description_field_number = 2;	//解釋在第幾欄位(由 0 起算)

auto_replace_answer = "yes";	//是否自動將題幹中帶有的答案字串用括號取代

//
// 題庫
//
// 每對引號中的即是一個問題的設定
//
question_lines=new Array(
//------------------------------------下一行開始增加題目
  '氣象萬千,ㄑㄧˋ ㄒㄧㄤˋ ㄨㄢˋ ㄑㄧㄢ,形容景象千變萬化，極為壯觀。,這莊嚴秀麗、氣象萬千的長江真是美極了。'
, '江郎才盡,ㄐㄧㄤ ㄌㄤˊ ㄘㄞˊ ㄐㄧㄣˋ,比喻文思枯竭，無法再寫出好的作品。,所謂「讀書破萬卷，下筆如有神。」平時多閱讀，寫作時才不會有江郎才盡之嘆。'
, '自告奮勇,ㄗˋ ㄍㄠˋ ㄈㄣˋ ㄩㄥˇ,自動請求擔負冒險犯難的事。,他自告奮勇要替她排解這場糾紛。'
, '福至心靈,ㄈㄨˊ ㄓˋ ㄒㄧㄣ ㄌㄧㄥˊ,運氣來時，心思突然變得靈敏起來。,小王福至心靈，靈光一閃，想出一條絕妙好計，解決了眼前的難題。'
, '移風易俗,ㄧˊ ㄈㄥ ㄧˋ ㄙㄨˊ,改善社會的風氣或習俗。,惟有普及國民教育，提高文化水準，才能達到移風易俗的目的。'
//------------------------------------題庫結束,以下請勿修改
);

