var editorOptions = {
  shark: {
    caption: "搶救公主",
	
    "templates": [{
        "name": "出題光碟格式: 題幹##解答##選項1##選項2##選項3##選項4",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/pk-q-set-1.js"
      }, {
        "name": "兩欄式題庫: 題目##答案",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/pk-q-set-2.js"
      }, {
        "name": "三欄式題庫: 題目##正確1~~正確2##錯誤1~~錯誤2~~錯誤3",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/pk-q-set-3.js"
      }, {
        "name": "語文高手題庫: 同音字、多音字或形近字",
        "path": "https://gsyan888.github.io/html5_fun/editor/templates/pk-q-set-4.js"
      }
    ],
	
    enableOpenInNewWindow: false,
	
    options: {

      "optionsTotal": [
        "text",
        "最多顯示幾個選項"],
	  
      "questionLines": [
        "textarea",
        "題庫"]
    },
	
	style: "background:#00bbff !important;background:-webkit-gradient(radial, 50% 50%, 10, 50% 50%, 850, from(#99ffff), to(#2f5c1b), color-stop(.6,#00bbff))  !important;background: -moz-radial-gradient(center 45deg, circle farthest-side, #99ffff 0%, #00bbff 60%, #2f5c1b 100%) !important;"	
  }
};
