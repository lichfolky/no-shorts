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