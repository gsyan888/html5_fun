goog.provide('zlizer.dialogs');

zlizer.dialogs.blank = function() {
    var dialog = new lime.RoundedRect().setFill(255, 255, 255, .6).
        setRadius(40).setSize(680, 550).setPosition(0, 270).setAnchorPoint(.5, 0).setOpacity(0);
    return dialog;
};

zlizer.dialogs.box1 = function() {
    var b = zlizer.dialogs.blank();

    var txt = new lime.Label().setText(zlizer.isZh?'遊戲說明':'Tutorial').setFontSize(40).setPosition(0, 70);
    b.appendChild(txt);

    var descr = new lime.Label().setText(zlizer.isZh?'將泡泡分解或合併多個泡泡，落地之前，\n使泡泡數字能和右上角的目標數字一樣。':'Divide and add bubbles with different numeric values to get them to equal magical value before they fall to the ground.').setMultiline(true).setSize(450, 50).setPosition(0, 130).setFontSize(24).setFontColor('#333');
    b.appendChild(descr);

    var tutorial1 = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/dialog_tutorial1.jpg').setPosition(-150, 400).setScale(.9);
    b.appendChild(tutorial1);

    var tutorial2 = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/dialog_tutorial2.jpg').setPosition(150, 400).setScale(.9);
    b.appendChild(tutorial2);


    //var hint1 = new lime.Label().setFontSize(22).setFontColor('#80c010').setText(zlizer.isZh?'在多個泡泡外畫線，可以合而為一。':'Draw line around bubbles to add their values together').setSize(250, 50).setPosition(-150, 250);
    var hint1 = new lime.Label().setFontSize(22).setFontColor('#457517').setText(zlizer.isZh?'在多個泡泡外畫線，\n可將它們合部合併。':'Draw line around bubbles to add their values together').setMultiline(true).setSize(250, 50).setPosition(-150, 250);
    b.appendChild(hint1);

    //var hint1 = new lime.Label().setFontSize(22).setFontColor('#80c010').setText(zlizer.isZh?'在泡泡中間畫線，可以分解為多個。':'Draw line through a bubble to split it into two.').setSize(250, 50).setPosition(150, 250);
    var hint1 = new lime.Label().setFontSize(22).setFontColor('#457517').setText(zlizer.isZh?'在泡泡中間畫線，\n可以分解為多個。':'Draw line through a bubble to split it into two.').setMultiline(true).setSize(250, 50).setPosition(150, 250);
    b.appendChild(hint1);

	//add a close button at top left of dialog to skip 
	var closeBtn = new lime.Label().setFontSize(32).setText('❌').setFontColor('#6BAD1B').setPosition(300, 50);
	closeBtn.getDeepestDomElement()['style']['cursor']='pointer';
    b.appendChild(closeBtn);
	goog.events.listen(closeBtn, ['mousedown', 'touchstart'], function(e) {
		e.preventDefault();
		if(typeof(b)!='undefined' && typeof(b.hide)!='undefined' && typeof(b.hide.stop)=='function') {
			b.hide.stop();
		}
	});
    return b;
};

zlizer.dialogs.box2 = function() {
    var b = zlizer.dialogs.blank();

    var txt = new lime.Label().setText(zlizer.isZh?'遊戲說明':'Tutorial').setFontSize(40).setPosition(0, 70);
    b.appendChild(txt);

    var descr = new lime.Label().setText(zlizer.isZh?'如果是使用滑鼠或觸控板，\n按鍵盤的 Z 鍵，等同滑鼠的左鍵。':'If you are using mouse or trackpad you may find it easier to hold down key Z for making a selection instead of pressing on mouse.').setMultiline(true).setSize(450, 50).setPosition(0, 130).setFontSize(24).setFontColor('#333');
    b.appendChild(descr);

    var tutorial1 = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/dialog_keyz.jpg').setPosition(0, 360);
    b.appendChild(tutorial1);

	//add a close button at top left of dialog to skip 
	var closeBtn = new lime.Label().setFontSize(32).setText('❌').setFontColor('#6BAD1B').setPosition(300, 50);
	closeBtn.getDeepestDomElement()['style']['cursor']='pointer';
    b.appendChild(closeBtn);
	goog.events.listen(closeBtn, ['mousedown', 'touchstart'], function(e) {
		e.preventDefault();
		if(typeof(b)!='undefined' && typeof(b.hide)!='undefined' && typeof(b.hide.stop)=='function') {
			b.hide.stop();
		}
	});
	
    return b;
};

zlizer.dialogs.box3 = function(game) {
    var b = zlizer.dialogs.blank();

    var txt = new lime.Label().setText(zlizer.isZh?'第 '+game.level+' 關':('Level #' + game.level)).setSize(450, 50).setFontSize(40).setPosition(0, 70);
      b.appendChild(txt);

      var descr = new lime.Label().setText(zlizer.isZh?'本關要挑戰的數字是:':'This is your magic number for this level:').setSize(450, 50).setPosition(0, 130).setFontSize(24).setFontColor('#333');
      b.appendChild(descr);

      var tutorial1 = new lime.Sprite().setFill(zlizer.assetsBase + 'assets/dialog_number.jpg').setPosition(0, 320);
      b.appendChild(tutorial1);

      var magic = new lime.Label(game.magic).setFontSize(60).setPosition(0, 320).setFontColor('#fff');

    b.appendChild(magic);

	//add a close button at top left of dialog to skip 
	
	var closeBtn = new lime.Label().setFontSize(32).setText('❌').setFontColor('#6BAD1B').setPosition(300, 50);
	closeBtn.getDeepestDomElement()['style']['cursor']='pointer';
    b.appendChild(closeBtn);
	goog.events.listen(closeBtn, ['mousedown', 'touchstart'], function(e) {
		e.preventDefault();
		if(typeof(b)!='undefined' && typeof(b.hide)!='undefined' && typeof(b.hide.stop)=='function') {
			b.hide.stop();
		}
		
		//speed up in 0.4 second
		var oldSpeed = zlizer.BUBBLE_SPEED;
		if(typeof(zlizer.activeGame)!='undefined' &&  zlizer.activeGame!=null && typeof(zlizer.activeGame.bubbles)!='undefined') {
			zlizer.BUBBLE_SPEED *= 20;
			zlizer.activeGame.updateFloaters();
			console.log('speed up ...');
			setTimeout(function() {
				if(typeof(zlizer.activeGame)!='undefined' &&  zlizer.activeGame!=null && typeof(zlizer.activeGame.bubbles)!='undefined') {
					zlizer.BUBBLE_SPEED = oldSpeed;				
					zlizer.activeGame.updateFloaters();
					console.log('normal speed ...');
				}
			}, 400);
		}
	});	
	
	
    return b;
};

zlizer.dialogs.appear = function(b,callback) {
    var appear = new lime.animation.FadeTo(1).setDuration(.3);
    b.runAction(appear);
    if (callback) goog.events.listen(appear, lime.animation.Event.STOP, callback);
};

zlizer.dialogs.hide = function(b,callback) {
    //var hide = new lime.animation.Sequence(new lime.animation.Delay().setDuration(5), new lime.animation.FadeTo(0).setDuration(.3));
    //b.runAction(hide);
    //if (callback) goog.events.listen(hide, lime.animation.Event.STOP, callback);
    b.hide = new lime.animation.Sequence(new lime.animation.Delay().setDuration(5), new lime.animation.FadeTo(0).setDuration(.3));
    b.runAction(b.hide);
    if (callback) goog.events.listen(b.hide, lime.animation.Event.STOP, callback);
};

