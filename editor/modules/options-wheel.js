var editorOptions = {
  wheel: {
    caption: "幸運轉盤",
	
    "templates": [{
        "name": "2023年預設範本",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/wheel_set.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "wheel_items_text_align": [
        "text",
        "扇形上面的文字對齊方向",
		"(可用的設定值: left , center , right)"],
		
      "wheel_items_font_color": [
        "text",
        "扇形上面的文字顏色設定"],

      "wheel_colors": [
        "text",
        "扇形可用的顏色",
		"(每個色碼用逗號或跳格來隔開)"],

      "wheel_image_round_enable": [
        "checkbox",
        "轉盤扇形上的圖片是否用圓形的",
        "勾選:圓形 &nbsp;&nbsp; 未勾選:矩形",
        "扇形上的圖片用圓形的"],

      "tts_language": [
        "text",
        "TTS語音合成的預設語言代碼",
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
