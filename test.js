var controller = Leap.loop({enableGestures: true}, function(frame){
	//Gestures
	var gests = frame.gestures;
	if (gests.length > 0) {

		for(var i = 0; i < gests.length; i++){
			//Screen Tap Gesture
			if (gests[i].type === 'screenTap') {
				console.log("screen tap");
				chrome.runtime.sendMessage("bookmark");
			}

			//Swipe Gesture
			if (gests[i].type === 'swipe'){
				console.log("Swipe lol");
				chrome.runtime.sendMessage("tab");
			};

			//Circle Gesture
			if (gests[i].type === 'circle'){
				console.log("Circle");
				chrome.runtime.sendMessage("next_tab");
			}
		}
	}
});
