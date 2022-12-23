//receive tweet content from popup.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("background talking here:");
    console.log(request.message);
    sendResponse({farewell: "goodbye"});
  }
);
