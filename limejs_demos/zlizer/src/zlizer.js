//set main namespace
goog.provide('zlizer');


//get requirements
goog.require('lime.Circle');
goog.require('lime.Director');
goog.require('lime.Label');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.Loop');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Sequence');
goog.require('lime.animation.Spawn');
goog.require('lime.transitions.MoveInUp');
goog.require('zlizer.Button');
goog.require('zlizer.Game');

goog.require('lime.audio.Audio');

zlizer.WIDTH = 768;
zlizer.HEIGHT = 1004;

zlizer.soundData = {
	breakup: 'data:audio/mpeg;base64,//uQZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAHAAAIjgAPDw8PDw8PDw8PDw8PD3h4eHh4eHh4eHh4eHh4np6enp6enp6enp6enp68vLy8vLy8vLy8vLy8vLzh4eHh4eHh4eHh4eHh4fDw8PDw8PDw8PDw8PDw//////////////////8AAAAeTEFNRTMuMTAwBJwAAAAAAAAAADUgJAQVTQABrgAACI7cthSVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAf4AAAAgAAA/wAAABAAAB/hQAACAAAD/CgAAECIiHBiB0CEBw/IxFIiCQQ/Bzi5qMBf+i5gAspxD/yoLwizLxyRYxQA7OXQJgdRfE6FHxOAuEG8ZRL54myfbwxgNkPnH/+8BkIgAFOmLbfj4lAAAAD/DAAAAWmW13/beAAAAAP8OAAASTHMGUFaDIFcw/NCVHcIICvhc2yJfNxzBzP5gLjSIGSKicPEXIGT5OMn/zU4QQUoX0DYuEUpl88yZMEUNP/mmqggZm60ibN5fdiDk+bom///LhOGBoTZJEQDGB1X00EGPsXyQrmQkNGVKHI62znX829JMyCTHVa+2KfhujirY36hDs0MqhDXw5SVD+Lmieqp0/UxTjO8mKEIU/RSOvvNcWan7CyPYEa0CHRyY2dCUwkJy4G+bkE3xgHCujMZ2VIphV0joS/YVczwIcBMNeGdgdXRkKSaRVJqVVKmAtqdcPj5VikVitjI+XGasThmJm73V5a7b9180KNGm37wIWYOL1ta+LwNxHWqM0u5rRYV6Uki2tGfXhWke1FodlVlMkWQU5gyeHYqGAmFoq6bGDaBax8umjUNO6n9NsQzUTbmps2AigRowY+jkx2CRBeZvOzZGgJ+YBvbmiOiLVV6ktRaPP1hRORSK6Z/6OlzBQyQK0s+7REMZkIAErkW0MrkqWdg3DdvlO31lqz7xPDg6SnEakZq/fL/ciRThPT/6cOmdVrYWAnlPSQynV9LlCk9W1Nshdi//7ap28rNaqTGlyLMZ0fVTic61FWsqpmWMikQAlwSz1iTS4TaFJVTqdD1csHgllSuFKDMemRwo0aw0pxyvFX/hmdvwoWWSf3ZojHRN0YpHKxs/vdkfrq7ktvS552dmSS9mShT/Vj3f29mMqL5mcqhSoiGd3UoUxSYJKtAVo86sZzrNNyNBWOD9jZ7tU8gGQgVjbmkEsrL+XnlHRXW0GAPJtXBpx4q0E3DFPVez11HNa6t63U2MEx4qigBCbdU4UdiEzKTdTNWZVkwkjaitm6CgyrSdxTNPZDZvZxx4hI4CadeLnoB2vX0oAgpowVMhU6jLCdTQhR6m8cRdU9Zcot4vsd1Mol//7YGTPgPK3VuF5gR1yAAAP8AAAAQrVX4nnjFHoAAA/wAAABDKoIt1wwqlXPVbCV0NuV2IcKV/Vhexcrpvzi1oT7a8xMD2dgewnr5htAzh9m2cQ70znOfDgvFLFrLFpH+H2LbxbMbUrVd8+3B89oMV7FxNn7efFsWhWt64Vs2fGltr///w3TdCWH0aJ7xNPyyKBWRwVqAADAQEKgsLIakxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7UGTpAPLsWOJ54xP6AAAP8AAAAQmwaYX08YAAAAA/woAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+2Bk6YAFt11ffmXgEgAAD/DAAAABOAs2vCAAKAAAP8OAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk3Y/wAAB/gAAACAAAD/AAAAEAAAH+AAAAIAAAP8AAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGTdj/AAAH+AAAAIAAAP8AAAAQAAAf4AAAAgAAA/wAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
	combine: 'data:audio/mpeg;base64,//OEZAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAD8AAHBwcHBwcHBwcHBwcHBwcHBwcHBwcHBweenp6enp6enp6enp6enp6enp6enp6enp6e6enp6enp6enp6enp6enp6enp6enp6enp6f////////////////////////////////8AAAAeTEFNRTMuMTAwBHgAAAAAAAAAADUIJAJiLQABrgAAA/DRei97AAAAAAAAAAAAAAAAAAAA//MUZAAAAAH+AKAAAAAAA/wBQAAACOOK//PkZAMekg1zj8fNoAAAA/wBgAAAB5KIOSRkkyaaaAAIE/lfC2ABH0cEifJJ/M/JXGQZMkhsBqwR+NwWB0JuHRgf9gWMBqAILk8VDRSBucJwZgqkoRUMTkPIOXDhBCKHSfKZPuFw4zwYkEJxpm4cuJ+HkkiGWyAE4xggM+KXFnByhZIXKBNDgNCkISDsJkrlwzIuqK4KKQMd5FxMOxgMxX0+uZnzQUGM2kRfqLhMDMFEdIpc4I/6GQBElj5cLZfNybL5uSBm+6CFZNkEkPHHGiOeVyJvIcLkKjlnlAqGqy2hnDPk+XDTybK6DkwaEUNP5kSg4G5EB0MWRmym57+w5xI+jyQHoxXIi5i6lokgZ0d7oQnEUFwhRDAa92jBHh9OCvhXHkVKFhnWTBPgOMigWdBsZAlRDQyKAtIfKIChkULmjwtxSGZHOFxEQIsDdIZMc4gAQCJKXiZNBzSq6BKCdhjRkUR0jIxpBkYUsYoHymLJNc7UbGiBBye3KRPJmyRlyZYpjHEBbnDYtm7n2qMZGkNL561Js4Q+5gQY4S4oFVMyLaNS6zLdSzFRsXn/OF4pFluZE09ecSOmRFk+oc42URuq62/VWTQYRNH/UIWEbIf4zLGLfyiVW9CVAuBk//lT//OUZNkaUd9rj8fIEgAAA/wBgAAAqwVDQiBWDQNHoNHhL/gqsFYNHtQNQaeVOkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//M0ZOED3AE+LOAAAAAAA/wBwAAAqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
	bubble: 'data:audio/mpeg;base64,/+NAxAAAAAAAAAAAAFhpbmcAAAAPAAAABQAABOIADAwMDAwMDAwMDAwMDAwMDAwMDAxzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc8zMzMzMzMzMzMzMzMzMzMzMzMzM8/Pz8/Pz8/Pz8/Pz8/Pz8/Pz8/P/////////////////////////AAAAHkxBTUUzLjEwMAQ3AAAAAAAAAAAVCCQC8CEAAa4AAATirO6IKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/jEMQAAAAD/AFAAADBUBkQBsQiWsmAOGCoCOLCGaKhuY0hZp1H7lyFyYUp3ghYgPFgzwv/44DEJzwT5qpfmaEgB3oGgGlCjGDngYlQBmhwASDQjoDLg2BawNSZAkLJ8FAbKN0zcPjFLkmtg7Ag8ZsmiGLUhUaEHFcHYKXQEFyLiC6eQHTTUgoeSLnxzBmCqIXZAvHB2rLtBJCcIoaGg7zQuEUQBvGSSI7COLqaywOgScokj03b6xWgsBeLogmMwGNBHhWGXJc2KQyCZByYGORNW/QZ0EFIIdDHPIOb6CbG45h5Mh8lCeHOSrRqLpOyGEjpqqQb/8UGO8gAswiAzZw0//KRFqRdIERZ1QBcgAACAEZx5U4TS4gkAYQoeWbiZihGWkpiPRAxWAxIvEgDEF4JgApBVKCFm7hxELAcDjcYEA8NLBoSmlhgOJSsYVNAQnjEcECgHMCCUwsPTEomacYPGiQ4MC5ySlmxQ8cjZZl8XGbg8VWgaZEpgdYmoEyaMMZqAJBjXMNjM0YqTNRPOlosyGCHP+acoMFWWH/4IBZWBofvQBOa/T4DQHZyYHDH/82JApDtOf/thgRGYKAOoIAHKrUDCIFhgcMLgcmHYhAiPcCbemf/43DEykyTQpJ/meAAi+xgMEBgBgMvgsLNv6FQUWAOgAAAFMJAwwqETBQDIgUSAJwmrd//8WBBgQFrFTqEYOCgZYr///pHLDMgibckyqXd3Ldj62OPP//1l/1t//////////5/rn71z+/3ff/H9RKU2Tv//ooVmYJ2OGOGB2N2+1weuwoAANaUSQQjRzlVrsAz1TLFUL/qpPvzK6lCCm2yh3QXuoTSs5PQdpuLFtwW47nzLCcFWOdCTSH8ro3zUoy2q3eYsRa1i3xmuLf/1hNTZv59mLX///iQreIxMUFU03vEKsz6T//+1uyubGoMtrhiurZjWeuILnjf87AT0sIqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/jMMT3Iloiqx+ZeACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/jEMTYAAAD/AHAAACqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo='
}
zlizer.soundBreakup = null;
zlizer.soundCombine = null;
zlizer.soundBubble = null;


