document.addEventListener("DOMContentLoaded", () => {});

const generateResponseButton = document.getElementById("generate_response_button");

generateResponseButton.onclick = async function (e) {
    // send message to contentScript
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    let response;

    if (tab.url.match('https:\/\/.*.twitter.com\/.*')) {
      response = await chrome.tabs.sendMessage(tab.id, {message: "send me the tweet text content please"});
    }

    // print the tweet content in the popup
    const tweetInput = document.getElementById("tweet_input");
    tweetInput.innerHTML = response.text;

    // send the tweet content, screenName and parentTweetUrl to background.js
    const backgroundResponse = await chrome.runtime.sendMessage({input: response.text, screenName: response.screenName, parentTweetUrl: response.parentTweetUrl});

    // print response from AI to extension popup
    const retortAiOutput = document.getElementById("retort_ai_output");
    retortAiOutput.innerHTML = backgroundResponse;
};
