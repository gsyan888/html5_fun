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
		
      "question_field_number": [
        "text",
        "指定題幹在第幾欄位(由 0 起算)"],
		
      "answer_field_number": [
        "text",
        "指定答案在第幾欄位(由 0 起算)"],

      "auto_replace_answer": [
        "checkbox",
        "是否自動將題幹有答案的字串用括號置換",
        "勾選:將答案刪除,換成括號 &nbsp;&nbsp; 未勾選:保持原內容",
        "自動處理題庫的填空"],		

      "phonics_field_number": [
        "text",
        "注音符號在第幾欄位(由 0 起算)",
		"(成語題型的額外欄位)"],

      "description_field_number": [
        "text",
        "解釋在第幾欄位(由 0 起算)",
		"(成語題型的額外欄位)"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
