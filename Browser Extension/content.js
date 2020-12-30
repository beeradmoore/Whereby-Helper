
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

            // If the new state is not undefined lets send it back to background for notification.
            var isCameraOn = IsCameraOn();
            if (isCameraOn === true || isCameraOn === false)
            {
                sendResponse({ new_state: isCameraOn});
            }
        }
    }
    else if (message.action == "toggle-mic")
    {
        var micButton = $(".jstest-mute-button");
        if (micButton != undefined)
        {
            micButton.click();

            // If the new state is not undefined lets send it back to background for notification.
            var isMicOn = IsMicrophoneOn();

            if (isMicOn === true || isMicOn === false)
            {
                sendResponse({ new_state: isMicOn});
            }
        }
    }
});

function IsCameraOn()
{
    // Unsure if this can be compressed. Just trying to make sure it doesn't break extension.
    var camButton = $(".jstest-toggle-video");

    //console.log("camButton");
    //console.log(camButton);

    if (camButton == undefined || $(camButton).children().length == 0)
    {
        return;
    }

    var figureButton = $(camButton).children()[0];

    //console.log("figureButton");
    //console.log(figureButton);

    if (figureButton == undefined || $(figureButton).children().length == 0)
    {
        return;
    }

    var buttonIconWrapper = $(figureButton).children()[0];

    if (buttonIconWrapper == undefined)
    {
        return;
    }

    var classList = buttonIconWrapper.classList;
    for (var i = 0; i < classList.length; ++i)
    {
        var className = classList[i];
        if (className.startsWith("isOff"))
        {
            return false;
        }
    }

    return true;
}

function IsMicrophoneOn()
{
    // Unsure if this can be compressed. Just trying to make sure it doesn't break extension.
    var micButton = $(".jstest-mute-button");

    //console.log("micButton");
    //console.log(micButton);

    if (micButton == undefined || $(micButton).children().length == 0)
    {
        return;
    }

    var figureButton = $(micButton).children()[0];

    //console.log("figureButton");
    //console.log(figureButton);

    if (figureButton == undefined || $(figureButton).children().length == 0)
    {
        return;
    }

    var buttonIconWrapper = $(figureButton).children()[0];

    if (buttonIconWrapper == undefined)
    {
        return;
    }

    var classList = buttonIconWrapper.classList;
    for (var i = 0; i < classList.length; ++i)
    {
        var className = classList[i];
        if (className.startsWith("isOff"))
        {
            return false;
        }
    }

    return true;
}