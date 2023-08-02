//=======================================================
// HTML5 FUN 題庫設定檔 Wheel 幸運轉盤
//=======================================================

//------------------------------
//轉盤扇形上的圖片是否用圓形的
//true:圓形 , false:矩形
//------------------------------
wheel_image_round_enable = false;

//------------------------------
//扇形上面的文字顏色設定
//------------------------------
wheel_items_font_color = "#000000";

//------------------------------
//扇形上面的文字對齊方向 
//可用的設定值: left , center , right
//------------------------------
wheel_items_text_align = "center";


//------------------------------
//扇形可用的顏色
//每個色碼用逗號或跳格來隔開
//------------------------------
wheel_colors = '#DDDDDD , #FF88C2 , #FF8888 , #FFA488 , #FFBB66 , #FFDD55 , #FFFF77 , #DDFF77 , #BBFF66 , #66FF66 , #77FFCC , #77FFEE , #66FFFF , #77DDFF , #99BBFF , #9999FF , #9F88FF , #B088FF , #D28EFF , #E38EFF , #FF77FF';


//------------------------------
//Google TTS 文字轉語音的設定
//------------------------------
//合成語音預設的語言代碼:  'en-US' 'zh-TW'
//------------------------------
tts_language = 'zh-TW';

//------------------------------
//合成語音的速度 0 ~ 1 (可用小數)
//------------------------------
tts_speed = 0.75;  


//--------------------------------------
//題庫設定與分隔符號
//--------------------------------------

//------------------------------
//欄位分隔符號為兩個井字號(##)
//------------------------------
wheel_fields_seperator = '##';

//------------------------------
//素材分隔符號
//------------------------------
wheel_media_seperator = '~~';

//
//[題庫設定] 設定轉盤項目的內容
//
//  一行一個問題的設定
//
//  每一個問題以 ## 當欄位分隔符號
//    第一欄是顯示在轉盤上的文字或是圖片
//    第二欄是選中以後要顯示的內容(也可以沒有第二欄)
//
//  第二欄中以 ~~ 當分隔，可放入不同的素材
//    目前支援的素材有：
//      - 文字
//      - 圖片檔
//      - 聲音檔: .mp3
//      - 合成語音: .tts 
//        念英文: dog.en-US.tts  
//        念中文: 小狗.zh-TW.tts
//      - 影片: .mp4, Youtube影片
//
questionLines = function(){/*--這一行請勿更改--

純文字題##eyes 的中文是什麼？
純圖片題##https://gsyan888.github.io/html5_fun/html5_wheel/sample/cat.png
純聲音題##https://gsyan888.github.io/html5_fun/html5_wheel/sample/eye.mp3

文字+圖片##圖片中的動物英文是什麼？~~https://gsyan888.github.io/html5_fun/html5_wheel/sample/cat.png
文字+英文合成語音##聽聽看，它的中文該怎麼說？~~dog.en-US.tts
文字+中文合成語音+圖片##聽聽看，在圖上找出語音說的部位~~眼睛.zh-TW.tts~~https://gsyan888.github.io/html5_fun/html5_wheel/sample/cat.png

Youtube影片題##https://www.youtube.com/watch?v=N880o8og3vo&start=1&end=26

https://gsyan888.github.io/html5_fun/html5_wheel/sample/train.png##這題用火車圖片當選單

https://gsyan888.github.io/html5_fun/html5_wheel/sample/worm.png
https://gsyan888.github.io/html5_fun/html5_wheel/sample/giraffe.png

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);

