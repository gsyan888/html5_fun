var editorOptions = {
  baseball: {
    caption: "王牌投手",
	
    "templates": [{
        "name": "出題光碟格式: 題幹##解答##選項1##選項2##選項3##選項4",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/baseball-q-set-1.js"
      }, {
        "name": "兩欄式題庫: 題目##答案",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/baseball-q-set-2.js"
      }, {
        "name": "三欄式題庫: 題目##正確1~~正確2##錯誤1~~錯誤2~~錯誤3",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/baseball-q-set-3.js"
      }, {
        "name": "語文高手題庫: 同音字、多音字或形近字",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/baseball-q-set-4.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "helpText": [
        "text",
        "開始挑戰前, 說明對話框的說明文字"],

      "optionsTotal": [
        "text",
        "總共幾個選項"],

      "optionColTotal": [
        "text",
        "橫向有幾個選項"],
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
