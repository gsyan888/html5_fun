var editorOptions = {
  listening: {
    caption: "聽音辨字六選一",
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_listening/questions-set-1.js"
    ],

    enableOpenInNewWindow: false,

    options: {

      "title": [
        "text",
        "上方看板的標題字"],

      "random_order_enabled": [
        "checkbox",
        "是否使用亂數抽題目",
        "勾選:以亂數抽題 &nbsp;&nbsp; 未勾選:依題庫順序",
        "啟用亂數抽題"],

      "questionsToAnswer": [
        "text",
        "出幾題作答"],

      "options_total": [
        "text",
        "每題出現幾個選項(最多六個)"],

      "col": [
        "text",
        "選項一橫排幾個選項",
        "(橫拿時; 直拿時會行列交換)"],

      "autoGotoNext": [
        "text",
        "幾秒後自動進入下一題"],

      "questionsToAnswer": [
        "text",
        "出幾題作答"],

      "show_text": [
        "checkbox",
        "是否顯示圖片下方的文字",
        "勾選:顯示 &nbsp;&nbsp; 未勾選:空白",
        "顯示圖片下方的文字"],

      "first_letter_change_color": [
        "checkbox",
        "圖片區文字的第一個字是否要變色",
        "勾選:變色 &nbsp;&nbsp; 未勾選:不變色",
        "第一個字變紅色"],

      "fontname": [
        "text",
        "圖片區文字的字形名稱"],

      "label_fontname": [
        "text",
        "圖片下方標籤文字的字形名稱"],

      "scoreToAdd": [
        "text",
        "答對時如何加分",
        "每答錯一次，就往右遞減"],

      "images_folder": [
        "text",
        "圖片檔的預設目錄",
        "可不使用，如果檔名是網址的，會自動失效"],

      "mp3_folder": [
        "text",
        "語音檔的預設目錄",
        "可不使用，如果檔名是網址的，會自動失效"],

      "image_file_extension": [
        "text",
        "圖片檔的預設附檔名",
        "未指定圖片檔時附加在文字後組成檔名"],

      "image_file_extension": [
        "text",
        "圖片檔的預設附檔名",
        "未指定圖片檔時附加在文字後組成檔名"],

      "tts_language": [
        "text",
        "TTS語音合成的語言代碼",
        "(例: 英文 <span class=\"btn\" onclick=\"setThisValue(this);\">en-US</span>  、中文 <span class=\"btn\" onclick=\"setThisValue(this);\">zh-TW</span>  、日文 <span class=\"btn\" onclick=\"setThisValue(this);\">ja-JP</span>  、韓文 <span class=\"btn\" onclick=\"setThisValue(this);\">ko-KR</span> <a href=\"https: //cloud.google.com/speech-to-text/docs/languages\" target=\"_blank\">查代碼</a>"
      ],

      "tts_speed": [
        "text",
        "TTS 語音的速度",
        " 0 ~ 1 (可用小數)"],

      "imageLoadingTimeout": [
        "text",
        "圖片載入幾秒逾時不候",
        "(超過時間變文字)"],

      "audioLoadingTimeout": [
        "text",
        "聲音載入幾秒逾時不候",
        "(超過時間用合成語音)"],

      "logger_url": [
        "text",
        "上載成績記錄用的網址",
        "(請參考「<a href=\"https://gsyan888.blogspot.com/2023/12/html5-fun-google-form-save-score.html\" target=\"_blank\">利用 Google Form 登錄遊戲成績</a>」)"
      ],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
