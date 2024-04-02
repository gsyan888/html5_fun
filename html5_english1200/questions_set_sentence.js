﻿//每題有幾個選項
numberOfOptions = 2;

//每列最多可以有幾個選項
numberOfOptionsPerRow = 1;	

//是否自動顯示選項供作答(預設為 true; false 時需按[開始作答]鈕才會出現選項)
auto_show_options = true;

//每回合抽幾題題目
numberOfQuestionsPerRound = 10;

//出題時選擇題目的方式 true:亂數選題  false:按題庫順序
select_questions_in_random = false; 

//------------------------------
//選單按鈕上的文字，空白表示不出現按鈕
//------------------------------

//按鈕1: 聽音找第1欄位
item_button1_caption = "聽音找英文";

//按鈕2: 聽音找第2欄位 
item_button2_caption = "聽音找中文";

//按鈕3: 看第2欄位找第1欄位
item_button3_caption = "看中文找英文";

//按鈕4: 看第1欄位找第2欄位
item_button4_caption = "看英文找中文";

//聲音檔路徑的前置網址
//也就是會為 questionLines 的左欄前面自動加上的字串
//
// English 1200
soundBaseURL = 'https://gsyan888.github.io/english1200/';

//語音播放的速度(使用大於 0 的數字。例如:1.0 正常, 0.75 較慢速, 0.5 慢速, 1.5 快速, 2.0 兩倍速)
audioPlaybackRate = 1.0; 

//語音自動播放的次數。 
audioAutoPlayLoop = 1;

//隔多久重播(單位秒)
audioAutoPlayDelay = 0;


//是否使用 TTS 的語音
tts_enabled = true;

//----------------
//Google TTS 文字轉語音的設定
//----------------
tts_language = 'en';  // en : 英語,   zh_tw : 中文
tts_speed = 0.3;  //語音的速度 0 ~ 1 (可用小數)
tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed='+tts_speed+'&q=';


//題庫
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//左欄為聲音檔路徑
//右欄為中文
questionLines = function(){/*--這一行請勿更改--
Can he shake hands?##他會握手嗎？
What a cute dog!##好可愛的狗！
What can he do?##他會做什麼？
What else can he do?##他還會做什麼？
How smart!##多麼聰明呀！
What a small world!##世界真小！
He can do a lot of things.##他會做很多事情！
I'm an English teacher in a junior high school.##我是一名國中的英語老師。
-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);
