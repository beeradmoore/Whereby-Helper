chrome.commands.onCommand.addListener(function(command) {
    //console.log('Command:', command);
    
    // First lets see if its a valid command.
    if ((command == "toggle-cam" || command == "toggle-mic") == false)
    {
        return;
    }

    // Now lets find all whereby tabs.
    chrome.tabs.query({ "url": "https://*.whereby.com/*" }, function(tabs) {
        //console.log("Found " + tabs.length + " tabs");
        for (var i = 0; i < tabs.length; i++)
        {
            // And letes send the action to it.
            //console.log(tabs[i].id + " - " + tabs[i].url);
            chrome.tabs.sendMessage(tabs[i].id, { action: command });
        }
    });
});
