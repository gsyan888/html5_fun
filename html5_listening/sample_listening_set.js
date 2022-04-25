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
&title=範例(.js)&
&file_list=sample_images_list.js&
&filename_escape=0&
&hideTools=0&
&autoHideSpeaker=1&
&autoGotoNext=1&
&debug=0&
&options_total=6&
&col=3&
&imageWidth=200&
&imageHeight=150&
&fontsize=36&
&fontname=Comic Sans MS&
&label_fontsize=30&
&label_fontname=Comic Sans MS&
&show_text=yes&
&first_letter_change_color=yes&
&questionsToAnswer=5&
&scoreToAdd=10,8,6,4,2,0&
&script_filename=list.bat&
&file_list_load_delay=2&
&images_folder=images&
&mp3_folder=mp3&
&logger=&
-----*/}.toString().slice("function(){/*--這一行請勿更改--".length+2+(typeof(CR_LF_First_Pos)!='undefined' ? CR_LF_First_Pos:0),-9);


