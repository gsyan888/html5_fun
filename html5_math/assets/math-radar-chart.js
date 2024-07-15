/**
 * HTML5 FUN : 雷達圖產生器
 * by gsyan 雄 (https://gsyan888.blogspot.com/)
 * 2023.11.25 
 */

var radarChart, config;

//計算可用的最大範圍
var widthMax = window.innerWidth && document.documentElement.clientWidth ? 
					Math.min(window.innerWidth, document.documentElement.clientWidth) 
					: window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var heightMax = window.innerHeight && document.documentElement.clientHeight ? 
					Math.min(window.innerHeight, document.documentElement.clientHeight) 
					: window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
//新增項目時用的樣版
var itemDefaultTemplate = '<input type="text" value="項目1" class="string form-control" size="20" onchange="drawChart();">';
itemDefaultTemplate += '<input type="text" value="4" class="number form-control" size="4" onchange="drawChart();">';
itemDefaultTemplate += '<button class="btn btn-danger delete-item" onclick="removeItem(this);">刪除</button>';


/* 取得網址中的參數 */
var gup = function( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
  var regexS = "[\\?&]"+name+"=([^&#]*)";  
  var regex = new RegExp( regexS );  
  var results = regex.exec( window.location.href ); 
  if( results == null )    return "";  
  else    return results[1];
};

