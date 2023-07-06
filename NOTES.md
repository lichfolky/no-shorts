# Notes  
https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-reading-time/


https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/  


https://developer.chrome.com/docs/extensions/reference/scripting/

    "action": {
        "default_popup": "popup/popup.html",
        "default_icon": "images/icon-16.png"
    },

        "content_scripts": [
        {
            "js": [
                "scripts/content.js"
            ],
            "matches": [
                "https://www.youtube.com/*",
                "https://developer.chrome.com/*"
            ]
        }
    ],