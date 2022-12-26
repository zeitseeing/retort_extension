document.addEventListener("DOMContentLoaded", () => {});

const generateResponseButton = document.getElementById("generate_response_button");

generateResponseButton.onclick = async function (e) {
    console.log("button clicked");

    // send message to contentScript
    const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {message: "send me the tweet text content please"});
    console.log(response.text);

    // print the tweet content in the popup
    const tweetInput = document.getElementById("tweet_input");
    tweetInput.innerHTML = response.text;

    // send the tweet content to background.js
    const backgroundResponse = await chrome.runtime.sendMessage({input: response.text});

    // print response from AI to extension popup
    const retortAiOutput = document.getElementById("retort_ai_output");
    retortAiOutput.innerHTML = backgroundResponse;
};
