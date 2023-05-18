var editorOptions = {
  card_flip: {
    caption: "大家一起來",
	
    "templates": [{
        "name": "卡片內容##分數##對話框文字##對話框圖片##對話框音檔##對話框超連結",
        "path": "https://gsyan888.github.io/html5_fun/html5_card_flip/card_flip_set.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "title": [
        "text",
        "標題字"],

      "show_by_list": [
        "checkbox",
        "是否依題庫的順序出題",
        "勾選:按順序出題 &nbsp;&nbsp; 未勾選:以亂數抽題",
        "啟用依序出題"],		
		
      "team_names": [
        "text",
        "計分板上的組別名稱",
		"最多七組(用半形逗號分隔)，不想出現就設為空白"],

      "keycode_to_open_link": [
        "text",
        "用來開啟對話框中連結的快速按鍵 key code (十進制)",
		"預設使用空白鍵(32) [<a href=\"https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode\" target=\"_blank\">按鍵代碼參考</a>]"],

      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
