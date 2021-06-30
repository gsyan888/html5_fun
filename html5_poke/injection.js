//-------------------------------------------------------------------------
// Injection for HTML5 FUN
// Author : gsyan (https://gsyan888.blogspot.com/)
// 
// Modified :
//				2021.06.13 created
//				2021.06.16 add status message under the Achex Logo
//-------------------------------------------------------------------------


//Firebase 資料庫旳位址
var databaseURL = "https://xxxxxxx-default-rtdb.firebaseio.com";

//使用到的 firebase SDKs	
var firebaseSDKs = [
	'https://www.gstatic.com/firebasejs/8.6.5/firebase-app.js'
	,'https://www.gstatic.com/firebasejs/8.6.5/firebase-database.js'
];

injectionFirebase = function() {
	// Your web app's Firebase configuration
	var firebaseConfig = {
		databaseURL: databaseURL,
	};
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	
	//先送 -1 當初始值
	firebase.database().ref('poke/users').update({'cmd':-1});
	
	//先設定可按的總數是多少 totalNumber
	//var buttons = getAllButtons(boxLayer);
	//if(buttons) {
	//	var n = buttons.length-1; //poke 的第 0 個是外框不是按鈕,所以減一
	//	firebase.database().ref('poke/users').update({'totalNumber':n});
	//}
		
	firebase.database().ref('poke/users/cmd').on('value', function(data) {
		//取得該欄位的值
		var cmd = data.val();
		var buttons = getAllButtons(boxLayer);
		if(buttons && !isNaN(cmd)) {	//必須是由遠端送來的數字才處理
			var totalNumber = buttons.length;	//格子總數
			var index = parseInt(cmd); //遠端指定的編號為多少
			if(index>=0 && index <totalNumber) { //編號在範圍內的才處理
				//第0個是外框, 所以戳戳樂的格由 1 開始
				buttons[index+1].dispatchEvent('mousedown'); //觸發格子的 mousedown 事件,也就是按一下
			}
		}
	});	
}

//jQuery / Achex hosted jQuery
//Achex jQuery plugin
var achexSDKs = [
	"https://achex.ca/js/JQ.js"
	,"https://achex.ca/js/jquery.achex.js"
];

var username = '';
var teacherName = username;
var classroomName = username;

injectionAchex = function(username, classroomName, teacherName) {
	var config = {
		dbg:true,
		username:username,
		password:'none',
		reconnect:3000,
		//logo:{canvas:'logo'},
		fade:true, //false,
		opencallback : function(){
					/* Triggers on successful connection to Achex Cloud Server  */
					/* and successful Authentication                            */
					/* Example: */
					console.log('Connection Ready');
				  },
				
		closecallback : function(){
					/* Triggers on discconnection from Server           */
					/* If not called by user and reconnect is enabled,  */
					/* will to reconnect                                */
					/* Example: */
					console.log('Diconnected');
				  },

		callback: function( message_object, raw_message_data, event)
				  {
					/************************************************************************/
					/*  use "message_object" for quick  access to data                      */
					/*  in javascript object format                                         */
					/*                                                                      */
					/*  This function is called only after automatic authentication         */
					/*  and filters out other specific server commands (ping, errors, etc)  */
					/*  This function                                                       */
					/*                                                                      */
					/*  NOTE - internal operation equivalent:                               */
					/*    raw_message_data = event.data (raw websocket data)                */
					/*    message_object = JSON.parse(raw_message_data)                     */
					/************************************************************************/
					/* Example: */

					//console.log(message_object);
					
					//取得該欄位的值
					var cmd = message_object['cmd'];					
					if(cmd !=null ) {
						//在右上角顯示誰發了 cmd
						var msg = document.getElementById('remoteClickStatus');
						if(!msg) {
							var msg = addStatusTextNode();	//在右上角顯示發送狀態用
						}
						msg.innerText = cmd+'@'+message_object['FROM'];
						//取得按鈕的 objects
						var buttons = getAllButtons(boxLayer);
						if(buttons && !isNaN(cmd)) {	//必須是由遠端送來的數字才處理
							var t = buttons.length;	//格子總數
							var index = parseInt(cmd); //遠端指定的編號為多少
							if(index>=0 && index <t) { //編號在範圍內的才處理
								//第0個是外框, 所以戳戳樂的格由 1 開始
								buttons[index+1].dispatchEvent('mousedown'); //觸發格子的 mousedown 事件,也就是按一下
								
							}
						}
					}
				  }
	};
	
	$.achex(config);
	
	$.achex.join(classroomName);        /* (optional) Join A Hub  - sends {joinHub:"myTestHub"} */
	//$.achex.send(
	//  {
	//	to:teacherName,
	//	someMessage:'hello world'
	//  }
	//);	
};

