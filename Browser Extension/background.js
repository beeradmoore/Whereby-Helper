chrome.commands.onCommand.addListener(function(command) {
    //console.log('Command:', command);
    
    // First lets see if its a valid command.
    if ((command == "toggle-cam" || command == "toggle-mic" || command == "focus-tab") == false)
    {
        return;
    }

    // Now lets find all whereby tabs.
    chrome.tabs.query({ "url": "https://*.whereby.com/*" }, function(tabs) {
        //console.log("Found " + tabs.length + " tabs");

        if (tabs.length == 1)
        {
            var tab = tabs[0];

            if (command == "focus-tab")
            {
                chrome.tabs.update(tab.id, { "active" : true });
                chrome.windows.update(tab.windowId, {"focused": true}, null);
            }
            else
            {
                //for (var i = 0; i < tabs.length; i++)
                //{
                    // And lets send the action to it.
                    //console.log(tabs[i].id + " - " + tabs[i].url);
                    chrome.tabs.sendMessage(tab.id, { action: command }, (response) => {
                        // Did it do the thing?

                        // Something bad happened, no notification for you.
                        if (response == undefined)
                        {
                            return;
                        }

                        var message = "";
                        if (command == "toggle-cam")
                        {
                            message = "Camera is now ";
                        }
                        else if (command == "toggle-mic")
                        {
                            message = "Microphone is now ";
                        }

                        if (response.new_state === true)
                        {
                            message += "on.";
                        }
                        else if (response.new_state === false)
                        {
                            message += "off.";
                        }
                        chrome.notifications.create(null, { iconUrl: "Icon_48.png", message: message, title: "Whereby Helper", type: "basic" });
                    });
                //}
            }
        }
        else
        {
            chrome.notifications.create(null, { iconUrl: "Icon_48.png", message: "Multiple WhereBy tabs detected. Doing nothing 🤷‍♂️", title: "Whereby Helper", type: "basic" });
        }
    });
});
