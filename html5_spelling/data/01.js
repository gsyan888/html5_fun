//=======================================================
// HTML5 Spelling 題庫設定檔: 使用自定的 MP3 語音檔
//=======================================================

//---------------------------------------------------
//上方看板的標題字
//---------------------------------------------------
title = '單字高手';

//---------------------------------------------------
//上載成績單記錄的網址
//---------------------------------------------------
logger_url = ''


//
//---------------------------------------------------
//【TTS 語音設定】
//---------------------------------------------------
//
//是否使用 TTS 的語音(使用: true, 不使用: false)
tts_enabled = false;

//
//----------------
//Google TTS 文字轉語音的設定
//【注意】不能和 iSpeech TTS 同時使用
//----------------
//
//如果要使用 Google TTS，就拿掉下面這[4行]最左邊的註解(兩個斜線)
//tts_language = 'en';  // en : 英語,   zh_tw : 中文
//tts_speed = 0.3;  //語音的速度 0 ~ 1 (可用小數)
//tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed='+tts_speed+'&q=';
//tts_cut_last_seconds = 0; //裁掉最後面的聲音長度(秒為單位)

//
//----------------
//iSpeech TTS 文字轉語音的設定
//【注意】不能和 Google TTS 同時使用
//----------------
//原始網站參數說明: http://www.ispeech.org/api/#voices-standard
//
//如果要使用 iSpeech TTS，就拿掉下面這[5行]最左邊的註解(兩個斜線)
//tts_language = 'ukenglishfemale';  //auenglishfemale , usenglishfemale , chchinesefemale
//tts_speed = 0;  	//語音的速度 10 ~ -10 (10:最快, 0:一般, -10最慢)
//tts_pitch = 100; 	//音高 0~200 (100:預設值)
//tts_base_url = 'https://www.ispeech.org/p/generic/getaudio?action=convert&pitch='+tts_pitch+'&speed='+tts_speed+'&voice='+tts_language+'&text=';
//tts_cut_last_seconds = 2.54; //english: 2.54 chinese: 5.5 裁掉 iSpeech 最後面的聲音長度(秒為單位)


//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------

//---------------------------------
//是否以亂數抽題 true:亂數抽題 false:題庫依序使用
//---------------------------------
order_by_random = true;

//
//計時幾秒
timer = 60;

//
//答對一題加幾分
number_of_points_for_one_question = 10;

//答錯一題扣幾分
number_of_points_deduct = 0;

//總分達到多少時結束遊戲(大於 0 時才有作用)
number_of_points_goal = 0;


//語音播放的速度 (1.0 正常, 0.5 慢速, 2.0 兩倍速)
audioPlaybackRate = 1.0; 

//
//每題要拿掉幾個字母當填空
blanks_total_number = 2;

//
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//
//【題目設定】
//  一行一題, 
//  欄位左起
//    第一欄為英文
//    第二欄為中文
//    第三欄為MP3語音檔的路徑(沒有的話，tts_enabled = true 會以第一欄為TTS的朗讀內容)
//
questionLines = function(){/*--這一行請勿更改--
dog##小狗
cat##貓
cow##牛
mouse##老鼠
chicken##雞##mp3/chicken.mp3
monkey##猴子##mp3/monkey.mp3
tiger##老虎
goat##羊
horse##馬
hippo##河馬
-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);
