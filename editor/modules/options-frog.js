var editorOptions = {
  frog: {
    caption: "青蛙過河",
	
    "templates": [{
        "name": "出題光碟格式(單選題): 題幹##解答##選項1##選項2##選項3##選項4",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-1.js"
      }, {
        "name": "兩欄式題庫(單選題), 自動產生錯的選項): 題目##答案",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-2.js"
      }, {
        "name": "三欄式題庫(多選題): 題目##正確1~~正確2##錯誤1~~錯誤2~~錯誤3",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-3.js"
      }, {
        "name": "語文高手題庫(單選題): 同音字、多音字或形近字",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/football-q-set-4.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "scoreToAdd": [
        "text",
        "答對時加幾分"],

      "scoreToMinus": [
        "text",
        "答錯時扣幾分"],

      "theNumberOfQuestions": [
        "text",
        "總共出多少題(可不設定)",
		"題庫內的題目不足時，會重覆取用。(設定為 0 表示做完題庫的所有題目即結束)"],

      "frogIconPath": [
        "text",
        "青蛙的圖案路徑(可不設定)",
		"未設定時，使用預設的圖案"],
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
