chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'content-script-loaded') {
        console.log('Content script loaded on:', sender.tab.url);
    }
});
