var editorOptions = {
	
  phonetics_quiz: {
	  
    caption: "注音高手",
	
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/question-set-1.js"
    ],
	
    "templates": [{
        "name": "使用合成語音",
        "path": "https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/question-set-2.js"
      }, {
        "name": "不用選國字、國字變框",
        "path": "https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/question-set-3.js"
      }, {
        "name": "使用自訂圖片與自訂聲音",
        "path": "https://gsyan888.github.io/html5_fun/html5_phonetics_quiz/question-set-1.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "questions_to_answer": [
        "text",
        "最多出幾題",
		"(題庫數量過多時，用來限定出題數)"],

      "order_by_random": [
        "checkbox",
        "是否使用亂數抽題目",
        "勾選:以亂數抽題 &nbsp;&nbsp; 未勾選:依題庫順序",
        "啟用亂數抽題"],

      "character_select_enabled": [
        "checkbox",
        "虛擬鍵盤是否要選國字",
        "勾選:由玩家選國字 &nbsp;&nbsp; 未勾選:自動選字",
        "注音輸入完需再選國字"],

      "show_character": [
        "checkbox",
        "題目中是否顯示國字",
        "勾選:顯示國字 &nbsp;&nbsp; 未勾選:國字變成空格",
        "顯示國字"],
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
