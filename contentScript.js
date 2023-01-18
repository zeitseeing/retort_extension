chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request;

    const replyToTweet = document.querySelector("article[data-testid=\"tweet\"][tabindex=\"-1\"]");
    const textEl = replyToTweet.querySelector("div[data-testid=\"tweetText\"]");

    // get screename
    const screenName = getScreenName();

    // get parent tweet url
    const parentTweetUrl = document.querySelector("link[rel=canonical]").getAttribute("href")

    // send tweet content, screenName, parentTweetUrl to popup.js
    sendResponse({ text: textEl.textContent, screenName: screenName, parentTweetUrl: parentTweetUrl });
});

const getScreenName = () => {
    // find the script containing the screenname
    const scripts = document.querySelectorAll('script');
    script = Array.from(scripts)
        .find(script => script.textContent.startsWith("window.__INITIAL_STATE__"));

    if (!!script) {
        return script.textContent.match('screen_name":"(.*?)",.')[1] // regex to find screenname screen_name":"(.*?)",.
    }
    else {
        return "username not found"
    };
};
