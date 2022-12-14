/*
 scripts for my website
 */

/*
載入指定的 script
 */
loadJsFromExternalScript = function (scriptSrc, callback) {
  var scriptToAdd = document.createElement('script'); /* 建立一個 scriptElement	*/
  scriptToAdd.setAttribute('type', 'text/javascript');
  scriptToAdd.setAttribute('charset', 'utf-8');
  scriptToAdd.setAttribute('src', scriptSrc);
  /* 載入成功時 */
  scriptToAdd.onload = scriptToAdd.onreadystatechange = function () {
    if (!scriptToAdd.readyState || scriptToAdd.readyState === "loaded" || scriptToAdd.readyState === "complete") {
      scriptToAdd.onload = scriptToAdd.onreadystatechange = null;
      document.getElementsByTagName('head')[0].removeChild(scriptToAdd); /* 載入後移除 */
      if (typeof(callback) == 'function') {
        callback(1); /* 執行指定的函數 */
      }
    };
  };
  /* 無法載入時, 將設定用預設值 */
  scriptToAdd.onerror = function () {
    scriptToAdd.onerror = null; /* 將事件移除 */
    document.getElementsByTagName('head')[0].removeChild(scriptToAdd); /* 移除 script */
    if (typeof callback == 'function') {
      callback(-1); /* 執行指定的函數 */
    }
  }

  /* 在 head 的最前頭加上前述的 scriptElement */
  var docHead = document.getElementsByTagName("head")[0];
  docHead.insertBefore(scriptToAdd, docHead.firstChild);
};

//get blogger RSS and update contents 
var gdata = function() {};
gdata.io = function() {};
gdata.io.handleScriptLoaded = function(result) { 
  // Obtain the array of CalendarEventEntry
  var entries = result.feed.entry;    
  
  // Print the total number of events
  //alert('Total of ' + entries.length + ' post(s)');
  var html = [''];
  for (var i = 0; i < entries.length; i++ ) {
    var postEntry = entries[i];
	//get post title
	var postTitle = postEntry.title.$t;
	//get post permit link URL
	for(var l=0; l < postEntry.link.length; l++) {
		if(postEntry.link[l].rel == 'alternate') {
			var postLink = postEntry.link[l].href;
			break;
		}
	}
	//get post content
    var postContent = postEntry.content.$t;
	//get post published date & convert format
	var postPublished = postEntry.published.$t;
	postPublished = postPublished.substr(0,4)+'年'+postPublished.substr(5,2)+'月'+postPublished.substr(8,2)+'日';
	//keep <br /> & remove other HTML tag
	postContent = postContent.replace(/(<br \/>)/ig,"\r\n"); 
	postContent = postContent.replace(/(<([^>]+)>)/ig,""); 
	postContent = postContent.replace(/(\r\n)/ig,"<br />"); 
	//keep 150 words to be summary
	postContent = postContent.substr(0,150);
	html.push('<div class="head_bg">');
	html.push('<div class="head">');
	//html.push('<span><a href="'+postLink +'">'+postTitle+'</a></span>');
	//html.push('<h2 class="h2">'+postPublished+'</h2>');
	html.push('<span>'+postPublished+'</span>');
	html.push('<h2 class="h2"><a href="'+postLink +'">'+postTitle+'</a></h2>');
	html.push('</div>');
	html.push('</div>');
	html.push('<div class="sub_content">');
	html.push('<div class="content_txt">');
	html.push(postContent+" ......");
	html.push('</div>');
	html.push('</div>');
	html.push('<div class="comment"><img src="style2009/images/more_bg.jpg" alt="" align="top" style="margin:4px 7px 0px 0px"/><a href="'+postLink+'">繼續閱讀</a></div>');
	html.push('<br style="line-height:4.01em"/>');
	html.push("\r\n");
  }
  document.getElementById("posts").innerHTML = html.join("");

};

