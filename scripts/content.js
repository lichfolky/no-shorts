
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

let observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        for (let addedNode of mutation.addedNodes) {
            if (addedNode.nodeType === Node.ELEMENT_NODE) {
                elementsToDelete.map(([elementsCssClass, childTag]) =>
                    removeElementWithClassAndChildTitle(addedNode, elementsCssClass, childTag)
                );
            }
        }
    }

});

chrome.storage.local.get(["status"]).then((result) => {
    if (result?.status === 'ON') {
        removeShorts();
    } else {
        addShorts();
    }
});

function removeShorts() {
    elementsToDelete.map(([elementsCssClass, childTag]) =>
        removeAllElementsWithChildTitle(elementsCssClass, childTag)
    );
    observer.observe(document, { childList: true, subtree: true });
}

function addShorts() {
    observer.disconnect();
}

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === "status" && oldValue === 'OFF' && newValue === 'ON') {
            removeShorts();
        }
        if (key === "status" && oldValue === 'ON' && newValue === 'OFF') {
            addShorts();
        }
    }
});

function removeElementWithClassAndChildTitle(element, elementsCssClass, childTag, title) {
    if (element.classList?.contains(elementsCssClass)) {
        removeElementdWithchildTag(element, childTag, title);
    }
}

function removeAllElementsWithChildTitle(elementsTag, childTag, title) {
    const elements = document.getElementsByTagName(elementsTag);
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
                return;
            }
        }
    } else {
        element.remove();
    }
}