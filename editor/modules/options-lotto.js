var editorOptions = {
  lotto: {
    caption: "樂透機",
	
    "templates": [{
        "name": "2023年預設範本",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/lotto_set.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	enableDoubleTabConvert: true,
		
    options: {
		
      "show_by_list": [
        "checkbox",
        "抽選時是否按照題庫順序",
        "勾選:按照順序 &nbsp;&nbsp; 未勾選:亂數抽題",
        "按照題庫順序抽題"],

      "soundEffectEnable": [
        "checkbox",
        "是否啟用音效",
        "勾選:啟用 &nbsp;&nbsp; 未勾選:不啟用",
        "播放音效"],

      "font_name": [
        "text",
        "文字的字體"],
		
      "result_dialog_caption": [
        "text",
        "顯示抽取結果對話框的標題字"],

      "result_dialog_caption_font_color": [
        "text",
        "顯示抽取結果對話框的標題字的顏色"],

      "result_dialog_font_color": [
        "text",
        "顯示抽取結果文字的顏色"],

      "result_dialog_font_color": [
        "text",
		"顯示抽取結果文字的預設大小",
        "(需要搭配不啟甪文字自動調整大小)"],
		
      "result_dialog_text_align": [
        "text",
        "顯示抽取結果文字水平對齊方向",
		"(可用的設定值: left , center , right)"],
		
      "result_dialog_enable_fit_text": [
        "checkbox",
        "顯示抽取結果是否啟用文字自動調整大小",
        "勾選:啟用 &nbsp;&nbsp; 未勾選:不啟用",
        "啟用文字自動調整大小"],

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
