//

menuSettingFilename = 'pk_menu_set.js';	//選單的檔名

soundDataFilename = 'sound_data.js';	//聲音檔的檔名

//設定
questionsToAnswer = 10;	//一回合要回答幾題

helpTextDefault = '兩邊都按完GO後開始PK';	//預設的說明文字

//要 pk 多少的乘法表
timesTables = new Array( 1, 2, 3, 4, 5, 6, 7, 8, 9 ); 

scoreToAdd = 10;		//答完加減幾分

playerHeight = 100;		//角色圖高
rotation = 25;			//角色圖開始爬山要先旋轉幾度以符合爬山的姿態

key_map = new Array();

//Player1 的按鍵對照
key_map[0] = new Array(
	'Q', 'W', 'E', 'A', 'S', 'D'
);	

//Player2 的按鍵對照
key_map[1] = new Array(
	'NUM_SEVEN', 'NUM_EIGHT', 'NUM_NINE', 'NUM_FOUR', 'NUM_FIVE', 'NUM_SIX'
);	



/******************************************************************
//鍵盤按鍵名稱與 keycode 的對照表
//底下資料非必要,不要修改
 ******************************************************************/
keyCodes = {
  0: 48,			//一般數字鍵(非九宮格)
  1: 49,
  2: 50,
  3: 51,
  4: 52,
  5: 53,
  6: 54,
  7: 55,
  8: 56,
  9: 57,
  A: 65,			//字母鍵
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  NUM_ZERO: 96,		//鍵盤中九宮格的數字鍵代碼 NUM_xxx
  NUM_ONE: 97,
  NUM_TWO: 98,
  NUM_THREE: 99,
  NUM_FOUR: 100,
  NUM_FIVE: 101,
  NUM_SIX: 102,
  NUM_SEVEN: 103,
  NUM_EIGHT: 104,
  NUM_NINE: 105
};

