var editorOptions = {
  "bingo": {
    "caption": "Bingo賓果",
	
    "templates": [{
        "name": "兩欄式題庫: 題目##答案",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bingo-q-set-1.js"
      }, {
        "name": "出題光碟格式: 題幹##解答##選項1##選項2##選項3##選項4",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bingo-q-set-2.js"
      }, {
        "name": "成語題庫格式: 成語(0)##注音(1)##解釋(2)##例句(3)",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bingo-q-set-3.js"
      }
    ],
    
	"enableOpenInNewWindow": false,
    
	"options": {
		
      "helpText": [
        "text",
        "開始挑戰前, 說明對話框的說明文字"],
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
