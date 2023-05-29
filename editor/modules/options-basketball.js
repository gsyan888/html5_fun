var editorOptions = {
  basketball: {
    caption: "投籃高手",
	
    "templates": [{
        "name": "出題光碟格式: 題幹##解答##選項1##選項2##選項3##選項4",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-1.js"
      }, {
        "name": "兩欄式題庫: 題目##答案",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-2.js"
      }, {
        "name": "三欄式題庫: 題目##正確1~~正確2##錯誤1~~錯誤2~~錯誤3",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-3.js"
      }, {
        "name": "語文高手題庫: 同音字、多音字或形近字",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-4.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "optionsTotal": [
        "text",
        "最多幾個選項(最多5個)"],

      "scoreToAdd": [
        "text",
        "答對時加幾分"],

      "scoreToMinus": [
        "text",
        "答錯時扣幾分"],

      "preview_enable": [
        "checkbox",
        "同音字,多音字或形近字題型是否預覽題目",
        "勾選:作答前先預覽 &nbsp;&nbsp; 未勾選:不預覽",
        "啟用預覽功能"],	
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
