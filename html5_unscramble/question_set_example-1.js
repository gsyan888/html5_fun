//-----------------------------------------------------------
// UNSCRAMBLE 題庫設定檔
//-----------------------------------------------------------

//字卡交換方式
// 0 : drag & drop    
// 1 : click
card_swap_mode = 1;

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
tts_base_url = 'https://translate.google.com/translate_tts?ie=UTF-8&tl='+tts_language+'&client=tw-ob&ttsspeed=1&q=';


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
split_seperator = " ";	//句子字串中，切割子字串的的分隔符號

//----------------
//題庫
//----------------
question_lines=new Array(
//------------------------------------下一行開始增加題目
  "What’s wrong?###怎麼了？"
, 'My leg hurts.###他的腳受傷了。'
, 'His hands hurt.###他的手受傷了。'
, 'Her foot hurts.###他的腳受傷了。'
, 'I have a headache.###我頭痛。'
, 'She has a toothache.###她牙痛。'
, 'She has a runny nose.###她流鼻水。'
, 'My eyes hurt.###mp3/8.mp3'
, 'Her arm hurts.###mp3/9.mp3'
, 'His ear hurts.###mp3/10.mp3'
//------------------------------------題庫結束,以下請勿修改
);


