document.addEventListener("DOMContentLoaded", () => {});

chrome.declarativeContent.onPageChanged.removeRules(async () => {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostPrefix: 'twitter.com' },
      }),
    ],
    actions: [
      new chrome.declarativeContent.SetIcon({
        imageData: {
          16: await loadImageData('assets/icon16.png'),
          32: await loadImageData('assets/icon32.png'),
        },
      }),
      chrome.declarativeContent.ShowAction
        ? new chrome.declarativeContent.ShowAction()
        : new chrome.declarativeContent.ShowPageAction(),
    ],
  }]);
});

async function loadImageData(url) {
  const img = await createImageBitmap(await (await fetch(url)).blob());
  const {width: w, height: h} = img;
  const canvas = new OffscreenCanvas(w, h);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, w, h);
  return ctx.getImageData(0, 0, w, h);
}

const generateResponseButton = document.getElementById("generate_response_button");

generateResponseButton.onclick = async function (e) {
    // send message to contentScript
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});

    console.log("before conditional");

    if (tab.url.match('https:\/\/*.twitter.com\/*')) {
      console.log("yep, on twitter, so gonna send this");
      const response = await chrome.tabs.sendMessage(tab.id, {message: "send me the tweet text content please"});
        
        // print the tweet content in the popup
        const tweetInput = document.getElementById("tweet_input");
        tweetInput.innerHTML = response.text;

        // send the tweet content, screenName and parentTweetUrl to background.js
        const backgroundResponse = await chrome.runtime.sendMessage({input: response.text, screenName: response.screenName, parentTweetUrl: response.parentTweetUrl});

        // print response from AI to extension popup
        const retortAiOutput = document.getElementById("retort_ai_output");
        retortAiOutput.innerHTML = backgroundResponse;
    }
    else {
      const errorDiv = document.getElementById("errors");
        errorDiv.innerHTML = "Select a tweet on twitter.com and generate a response to it. Refresh twitter.com if error persists. Contact me on @zeitseeing for questions."
    }

};
