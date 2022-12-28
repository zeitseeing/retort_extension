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

    // get parent tweet url
    const parentTweetUrl = document.querySelector("link[rel=canonical]").getAttribute("href")

    // send tweet content, screenName, parentTweetUrl to popup.js
    sendResponse({ text: textEl.textContent, screenName: screenName, parentTweetUrl: parentTweetUrl });
});


(async () => {
  const response = await chrome.runtime.sendMessage({greeting: "hello"});
  // do something with response here, not outside the function
  console.log(response);
})();