function changeInputType(enableBatch) {
	if(enableBatch) {
		document.querySelector('.items-field-batch').parentElement.style.display = 'block';
		document.querySelector('.items-field-batch').placeholder = '行首可用 [顏色] 來設定各欄的顏色, 例如:\n[顏色],red,blue,green\n[標題],甲,乙,丙\n國語,3,3,4\n數學,4,1,2\n自然,2,5,3';
		document.querySelector('.items-field').style.display = 'none';
		document.querySelector('.add-item').style.display = 'none';	
		document.querySelector('.batch-enable').checked = true;
		if(document.querySelector('.items-field-batch').value.replace(/\s/g, '')!='') {
			drawChart();
		}
	} else {
		document.querySelector('.items-field-batch').parentElement.style.display = 'none';
		document.querySelector('.items-field').style.display = 'block';
		document.querySelector('.add-item').setAttribute('style', '');	
		drawChart();		
	}
};
function applyBatchSample(btn) {
	var btn = document.querySelector('.btn-apply-batch');
	var inputElm = document.querySelector('.items-field-batch')
	if(btn.innerHTML=='套用範例' && inputElm.value.replace(/\s/g, '')=='') {
		var lines = inputElm.placeholder.split(/\n+/)
		lines.splice(0,1)
		inputElm.value = lines.join('\n');
		//btn.innerHTML = '更新圖形';
	}
	drawChart();	
};
function removeItem(elm) {
	elm.parentElement.remove();
	drawChart();
}
function getLastItem() {
	var lastItem;
	var p = document.querySelector('.items-field');
	if(typeof(p)!='undefined' && p!=null && children.length>0) {
		lastItem = p.children[p.children.length-1];
	}
	return lastItem;
}
function appendItem() {
	var p = document.querySelector('.items-field');
	if(typeof(p)!='undefined' && p!=null) {
		var elm = document.createElement('li');
		//elm.innerHTML = p.children[p.children.length-1].innerHTML;
		elm.innerHTML = itemDefaultTemplate;
		elm.children[0].value = '未命名';
		p.append(elm);
	}
	drawChart();
}
function updateSize(elm) {	
	document.querySelector('input.chart_size').value = elm.value;
	document.getElementById('sizeLabel').innerText = elm.value+'像素';
	var allRadio = document.querySelectorAll('input.sizeRadio');
	for(var i=0; i<allRadio.length; i++) {
		allRadio[i].checked = false;
	}
	elm.checked = true;
	drawChart();
};
function drawChart() {
	//由各欄位中匯整資料
	var labels = [];
	var data = [];	
	var labelElm = document.querySelectorAll('.items-field li input.string');
	if(typeof(labelElm)!='undefined' && labelElm!=null) {
		labelElm.forEach(function(elm) {
			labels.push(elm.value);
		});
	}
	var dataElm = document.querySelectorAll('.items-field li input.number');
	if(typeof(dataElm)!='undefined' && dataElm!=null) {
		dataElm.forEach(function(elm) {
			data.push(Number(elm.value));
		});
	}
	var title = document.querySelector('input.title').value;
	var maxScale = Number(document.querySelector('input.max-scale').value);
	var pointLabelsFontSize = document.querySelector('input.pointLabels-font-size').value;
	var legendLabelsFontSize = document.querySelector('input.legendLabels-font-size').value;
	var lineTension = Number(document.querySelector('input.lineTension').value);
	var color = Chart.helpers.color;
	config = {
		chartArea: {
			backgroundColor: 'rgba(230, 238, 255, 0.6)'
		},
		type: 'radar',
		data: {
			labels: labels,
			datasets: [
				{
					label: title,
					data: data,
				
					//backgroundColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
					//borderColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
					//pointBackgroundColor: color('rgb(255, 99, 132)').alpha(0.5).rgbString(),
					
					//modified				
					backgroundColor: ['rgba(47, 79, 79, 0.4)'],
					//borderColor: ['rgba(47, 79, 79, 1)'],
					//borderWidth: 2,
					//lineTension: lineTension //線的平滑度, 愈大愈圓, 預設為 0
				}
				//,{label: '標題2', data:[3,2,1,1,5]}
				//,{label: '標題3', data:[5,3,4,3,3]}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			animation: false,
			showTooltips: false,
			showLabelBackdrop: false,
			legend: {
				position: 'top'
			},
			
			elements: {
				line: {
					tension: lineTension, //線的平滑度, 愈大愈圓, 預設為 0
					borderWidth: 2,
					borderColor: ['rgba(47, 79, 79, 1)'],
				}
			},			
			
			scales: {
				r: {
					pointLabels: {
						color: 'black',
						font: {
							size: pointLabelsFontSize, 							
							weight: 'bold'
						} 
					},
					min: 0,
					max: maxScale, 

					//modified
					angleLines: {
						color: 'black'
					},
					grid: {
						lineWidth: 1,
						color: '#000000a0'
					},
					ticks: {
						color: 'black',
						font: {size: 12},
						stepSize: 1
					}
				}
			},
		
			plugins: {
				legend: {
					labels: {
						color: 'black',
						font: { size: legendLabelsFontSize }
					}
				}
			},
			
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 20,
					bottom: 0
				}
			},
		},

	};
	
	if(document.querySelector('.batch-enable').checked) {
		var lines = document.querySelector('.items-field-batch').value.replace(/\r/g, '\n').split(/\n+/);
		if(lines.length > 1) {
			var datasets = [];
			var labels = [];
			var bgColors = [];
			var total = 0;
			for(var i=0; i<lines.length; i++) {
				var line = lines[i];
				if(line.replace(/,|\s/g, '') != '') {
					var fields = line.split(/[,\t]/);
					if(fields.length>1) {
						if(fields[0].replace(/\s/g)=='[顏色]') {
							//第一欄放 [顏色] 者，就當是要設定背景顏色
							for(var j=1; j<fields.length; j++) {
								bgColors.push(fields[j]);								
							}							
						} else {
							if(total==0) {
								//第一行有效的資料為圖例的標題字, 由第二欄抓
								for(var j=1; j<fields.length; j++) {
									datasets[j-1] = {};
									datasets[j-1]['label'] = fields[j];
									datasets[j-1]['data'] = [];
								}
							} else {
								labels[total-1] = fields[0];
								for(var j=1; j<fields.length; j++) {
									datasets[j-1]['data'].push(fields[j]);
								}
							}
							total++;
						}
					}
				}
			}
			if(total > 0 && datasets[0]['data'].length>0 && datasets[0]['data'].length == labels.length) {
				config.data.labels = labels;
				config.data.datasets = datasets;
				if(bgColors.length == config.data.datasets.length) {
					for(var i=0; i<bgColors.length; i++) {
						if(bgColors[i].replace(/\s/g, '')!='') {
							config.data.datasets[i]['backgroundColor'] = color(bgColors[i]).alpha(0.5).rgbString();
						}
					}
				}
				//將批次輸入上方的 [套用範例] 按鈕換字面, 避免誤按
				document.querySelector('.btn-apply-batch').innerHTML = '更新圖形';
			}
		} else if(document.querySelector('.items-field-batch').value.replace(/\s/g, '')=='') {
			document.querySelector('.btn-apply-batch').innerHTML = '套用範例';
		}
	}
	
	var chart;
	chart = document.getElementById("radar_chart");
	chart.style.backgroundColor = "rgba(255, 255, 255, 1)";
	ctx = chart.getContext("2d");

	var chartSize = parseInt(document.querySelector('input.chart_size').value);
	ctx.canvas.height = chartSize;
	ctx.canvas.width = chartSize;
	
	var chartContainer = document.querySelector('.chart-container');
	chartContainer.style.width = chartSize+'px';
	chartContainer.style.height = chartSize+'px';

	if(typeof(radarChart)!='undefined' && typeof(radarChart.destroy)=='function') {
		radarChart.destroy();
	}
	radarChart = new Chart(ctx, config);
	radarChart.update();

}
function exportImage() {
	showMessage('將雷達圖匯出為 PNG 圖檔');
	/* 用連結並以觸發 click 來自動下載圖片 */
	var anchor = document.createElement('a');	
	anchor.setAttribute('download', "chart");
	anchor.setAttribute('href', radarChart.toBase64Image());
	anchor.setAttribute('target', '_blank');
	document.body.appendChild(anchor);
	anchor.click();	
	document.body.removeChild(anchor);
};	

