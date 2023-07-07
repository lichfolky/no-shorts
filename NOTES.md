# Notes  
https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/

https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/  

https://developer.chrome.com/docs/extensions/reference/scripting/

```
    "action": {
        "default_popup": "popup/popup.html",
        "default_icon": "images/icon-16.png"
    },
```

https://developer.chrome.com/docs/webstore/publish/


WHY this didn't work?
```
chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        console.log(sender.tab ?
            "from a content script: " + sender.tab.url :
            "from the extension", request, sender, sendResponse);

        if (request?.status === "badge") {
            const currentState = await chrome.action.getBadgeText({});
            sendResponse({ state: currentState });
        }
        return true;
    }
);
```

https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

https://stackoverflow.com/questions/39301819/how-to-change-the-html-content-as-its-loading-on-the-page/39334319#39334319



```
/*
chrome.storage.local.set({ status: value }).then(() => {
    console.log("Value is set");
});

chrome.storage.local.get(["status"]).then((result) => {
    console.log("Value currently is " + result.status);
});
*/
```