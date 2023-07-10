// When the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("NS: installed");
    chrome.storage.local.set({ status: "ON" });
    chrome.action.setBadgeText({
        text: "ON"
    });
});

// On chrome launch
chrome.runtime.onStartup.addListener(async (tab) => {
    console.log("NS: launch");
    const data = await chrome.storage.local.get(["status"]);
    await chrome.action.setBadgeText({
        text: data.status
    });
});

// On chrome launch
/*
chrome.tabs.onUpdated.addListener(
    async (tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            const data = await chrome.storage.local.get(["status"]);
            chrome.tabs.sendMessage(tabId, {
                message: 'refresh',
                url: changeInfo.url,
                status: data.status
            });
        }
    }
);
*/

chrome.action.onClicked.addListener(async (tab) => {
    const prevStatus = await chrome.storage.local.get(["status"]);
    const nextStatus = prevStatus.status === 'ON' ? 'OFF' : 'ON';
    await chrome.storage.local.set({ status: nextStatus });
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log("NS: changed");
        if (key === "status") {
            await chrome.action.setBadgeText({
                text: newValue,
            });
            if (newValue == "OFF") {
                await chrome.tabs.reload();
            }
            chrome.tabs.sendMessage(tabId, {
                message: 'refresh',
                status: newValue
            });
        }
    }
});