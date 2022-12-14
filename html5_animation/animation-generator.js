var scenceWidth,
  scenceHeight,
  canvas_width,
  canvas_height,
  widthSlider,
  heightSlider,
  sectorTotal,
  groove_width,
  number_of_frames,
  mask_width,
  grating_width,
  imageCanvas,
  ctx,
  photoData,
  imgURL,
  demoInterval,
  demoDelay,
  loadingInterval,
  enableAutoPlay,
  imageIndexNumber,
  enableDownload,
  gratingShape;

function init() {
  /* get scence size */
  scenceWidth = window.innerWidth && document.documentElement.clientWidth ?
    Math.min(window.innerWidth, document.documentElement.clientWidth)
     : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  
  scenceHeight = window.innerHeight && document.documentElement.clientHeight ?
    Math.min(window.innerHeight, document.documentElement.clientHeight)
     : window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  
  /* canvas size initial */
  canvas_width = parseInt(scenceWidth * 0.8);
  canvas_height = parseInt(scenceHeight * 0.8);

  canvas_width = 400;
  canvas_height = 300;
  
  /* image dimensionSliders init */
  widthSlider = document.getElementById('canvas_width_input');
  heightSlider = document.getElementById('canvas_height_input');
  widthSlider.max = scenceWidth;
  heightSlider.max = scenceHeight;
  getRangeValue(widthSlider, canvas_width);
  getRangeValue(heightSlider, canvas_height);

  /* gratinng conf */
  sectorTotal = 50; /* round grating */
  
  groove_width = 1; /* Groove Width , color: white(transparent) */

  /* move imageSprite to the scence center */
  document.getElementById('imageSprite').style.left = parseInt((scenceWidth - canvas_width) / 2) + 'px';
  document.getElementById('imageSprite').style.top = parseInt((scenceHeight - canvas_height) / 2) + 'px';

  imageCanvas = document.getElementById('imageCanvas');
  ctx = imageCanvas.getContext('2d');

  imageCanvas.setAttribute('width', canvas_width);
  imageCanvas.setAttribute('height', canvas_height);

  photoData = [];

  enableAutoPlay = false;

  imageIndexNumber = 0;
  enableDownload = false;
  gratingShape = 'rectangle';
  
  fillButtons();
};

