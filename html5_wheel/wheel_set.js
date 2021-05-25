//=================================================
//HTML Wheel 設定檔
//=================================================


//轉盤扇形上的圖片是否用圓形的(圓形:true , 矩形: false)
wheel_image_round_enable = false;

//扇形上面的文字顏色設定
wheel_items_font_color = "#000000";		//預設用黑色

//扇形上面的文字對齊方向 (left , center , rigth)
wheel_items_text_align = "center";


//題庫使用的分隔符號設定
wheel_fields_seperator = ";";	//欄位分隔符號
wheel_media_seperator = "#";	//素材分隔符號


//設定轉盤項目的內容
//每對引號中的即是一個項目(問題)的設定
//每一個項目中以「半形分號」當欄位分隔符號
//  第一欄是顯示在轉盤上的文字或是圖片
//  第二欄是選中以後要顯示的內容
//
//第二欄中可以利用「半形井字號」當分隔，可放入不同的素材
//  目前支援的素材有：文字、圖片檔或是聲音檔(.mp3)
//
wheel_questions = new Array(
//------------------------------------下一行開始增加項目
  "純文字題;eye 的中文是什麼？"
, "純圖片題;sample/cat.png"
, "純聲音題;sample/eye.mp3"
, "文字+圖片題;圖片中的動物英文是什麼？#sample/cat.png"
, "文字+聲音題;聽聽看，它的中文該怎麼說？#sample/eye.mp3"
, "文字+圖片+聲音;聽聽看，並在圖中出找出它說的部位#sample/cat.png#sample/eye.mp3"
, "sample/train.png;這題用火車圖片當選單"
, "sample/worm.png"
, "sample/giraffe.png"
//------------------------------------結束,以下請勿修改
);



//扇形可用的顏色
wheel_colors = [
	"#DDDDDD",
	"#FF88C2",
	"#FF8888",
	"#FFA488",
	"#FFBB66",
	"#FFDD55",
	"#FFFF77",
	"#DDFF77",
	"#BBFF66",
	"#66FF66",
	"#77FFCC",
	"#77FFEE",
	"#66FFFF",
	"#77DDFF",
	"#99BBFF",
	"#9999FF",
	"#9F88FF",
	"#B088FF",
	"#D28EFF",
	"#E38EFF",
	"#FF77FF"
];