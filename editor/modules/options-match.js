var editorOptions = {
  match: {
    caption: "對對碰",
	
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_match/match_set.js"
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "title": [
        "text",
        "上方看板的標題字"],

      "font": [
        "text",
        "文字的字體名稱"],

      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],	  

      "scoreAdd": [
        "text",
        "答對時如何加分"],

      "scoreMinus": [
        "text",
        "答錯時扣多少分"],

      "memoryMode": [
        "checkbox",
        "是否啟用覆蓋牌的記憶模式",
        "勾選:蓋牌 &nbsp;&nbsp; 未勾選:不蓋牌",
        "啟用蓋牌模式"],

      "momorySeconds": [
        "text",
        "等幾秒才蓋牌"],
		
      "showNumber": [
        "checkbox",
        "是否顯示格子的編號",
        "勾選:顯示編號 &nbsp;&nbsp; 未勾選:無編號",
        "顯示格子的編號"],

      "numberLabelFontSizeScale": [
        "text",
        "編號大小(相對於格子的比例)"],

      "card_selected_border_color": [
        "text",
        "牌被選取時的邊框顏色"],

      "card_text_color": [
        "text",
        "文字的顏色"],

      "card_back": [
        "text",
        "蓋牌時背面的圖案路徑或文字"],

      "card_back_color": [
        "text",
        "蓋牌時文字的顏色"],

      "card_back_text_color": [
        "text",
        "蓋牌時的背景顏色"],
	  
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