zlizer.isZh = /^zh/i.test(navigator.language); //for label locale to Chinese 
zlizer.gameWrapper = document.querySelector('#gameWrapper');

zlizer.assetsBase = '';
if(typeof(assetsBase)=='string' && assetsBase.replace(/\s/g, '')!='') {
	zlizer.assetsBase = assetsBase;
}

// entrypoint
zlizer.start = function() {

    //zlizer.director = new lime.Director(document.body, zlizer.WIDTH, zlizer.HEIGHT);
	zlizer.director = new lime.Director((!zlizer.gameWrapper?document.body:zlizer.gameWrapper), zlizer.WIDTH, zlizer.HEIGHT);
    zlizer.director.makeMobileWebAppCapable();

    lime.Label.defaultFont = 'Impact';
    lime.Label.installFont('Impact', zlizer.assetsBase+'assets/impact.ttf');
    zlizer.loadMenuScene();

};

zlizer.isBrokenChrome = function(){
   return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
}

zlizer.soundInit = function() {
	if(zlizer.soundBreakup==null || typeof(zlizer.soundBreakup.play)!='function') {
		zlizer.soundBreakup = new lime.audio.Audio(zlizer.soundData.breakup);
	}
	if(zlizer.soundCombine==null || typeof(zlizer.soundCombine.play)!='function') {
		zlizer.soundCombine = new lime.audio.Audio(zlizer.soundData.combine);
	}
	if(zlizer.soundBubble==null || typeof(zlizer.soundBubble.play)!='function') {
		zlizer.soundBubble = new lime.audio.Audio(zlizer.soundData.bubble);
	}
}	
zlizer.loadMenuScene = function(opt_transition) {
    var scene = new lime.Scene();
    zlizer.director.replaceScene(scene, opt_transition ? lime.transitions.MoveInDown : undefined);

    var layer = new lime.Layer().setPosition(zlizer.WIDTH * .5, 0);
    scene.appendChild(layer);

	var credit = new lime.Label().setText('Power by LimeJS v.2025.03.17')
							.setFontSize(18).setFontFamily('Arial, sans-serif')
							.setFontColor('#ffffff').setPosition(0, zlizer.HEIGHT-18);
	credit.getDeepestDomElement().style['white-space'] = 'nowrap';
	layer.appendChild(credit);

    var title = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/main_title.png').setPosition(0, 250);
    layer.appendChild(title);


    var mask = new lime.Sprite().setSize(620, 560).setFill('#c00').setAnchorPoint(0.5, 0).setPosition(0, 410);
    layer.appendChild(mask);

    var contents = new lime.Layer().setPosition(0, 280);
    layer.appendChild(contents);

    contents.setMask(mask);

    var btn_play = new zlizer.Button(zlizer.isZh?'開始挑戰':'PLAY NOW').setPosition(0, 330).setSize(250, 100);
    contents.appendChild(btn_play);	
    goog.events.listen(btn_play, lime.Button.Event.CLICK, function() {
      if(zlizer.soundBubble==null || typeof(zlizer.soundBubble.play)!='function') {
      	zlizer.soundInit();
      }
      try{zlizer.soundBubble.play()}catch(e){};		
	  
      zlizer.loadGame(1);
    });

    var btn_levels = new zlizer.Button(zlizer.isZh?'選擇關卡':'PICK LEVEL').setPosition(0, 480).setSize(250, 100);
    contents.appendChild(btn_levels);
    goog.events.listen(btn_levels, lime.Button.Event.CLICK, function() {
	   if(zlizer.soundCombine==null || typeof(zlizer.soundCombine.play)!='function') {
		 zlizer.soundInit();
	   }
	   try{zlizer.soundCombine.play()}catch(e){};
	
       contents.runAction(new lime.animation.MoveTo(0, -255).enableOptimizations());
    });

    var levels = new lime.Layer().setPosition(0, 690);
    contents.appendChild(levels);

    if(zlizer.isBrokenChrome()){
           levels.setRenderer(lime.Renderer.CANVAS);
       }

    var lbl_levels = new lime.Label().setText((zlizer.isZh?'選擇關卡':'Pick level:').toUpperCase()).setFontSize(30).setAnchorPoint(.5, 0).setPosition(0, 0).setFontColor('#fff');
    levels.appendChild(lbl_levels);

    var btns_layer = new lime.Layer().setPosition(-250, 110);
    levels.appendChild(btns_layer);
    
    var r = 0;
    for (r = 0; r < 4; r++) {
        for (var c = 0; c < 5; c++) {
            var num = (c + 1) + (r * 5);
            var btn = new zlizer.Button('' + num).setSize(80, 80).setPosition(c * 125, r * 90);
            btns_layer.appendChild(btn);
            goog.events.listen(btn, lime.Button.Event.CLICK, function() {
			  if(zlizer.soundBubble==null || typeof(zlizer.soundBubble.play)!='function') {
				zlizer.soundInit();
			  }
			  try{zlizer.soundBubble.play()}catch(e){};		
				
              zlizer.loadGame(this);
            },false, num);
        }
    }

    //Creates a button to go back to the main menu
    var btn_main = new zlizer.Button(zlizer.isZh?'回主選單':'Back to Menu').setSize(400, 80).setPosition(250, r * 90); 
    btns_layer.appendChild(btn_main);
    goog.events.listen(btn_main, lime.Button.Event.CLICK, function() {
      contents.runAction(new lime.animation.MoveTo(0, 280).enableOptimizations());
    },false, num);
    
};


zlizer.loadGame = function(level) {
    zlizer.activeGame = new zlizer.Game(level);
    zlizer.director.replaceScene(zlizer.activeGame, lime.transitions.MoveInUp);
};

// add lime credintials to a scene
zlizer.builtWithLime = function(scene) {
    var lm = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/lime.png');
    var txt = new lime.Label().setText('Built with').setFontColor('#fff').setFontSize(24).setPosition(550, 950);
    var btn = new lime.Button(lm).setScale(.3).setPosition(670, 950);
    goog.events.listen(btn, 'click', function() {
        goog.global['location']['href'] = 'https://github.com/digitalfruit/limejs';
    });
    scene.appendChild(txt);
    scene.appendChild(btn);
};

/**
 *@this Particle
 */
function Particle(x0, y0, x1, y1) {
    this.p0 = [x0, y0];
    this.p1 = [x1, y1];
    this.life = 0;
}


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('zlizer.start', zlizer.start);