updateMenuList = function(idPrefix, config) {
	var catpion, url, list, elm;
	
	var keys = Object.keys(config);
	
	for(var i=0; i<keys.length; i++) {
		//選單小標題
		elm = document.getElementById(idPrefix+'Caption'+(i+1));
		if (typeof(elm)!='undefined' && elm!=null) {
			elm.innerHTML = keys[i];
		}
		//連結清單
		elm = document.getElementById(idPrefix+'List'+(i+1));
		if (typeof(elm)!='undefined' && elm!=null) {
			list = '';
			for(var j=0; j<config[keys[i]].length; j+=2) {
				caption = config[keys[i]][j];
				url = config[keys[i]][j+1];
				
				if (caption.replace(/\s/g, '')!='' && url.replace(/\s/g, '')!='') {
					list += '<li>';
					list += '<a href="'+url+'">';
					list += caption+'</a>';
					list += '</li>';
					list += '\n';
				}
			}
			elm.innerHTML = list;
		}
	}
};

//左側區塊的選單設定
var leftSideMenuConfig = {

	'班級網站' :[
		'黑皮2017', 'https:////happy-world-2017.blogspot.tw/',
		'黑皮2015', 'https:////happy-world-2015.blogspot.tw/',
		'黑皮2013', 'https:////happy-world-2013.blogspot.tw/',
		'黑皮2011', 'https:////happyworld11.blogspot.com/',
		'黑皮2009', 'https:////happyworld2009.blogspot.com/',
		'黑皮2007', 'happy96/index.html',
		'黑皮2005', 'happy94/index.html'
	],
	
	'Hot' :[
		'HTML5作品集', 'https://gsyan888.github.io/html5_fun/',
		'Flash作品集', 'works/flash/index.html',
		'CS T_T 偷插電的資訊科學輔具', 'https://gsyan888.github.io/csunplugged/',
		'作品集', 'works/index.html',
		'永明的童詩童畫', 'https://gsyan888.blogspot.com/search/label/%E6%B0%B8%E6%98%8E%E7%9A%84%E7%AB%A5%E8%A9%A9',
	],
	
	'New' :[
		'HTML5 FUN 精選集', 'https://gsyan888.blogspot.com/2022/10/html5-fun-collection.html',
		'Speaking', 'https://gsyan888.blogspot.com/2022/09/html5-speaking.html',
		'我說你猜:比手畫腳', 'https://gsyan888.blogspot.com/2022/11/html5-charades.html',
		'臺灣地圖隨選器', 'https://gsyan888.blogspot.com/2022/12/html5-images-preload.html',
		'聽音辨字', 'https://gsyan888.blogspot.com/2022/11/html5-listening.html',
		'注音高手', 'https://gsyan888.blogspot.com/2022/10/html5-phoneticsquiz-2022.html',
		'造句靈感產生器', 'https://gsyan888.blogspot.com/2022/11/html5-sentence-blogger-embeded.html',
		'語文高手題庫&國字加注音產生器', 'https://gsyan888.blogspot.com/2022/11/html5-bopomofo-format-generator.html',
		'柵欄動畫產生器', 'https://gsyan888.blogspot.com/2022/12/html5-grating-animation-generator.html'
	]
	
};

//中央區塊的選單設定
var mainMenuConfig = {

	'生活札記' :[
		'關於雄', 'life/gsyan.htm'
	],
	
	'電腦筆記' :[
		'HTML5作品', 'https://gsyan888.github.io/html5_fun/',
		'Flash作品集', 'works/flash/index.html',
		'CS T_T 偷插電的資訊科學輔具', 'https://gsyan888.github.io/csunplugged/',
		'作品集', 'works/index.html',
		'FreeBSD', 'freebsd/',
		'筆記倉庫', 'oldnotes.html',
		'm0n0wall', 'os/m0n0wall.html',
		'BartPE', 'os/bartpe/bartpe.html',
		'Wiimote電子白板', 'wiimote-whiteboard/index.html',
		'拉哩拉雜', 'https:////gsyan888.blogspot.com/search/label/%E8%B3%87%E8%A8%8A%E5%A4%A9%E5%9C%B0',
	],
	
	'我的著作' :[
		'發表在兒童日報的文章', 'articles/articles.htm',
		'我的書:Note4.x入門與應用', 'articles/notes46.htm'
	]
	
};


//update menu
updateMenuList('leftSideMenu', leftSideMenuConfig);
updateMenuList('mainMenu', mainMenuConfig);

//get posts from blogger
var rssURL = 'https:////gsyan888.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=10';
loadJsFromExternalScript(rssURL, function(ok) {	
	if(ok<0) {
		//Blogger RSS retrieve failure
		document.getElementById("posts").firstChild.innerHTML = '無法載入 Blogger 文章';
	}
});

