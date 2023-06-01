var editorOptions = {
  unscramble: {
    caption: "重組遊戲",
	
    "templates": [{
        "name": "英文句子，以空格分單字卡重組",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/unscramble-q-set-1.js"
      }, {
        "name": "英文單字、以字的長度(一個字元)分割為字母卡片重組",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/unscramble-q-set-4.js"
      }, {
        "name": "英文單字，以 ~~ 分割為字母卡片重組",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/unscramble-q-set-2.js"
      }, {
        "name": "中文句子，以空格分割字詞為卡片重組",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/unscramble-q-set-3.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "select_questions_in_random": [
        "checkbox",
        "是否隨機出題",
        "勾選:隨選題目 &nbsp;&nbsp; 未勾選:按題庫順序出題",
        "由題庫中隨選題目"],		
		
      "number_of_questions": [
        "text",
        "隨機出題時, 由題庫選出幾題來作答",
		"小於 0 表示使用題庫中的所有題目"],

      "card_swap_mode": [
        "text",
        "字卡交換方式",
		"0 :用拖曳的方式換位置,  1 :按卡片交換位置 "],

      "enableSubmitButton": [
        "checkbox",
        "是否使用「送出答案」的按鈕",
        "勾選:按「送出答案」才核對答案 &nbsp;&nbsp; 未勾選:卡片換位置後就自動對答案",
        "啟用「送出答案」的按鈕"],		
		
      "help_description": [
        "text",
        "說明對話框的說明文字"],

      "sound_enabled": [
        "checkbox",
        "是否播放語音",
        "勾選:播放語音 &nbsp;&nbsp; 未勾選:不播放",
        "啟用播放語音的功能"],		
		
      "sound_autoPlay": [
        "checkbox",
        "是否自動播放語音",
        "勾選:自動播放 &nbsp;&nbsp; 未勾選:按播放鈕才播放",
        "啟用自動播放的功能"],		
		
      "sound_autoPlayLoop": [
        "text",
        "語音自動重播的次數"],

      "sound_autoPlayDelay": [
        "text",
        "語音自動重播,隔多久重播(單位秒)"],

      "tts_enabled": [
        "checkbox",
        "是否使用 TTS 的語音",
        "勾選:使用 TTS 的語音 &nbsp;&nbsp; 未勾選:不使用 TTS",
        "啟用TTS 的語音"],		
		
      "tts_is_at_index": [
        "text",
        "哪一個欄位的文字來合成語音(由 0 起算)",
		"(如果有在第二欄以後指定聲音檔, 此參數就無效)"],
		
      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],

      "tts_speed": [
        "text",
        "TTS 語音的速度",
        " 0 ~ 1 (可用小數)"],

      "split_by_length": [
        "checkbox",
        "題庫第一欄位是否以字串長度來切割子字串",
        "勾選:以長度來切割 &nbsp;&nbsp; 未勾選:以切割符號來切割",
        "啟用以字串長度來分割題目"],		
		
      "split_by_length_substring_length": [
        "text",
        "子字串多長(一張卡片幾個字)",
		"(啟用以字串長度來分割題目時才有效)"],

      "split_seperator": [
        "text",
        "句子分割符號",
		"以此符號將題目的句子切割為子字串當重組的字卡<br>(需要設定為「以切割符號來切割題庫第一欄位」)"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
