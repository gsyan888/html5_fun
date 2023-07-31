var editorOptions = {
  gomoku: {
    caption: "漢字五子棋",
	
    filenames: [
      "https://gsyan888.github.io/html5_fun/html5_gomoku/gomoku_set.js"
    ],

    "templates": [{
        "name": "內建範例",
        "path": "https://gsyan888.github.io/html5_fun/html5_gomoku/gomoku_set.js"
      }
    ],	
	
    enableOpenInNewWindow: false,
	
    options: {
		
      "title": [
        "text",
        "遊戲標題",
        "會出現在一進入程式的畫面"],

      "font_family": [
        "text",
        "方格中文字的字體"],

      "fill_square_with_random_text": [
        "checkbox",
        "填字的方式",
        "勾選:以亂數隨選文字 &nbsp;&nbsp; 未勾選:按題庫順序",
        "以亂數抽文字來隨機填入方格"],

      "timer_counter": [
        "text",
        "計時器的秒數",
        "(時間到自動換邊下子)"],

      "number_to_be_counted_as_a_win": [
        "text",
        "幾個子連線算贏",
        "(0: 人工斷輸贏, 2以上由程式斷輸贏)"],

      "show_number": [
        "checkbox",
        "是否在格子左上角標示數字",
        "勾選:標示數字 &nbsp;&nbsp; 未勾選:不標示數字",
        "在格子標示數字"],

      "col_total": [
        "text",
        "橫向最多幾格"],

      "row_total": [
        "text",
        "縱向最多幾格"],
						
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