showMessage = function(txt, bgColor, delay, callback) {
	if(!delay) {
		delay = 2;
	}
	if(typeof(bgColor)=='undefined'||bgColor==null) {
		//bgColor = '#44AF49';
		bgColor = '#ff9900';
	}
	var elm = document.querySelector('.message');
	elm.innerHTML = txt;
	elm.style.display = 'block';
	elm.style['background-color'] = bgColor;
	elm.style.opacity = 0.75;
	elm.style.transition = 'opacity '+delay+'s ease-out';
	setTimeout(function() {
		elm.style.opacity = 0;
		elm.style.display = 'none';
		if(typeof(callback)=='function') {
			callback();
		}
	}, Math.floor(delay*1000));
}

/**
 * 取得網址中的參數並解碼
 */
function getValueAndDecode(target) {
	target = gup(target);
	if(typeof(target)=='string' && target!='') {
		target = decodeURIComponent(target.replace(/\*/g, '%')).trim();
	}
	return target;
};
copyAndSelectToClipboard = function(id, value, callback) {
	//特別注意: iOS 要將資料複製到剪貼簿, 必須由 touchend trigger
	var target;
	if(typeof(id)=='undefined' || id==null) {
		target = document.createElement('input');
		target.style = 'width:1px;height:1px;opacity:0;'; //隱藏輸入區
		document.body.appendChild(target);
	} else {
		target = document.getElementById(id);
		//if(!/^http/i.test(target.value||target.innerText||target.innerHTML)) {
		//  alert('有網址才能複製到剪貼簿');
		// return;
		//}
	}
	if(typeof(value)=='string') {
		target.value = value;
	}
	target.focus();
	target.select();
	//target.setSelectionRange(0, target.value.length); //For mobile devices
	//document.execCommand("copy");
	try {			
		navigator['clipboard']['writeText'](target.value);
	} catch(error) {
		document.execCommand('copy');
	}
	setTimeout(function() {
	  window.getSelection().removeAllRanges();// to deselect
	  if(typeof(id)=='undefined' || id==null) {
		target.remove();
		delete target;
	  }
	  if(typeof(callback)=='function') {
		  callback(value);
	  }
	},100);
};
function copyLink() {
	var q='', t='', x=10, f1=16, f2=12, b=0.3;
	var query = '';
	var encode = function(value) {
		//先將參數編碼，並把 % 換成 * ，避免被瀏覽器先解碼
		return encodeURIComponent(value).replace(/\%/g, '*');
	}
	if(typeof(config)!='undefined' && config!=null) {
		
		for(var i=0; i<config.data.labels.length; i++) {
			if(i>0) {
				q += '\n';
			}
			q += config.data.labels[i]; //第一欄是項目的名稱
			for(var r=0; r<config.data.datasets.length; r++) {
				q += ','+config.data.datasets[r].data[i];
			}
		}
		if(config.data.datasets.length>1) {
			var tList = '';
			var bgList = '';
			for(var r=0; r<config.data.datasets.length; r++) {
				if(typeof(config.data.datasets[r]['label'])=='string') {
					tList += ','+config.data.datasets[r]['label'];
				}
				if(typeof(config.data.datasets[r]['backgroundColor'])=='string') {
					bgList += ','+Chart.helpers.color(config.data.datasets[r]['backgroundColor']).hexString();
				}
			}
			if(tList!='') {
				tList = '[標題]'+tList+'\n';
			}
			if(bgList!='') {
				bgList = '[顏色]'+bgList+'\n';
			}
			q = bgList+tList+q;
		}
		t = config.data.datasets[0].label;
		x = config.options.scales.r.max;
		f1 = config.options.plugins.legend.labels.font.size;
		f2 = config.options.scales.r.pointLabels.font.size;
		//b = config.data.datasets[0].lineTension;
		b = config.options.elements.line.tension;
		query = 'q='+encode(q)+'&t='+encode(t)+'&x='+x+'&f1='+f1+'&f2='+f2+'&b='+b;
	}
	if(query!='') {
		//取得網址, 並重組為帶內容設定的新網址
		var url = window['location']['origin']+window['location']['pathname'];
		url += '?'+query+'&autostart=true';
		copyAndSelectToClipboard(null, url);
		showMessage('已將網址複製到剪貼簿中');
	}
};
function updateFieldValues() {
	//設定雷達圖的初始大小
	var chart_sizeInput = document.querySelector('input.chart_size');
	if(typeof(chart_sizeInput)!='undefined' && chart_sizeInput!=null) {
		chart_sizeInput.value = Math.floor(Math.min(widthMax, heightMax)*0.85);
		chart_sizeInput.setAttribute('min', 290);
		chart_sizeInput.setAttribute('max', 2048);
		document.getElementById('sizeLabel').innerText = chart_sizeInput.value+'像素';
	}
	
	document.querySelector('input.lineTension').setAttribute('step', 0.05);
	
	document.querySelector('.items-field-batch').setAttribute('wrap', 'off'); 
	  
	//由網址中取得各欄位的輸入值並填入當預設
	var query = getValueAndDecode('q');
	var titleQuery = getValueAndDecode('t');
	var maxQuery = getValueAndDecode('x');
	var fontSize1 = getValueAndDecode('f1');
	var fontSize2 = getValueAndDecode('f2');
	var lineTension = getValueAndDecode('b');
	
	var isBatchData = false;
	
	if(typeof(query)=='string' && query!='') {		
		var itemsContainer = document.querySelector('.items-field');
		if(typeof(itemsContainer)!='undefined' && itemsContainer!=null) {
			//var itemTemplate = itemsContainer.children[itemsContainer.children.length-1].innerHTML;
			var itemTemplate = itemDefaultTemplate;
			itemsContainer.innerHTML = ''; //clear all items
			if(/\[顏色\][,\t]/.test(query)) {
				isBatchData = true;	//資料中帶有 [顏色], 的, 表示為使用 textarea 輸入的
			}
			var lines = query.replace(/\r/g, '\n').split(/\n+/);
			for(var i=0; i<lines.length; i++) {
				var line = lines[i];
				if(line.replace(/,|\s/g, '') != '') {
					var fields = line.split(/[,\t]/);
					if(fields.length>=2 && !isNaN(fields[1])) {
						var elm = document.createElement('li');
						elm.innerHTML = itemTemplate;
						elm.children[0].value = fields[0];
						elm.children[1].value = fields[1];
						itemsContainer.append(elm);
						//如果欄位數大於3, 應該是有多個類別的, 還要將資料還原回 textarea
						if(fields.length >= 3) {
							isBatchData = true;
						}
					}
				}
			}
		}
	}
	if(typeof(titleQuery)=='string' && titleQuery!='') {
		document.querySelector('input.title').value = titleQuery;
	}
	if(typeof(maxQuery)=='string' && maxQuery!='' && !isNaN(maxQuery)) {
		document.querySelector('input.max-scale').value = Number(maxQuery);
	}
	if(typeof(fontSize1)=='string' && fontSize1!='' && !isNaN(fontSize1)) {
		document.querySelector('input.legendLabels-font-size').value  = Number(fontSize1);
	}
	if(typeof(fontSize1)=='string' && fontSize1!='' && !isNaN(fontSize1)) {	
		document.querySelector('input.pointLabels-font-size').value = Number(fontSize2);
	}
	if(typeof(lineTension)=='string' && lineTension!='' && !isNaN(lineTension)) {	
		document.querySelector('input.lineTension').value = Number(lineTension);
		document.getElementById('lineTensionLabel').innerText = lineTension;
	}
	//是多類別的，將資料填入 textarea 並切換輸入模式
	if(isBatchData) {
		document.querySelector('.items-field-batch').value = query;
		changeInputType(true);
	}
};

