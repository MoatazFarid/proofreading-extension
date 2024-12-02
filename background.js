console.log('Background script loading...');

// Create context menu
function createContextMenu() {
    // Remove existing menu items first
    chrome.contextMenus.removeAll(() => {
        try {
            chrome.contextMenus.create({
                id: "improveText",
                title: "Improve Text",
                contexts: ["selection"]
            }, () => {
                if (chrome.runtime.lastError) {
                    console.error('Context menu creation error:', chrome.runtime.lastError);
                } else {
                    console.log('Context menu created successfully');
                }
            });
        } catch (err) {
            console.error('Failed to create context menu:', err);
        }
    });
}

// Create menu immediately
createContextMenu();

// Also create menu when extension is installed/updated
chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed/updated');
    createContextMenu();
});

// Also create menu when extension starts up
chrome.runtime.onStartup.addListener(() => {
    console.log('Extension starting up');
    createContextMenu();
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    console.log('Context menu clicked', info);
    if (info.menuItemId === "improveText" && info.selectionText) {
        try {
            // First, inject the content script
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });

            // Then get the API key and send the message
            const response = await chrome.storage.local.get(["apiKey", "model"]);
            if (!response.apiKey) {
                chrome.runtime.sendMessage({ error: "API_KEY_MISSING" });
                return;
            }

            // Send message to content script
            chrome.tabs.sendMessage(tab.id, {
                text: info.selectionText,
                apiKey: response.apiKey,
                model: response.model
            }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Message sending failed:', chrome.runtime.lastError);
                } else {
                    console.log('Message sent successfully');
                }
            });
        } catch (err) {
            console.error('Error:', err);
        }
    }
});

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);
    sendResponse({ received: true });
    return true;
});