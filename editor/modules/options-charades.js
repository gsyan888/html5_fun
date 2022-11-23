var editorOptions = {
  charades: {
    caption: "我說你猜",
	
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_charades/question-set-1.js"
    ],
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "order_by_random": [
        "checkbox",
        "出題時是否要以亂數來選題",
        "勾選:亂數出題 &nbsp;&nbsp; 未勾選:按題庫順序",
        "以亂數來出題"],

      "timer_items": [
        "text",
        "計時器每回合的秒數設定選項",
		"最多可以有三個選項，以逗號分隔"],
		
      "colorNormal": [
        "text",
        "卡片的背景顏色"],
		
      "colorCorrect": [
        "text",
        "正確時卡片的背景顏色"],

      "colorPass": [
        "text",
        "跳過時卡片的背景顏色"],

      "colorFont": [
        "text",
        "卡片上文字的顏色"],

      "keyNameCorrect": [
        "text",
        "正確時的快速按鍵名稱"],

      "keyNamePass": [
        "text",
        "跳過時的快速按鍵名稱"],
						
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
