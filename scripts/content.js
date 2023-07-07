const elementsToDelete = [
    // Aside links to shorts
    ["ytd-guide-entry-renderer", "span"],
    ["ytd-mini-guide-entry-renderer", "span"],
    // Shorts main sections and small right sections
    ["ytd-rich-section-renderer", "span"],
    ["ytd-rich-shelf-renderer", "span"],
    ["ytd-reel-shelf-renderer"],
    // Shorts thumbnails
    ["ytd-rich-item-renderer", "span"]
];

// Define the observer for page changes
let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.type === "childList") {
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    for (const [elementsCssClass, childTag] of elementsToDelete) {
                        if (addedNode.classList?.contains(elementsCssClass)) {
                            removeElementdWithchildTag(addedNode, childTag);
                        }
                    }
                }
            }
        }
    }
});

// Run a cleanup on launch (is this needed?)
chrome.storage.local.get(["status"]).then((result) => {
    refresh(result?.status);
});

// Run a cleanup on changed state (is this needed?)
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "status") {
            refresh(newValue);
        }
    }
});

// Run a cleanup on message received
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        if (request.message === "refresh") {
            chrome.storage.local.get(["status"]).then((result) => {
                refresh(result?.status);
            });
        }
    });

// Clean the page from element regarding shorts if state is on
// Stops to observe if state is off
function refresh(state) {
    if (state === 'ON') {
        for (const [elementsTag, childTag] of elementsToDelete) {
            const elements = document.getElementsByTagName(elementsTag);
            for (const element of elements) {
                removeElementdWithchildTag(element, childTag);
            }
        }
        observer.observe(document, { childList: true, subtree: true });
    } else {
        observer.disconnect();
    }
}

// Removes an element if childtag contains the text title
// Removes the element if childtag is undefined
function removeElementdWithchildTag(element, childTag, title = "SHORTS") {
    if (childTag) {
        const textElements = element.getElementsByTagName(childTag);
        for (const textElement of textElements) {
            if (textElement?.innerText.toUpperCase().trim() === title) {
                element.remove();
                return;
            }
        }
    } else {
        element.remove();
    }
}