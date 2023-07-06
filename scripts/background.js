chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "ON",
    });
});

const youtube = 'https://www.youtube.com/';
chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({});
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        text: nextState,
    });
});

// WHY this didn't work?
// chrome.runtime.onMessage.addListener(
//     async (request, sender, sendResponse) => {
//         console.log(sender.tab ?
//             "from a content script: " + sender.tab.url :
//             "from the extension", request, sender, sendResponse);

//         if (request?.status === "badge") {
//             const currentState = await chrome.action.getBadgeText({});
//             sendResponse({ state: currentState });
//         }
//         return true;
//     }
// );

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    (async function () {
        console.log(sender.tab ?
            "Msg from a content script: " + sender.tab.url :
            "Msg from the extension");

        if (request?.status === "badge") {
            const currentState = await chrome.action.getBadgeText({});
            sendResponse({ state: currentState });
        }
    })();
    // return true to indicate you want to send a response asynchronously
    return true;
});
