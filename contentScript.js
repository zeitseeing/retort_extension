chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request;

    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    const textEl = replyToTweet.querySelector("div[data-testid=\"tweetText\"]");

    // get screename
    // find the script containing the screenname
    const scripts = document.querySelectorAll('script');
    const scriptContainingScreenName = Array.from(scripts).filter(script => script.text.startsWith("window.__INITIAL_STATE__"));

    let screenName;

    if (scriptContainingScreenName.length == 0) {
      screenName = "handle not found"
    }
    else {
      const scriptContent = scriptContainingScreenName[0].text
      screenName = scriptContent.match('screen_name":"(.*?)",.')[1] // regex to find screenname screen_name":"(.*?)",.
    }

    // get parent tweet url
    const parentTweetUrl = document.querySelector("link[rel=canonical]").getAttribute("href")

    // send tweet content, screenName, parentTweetUrl to popup.js
    sendResponse({ text: textEl.textContent, screenName: screenName, parentTweetUrl: parentTweetUrl });
});
