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
						
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
