console.log("ey yo");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request;
    console.log(message);

    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    const textEl = replyToTweet.querySelector("div[data-testid=\"tweetText\"]");

    // get screename
    const text = document.querySelectorAll('script')[1].text
    const screenNameMatches = text.match('screen_name":"(.*?)",.') // regex to find screenname screen_name":"(.*?)",.
    const screenName = screenNameMatches[1]

    // send tweet content and screenName to popup.js
    sendResponse({ text: textEl.textContent, screenName: screenName });
});


(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();
