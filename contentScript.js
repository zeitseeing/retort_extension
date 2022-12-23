console.log("ey yo");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request;
    console.log(message);

    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    const textEl = replyToTweet.querySelector("div[data-testid=\"tweetText\"]");

    // send tweet content to popup.js
    sendResponse({ text: textEl.textContent });
});


(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();
