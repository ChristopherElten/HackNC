chrome.runtime.onMessage.addListener(function(response, sender, sendResponse) {


    if (response == "bookmark") {
  //   	alert(response + "1.1");
		// chrome.bookmarks.create({'title': 'a doc', 'url': 'http://code.google.com/chrome/extensions'});
	}

	if (response == "tab"){
		// alert(response + "2.1");
		// chrome.tabs.create({url: "https://www.youtube.com"});
	}

	if (response == "next_tab"){
		// alert(response + "3.1");
	}


});
