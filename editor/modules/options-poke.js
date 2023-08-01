var editorOptions = {
  poke: {
    caption: "戳戳樂",
	
    "templates": [{
        "name": "2023年預設範本",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/poke_set.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "title": [
        "text",
        "對話框上的標題字"],

      "font": [
        "text",
        "文字的字體名稱"],

      "showNumber": [
        "checkbox",
        "是否在格子的左上角顯示格子的編號",
        "勾選:顯示編號 &nbsp;&nbsp; 未勾選:不顯示編號",
        "顯示格子的編號"],

      "numberLabelFontSizeScale": [
        "text",
        "格子左上角編號的字形大小",
		"(相對於格子的大小, 0~1 之間的數字)"],

      "soundFilename": [
        "text",
        "戳洞時的音效檔路徑"],

      "mediaFolder": [
        "text",
        "洞口上方圖片檔的目錄路徑",
		"(相對於程式所在的目錄, 使用預設值即可)"],

      "paper": [
        "text",
        "每一洞上可使用的圖片檔檔名清單",
		"(以欄位分隔符號 ## 或跳格字元分隔不同的檔名)"],

      "blackborder": [
        "text",
        "每一格的黑色外框線粗細大小"],

      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],

      "tts_speed": [
        "text",
        "合成語音的速度",
		"0 ~ 1 (可用小數)"],
					
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
