//=======================================================
// HTML5 Speaking 題庫設定檔
//=======================================================

//------------------------------
//出題時是否要以亂數來選題
//------------------------------
order_by_random = true;


//------------------------------
//預設的遊戲說明對話框的設定
//------------------------------
//標題字
helpDialogCaption = 'HTML5 FUN Speaking';

//說明文字(支援多行, 換行就加上「\n」
helpDialogDescription = '1.觀察畫面中央的提示。\n\n2.按麥克風的按鈕，變紅色麥克風後，以 [日文] 說出提示的字句。\n\n3.按 Check 鈕，送出答案。';

//按鈕上的文字
helpDialogButtonCaption = '開始';

//說明文字對齊的方式: left , right, center
helpDialogTextAlign = 'left';

//------------------------------
//遊戲模式按鈕上的文字
//------------------------------
gameMode_1_Caption = '看日文\n說日文';	//模式1:題庫第1欄為問題，也是提示
gameMode_1_Caption = '看日+中\n說日文';	//模式2:題庫第1欄為問題，第1欄和第2欄為提示
gameMode_2_Caption = '看中文\n說日文';	//模式3:題庫第1欄為問題，第2欄和第3欄為提示

//------------------------------
//語音辨識的參數
//------------------------------
speechRecognitionContinuous = false;	//是否一直保持監聽辨識的狀態
speechRecognitionLang = 'ja-JP'; 		//語音辨識的語言 英文: 'en-US' , 中文: 'zh-TW'
speechRecognitionInterimResults = true; //是否有辨識結果就立即語音回報

//------------------------------
//語音播放速度的參數
//------------------------------
//使用大於 0 的數字。例如:1.0 正常, 0.75 較慢速, 0.5 慢速, 1.5 快速, 2.0 兩倍速
//設多個時，會依序並循環使用，每播放一次，就跳下一個數字，最後再從頭開始。
ttsPlaybackRate = [1.0, 0.75, 0.5]; 

//------------------------------
//是否可用鍵盤輸入 (false:禁用, true:可用)
//------------------------------
enableKeyboardInput = false;

//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------
//
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//
//【題目設定】
//  一行一題, 
//  欄位左起
//    第一欄為中文(不要加標點符號, 注意同音字 ex.他/她/它/牠...)
//    第二欄為英文
//    第三欄為圖片檔的路徑
//
questionLines = function(){/*--這一行請勿更改--

パン##麵包##https://cdn.pixabay.com/photo/2015/06/25/16/54/bread-821503__340.jpg
猫##貓##https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519__340.jpg
犬##狗##https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313__340.jpg
山##山##https://cdn.pixabay.com/photo/2014/10/07/13/48/mountain-477832__340.jpg
トラック##卡車##https://cdn.pixabay.com/photo/2014/11/17/12/15/semi-trailers-534577__340.jpg
トマト##番茄##https://cdn.pixabay.com/photo/2015/03/07/13/55/tomato-663097__340.jpg
今何時ですか##現在幾點鐘？##https://cdn.pixabay.com/photo/2017/09/15/06/30/african-american-2751276__340.jpg
どこへ行きますか##你要去哪裡？##https://cdn.pixabay.com/photo/2018/04/16/22/03/desktop-3326010__340.jpg
天気はどうですか##天氣如何？##https://cdn.pixabay.com/photo/2016/10/25/12/28/thunderstorm-1768742__340.jpg
天気##天氣 Tenki##https://cdn.pixabay.com/photo/2015/07/05/10/18/tree-832079__340.jpg
電気##電力 Denki##https://cdn.pixabay.com/photo/2014/10/26/15/25/pylon-503935__340.jpg

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);
