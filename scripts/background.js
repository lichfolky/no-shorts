chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "ON",
    });
    chrome.storage.local.set({ status: "ON" });
});

chrome.runtime.onStartup.addListener(async (tab) => {
    const state = await chrome.storage.local.get(["status"]);
    await chrome.action.setBadgeText({
        text: state.status
    });
});

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.url) {
            chrome.tabs.sendMessage(tabId, {
                message: 'hello!',
                url: changeInfo.url
            });
        }
    }
);

chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.storage.local.get(["status"]);
    const nextState = prevState.status === 'ON' ? 'OFF' : 'ON';
    await chrome.storage.local.set({ status: nextState });
});

chrome.storage.onChanged.addListener(async (changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "status") {
            await chrome.action.setBadgeText({
                text: newValue,
            });
            if (newValue == "OFF") {
                chrome.tabs.reload();
            }
        }
    }
});