
// Add listener for global hotkeys.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //console.log("onMessage: " + message.action);

    // Depending on the action click the relevant button.
    if (message.action == "toggle-cam")
    {
        var camButton = $(".jstest-toggle-video");
        if (camButton != undefined)
        {
            camButton.click();
        }
    }
    else if (message.action == "toggle-mic")
    {
        var micButton = $(".jstest-mute-button");
        if (micButton != undefined)
        {
            micButton.click();
        }
    }
});