function fillButtons() {
	//幫按鈕填入圖示
	var buttons, btn, img;
	var images = [
		  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAIVAAACFQEa0KbfAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABNpJREFUaIHtmV9oU1ccxz+3f3TJFidrRmEEu7bgwxChOMagkVjEQieFsafRCXvZy1h9kjFq2fYyy1BB1g5xyIQxBcWxsAfZOnCoCJWpiytUanU6xtatmzOuUzN7b+53DzeJucmNSWzM9aFfuFxyzvnd8/3e+/tzzgksYQlLWMISYB1wEbgL2EAauA185iepajGEQ1wlrl/8o1Y5ngIsSovIXt/6RbBSfEl5EQJMvwhWiqtUJkRATy0nbqjlw4CmKsauquXEtRbyZxVjv6vx3DVFL5W51U2/CFaDH7i/iDTwsm/sqsRpnEJYKMICXvOR1wNhACfN5qfcLl8ZLQJj3BOSAJr9pfPgmKU4Pi4CbX6SKoVW4EPg6YL2D7h/wH9RR44V4ToOORv4PNMWxh0fpa6/gGCd+XriDYqzUgPeSxUTJ04KF5UTdWddgOXAf7hJLQAjeL/9+YzdY8AR7qXnP+rK2gMR4Bpusjbe9UPAnQL7dIl23/Aqzk6wXDzYBXZZIVbdmFaACM6bLSfmrTyb/C9XmPF8xXNACieob+Et5HJm7K6C9k/qTbYc1gFR4EdK14+ezD3/i8z5QbYS7KG0e+VX+6ygu/7QLI9lVHYIYQNJarztrTWmuf/G6jzwim/sqsDzeNeU9MOYrJrDgmrxZIn2BqAP+LrcAyR1AB1ACOc8YMowjLpvk7OLyezS5e+837+VMpK0TNKgpClJZsF1R9IxSd11UQB8jDugY8ALuF3sPQ8RnZImJZmJRMLatm1bOhqN2l1dXfb69evt4eHh9MzMjJURtVfSsocp4nHcS/jxvL6fCwQeLRDxezKZNAcGBmzDMDwTRXNzs4aGhtKWZZmS4pJqfaSVwze4Xaoxr+9FihPA7WAw+KmkyRs3bphr1qxx9W/cuNGOx+NWOBx2CRoYGLBt2zYlvfswRBgZ8tkJj3iM2UPBaf3g4KAWFhbU399flOUOHDiQlmT29vYW9e3bty8taV5SZLHEb+K84QWc/z/+xe06pTLXhvyxU1NTGh8f93SlQ4cOWZLMzZs3FwlpbW2VaZqmpO2L9a+PMvdmnC3rE3l9t4B/StidwEmp1zo6Oli9ejUHDx70HNjU5FSIhoZiqnNzcxw/ftwAXlqskPeBd/AucjMV2C/v7OwEYHp62nNAVkhjY6Nn/6VLlwygvRYRvwt4FriC88mz+L6M3VfAM6FQCIBUKpXriMVi2r17tx0KhXJfoqmpibVr12p0dNQOh8O5sfPz81DahR8Yq3COea7ixEEpnCfj593d3TJNU/39/TnfHxsbS0syJyYmrJMnT1qSzNHR0XQymTQlmX19fbl42b9/f1rSlVoLqRTXcRKEtXLlSjuVStkjIyO5TBYIBHTq1CnLo7KbO3fudGW8TIF8NM7IJB2bnZ01A4FAjmBLS4suXLjgErNjxw6XiFgsZmf6tvgqIAtJ3V5vu6WlRWfPnrW8RAQCASUSCUvSRUmPzpmypL22bZtbt251EV6xYoV6enpcNSQYDCoej1uSUpI2+Ei7GJKaM2sn8/Dhw1Z7e3tRATQMQ5s2bbInJyezIl7P2ht+EfdCZgE4DLxt23bgzJkzxrlz54xUKkUkElE0GlVbWxs4qf5NwzBO+Mm3LCRFJG2XdFrSr5JuS/pJ0lFJW7xi4n+HnE7H4VB7hAAAAABJRU5ErkJggg=='
		, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAIVAAACFQEa0KbfAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA85JREFUaIHtmk9IY1cUxr/7EmUiMZVRRNtAsCWL2UgRRdPmz4RgC2WkSt1ZSrRYpkgoghPa2irZqCUuJIsuxJWhMWMhLbgQhJiCFSNoGUFEGUs3FRvBIrES0OR9XRhfjcbporR5lPfB4V3ud8/l/LjvvPcIATSpW58WGT8E0FrE/yx/dQKw3Zi7vtaej7vybfk97spvzddwV30AAD0KVVZkrMvHi3z5b/x/uv+LfACAhP+JNBC1SQNRmzQQtUkDUZs0ELVJA1GbNBC1SQNRmzQQtUkDUZs0ELVJA1GbNBC1SQP5L0Ty1ZmZmZZwOGwn+abFYrl319qbv8aXXCTLAXyUSqV8AEb6+vpE3vpif3+fer3+dQBjQoiCPFWBOJ3O+wA2ADw4PDyUgsEg1tfXxdnZGYxGIxwOB7xe79tWq/Wt5eXln9xu91dCiHNARSAkXzs9Pf3w5OTk3sDAgG5ubk6QLFizsrKCYDCoGxoakgOBQDOApyTfE0LIquiR2tpaPYDvzs/PKxwOhy4SiSgQHo+HsVhMrqmpAQBcXFxgfHxc8nq9guQjAMOASpo9Go0+Ivmgt7dXbG9vF9z8PT097OzsZFNTU8HxRCIRMT09LQF4QtKsCpDm5uZ34/G4WFhYEDe98vJyAEBZWdmtvNHRUSmbzRoAfFBykP7+/peNRqN5dna2aC16/WUbS9JtO5VKIR6PCwDvlByktbX1FQDY3d0t6l+B6HS6ov7e3p4A0FByEJPJVAEAmUxGmXO5XJycnGRlZaVyEnq9Ho2NjQiFQkrjA0A6nQaAl0oOcnBw8DsANDQ0KHPd3d0cHBzk0tJSrrq6GgDgdDqZSCRkn88nt7S0KI1fV1cHAL+VHGR+fv4XklmbzaYU5/f7pdXVVbS1tdHhcBAAfD6fXFVVhWAwKC0uLioPBZfLRQDPSg6ytrb2x9HR0TOv1ysbDAYAl7dZV1eXtLW1VfAUm5iYEH6/X6nZ5XLRarUSwPclBwGAcDj8TX19PQKBgHIqx8fH8Hg8us3NTQEAY2Nj0vDwsAJmMBgwNTUlA3gO4OnNPb8sMvYAeKOIP5K/uvHXf01GrvlXa135uCvfDsBN8utsNpvz+Xw5ALwKk8lEt9stX5+rqKhgLBaTSWZIPgRuv9kvioxz+fi3/U92dnZ2Q6GQHI1Gc1fNn06nkUgkBAAIIdDe3s5kMpnr6OjIAXgshPgBAG69SUspkhIuv52eyLJsSCaTYmNjQ2QyGZjNZtrtdlosFgDYB/DxFYRqRdJM8nOSP5L8leQZyZ9JfkvyfZK3vlf+BKoZfHEHCIXWAAAAAElFTkSuQmCC'
		, 'data:image/png;base64,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'
		, 'data:image/png;base64,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'
		, 'data:image/png;base64,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'
	];
	//上方功能選單圖示
	buttons = document.querySelector('.buttons');
	for(var i=0; i<buttons.children.length; i++) {
		img = images[i];
		buttons.children[i].innerHTML = `<img src="${img}" />`;
	}
	//畫面中央圖形拖曳區的上載圖示(與上方功能圖示的左起第五個一樣)
	btn = document.querySelector('#upload');
	if(typeof(btn)!='undefined' && btn!=null) {
		img = images[4];
		btn.innerHTML = `<img src="${img}" />`;
	}
	//左下角的自動播放動畫圖示
	btn = document.querySelector('#autoPlayIcon');
	if(typeof(btn)!='undefined' && btn!=null) {
		btn.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAIVAAACFQEa0KbfAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAzVJREFUaIHt2EuIVmUcx/HPTCNKWNg9F7Upw6AiooRWEWSbpNykQXZZuahN0IVgKmgThLpOwcSkKAS74WQhVipSA7Yo3XSZJi+bFhlpipWOLZ4zzOnMc67ved9X4/3Cn3k5z//5n99/znP5Pw8DBgw4XxnCoxjDfnyEVRjup6i6XIT3cC5i2zDSbQELcFmBza8Y52nxJKbtmVZVR/ijRMDOinG+KYlzsK6wup/wCcwpaP+1YpybS9pvrBin70wo/iJH6gbs1wrxQUn7+3UDDjUUkuZSPI6bMLfE923sFRaNr7A44jOBJTjWgrbKDGO34mGStgkhcbgCm3A6aTuNLbiqd/JneFL1JKbtE1ySijEHVypeRErJG1rvYlFO20asT8R8j4UN3nsQz+PTBn2j5C2/R4XdN8bvyd9RzZKAW7ADP2IcP+A1nG0Yr/Fkv174GvMyz8/g28yzuYLwMp7DuoZ6GrNFfPy/EfF9Mcc3ayfNHs7DQiE5ju/wkha3jNuFIZAVchzXZHyvTZ5XXQh2p4Q+kIjP+rzQViJv5YgYjfi+WSOJaVuDXQXt420lsj0S/Cez58sd4l+uU9vRViJPRYIvi/iVbZSnlNdcsT73tJXIEF4RlsxfxM8OD1cQ9Sruwt8VkxhTXjW3yjxMlog6hIsT/5dLfPfj3t7Jn2G0RNg5rEj559Vrh7Fanyr0hTgREZW2LyL9rsPXSftveFZ5Jd1VNitO4h/cWtB/vnaOFh1xp/Lldqxv6ioyhD2qrT4bdFiyd5NH1NsPPhfOIK1RNB5XJjZ9CBrx3wNRmhuE42sdJvEQDtTsV4tVOi8lJrEWUwU+x5NkusaXHSYxhfuSWCvwZ4Hv2W4mU1R9VrGNmXi3Ka6rdnUrkeWaV64Twj1wlsvxWU6fqletueSd2T/EUjwo7NZFi8JJofAjDKHXzZzr0xwTblDuj7S1dgnRKw6Y/TX+wtX9FFWXu8WH1dZ+imrCJvFEYkPtvGWBMJeySfyspTK9V7X+Y2YOUmk2CHvOBcP/YpIvFp8b77T5kl4Mrbw75PU9eHerjJh9Y7iv7Zfk/bfaZAofC+ePU8IF2+rk94ABA3rEvyDd4vAC3nAbAAAAAElFTkSuQmCC';
	}
	
};

