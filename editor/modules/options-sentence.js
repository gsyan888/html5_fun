var editorOptions = {
  sentence: {
    caption: "造句靈感產生器",
	
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_sentence/question_set.js"
    ],
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "order_by_random": [
        "checkbox",
        "抽卡片時是否要以亂數來抽",
        "勾選:亂數隨機抽 &nbsp;&nbsp; 未勾選:按題庫順序",
        "以亂數來隨機抽卡片"],

      "is_flip_mode": [
        "checkbox",
        "抽選時是否要用翻牌的動畫",
        "勾選:使用翻牌方式 &nbsp;&nbsp; 未勾選:使用抽換方式",
        "使用翻牌的動畫"],

      "score_goal": [
        "text",
        "計分器加總的目標分數",
        "目標分數達到時會出現任務完成的對話框"],

      "shuffle_delay": [
        "text",
        "呈現抽換動畫時每張的間隔時間",
        "時間單位為毫秒 ms (1/1000秒)"],

      "sound_player_autoplay": [
        "checkbox",
        "題目中的聲音是否自動播放",
        "勾選:自動播放 &nbsp;&nbsp; 未勾選:按按鈕後播放",
        "自動播放題目的聲音"],

      "sound_enable": [
        "checkbox",
        "是否使用翻卡音效",
        "勾選:使用 &nbsp;&nbsp; 未勾選:不使用",
        "使用翻卡音效"],

      "card_border": [
        "text",
        "字卡的邊框粗細"],
		
      "card_border_color": [
        "text",
        "字卡的邊框顏色"],
		
      "card_caption_color": [
        "text",
        "字卡的標題字的顏色"],

      "card_text_color": [
        "text",
        "字卡第一面字的顏色"],

      "card_back_text_color": [
        "text",
        "字卡第二面字的顏色"],

      "card_caption_font": [
        "text",
        "卡片組上方標題的字體"],

      "card_label_font": [
        "text",
        "卡片內文字的字體"],

      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],
						
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
