//=======================================================
// HTML5 FUN 題庫設定檔 PK (出題光碟格式)
//=======================================================

//基本設定
//------------------------------
//共有幾個選項
//------------------------------
optionsTotal = 6;

//------------------------------
//一列有幾個選項(pk, 王牌投手用)
//------------------------------
optionColTotal = 3;

//------------------------------
//開始比賽前, 說明對話框的說明文字
//------------------------------
helpText = "請找出正確的答案。";

//------------------------------
//是否預覽題目(適用於投籃高手同音字,多音字或形近字)
//------------------------------
preview_enable = false;

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
    if (!(fields.length < 4 || isNaN(fields[1]))) {
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

