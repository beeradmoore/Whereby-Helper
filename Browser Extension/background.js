function ShowNotification(title, message, silent)
{
    chrome.storage.sync.get({
        notifications_enabled: true
    }, function (items) {
        if (items.notifications_enabled)
        {
            chrome.notifications.create(null, { iconUrl: "Icon_48.png", message: message, title: title, type: "basic", silent: silent });
        }
    });
}

chrome.commands.onCommand.addListener(function(command) {
    //console.log('Command:', command);
    
    // First lets see if its a valid command.
    if ((command == "toggle-cam" || command == "toggle-mic" || command == "focus-tab") == false)
    {
        return;
    }

    // Unable to use filter in the query. If I request tabs permission I must access url of the tab.
    // If I only use url in the query I require tabs permission for this to work but I am then in 
    // vilation of Chrome Webstore policies and the extension will be rejected.
    //
    // The workaround as directed by support is to not filter on the url, but instead query EVERY tab
    // and then manually access the url of each one to see if it is a tab on the domain I am after.
    chrome.tabs.query({}, function(tabs) {
        //console.log("Found " + tabs.length + " tabs");
        var wherebyTabs = [];

        for (var i = 0; i < tabs.length; ++i)
        {
            // Check for <anything.>whereby.com/<anything else>
            if (/whereby\.com\/(.*)$/.test(tabs[i].url))
            {
                wherebyTabs.push(tabs[i]);
            }
        }
        //console.log("Found " + wherebyTabs.length + " wherebyTabs");
        

        if (wherebyTabs.length == 0)
        {
            ShowNotification("Whereby Helper", "No WhereBy tabs detected. Doing nothing 🤷‍♂️", false);
        }
        else if (wherebyTabs.length == 1)
        {
            var tab = wherebyTabs[0];

            if (command == "focus-tab")
            {
                chrome.tabs.update(tab.id, { "active" : true });
                chrome.windows.update(tab.windowId, {"focused": true}, null);
            }
            else
            {
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

                    ShowNotification("Whereby Helper", message, true);
                });
            }
        }
        else
        {
            ShowNotification("Whereby Helper", "Multiple WhereBy tabs detected. Doing nothing 🤷‍♂️", false);
        }
    });
});
