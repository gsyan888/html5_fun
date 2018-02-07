	//////////////////////////////////////////////////////////////////////////////////
	//		Init
	//////////////////////////////////////////////////////////////////////////////////

	// init renderer
	var renderer	= new THREE.WebGLRenderer({
		antialias: true,
		alpha: true
	});
	renderer.setClearColor(new THREE.Color('lightgrey'), 0)
	renderer.setSize( 640, 480 );
	
	
	renderer.domElement.style.position = 'absolute'
	renderer.domElement.style.top = '0px'
	renderer.domElement.style.left = '0px'

	//document.body.appendChild( renderer.domElement );

	// array of functions for the rendering loop
	var onRenderFcts= [];

	// init scene and camera
	var scene	= new THREE.Scene();
		
	//////////////////////////////////////////////////////////////////////////////////
	//		Initialize a basic camera
	//////////////////////////////////////////////////////////////////////////////////

	// Create a camera
	var camera = new THREE.Camera();
	scene.add(camera);


	////////////////////////////////////////////////////////////////////////////////
	//          handle arToolkitSource
	////////////////////////////////////////////////////////////////////////////////

	var arToolkitSource = new THREEx.ArToolkitSource({
		// to read from the webcam 
		sourceType : 'webcam',
		
		// // to read from an image
		// sourceType : 'image',
		// sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',		

		// to read from a video
		// sourceType : 'video',
		// sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',	
		
			
	})

	arToolkitSource.init(function onReady(){
		onResize()
		
		//hide the vodeo element, add by gsyan
		//var video = document.getElementsByTagName("VIDEO")[0];
		//video.style.visibility = 'hidden';
		//video.style.display = 'none';
	})
	
	// handle resize
	window.addEventListener('resize', function(){
		onResize()
	})
	function onResize(){
		arToolkitSource.onResize()
		
		arToolkitSource.copySizeTo(renderer.domElement)	
		if( arToolkitContext.arController !== null ){
			arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)	
		}	
	}
	////////////////////////////////////////////////////////////////////////////////
	//          initialize arToolkitContext
	////////////////////////////////////////////////////////////////////////////////
	

	// create atToolkitContext
	var arToolkitContext = new THREEx.ArToolkitContext({
		cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
		detectionMode: 'mono',
		debug: false,
	})
	// initialize it
	arToolkitContext.init(function onCompleted(){
		// copy projection matrix to camera
		camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
	})

	// update artoolkit on every frame
	onRenderFcts.push(function(){
		if( arToolkitSource.ready === false )	return

		arToolkitContext.update( arToolkitSource.domElement )

		// update scene.visible if the marker is seen
		scene.visible = camera.visible
	})
		
	////////////////////////////////////////////////////////////////////////////////
	//          Create a ArMarkerControls
	////////////////////////////////////////////////////////////////////////////////
	
	// init controls for camera
	
	// mobile use the fipped pattern markers files m-marker-*.patt
	var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	if (isMobile) {	
		var markerUrlPrefix = 'data/m-marker-';
	} else {
		var markerUrlPrefix = 'data/marker-';
	}
	
	//load the pattern files in sequence
	var loadMarkersVar = setInterval(loadMarkers, 100);
	var markerNumber = -1;
	var timerCounter = 0;
	var nTimeOut = 1000;
	function loadMarkers() {
		timerCounter++;
		if( markerNumber < 9 && timerCounter < nTimeOut) {
			if( arToolkitSource.ready !== false ) {
				//var loadedNum = Object.keys(arToolkitContext.arController.patternMarkers).length;
				//if( Object.keys(arToolkitContext.arController.patternMarkers).length == 1 && Object.keys(arToolkitContext.arController.patternMarkers) == -1 ) {
				//	loadedNum = 0;
				//	alert(Object.keys(arToolkitContext.arController.patternMarkers));
				//}
				//got the patternMakers object length
				var loadedNum = -1;
				var item;
				for(item in arToolkitContext.arController.patternMarkers){
   					if (arToolkitContext.arController.patternMarkers.hasOwnProperty(item)) {
        				loadedNum++;
    				}
				}
				if( markerNumber < loadedNum ) {					
					markerNumber = loadedNum;
					var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
						//debug: true, 
						type : 'pattern',
						patternUrl : markerUrlPrefix + markerNumber + '.patt',
						//patternUrl : 'data/m-marker-' + markerLoaded + '.patt',
					})
					//console.log(timerCounter + ' : ' + markerNumber);
				}
			}
		} else {
			clearInterval(loadMarkersVar);
		}
	}
	

	
		
	//////////////////////////////////////////////////////////////////////////////////
	//		render the whole thing on the page
	//////////////////////////////////////////////////////////////////////////////////

	
	// render the scene
	onRenderFcts.push(function(){
		renderer.render( scene, camera );
	})
	
	// push detected result to ar_numbers.update
	var oldDir = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
	onRenderFcts.push(function() {
		var result = '';
		var newDir = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
		
		if(typeof(numbersDetected) == 'undefined') {
			numbersDetected = new Array();
		} else {
			numbersDetected.splice(0);
		}
		
		var n = 0;
		try {
			n = arToolkitContext.arController.getMarkerNum();
		} catch(e) {};
		if( n > 0 ) {
			for(var i=0; i<n ; i++) {
				var info = arToolkitContext.arController.getMarker(i);
				if(info.id != -1) {
					newDir[info.id] = info.dir;
					result += info.id + ', ';
					numbersDetected[numbersDetected.length] = info.id;
				}
			}
		}
		
		var r = document.getElementById('markersResult');
		if(r) {
			r.innerHTML = result;
		}
		for(var i=0; i<oldDir.length; i++) {
			if( oldDir[i] != newDir[i] ) {
				oldDir[i] = newDir[i];
				if(newDir[i] != -1) {
					//console.log( i + ':' + newDir[i] );
					//console.log(arToolkitContext.arController);
				}
			}
		}
		if ( typeof(ar_numbers) == 'object' ) {
			ar_numbers.update();
		}	
	});
	
	// run the rendering loop
	var lastTimeMsec= null
	requestAnimationFrame(function animate(nowMsec){
		// keep looping
		requestAnimationFrame( animate );
		// measure time
		lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
		var deltaMsec	= Math.min(100, nowMsec - lastTimeMsec)
		lastTimeMsec	= nowMsec
		// call each update function
		onRenderFcts.forEach(function(onRenderFct){
			onRenderFct(deltaMsec/1000, nowMsec/1000)
		})
		
	})
