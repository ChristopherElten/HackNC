chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {


	//Infinite Hooks possible... Multipurpose tools to be written here.
	//Abstracted code for reuse


	// --------------------------------------------------------------------------------
	//Hook to use gesture to write new bookmark
	//Temp url used for proof of concept
    if (response == "new_bookmark") {
    	console.log("New Bookmark");
		// chrome.bookmarks.create({'title': 'a doc', 'url': 'http://code.google.com/chrome/extensions'});
	}

	//Hook to open new tab with gesture
	//Temp url used for proof of concept
	if (response == "new_tab"){
		console.log("New Tab");
		// chrome.tabs.create({url: "https://www.youtube.com"});
	}

	//Hook to cycle tabs
	if (response == "next_tab"){
		console.log("Next Tab");
	}

	//Hook to generate random text
	if (response == "random_text"){
		console.log("Random Text");
	}

	if(response == "weather"){
		console.log("Weather");
	}
	//--------------------------------------------------------------------------------

});
