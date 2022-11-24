
//題庫設定檔的檔名(*.js)
question_set_filename = "question_set.js";


//------------------------------
//出題時是否要以亂數來選題
//  true :亂數出題   false :按題庫順序
//------------------------------
order_by_random = true;


//字卡的相關設定
card_border = 1;					//邊框粗細
card_border_color = "#a52a2a";		//邊框顏色
card_caption_color = "#886600";		//標題字的顏色
card_text_color = "#000000";		//第一面字的顏色
card_back_text_color = "#6F4E37";	//第二面字的顏色

// 字體設定
card_caption_font = "'標楷體' , 'BiauKai'"; //卡片組上方標題的字體
card_label_font = "'標楷體' , 'BiauKai'"; //卡片內文字的字體


//背景顏色
card_background_color = new Array(
"#FFB7DD" , "#FFCCCC" , "#FFC8B4" , "#FFDDAA" ,
"#ffefd5" , "#6495ed" , "#00ff7f" , "#b8860b" , 
"#ee82ee"
);


//--------------------------------------------------------------
// 音效設定
//--------------------------------------------------------------

//
// 是否使用翻卡音效 (true: 使用, false: 不使用)
//
sound_enable = true;

//--------------------------------------------------------------
// 音效檔案
//--------------------------------------------------------------
// MP3 base64 encode tools
// 		https://codepen.io/xewl/pen/NjyRJx
//
sound_flip_file = 'assets/sound_flip.mp3';
sound_flip_mp3 = 'data:audio/mp3;base64,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';


