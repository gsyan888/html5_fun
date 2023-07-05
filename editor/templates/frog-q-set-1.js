//=======================================================
// HTML5 FUN 題庫設定檔 frog (出題光碟格式)
//=======================================================

//基本設定

//------------------------------
//答對時加幾分
//------------------------------
scoreToAdd = 10;		

//------------------------------
//答錯時扣幾分
//------------------------------
scoreToMinus = -5;	

//------------------------------
//總共出多少題(可不設定)
//題庫內的題目不足時，會重覆取用。
//設定為 0 表示做完題庫的所有題目即結束
//------------------------------
theNumberOfQuestions = 0;

//------------------------------
//青蛙的圖案路徑(可不設定)
//未設定時，使用預設的圖案
//------------------------------
frogIconPath = "";

//------------------------------
//Google TTS 文字轉語音的設定
//語言代碼:  'en-US' 'zh-TW'
//------------------------------
tts_language = 'zh-TW';

//語音的速度 0 ~ 1 (可用小數)
tts_speed = 0.75;  

//------------------------------
//題幹是文字題時，是否用 TTS 念出文字
//  true :念出文字   false :不使用此功能
//------------------------------
question_text_speaking_enabled = false;

//
//---------------------------------------------------
//【題庫設定】
//---------------------------------------------------
//
//欄位分隔符號為兩個井字號(##)
seperator = '##';

//------------------------------
//多個選項的分隔符號
//------------------------------
seperator2 = '~~';

//
//[題目設定]
//  一行一題, 
//  依出題光碟的格式, 欄位左起
//    第一欄為題幹
//    第二欄為答案(數字, 選項的第幾個)
//    第3,4,5,6欄為4個選項，包括對的跟錯的
//
questionLines = function(){/*--這一行請勿更改--

小狗##1##dog##hat##cup##cat
杯子##3##dog##hat##cup##cat
帽子##2##dog##hat##cup##cat
貓咪##4##dog##hat##cup##cat

-----*/}.toString().replace(/\r/g,"").slice("function(){/*--這一行請勿更改--".length+1,-9);


/******************************************************************
 * 以下為程式碼, 不要更動
 ******************************************************************/
//去掉空的
getValidValues = function (data) {
  var values = [];
  for (var i = 0; i < data.length; i++) {
    if ((data[i].replace(/\s/g, '')) != '') {
      values.push(data[i].trim());
    }
  }
  return values;
};
//轉換題庫為陣列，並檢查內容
question_lines = [];
if(!(typeof(questionLines)=='undefined' || questionLines==null)) {
  var lines;
  //一行行分解
  if (typeof(questionLines) == 'string') {
    if (typeof(decodeHTML) == 'function') {
      questionLines = decodeHTML(questionLines); //試著對文字解碼
    }
    lines = questionLines.replace(/\r/g, '\n').split(/\n+/);
  } else {
    lines = questionLines.slice();
  }
  lines = getValidValues(lines);
  question_lines = [];
  //將出題光碟格式轉為三欄式題庫(題目##答案##錯1~~錯2~~錯3)
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    //以欄位分隔符號將各欄分開
    var fields = getValidValues(line.split(seperator));
    var question = [];
    var ngArray = [];
    if (fields.length >= 4 && !isNaN(fields[1])) {
      //題幹
      question.push(fields[0]);
      //對的答案
      answerAt = 1 + Number(fields[1]);
      question.push(fields[answerAt]);
      //錯的選項
      for (var n = 2; n < fields.length; n++) {
        if (n !== answerAt) {
          ngArray.push(fields[n]);
        }
      }
      question.push(ngArray.join(seperator2));
    }
    question_lines.push(question.join(seperator));
  }
  //初始亂數取題的變數
  delete questionCurrendIndex;
  delete questionIndexRandom;
  //console.log(question_lines);
}
//抽取一題，並製作成遊戲需要的格式(PK系列使用)
getOneQuestion = function (tools) {
  //三欄式題庫使用 pk 系列內建的函數來隨選題目
  return tools.getOneQuestion(question_lines, [seperator, seperator2]);
};

