var controller = Leap.loop({enableGestures: true}, function(frame){
	//Gestures
	var gests = frame.gestures;
	if (gests.length > 0) {

		//--------------------------------------------------------------------------------
		//Gesture commands
		for(var i = 0; i < gests.length; i++){
			//Screen Tap Gesture
			if (gests[i].type === 'screenTap') {
				console.log("screen tap");
				chrome.runtime.sendMessage("new_bookmark");
			}

			//Swipe Gesture
			if (gests[i].type === 'swipe'){
				console.log("Swipe lol");
				chrome.runtime.sendMessage("new_tab");
			};

			//Circle Gesture
			if (gests[i].type === 'circle'){
				console.log("Circle");
				chrome.runtime.sendMessage("random_text");
			}

			//keyTap Gesture
			if (gests[i].type === 'keyTap'){
				console.log("Key Tap");

				chrome.runtime.sendMessage("next_tab");
				chrome.runtime.sendMessage("weather");

				function reqListener () {
					alert(this.responseText[9]  + this.responseText[10] + "°C");
				}

				var oReq = new XMLHttpRequest();
				oReq.addEventListener("load", reqListener);
				oReq.open("GET", "https://www.wolframcloud.com/objects/3f3b3f58-02c6-4909-a69f-432d0c9e375f");
				oReq.send();

			}
		}
		//--------------------------------------------------------------------------------
	}

});
