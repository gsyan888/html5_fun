var editorOptions = {
  "monster": {
    "caption": "詞語大挑戰",
	
    "templates": [{
        "name": "三欄式題庫: 題目##正確1~正確2##錯誤1~~錯誤2~~錯誤3",		
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/monster-q-set.js"
      }
    ],
    
	"enableOpenInNewWindow": false,
    
	"options": {
		
      "blank_pattern": [
        "text",
        "題幹文字中, 要被就置換成括號的字串(符號)"],
		
      "blank_replacement": [
        "text",
        "題幹填空的地方, 置換成底下的字串"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
