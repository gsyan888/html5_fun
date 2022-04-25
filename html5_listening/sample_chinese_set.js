//
//【測試區塊】
//-------------------------------
//用來偵測換行字元用的測試區塊
//請勿更動
//並且放在題庫設定區塊之前
//-------------------------------
//測試區塊開始
CR_LF_test = function(){/*--這一行請勿更改--
CR_LF testing block
-----*/}.toString().slice("function(){/*--這一行請勿更改--".length+2,-9);
CR_LF_First_Pos = CR_LF_test.indexOf('_LF')-'CR_LF'.indexOf('_LF');
//測試區塊結束
//-------------------------------
//
//設定參數
//
var URIformatVars = function(){/*--這一行請勿更改--
&title=中文測試(.js)&
&show_text=no&
&file_list=sample_chinese_mp3_list.js&
&images_folder=chinese&
&mp3_folder=chinese&
&col=3&
&questionsToAnswer=5&
&scoreToAdd=10,8,6,4,2,0&
&logger=&
-----*/}.toString().slice("function(){/*--這一行請勿更改--".length+2+(typeof(CR_LF_First_Pos)!='undefined' ? CR_LF_First_Pos:0),-9);

