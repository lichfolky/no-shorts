let state = 'OFF';

const elementsToDelete = [
    // Aside links to shorts
    ["ytd-guide-entry-renderer", "span"],
    ["ytd-mini-guide-entry-renderer", "span"],
    // Shorts main sections and small right sections
    ["ytd-rich-section-renderer", "span"],
    ["ytd-reel-shelf-renderer"],
    // Shorts thumbnails
    ["ytd-rich-item-renderer", "span"]
];

let observer = new MutationObserver(mutations => {
    if (state === 'ON') {
        for (let mutation of mutations) {
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    elementsToDelete.map(([elementsCssClass, childTag]) =>
                        removeElementWithClassAndChildTitle(addedNode, elementsCssClass, childTag)
                    );
                }
            }
        }
    }
});

// Ask bg for badge status text, 
(async () => {
    const response = await chrome.runtime.sendMessage({ status: "badge" });
    state = response?.state;
    if (state === 'ON') {
        elementsToDelete.map(([elementsCssClass, childTag]) =>
            removeAllElementsWithChildTitle(elementsCssClass, childTag)
        );
        observer.observe(document, { childList: true, subtree: true });
    }
})();

function removeElementWithClassAndChildTitle(element, elementsCssClass, childTag, title) {
    if (element.classList?.contains(elementsCssClass)) {
        removeElementdWithchildTag(element, childTag, title);
    }
}

function removeAllElementsWithChildTitle(elementsCssClass, childTag, title) {
    const elements = document.querySelectorAll(`.${elementsCssClass}`);
    for (const element of elements) {
        removeElementdWithchildTag(element, childTag, title);
    }
}

function removeElementdWithchildTag(element, childTag, title = "SHORTS") {
    if (childTag) {
        const textElements = element.getElementsByTagName(childTag);
        for (const textElement of textElements) {
            if (textElement?.innerText.toUpperCase().trim() === title) {
                element.remove();
                console.log("Element:", element.classList, " removed");
                return;
            }
        }
    } else {
        element.remove();
        console.log("Element:", element.classList, " removed");
    }
}