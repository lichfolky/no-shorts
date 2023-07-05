chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});
const youtube = 'https://www.youtube.com/';

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(youtube)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });
        if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["focus-mode.css"],
                target: { tabId: tab.id },
            });

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["scripts/content.js"],
            }).then(() => console.log("script injected"));

        } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            /*   await chrome.scripting.removeCSS({
                   files: ["focus-mode.css"],
                   target: { tabId: tab.id },
               });
   
               await chrome.tabs.reload(
                   tab.id
               );*/

            await Promise.all(
                [chrome.scripting.removeCSS({
                    files: ["focus-mode.css"],
                    target: { tabId: tab.id },
                }), chrome.tabs.reload(tab.id)]);
        }
    }
});



