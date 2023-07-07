chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "ON",
    });
    chrome.storage.local.set({ status: "ON" });
});

chrome.action.onClicked.addListener(async (tab) => {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.storage.local.get(["status"]);
    // Next state will always be the opposite
    const nextState = prevState.status === 'ON' ? 'OFF' : 'ON';
    // Set the action badge to the next state
    await chrome.action.setBadgeText({
        text: nextState,
    });
    await chrome.storage.local.set({ status: nextState });
    if (nextState == "OFF") {
        chrome.tabs.reload();
    }
});