function setGratingShapeToCircular(value) {
	var grooveWidthSlider = document.querySelector(".grooveWidthSlider");
	var caption = '柵欄縫隙大小';
	if(typeof(value)!='undefined' && value) {
		gratingShape = 'circle';
		caption = '扇形總數';
		value = sectorTotal;
	} else {
		gratingShape = 'retangle';
		value = groove_width;
	}
	grooveWidthSlider.getElementsByTagName("p")[0].innerHTML = caption;	
	grooveWidthSlider.getElementsByTagName("input")[0].value = value;
	grooveWidthSlider.getElementsByTagName("input")[1].value = value;
};

function getRangeValue(input, value) {
	/* 
	parseInt(input.min);
	parseInt(input.max);
	parseInt(value); 
	*/
	var min = Number(input.min); 
	var max = Number(input.max); 
	value = Number(value); 
	if(value<min) {
		value = min;
	}
	if(value>max) {
		value = max;
	}
	input.value=value;
	input.nextElementSibling.value=value;
	return value;
};

function updateGrooveValue(value) {
	if(gratingShape=='circle') {   /* for circular grating */		
		sectorTotal = getRangeValue(document.getElementById('groove_width_input'), value);
	} else {   /* for retangle grating */
		groove_width = getRangeValue(document.getElementById('groove_width_input'), value);
	}
};

function updateCanvasWidthValue(value) {
	canvas_width = getRangeValue(document.getElementById('canvas_width_input'), value);
};

function updateCanvasHeightValue(value) {
	canvas_height = getRangeValue(document.getElementById('canvas_height_input'), value);
};

function resetCanvasDimensionSetting() {
	/*
	canvas_width = parseInt(document.getElementById('canvas_width_input').value);
	canvas_height = parseInt(document.getElementById('canvas_height_input').value);
	*/
	canvas_width = Number(document.getElementById('canvas_width_input').value);
	canvas_height = Number(document.getElementById('canvas_height_input').value);
};

//顯示訊息
function showMessage(txt, delay) {
	/* r.f. How To Create a Modal Popup Box with CSS and JavaScript
	   https://sabe.io/tutorials/how-to-create-modal-popup-box
	*/
	if(typeof(delay)!='number') {
		delay = 3000;
	}
	
	var message = document.getElementById('message');
	message.innerHTML = '<div class="modal"><div class="modal-content"><h1>'+txt+'</h1></div></div>';
	
	var modal = document.querySelector(".modal");
	modal.classList.toggle("show-modal");
	
	message.timeoutId = setTimeout(function() {
		modal.classList.toggle("show-modal");
	}, delay);
	
	//如果按了訊息框，就提早移除訊息
	message.addEventListener('click', cancelMessage);
};
//移除訊息
function cancelMessage(e) {
	e.preventDefault();
	e.stopPropagation();

	var  message = document.getElementById('message');		
	var modal = document.querySelector(".modal");
	
	clearTimeout(message.timeoutId);
	
	modal.classList.toggle("show-modal");
	
	message.removeEventListener('click', cancelMessage, false);
};

function updatePhotoDataAndAnimation() {
	var thumbnail = document.querySelector(".thumbnail").getElementsByTagName('img');
	if(typeof(thumbnail)!='undefined' && thumbnail!=null && thumbnail.length>1) {
		photoData.splice(0);
		for(var i=0; i<thumbnail.length; i++) {
			photoData.push(thumbnail[i].src);
		}
		newAnimation();
	} else {
		showDragAndDropArea();
	}
};

