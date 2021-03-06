﻿//-----------------------------------------------------------
// BINGO 題庫設定檔
//-----------------------------------------------------------
seperator = ",";	//題目字串中，各欄位的分隔符號

//指定答案、題幹
answer_field_number = 0;		//答案在第幾欄位(由 0 起算)
question_field_number = 3;		//題幹在第幾欄位(由 0 起算)

//針對成語的額外欄位
phonics_field_number = 1;		//注音符號在第幾欄位(由 0 起算)
description_field_number = 2;	//解釋在第幾欄位(由 0 起算)

auto_replace_answer = "yes";	//是否自動將題幹中帶有的答案字串用括號取代

//
// 題庫
//
// 每對引號中的即是一個問題的設定
//
question_lines=new Array(
//------------------------------------下一行開始增加題目
  '殺雞儆猴,ㄕㄚ　ㄐㄧ　ㄐㄧㄥˇ　ㄏㄡˊ,比喻懲罰一個人以警告另一個人。 ,老師嚴厲處罰帶頭吵鬧的學生，終於達到殺雞儆猴的效果。'
, '循序漸進,ㄒㄩㄣˊ　ㄒㄩˋ　ㄐㄧㄢˋ　ㄐㄧㄣˋ,按照一定的次序與步驟逐漸推進。 ,學習數學一定要由淺而深，循序漸進，千萬不可躁進。'
, '各自為政,ㄍㄜˋ　ㄗˋ　ㄨㄟˊ　ㄓㄥˋ,各依自己的主張行事，不顧全整體。,政府官員如果各自為政的話，將會造成國家的危機。'
, '憤世嫉俗,ㄈㄣˋ　ㄕˋ　ㄐㄧˊ　ㄙㄨˊ,形容對腐敗的社會現狀及庸俗世態的痛恨。,王先生因為長期失業，漸漸變得憤世嫉俗。'
, '心花怒放,ㄒㄧㄣ　ㄏㄨㄚ　ㄋㄨˋ　ㄈㄤˋ,指如花純淨的本心，豁然開朗，發放光明。形容心情極其快活。,姐姐的書法作品得到老師的稱讚，讓她一整天都心花怒放。'
, '胡作非為,ㄏㄨˊ　ㄗㄨㄛˋ　ㄈㄟ　ㄨㄟˊ,指不顧法紀或不講道理的任意妄為。貶義。,這些貪官汙吏私吞國家賑災的錢糧，簡直是胡作非為！'
, '嗤之以鼻,ㄔ　ㄓ　ㄧˇ　ㄅㄧˊ,嗤，譏笑。「嗤之以鼻」指用鼻子哼氣譏笑某一人事物，以表示不屑、鄙視。,小玲對於同學所談論的明星八卦總是嗤之以鼻。'
//------------------------------------題庫結束,以下請勿修改
);


