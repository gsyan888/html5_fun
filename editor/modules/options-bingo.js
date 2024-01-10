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

      "optionColTotal": [
        "text",
        "一列有幾個選項"],

      "enableBingoStar": [
        "checkbox",
        "是否在正中央加一個星號(奇數個選項時)",
        "勾選:加星號 &nbsp;&nbsp; 未勾選:完全不加星號",
        "奇數個選項時，加星號"],		

      "tts_language": [
        "text",
        "念題目時，TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],

      "tts_speed": [
        "text",
        "語音的速度",
		"0 ~ 1 (可用小數)"],
		
      "question_text_speaking_enabled": [
        "checkbox",
        "題幹是文字題時，是否用 TTS 念出文字",
        "勾選:念出文字 &nbsp;&nbsp; 未勾選:不使用此功能",
        "念出題目的文字"],

      "tts_language_of_answer": [
        "text",
        "念答案時，使用的 TTS 語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],

      "answer_text_speaking_enabled": [
        "checkbox",
        "答案是文字題時，是否用 TTS 念出文字",
        "勾選:念出文字 &nbsp;&nbsp; 未勾選:不使用此功能",
        "念出答案的文字"],

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
