//-----------------------------------------------------------
// UNSCRAMBLE 題庫設定檔
//-----------------------------------------------------------

//是否隨機出題
select_questions_in_random = true;
//出題數
number_of_questions = 20;
//語音自動重播播放的次數
sound_autoPlayLoop = 3;
//隔多久重播(單位:秒)
sound_autoPlayDelay = 1;

//字卡交換方式
// 0 : drag & drop    
// 1 : click
card_swap_mode = 0;

//是否使用「送出答案」的按鈕
// true : 玩家按「送出答案」才核對答案
// false : 卡片換位置後就自動對答案
enableSubmitButton = true;


//----------------
//遊戲開始前的說明對話框設定
//----------------
help_title = '說明';	//標題
help_description = '請排出正確的答案。加油！';	//說明
help_button_caption = '開始';	//按鈕上的文字



//----------------
//音效控制
//----------------
//是否播放語音
sound_enabled = true;
//是否自動播放語音 true : 自動播放 / false : 按播放鈕才播放
sound_autoPlay = true;
//是否使用 TTS 的語音
tts_enabled = true;
//將題庫中的哪一個欄位的文字轉語音(由 0 起算)
tts_is_at_index = 0;

//----------------
//Google TTS 文字轉語音的設定
//----------------
tts_language = 'en';  // en : 英語,   zh_tw : 中文
tts_speed = 0.3;  //語音的速度 0 ~ 1 (可用小數)
tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed='+tts_speed+'&q=';

//----------------
// 題庫
//----------------
//
// 每對引號中的即是一個問題的設定
// 問題設定中可以有兩個欄位
// 第二個欄位可指定語音檔路徑，如果未指定，會使用 Google TTS 
//
// 本範例中，單字間用空白來切割；
// 前七題用 Google TTS 發音
// 後三題指定了第二個欄位，使用 mp3 目錄中的語音檔
//
//----------------
//資料分割符號設定
//----------------
//先以 data_seperator 分割, 
//再以 split_seperator 分割
data_seperator = "###";	//題目字串中，各欄位的分隔符號
split_seperator = "-";	//句子字串中，切割子字串的的分隔符號

//是否以字串長度來切割子字串,
//	如果設為 true, 題庫第一欄位會以長度來切割
//	如果設為 false (預設值), 題庫第一欄位會以 split_seperator 來切割
split_by_length = true;	
split_by_length_substring_length = 1;	//當 split_by_length 為 true , 子字串多長


//----------------
//題庫
//----------------
question_lines=new Array(
//------------------------------------下一行開始增加題目
  "beef noodles###牛肉麵"
, "dumpling###水餃"
, "papaya###木瓜"
, "black tea###紅茶"
, "iron egg###鐵蛋"
, "flavor###口味"
, "dollar###元"
, "stomach###胃"
, "guava###芭樂"
, "rice###米飯"
, "diet###飲食，節食"
, "meat###肉類"
, "fruit###水果"
, "vegetable###蔬菜"
, "junk food###垃圾食物"
, "dinner###晚餐"
, "stand###攤位"
, "room###空間"
//------------------------------------題庫結束,以下請勿修改
);