function setEditorVisibility(enable) {
	stopDemo();
	var editor = document.querySelector(".editor");
	if(typeof(editor)!='undefined' && editor!=null) {
		editor.style.visibility = (enable ? "visible" : "hidden");
		if(enable) {
			showMessage('調整圖片的順序，或增/刪內容後按【套用】<br />即可重新製作動畫', 3000)
		}
	}
};

function newAnimation() {	
	if(photoData.length<2) {
		showDragAndDropArea(); /* show upload drag & drop area */
		showMessage('請加入兩張以上的圖片，即可製作柵欄動畫');
		return;
	}
	number_of_frames = photoData.length; /* Number of Frames */
	mask_width = groove_width*(number_of_frames-1);	/* color: black */
	grating_width = groove_width+mask_width;	/* offset x */
	
	demoDelay = (photoData.length>2 ? 150 : 250);

	enableDownload = true;
	enableAutoPlay = true;
	document.getElementById('uploadDragAndDropArea').style.display = "none";
	
	setEditorVisibility(false);
	setImagesVisibility(true);
	setAutoPlay(enableAutoPlay);
	
	imageIndexNumber = 0;
	getImage(imageIndexNumber);
};

function showDragAndDropArea() {
	stopDemo();
	setEditorVisibility(false);
	setImagesVisibility(false);
	document.getElementById('uploadDragAndDropArea').style.display = "block";
};

function clickHandler(ev) {
	/* 新增 input 的元件, 接收上載的檔案 */
	inputFromCamera = document.createElement('input');
	inputFromCamera.setAttribute('type', 'file');
	inputFromCamera.setAttribute('accept', 'image/*');
	inputFromCamera.setAttribute('multiple', 'true');
	inputFromCamera.setAttribute('id', 'inputFromCamera');
	inputFromCamera.style['width'] = '1px';
	inputFromCamera.style['height'] = '1px';
	inputFromCamera.onchange = function(e) {			
		var imagesUploaded = false;
		if(typeof(e.target)!='undefined' && typeof(e.target.files)!='undefined' && e.target.files.length>0) {
			readFiles(e.target.files);
		}		
	};
	inputFromCamera.click();
};

function dropHandler(ev) {
	/* https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop 
	   Prevent default behavior (Prevent file from being opened)
	*/
	ev.preventDefault();
	if(typeof(ev.dataTransfer)!='undefined' && typeof(ev.dataTransfer.files) != 'undefined') {
		readFiles(ev.dataTransfer.files);
	} else {
		showMessage('請指定兩張以上的圖片，才能製作動畫');
	}
};

function readFiles(files) {
	var imagesUploaded = false;
	if(typeof(files) != 'undefined' && files.length>1) {
		var imageTotal = 0;
		for(var i=0;i<files.length;i++) {
			if(files[i].type.match(/image/i)) {
				imageTotal++;
			}		
		}
		if(imageTotal>=2) {
			imagesUploaded = true;
		}
	}
	if(imagesUploaded) {
		/* hide drop area */
		document.getElementById('uploadDragAndDropArea').style.display = "none";
		/* clear gratingCanvas */
		document.getElementById('gratingCanvas').getContext('2d').clearRect(0, 0, scenceWidth, scenceHeight);
		stopDemo();
		photoData.splice(0);		/* clear old images data */
		imageIndexNumber = 0;
		resetCanvasDimensionSetting();
		imageFilesToBase64(files);
	} else {
		showMessage('至少要兩張圖片才能製作動畫');		
	}
};

function imageFilesToBase64(files) {
	if(imageIndexNumber<files.length && typeof(files[imageIndexNumber])!='undefined') {
		var file = files[imageIndexNumber++];
		if(file.type.match(/image/i)) {
			var reader = new FileReader();
			reader.mimeType = file.type;		/* 記錄一下 file.type */
			reader.readAsDataURL(file);	/* 以 DataURL base64編碼的資料 */
			reader.onloadend = function(e) {				
				var mimeType = this.mimeType; /* 編碼的類型 */
				var base64 = this.result; /* 取得資料 */
				imageSizeFit(imageIndexNumber-1, base64, files);
			};
		} else {
			imageFilesToBase64(files);
		}
	} else {
		newAnimation();
	}
};