function openNav() {
  document.getElementById("mySidebar").style.width = "400px";
  document.getElementById("main-container").style.marginLeft = "400px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main-container").style.marginLeft= "0";
}
setViewport = function() {
  //<meta name="viewport" content="initial-scale=1.0,minimum-scale=1,maximum-scale=1.0,user-scalable=no">
  var viewport = document.querySelector("meta[name=viewport]");
  if(typeof(viewport)=='undefined' || viewport==null) {
	viewport = document.createElement('meta');
	viewport.name = 'viewport';
	document.getElementsByTagName('head').item(0).appendChild(viewport);
  }
  var content = 'initial-scale=1.0,minimum-scale=1,' +
		   'maximum-scale=1.0,user-scalable=no';
  if ((/android/i).test(navigator.userAgent)) {
	content += ',target-densityDpi=device-dpi';
  }
  viewport.content = content;
};
setVisibility = function(enable) {
  var HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
  if(typeof(HTML5FunWrapper)!='undefined' && HTML5FunWrapper!=null) {
	if (enable) {
	  //先將捲軸捲到最上方，以免無法進行按下的動作
	  window.scrollTo(0,0);
	  //禁用捲軸的功能
	  window.onscroll = function () { window.scrollTo(0, 0); };
	  //讓遊戲全畫面
	  document.body.style.overflow = 'hidden';
	  HTML5FunWrapper.style.visibility = "visible";
	} else {
	  HTML5FunWrapper.style.visibility = "hidden";
	  //恢復捲軸的功能
	  window.onscroll=null;
	  //重新顯示原有的內容
	  document.body.style.overflow = 'visible';
      //
      try{if(typeof(set__scale)=='function')set__scale(1)}catch(e){};	  
	}
  }
};

set__scale=function(s){
  for(var i=3; i<=10; i++) {
    try{document.querySelector('#aswift_'+i).parentElement.parentElement.style.scale= s}catch(e){};
  }
};

function start() {
  try{if(typeof(set__scale)=='function')set__scale(0.001)}catch(e){};
  
  setViewport();
  
  setVisibility(true);
  
  window.scrollTo(0, 0);
  
  updateFieldValues();
  drawChart();
};

var autostart = gup('autostart');
if(autostart!='') {
  start();
}