// Saves options to chrome.storage
async function save_options() {
    var notifications_enabled = document.getElementById('notifications_enabled').checked;
    await chrome.storage.sync.set({
        notifications_enabled: notifications_enabled
    });
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
        status.textContent = '';
    }, 2500);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
async function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    const items = await chrome.storage.sync.get({
        notifications_enabled: true
    });
    document.getElementById('notifications_enabled').checked = items.notifications_enabled;
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
