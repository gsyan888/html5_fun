var editorOptions = {
  baseball: {
    caption: "文字迷宮",
	
    "templates": [{
        "name": "預設範本",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/maze-q-set.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "title": [
        "text",
        "標題字"],

      "maze_mix_with_next_on": [
        "checkbox",
        "是否使用下一題來當錯的選項",
        "勾選:用下一題 &nbsp;&nbsp; 未勾選:用同一題(難度較高)",
        "以下一題的字當錯的選項"],
		
      "questionLines": [
        "textarea",
        "題庫"]
    }
  }
};
