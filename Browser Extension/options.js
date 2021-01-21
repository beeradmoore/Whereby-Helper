// Saves options to chrome.storage
function save_options() {
    var notifications_enabled = document.getElementById('notifications_enabled').checked;
    chrome.storage.sync.set({
        notifications_enabled: notifications_enabled
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 2500);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        notifications_enabled: true
    }, function (items) {
        document.getElementById('notifications_enabled').checked = items.notifications_enabled;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
