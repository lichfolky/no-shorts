let state = 'OFF';

console.log("CONTENT SCRIPT");

// Ask bg for badge status text, 
(async () => {
    const response = await chrome.runtime.sendMessage({ status: "badge" });
    state = response?.state;
    if (state === 'ON') {

        // Aside links to shorts
        removeAllElementsWithChildTitle("ytd-guide-entry-renderer", ".title");
        removeAllElementsWithChildTitle("ytd-mini-guide-entry-renderer", ".title");
        // Shorts main sections and small right sections
        removeAllElementsWithChildTitle("ytd-rich-section-renderer", "span.ytd-rich-shelf-renderer");
        removeAllElementsWithChildTitle("ytd-reel-shelf-renderer", "span.ytd-reel-shelf-renderer");
        // Remove SHORTs thumbnails  ytd-rich-item-renderer
        removeAllElementsWithChildTitle("ytd-rich-item-renderer", "#text");

        observer.observe(document, { childList: true, subtree: true });
    }
})();

let observer = new MutationObserver(mutations => {
    if (state === 'ON') {
        for (let mutation of mutations) {
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    removeElementWithClassAndChildTitle(addedNode, "ytd-guide-entry-renderer", ".title");
                    removeElementWithClassAndChildTitle(addedNode, "ytd-mini-guide-entry-renderer", ".title");
                    removeElementWithClassAndChildTitle(addedNode, "ytd-rich-section-renderer", "span.ytd-rich-shelf-renderer");
                    removeElementWithClassAndChildTitle(addedNode, "ytd-reel-shelf-renderer", "span.ytd-reel-shelf-renderer");
                    removeElementWithClassAndChildTitle(addedNode, "ytd-rich-item-renderer", "#text");
                }
            }
        }
    }
});


function removeElementWithClassAndChildTitle(element, elementsCssClass, childCssSelector, title) {
    if (element.classList?.contains(elementsCssClass)) {
        removeElementdWithChildTitle(element, childCssSelector, title);
    }
}

function removeAllElementsWithChildTitle(elementsCssClass, childCssSelector, title) {
    const elements = document.querySelectorAll('.' + elementsCssClass);
    for (const element of elements) {
        removeElementdWithChildTitle(element, childCssSelector, title);
    }
}

function removeElementdWithChildTitle(element, childCssSelector, title = "SHORTS") {
    const titleElement = element.querySelector(childCssSelector);
    if (titleElement?.innerText.toUpperCase().trim() === title) {
        element.remove();
        console.log("Element:", element.classList, " removed");
    }
}
