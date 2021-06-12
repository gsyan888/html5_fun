//對對碰題庫

//遊戲標題
title = '九九乘法對對碰(8)';

//字體名稱
font = '標楷體';

//是否顯示格子的編號(true, false)
showNumber = false;

//編號大小(相對於格子的比例)
numberLabelFontSizeScale = 0.4;

//答對時加多少分
scoreAdd = 100;

//答錯時扣多少分
scoreMinus = 150;

//是否覆蓋牌(true, false)
memoryMode = false;

//等幾秒才蓋牌
momorySeconds = 10;

//牌被選取時的邊框顏色
card_selected_border_color = '#ff0000';

//文字的顏色
card_text_color = '#ff6600';

//蓋牌時背面的圖案或文字
card_back = 'assets/smile.png';

//蓋牌時文字的顏色
card_back_color = '#006666';

//蓋牌時的背景顏色
card_back_text_color = '#ffffff';

//題庫欄位分隔符號
fields_seperator = ',';

//
// 題庫
//
//每對引號中的即是一個問題的設定
//每一個項目中以「半形逗號」當欄位分隔符號(參考 fields_seperator 設定)
//
//  目前支援的素材有：文字、圖片
//
cards = new Array(
//------------------------------------下一行開始增加題目
  '8x1,8'
, '8x2,16'
, '8x3,24'
, '8x4,32'
, '8x5,40'
, '8x6,48'
, '8x7,56'
, '8x8,64'
, '8x9,72'
//------------------------------------題庫結束,以下請勿修改
);