//add a TextNode to show status at right top (under the Achex logo)
var addStatusTextNode = function() {	
	var txt = document.createTextNode('HTML5 FUN');
	var msg = document.createElement("div");
	msg.id = 'remoteClickStatus';
	msg.appendChild(txt);
	document.body.appendChild(msg);
	msg.style['text-align']='right';
	msg.style.position='relative';
	msg.style.width='50px';
	msg.style.height='50px';
	msg.style.left=Math.floor(window.innerWidth-54)+'px';
	msg.style.top='52px';
	msg.style['font-size']='50%'; //'xx-small';
	msg.style.color='#8FB5D0';
	msg.style.opacity='0.8';
	msg.innerText='@'+username;
	return msg;
};


//找出戳戳樂的格子
var getAllButtons = function(objLayer) {
	var buttons=null;
	//Layer 中只有存放按扭的 object 才有 length
	//利用這個特性, 找到 layer 中的元件
	if(objLayer) {
		var names = Object.keys(objLayer);
		for(var i=0; i<names.length; i++) {
			if(objLayer[names[i]] && typeof(objLayer[names[i]])=='object' && typeof(objLayer[names[i]]['length'])=='number') {
				var buttons = objLayer[names[i]];
				break;
			}
		}
	}
	return buttons;
}
//-------------------------------------------------
//
//-------------------------------------------------
//取得網址中的某一個參數(已編碼過的)
gup = function( name ){
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href ); 
	if( results == null )    return "";  
	else    return results[1];
}

//-------------------------------------------------
// 載入 Firebase 的相關 .JS
//-------------------------------------------------
loadJavaScripts = function(js, callback) {
  var len = js.length;
  if(len > 0) {
	  var url = js[0];
	  js.splice(0,1);		
	  loadSettingFromExternalScript(url, function() {
		loadJavaScripts(js, callback);
	  });
  } else {
	if( typeof(callback) == 'function' ) {            
	  callback();
	}
  }
};


/**
* 由外部的 .js 載入設檔值, 並執行 callback 的指令
* @private
*/
loadSettingFromExternalScript = function(scriptSrc, callback)  {
  var nocacheVal = '?nocache=' + new Date().getTime();	//為了避免 cache 的問題,在檔名後加亂數
  var scriptToAdd = document.createElement('script');		//建立一個 scriptElement
  
  scriptToAdd.setAttribute('type','text/javascript');
  scriptToAdd.setAttribute('charset','utf-8');
  //scriptToAdd.setAttribute('src', scriptSrc + nocacheVal);	//避免 cache 時用的
  scriptToAdd.setAttribute('src', scriptSrc);
  //載入成功時
  scriptToAdd.onload = scriptToAdd.onreadystatechange = function() {
	 if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
		scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
		document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//將變數載入後移除 script
		if( typeof callback == 'function' ) {
		   callback();	//執行指定的函數
		}
	 };
  };
  //無法載入時, 將設定用預設值
  scriptToAdd.onerror = function() {
	 scriptToAdd.onerror = null;	//將事件移除
	 //document.getElementsByTagName('head')[0].removeChild(scriptToAdd);	//移除 script
	 if( typeof callback == 'function' ) {
		callback();	//執行指定的函數
	 }
  }
  
  //在 head 的最前頭加上前述的 scriptElement
  var docHead = document.getElementsByTagName("head")[0];
  docHead.insertBefore(scriptToAdd, docHead.firstChild);
};

var injection = function(callback) {
	var uname = gup('username');
	if(uname && uname!='') {
		username = decodeURI(uname);
		classroomName = username;
		teacherName = username;
		//console.log([username, classroomName, teacherName]);		
		loadJavaScripts(achexSDKs, function() {
			if(typeof(callback)=='function') {
				callback();				
			}
			injectionAchex(username, classroomName, teacherName);
		});
	};
};

var fire = injection;	//just for comparable