function imageSizeFit(index, imgURL, files) {
	var image = new Image();
	image.crossOrigin = "anonymous";
	image.onload = function() { /* Draw when image has loaded */
		var w = this.naturalWidth;
		var h = this.naturalHeight;
		var scale = Math.min(canvas_width/w, canvas_height/h);
		w = w*scale;
		h = h*scale;
		if(Math.abs(w-canvas_width)<=1) {
			w = canvas_width;
		} else {
			w = Math.ceil(w);
		}
		if(Math.abs(h-canvas_height)<=1) {
			h = canvas_height;
		} else {
			h = Math.ceil(h);
		}		
		var thumbnail = document.querySelector(".thumbnail");
		if(index==0) {
			canvas_width = w;
			canvas_height = h;	
			imageCanvas.setAttribute('width', canvas_width);
			imageCanvas.setAttribute('height', canvas_height);
			document.getElementById('imageSprite').style.left=parseInt((scenceWidth-canvas_width)/2)+'px';
			document.getElementById('imageSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
			document.getElementById('gratingSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
			while (thumbnail.firstChild) {
				thumbnail.firstChild.remove();
			}
		}
		/* clear canvas */
		ctx.globalCompositeOperation = 'source-over';  
		ctx.clearRect(0, 0, scenceWidth, scenceHeight);
		var x0 = (canvas_width-w)/2
		var y0 = (canvas_height-h)/2;
		ctx.drawImage(this, x0, y0, w, h);
		var dataURL = imageCanvas.toDataURL("image/png");
		var img = document.createElement('img');
		img.src = dataURL;
		thumbnail.appendChild(img);
		photoData.push(dataURL);
		imageFilesToBase64(files);
	}
	image.src = imgURL;
};

function dragOverHandler(ev) {
	ev.preventDefault();
};

function getImage(index) {
	if(index<photoData.length) {
		imgURL = photoData[index];
		var image = new Image();
		image.crossOrigin = "anonymous";
		image.onload = drawImageWithSourceIn;
		image.src = imgURL;
	} else {
		makeGrating()
		ctx.globalCompositeOperation = 'source-over';  
		ctx.clearRect(0, 0, scenceWidth, scenceHeight);
		imageIndexNumber = 0;
		mergeImage(imageIndexNumber);
	}
};

function mergeImage(index) {
	if(index<photoData.length) {
		imgURL = photoData[index];
		var image = new Image();
		image.crossOrigin = "anonymous";
		image.onload = handleDrawImageForMerge; // Draw when image has loaded
		image.src = imgURL;
	} else {
		demoMoving();
	}
};

function handleDrawImageForMerge() {
  ctx.drawImage(this, 0, 0, canvas_width, canvas_height);
  imageIndexNumber++;
  mergeImage(imageIndexNumber);
};

function drawImageWithSourceIn() {
	var imageCanvas = document.getElementById('imageCanvas');
	var ctx = imageCanvas.getContext('2d');

	if(imageIndexNumber==0) {
		imageCanvas.setAttribute('width', canvas_width);
		imageCanvas.setAttribute('height', canvas_height);
		document.getElementById('imageSprite').style.left=parseInt((scenceWidth-canvas_width)/2)+'px';
		document.getElementById('imageSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
		document.getElementById('gratingSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
	}
	ctx.globalCompositeOperation = 'source-over';  
	ctx.clearRect(0, 0, scenceWidth, scenceHeight);
	if(gratingShape=='circle') {
		/* draw circular grating */
		drawRoundGrating(ctx, imageIndexNumber);
	} else {
		/* draw rectangle grationg */
		mask(imageIndexNumber);
	}
	ctx.globalCompositeOperation = 'source-in';
	ctx.drawImage(this, 0, 0, canvas_width, canvas_height);
	photoData[imageIndexNumber] = imageCanvas.toDataURL("image/png");
	imageIndexNumber++;
	getImage(imageIndexNumber);
};

function handleDrawImage() {
  var w = this.naturalWidth;
  var h = this.naturalHeight;
    
  var scale = Math.min(canvas_width/w, canvas_height/h);
  w = w*scale;
  h = h*scale;

  if(imageIndexNumber==0) {
	canvas_width = w;
	canvas_height = h;	
	imageCanvas.setAttribute('width', canvas_width);
	imageCanvas.setAttribute('height', canvas_height);
	document.getElementById('imageSprite').style.left=parseInt((scenceWidth-canvas_width)/2)+'px';
	document.getElementById('imageSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
	document.getElementById('gratingSprite').style.top=parseInt((scenceHeight-canvas_height)/2)+'px';
  }

  var x0 = 0;
  var y0 = 0;
  
  ctx.globalCompositeOperation = 'source-over';  
  ctx.clearRect(0, 0, scenceWidth, scenceHeight);
  mask(imageIndexNumber);
  ctx.globalCompositeOperation = 'source-in';
  ctx.drawImage(this, x0, y0, w, h);
  photoData[imageIndexNumber] = imageCanvas.toDataURL("image/png");
  imageIndexNumber++;
  getImage(imageIndexNumber);
};

function mask(frameNumber) {
	var x0 = groove_width*frameNumber;
	for(var x=x0;x<canvas_width;x+=grating_width) {	
		ctx.moveTo(x, 0);
		ctx.fillStyle = '#000000';
		ctx.fillRect(x, 0, groove_width, canvas_height); /* white */
	}
};

function drawGrating(gratingCanvas) {	
	var x0,x1;
	var ctx = gratingCanvas.getContext('2d');
	var width = gratingCanvas.width;
	var height = gratingCanvas.height;
	for(var x=0;x<width;x+=grating_width) {	
		ctx.moveTo(x, 0);
		ctx.fillStyle = '#000000';
		ctx.fillRect(x, 0, mask_width, height); /* black */
	}
};

function makeGrating() {
	var gratingCanvas = document.getElementById('gratingCanvas');
	gratingCanvas.setAttribute('width', (canvas_width*1.2<scenceWidth?canvas_width*1.2:scenceWidth));
	gratingCanvas.setAttribute('height', canvas_height);
	if(gratingShape=='circle') {
		/* draw circular grating */
		gratingCanvas.setAttribute('width', canvas_width);
		drawRoundGrating(gratingCanvas);
	} else {
		/* draw rectangle grating */
		drawGrating(gratingCanvas);
	}
	var gratingSprite = document.getElementById('gratingSprite');

	setMouseEventsToGratingSprite();
};

function setMouseEventsToGratingSprite() {	
	if(navigator.maxTouchPoints || 'ontouchstart' in document.documentElement) {
		gratingSprite.ontouchstart=handleMouseDown;
		gratingSprite.ontouchmove=handleMouseMove;
		gratingSprite.ontouchend=handleMouseUp;
	} else {
		gratingSprite.onmousedown=handleMouseDown;
		gratingSprite.onmousemove=handleMouseMove;
		gratingSprite.onmouseup=handleMouseUp;
	}
	gratingSprite.style.left = parseInt(parseInt(document.getElementById('imageSprite').style.left)-(gratingCanvas.width-canvas_width)/2)+'px';
	gratingSprite.style.top = document.getElementById('imageSprite').style.top;
	isDragging = false;
};

function handleMouseDown(e){
	var e = e || window.event;
	if(e.target==document.querySelector('.gratingCloseButton')) return;
	setAutoPlay(false);
    e.preventDefault();
    e.stopPropagation();
	gratingSprite.style.left = (parseInt(gratingSprite.style.left)+groove_width)+'px';
	startX = parseInt(gratingSprite.style.left);
	startY = parseInt(gratingSprite.style.top);
	if(typeof(e.touches)!='undefined' && typeof(e.touches[0])!='undefined' && e.touches[0]!=null) {
		/* mobile devices */
		offsetX = e.touches[0].clientX;
		offsetY = e.touches[0].clientY;
	} else {
		offsetX = e.clientX;
		offsetY = e.clientY;
	}
	isDragging=true;
};

function handleMouseUp(e){
    if(!isDragging){return;}
	var e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
    isDragging=false;
};

function handleMouseMove(e){
    if(!isDragging){return;}
	var e = e || window.event;
    e.preventDefault();
    e.stopPropagation();
	if(typeof(e.touches)!='undefined' && typeof(e.touches[0])!='undefined' && e.touches[0]!=null) {
		/* mobile devices */
		mouseX=startX+e.touches[0].clientX-offsetX;
		mouseY=startY+e.touches[0].clientY-offsetY;
	} else {
		mouseX=startX+e.clientX-offsetX;
		mouseY=startY+e.clientY-offsetY;
	}
	/* change grating position */
	gratingSprite.style.left = mouseX+'px';;
	gratingSprite.style.top = mouseY+'px';;
};

function downloadCanvas(canvasID, filename) {
	var canvas = document.getElementById(canvasID);
	var dataURL = canvas.toDataURL("image/png");
	download(dataURL, filename);
};

function download(dataURL, filename) {
	if(!enableDownload) {
		showMessage('要先製作動畫才能下載哦!');
		return;
	}	
	/* 用連結並以觸發 click 來自動下載圖片 */
	var anchor = document.createElement('a');	
	anchor.setAttribute('download', filename);
	anchor.setAttribute('href', dataURL);
	anchor.setAttribute('target', '_blank');
	document.body.appendChild(anchor);
	anchor.click();	
	document.body.removeChild(anchor);
};

function demoMoving() {
	var gratingCanvas = document.getElementById('gratingCanvas');
	stopDemo();
	if(gratingShape=='circle') {
		/* circular animation */
		roundAni(250, true);
	} else {
		if(enableAutoPlay) {
			gratingSprite.style.left = parseInt(parseInt(document.getElementById('imageSprite').style.left)-(gratingCanvas.width-canvas_width)/2)+'px';
			var xMax = parseInt(gratingSprite.style.left)+(gratingCanvas.width-canvas_width)/2;
		} else {
			var xMax = parseInt(gratingSprite.style.left)+canvas_width/4;
		}
		demoInterval = setInterval(function() {
			var x = parseInt(gratingSprite.style.left);
			x += groove_width;
			gratingSprite.style.left = x+'px';
			if(x>xMax) {
				if(enableAutoPlay) {
					gratingSprite.style.left = parseInt(parseInt(document.getElementById('imageSprite').style.left)-(gratingCanvas.width-canvas_width)/2)+'px';
					xMax = parseInt(gratingSprite.style.left)+(gratingCanvas.width-canvas_width)/2;
				} else {
					setAutoPlay(false);
				}
			}
		}, demoDelay);
	}
};

function stopDemo() {
	try {
		clearInterval(demoInterval);
	} catch(error) {  };
};

function setImagesVisibility(enable) {
	document.getElementById('imageSprite').style.visibility = (enable ? "visible" : "hidden");
	document.getElementById('gratingSprite').style.visibility = (enable ? "visible" : "hidden");
};

function setVisibility(enable) {
	stopDemo();
	var HTML5FunWrapper = document.getElementById("HTML5FunWrapper");
	if(typeof(HTML5FunWrapper)!='undefined' && HTML5FunWrapper!=null) {
		HTML5FunWrapper.style.visibility = (enable ? "visible" : "hidden");
	}
	if(enable) {
		window.scrollTo(0, 1);
		if(typeof(photoData)!='undefined') {
			/*
			setImagesVisibility(true);
			setAutoPlay(true);
			*/
			/* editor */ 
			newAnimation();
		} else {
			/* for player */ 
			imagesLoading();
		}
	}  else {
		setAutoPlay(false);
		if(typeof(photoData)!='undefined') {
			setEditorVisibility(false);
			/* clear all exist data */ 
			if(photoData!=null) {
				photoData.splice(0);
			}
		}
		setImagesVisibility(false);
	}
};

function setAutoPlay(enable) {
	document.getElementById('autoPlayCheckbox').checked = enable;
	document.getElementById('autoPlayIcon').style.opacity=(enable?1:0.4);
	enableAutoPlay = enable;
	if(enable) {
		demoMoving();
	} else {
		stopDemo();
	}
};

function imagesLoading() {
	setImagesVisibility(false);
	try {
		clearInterval(loadingInterval);
	} catch(error) { };
	loadingInterval = setInterval(function() {
		canvas_width = document.getElementById('imageCanvas').clientWidth;
		canvas_height = document.getElementById('imageCanvas').clientHeight;
		if(canvas_width>0 && canvas_height>0) {
			clearInterval(loadingInterval);
			document.querySelector('.loader').style.display='none';
			imageSprite.style.visibility='visible';
			gratingSprite.style.visibility='visible';
			imageSprite.style.left=(scenceWidth-canvas_width)/2+'px';
			imageSprite.style.top=(scenceHeight-canvas_height)/2+'px';
			gratingSprite.style.left = parseInt(parseInt(imageSprite.style.left)-(document.getElementById('gratingCanvas').clientWidth-canvas_width)/2)+'px';
			gratingSprite.style.top = imageSprite.style.top;
			setAutoPlay(true);
		} else {
		}
	}, 100);
};

function downloadHTML() {
	var html = `
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" /&gt;
&lt;title&gt;HTML5 FUN::Grating Animation&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
${(new XMLSerializer).serializeToString(document.getElementById('HTML5FunStyle'))}
&lt;div id="HTML5FunWrapper"&gt;
&lt;div id="imageSprite"&gt;&lt;img id="imageCanvas" src="${document.getElementById("imageCanvas").toDataURL("image/png")}"&gt;&lt;/img&gt;&lt;/div&gt;
&lt;div id="gratingSprite"  title="拖曳柵欄看動畫"&gt;&lt;img id="gratingCanvas" src="${document.getElementById("gratingCanvas").toDataURL("image/png")}"&gt;&lt;/img&gt;
&lt;button aria-label="close" class="gratingCloseButton" onclick="setVisibility(0);" title="關閉"&gt;X&lt;/button&gt;
&lt;/div&gt;

&lt;div class="toggleSwitch" title="自動播放動畫開關"&gt;
&lt;label class="switch"&gt;&lt;input id="autoPlayCheckbox" type="checkbox" checked onchange="setAutoPlay(this.checked)";&gt;&lt;span class="switchSlider round"&gt;&lt;/span&gt;&lt;/label&gt;
&lt;img id="autoPlayIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAIVAAACFQEa0KbfAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAzVJREFUaIHt2EuIVmUcx/HPTCNKWNg9F7Upw6AiooRWEWSbpNykQXZZuahN0IVgKmgThLpOwcSkKAS74WQhVipSA7Yo3XSZJi+bFhlpipWOLZ4zzOnMc67ved9X4/3Cn3k5z//5n99/znP5Pw8DBgw4XxnCoxjDfnyEVRjup6i6XIT3cC5i2zDSbQELcFmBza8Y52nxJKbtmVZVR/ijRMDOinG+KYlzsK6wup/wCcwpaP+1YpybS9pvrBin70wo/iJH6gbs1wrxQUn7+3UDDjUUkuZSPI6bMLfE923sFRaNr7A44jOBJTjWgrbKDGO34mGStgkhcbgCm3A6aTuNLbiqd/JneFL1JKbtE1ySijEHVypeRErJG1rvYlFO20asT8R8j4UN3nsQz+PTBn2j5C2/R4XdN8bvyd9RzZKAW7ADP2IcP+A1nG0Yr/Fkv174GvMyz8/g28yzuYLwMp7DuoZ6GrNFfPy/EfF9Mcc3ayfNHs7DQiE5ju/wkha3jNuFIZAVchzXZHyvTZ5XXQh2p4Q+kIjP+rzQViJv5YgYjfi+WSOJaVuDXQXt420lsj0S/Cez58sd4l+uU9vRViJPRYIvi/iVbZSnlNdcsT73tJXIEF4RlsxfxM8OD1cQ9Sruwt8VkxhTXjW3yjxMlog6hIsT/5dLfPfj3t7Jn2G0RNg5rEj559Vrh7Fanyr0hTgREZW2LyL9rsPXSftveFZ5Jd1VNitO4h/cWtB/vnaOFh1xp/Lldqxv6ioyhD2qrT4bdFiyd5NH1NsPPhfOIK1RNB5XJjZ9CBrx3wNRmhuE42sdJvEQDtTsV4tVOi8lJrEWUwU+x5NkusaXHSYxhfuSWCvwZ4Hv2W4mU1R9VrGNmXi3Ka6rdnUrkeWaV64Twj1wlsvxWU6fqletueSd2T/EUjwo7NZFi8JJofAjDKHXzZzr0xwTblDuj7S1dgnRKw6Y/TX+wtX9FFWXu8WH1dZ+imrCJvFEYkPtvGWBMJeySfyspTK9V7X+Y2YOUmk2CHvOBcP/YpIvFp8b77T5kl4Mrbw75PU9eHerjJh9Y7iv7Zfk/bfaZAofC+ePU8IF2+rk94ABA3rEvyDd4vAC3nAbAAAAAElFTkSuQmCC" /&gt;
&lt;/div&gt;
&lt;button class="closeButton" aria-label="close" title="關閉" onclick="setVisibility(0);"&gt;X&lt;/button&gt;

&lt;div class='footer'&gt;
&lt;div class='left'&gt;&lt;a href='https://gsyan888.blogspot.com/' target='_blank' title='HTML5 FUN::Grating Animation::BY GSYAN'&gt;Create By::HTML5 FUN::GRATING ANIMATION GENERATOR::&lt;/a&gt;&lt;/div&gt;
&lt;div class='right'&gt;${new Date()}&lt;/div&gt;
&lt;/div&gt;
&lt;div id="message"&gt;&lt;/div&gt;
&lt;div class="loader"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
var groove_width=1;
var demoInterval,loadingInterval,isDragging=false,enableAutoPlay=true,startX,startY,offsetX,offsetY,mouseX,mouseY;
var scenceWidth = window.innerWidth&&document.documentElement.clientWidth?Math.min(window.innerWidth, document.documentElement.clientWidth):window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
var scenceHeight = window.innerHeight&&document.documentElement.clientHeight?Math.min(window.innerHeight, document.documentElement.clientHeight):window.innerHeight||document.documentElement.clientHeight||document.getElementsByTagName('body')[0].clientHeight;
var imageSprite = document.getElementById('imageSprite');
var gratingSprite = document.getElementById('gratingSprite');
var canvas_width, canvas_height;
var demoDelay = ${demoDelay};
${setMouseEventsToGratingSprite.toString()}
${handleMouseDown.toString()}
${handleMouseUp.toString()}
${handleMouseMove.toString()}
${demoMoving.toString()}
${stopDemo.toString()}
${setVisibility.toString()}
${setAutoPlay.toString()}
${imagesLoading.toString()}
${setImagesVisibility.toString()}
setMouseEventsToGratingSprite();
setVisibility(true);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
	`.replace(/&gt;/g,'>').replace(/&lt;/g,'<');
	download("data:text/plain;charset=utf-8,"+encodeURIComponent(html.replace(/\n|\r|\t/g, '')), "animation.html");
	//download("data:text/plain;charset=utf-8,"+encodeURIComponent(html), "animation.html");
};

function drawRoundGrating(gratingCanvas, frameNumber) {
	var isMask = false;
	if(typeof(frameNumber)!='undefined' && !isNaN(frameNumber)) {
		var gratingCanvas = document.getElementById('imageCanvas');
		isMask = true;
	} else {
		var gratingCanvas = document.getElementById('gratingCanvas');
		frameNumber = 0;
	}
	var x0,x1;
	var ctx = gratingCanvas.getContext('2d');
	var width = gratingCanvas.width;
	var height = gratingCanvas.height;
	
	radius = Math.floor(Math.min(width, height)/2);
	
	cx = parseInt(width/2);
	cy = parseInt(height/2);
	/* sectorTotal = 90; */
	/* ctx.lineWidth = 1; */
	var degreeOffset = 2*Math.PI/sectorTotal;
	var startangle = degreeOffset/2-Math.PI;
	var endangle = startangle;	
	var groove_angle = degreeOffset/number_of_frames;
	var grating_angle = degreeOffset-groove_angle;
	if(isMask) {
		grating_angle = groove_angle;
		startangle += groove_angle*frameNumber;
	}		
	/* 扇形 */
	for(var i=0; i<sectorTotal; i++) {
		startangle = startangle+degreeOffset;
		endangle = startangle+grating_angle;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(cx,cy);
		ctx.arc(cx,cy,radius,startangle,endangle);
		ctx.closePath();
		ctx.fillStyle = 'black';
		ctx.fill();
		ctx.restore();
	}
	
	/* 中央的圓 */
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(cx,cy);
		ctx.arc(cx,cy,3,0,2*Math.PI);
		ctx.closePath();
		ctx.fillStyle = 'black';
		ctx.lineWidth = 2;
		/* ctx.fill(); */
		ctx.stroke();
		ctx.restore();	
};

function rotate(obj, deg) {
    obj.style.webkitTransform = 'rotate('+deg+'deg)'; 
    obj.style.mozTransform = 'rotate('+deg+'deg)'; 
    obj.style.msTransform = 'rotate('+deg+'deg)'; 
    obj.style.oTransform = 'rotate('+deg+'deg)'; 
    obj.style.transform = 'rotate('+deg+'deg)'; 
};

function roundAni(interval, align, angle) {
	/* align gratingSprite to the center of imageSprite; */
	if(typeof(align)=='undefined'||align==null||align==true) {
		gratingSprite.style.left = document.getElementById('imageSprite').style.left;
		gratingSprite.style.top = document.getElementById('imageSprite').style.top;	
	}
	try {
		clearInterval(demoInterval);
	} catch(error) {  };
	if(typeof(interval)=='undefined' || interval==null) {
		var interval = 150;
	}
	var total=0; 
	var number_of_frames = photoData.length;
	/* var sectorTotal = 90; */
	if(typeof(angle)=='undefined' || angle==null) {
		var angle = 360/sectorTotal/number_of_frames;
	}
	demoInterval =setInterval(function() { 
		rotate(gratingSprite, (total++)*angle%360);
		/* rotate(imageSprite, (total++)*angle%360); */
		if(total>=number_of_frames) { 
		/* if(total*angle>=360) { */
			total = 0;
		}
	}, interval);
};


//document.getElementById('HTML5FunWrapper').onclick = function() {setVisibility(0);};


function appStart() {
	init();

	newAnimation();

	setImagesVisibility(true);
	imageSprite.style.left=(scenceWidth-canvas_width)/2+'px';
	imageSprite.style.top=(scenceHeight-canvas_height)/2+'px';
	gratingSprite.style.left = parseInt(parseInt(imageSprite.style.left)-(document.getElementById('gratingCanvas').clientWidth-canvas_width)/2)+'px';
	gratingSprite.style.top = imageSprite.style.top;
	//drawRoundGrating(gratingCanvas);
	
	setVisibility(1);
};

setVisibility(0);
