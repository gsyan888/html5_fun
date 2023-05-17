var editorOptions = {
  "bubble": {
    "caption": "Bubble大挑戰",
	
    "templates": [{
        "name": "名詞找量詞: 名詞##量詞對1~~量詞對2##量詞錯1~~量詞錯2~~量詞錯3##解說",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bubble-q-set-1.js"
      }, {
        "name": "量詞找名詞: 量詞##名詞對1~~名詞對2##名詞錯1~~名詞錯2~~名詞錯3##解說",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bubble-q-set-2.js"
      }
	  /*
	  , {
        "name": "字詞填空: ##正確1~~正確2##錯誤1~~錯誤2~~錯誤3##解說",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/bubble-q-set-3.js"
      }
	  */
    ],
    
	"enableOpenInNewWindow": false,
    
	"options": {

      "title": [
        "text",
        "上方的標題字"],
				
      "numberOfQuestionsPerGame": [
        "text",
        "由題庫中抽幾道題目來作答",
		"(0:表示使用全部的題庫)"],
		
      "question_type": [
        "text",
        "題目類型: 隨選數字加到哪一個欄位",
		"[0]都不加數字  [1]加到題幹  [2]加到選項(泡泡)"],

      "question_number_string": [
        "text",
        "可使用的數字列表",
		"多個間用逗號分隔"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
