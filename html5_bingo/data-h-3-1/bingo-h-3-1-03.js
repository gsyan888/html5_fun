﻿//-----------------------------------------------------------
// BINGO 題庫設定檔
//-----------------------------------------------------------
seperator = ",";	//題目字串中，各欄位的分隔符號

//指定答案、題幹
answer_field_number = 0;		//答案在第幾欄位(由 0 起算)
question_field_number = 3;		//題幹在第幾欄位(由 0 起算)

description_field_number = 2;	//解釋在第幾欄位(由 0 起算)

//針對成語的額外欄位
phonics_field_number = 1;		//注音符號在第幾欄位(由 0 起算)
auto_replace_answer = "yes";	//是否自動將題幹中帶有的答案字串用括號取代

//
// 題庫
//
// 每對引號中的即是一個問題的設定
//
question_lines=new Array(
//------------------------------------下一行開始增加題目
  '平分秋色,ㄆㄧㄥˊ ㄈㄣ ㄑㄧㄡ ㄙㄜˋ,形容兩者一樣出色，不分高下。,這兩篇文章平分秋色，因此並列第一。 '
, '安居樂業,ㄢ ㄐㄩ ㄌㄜˋ ㄧㄝˋ,人民生活安定和樂，且都有自己喜好的工作。語本〈漢書˙卷九十一˙貨殖傳˙序〉。,在戰火的蹂躪之下，人民絕對無法安居樂業。'
, '世外桃源,ㄕˋ ㄨㄞˋ ㄊㄠˊ ㄩㄢˊ,比喻風景優美而人跡罕至的地方。,這裡風光秀麗，景色怡人，真是個世外桃源。'
, '有始有終,ㄧㄡˇ ㄕˇ ㄧㄡˇ ㄓㄨㄥ,做事貫徹到底。,老師勉勵我們做事要有始有終，才能達成目標。'
, '飲水思源,ㄧㄣˇ ㄕㄨㄟˇ ㄙ ㄩㄢˊ,喝水時，想到水的來源。比喻不忘本。語本〈北周˙庾信˙徵調曲六首之六〉。,他深知飲水思源的道理，所以對於贊助公益活動以回饋社會，總是不遺餘力。'
//------------------------------------題庫結束,以下請勿修改
);


