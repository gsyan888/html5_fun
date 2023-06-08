var editorOptions = {
  "english1200": {
    "caption": "English1200",

    "templates": [{
        "name": "使用 TTS, 英文##中文",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/english1200-q-set-tts.js"
      }
    ],

    "enableOpenInNewWindow": false,

    "options": {
      "numberOfOptions": [
        "text",
        "每題有幾個選項"],

      "numberOfOptionsPerRow": [
        "text",
        "每列最多可以有幾個選項"],

      "auto_show_options": [
        "checkbox",
        "是否自動顯示選項供作答",
        "勾選:自動顯示選項 &nbsp;&nbsp; 未勾選:需按[開始作答]鈕才會出現選項",
        "自動顯示選項供作答"],

      "numberOfQuestionsPerRound": [
        "text",
        "每回合最多抽幾題題目",
		"(題庫題目總數大於此數時才有作用)"],

      "select_questions_in_random": [
        "checkbox",
        "出題時選擇題目的方式",
        "勾選:亂數隨機選題 &nbsp;&nbsp; 未勾選:按題庫順序出題",
        "以亂數隨機出題"],

      "audioPlaybackRate": [
        "text",
        "語音播放的速度",
        "例如:1.0 正常, 0.75 較慢速, 0.5 慢速, 1.5 快速, 2.0 兩倍速"],

      "audioAutoPlayLoop": [
        "text",
        "語音自動播放的次數(大於1才會重播)"],

      "audioAutoPlayDelay": [
        "text",
        "隔多久重播(單位秒)",
		"(語音自動播放的次數大於 1 時，此參數才有作用)"],
		
      "tts_enabled": [
        "checkbox",
        "是否使用 TTS 的語音",
        "勾選:使用合成語音 &nbsp;&nbsp; 未勾選:不使用合成語音",
        "啟用 TTS 以題庫左欄文字合成語音"],

      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"],

      "soundBaseURL": [
        "text",
        "聲音檔路徑的前置網址",
        "未啟用 TTS 時, 此參數才有作用，會自動幫左欄前面加上這個路徑"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
