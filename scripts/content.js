let state = 'OFF';

(async () => {
    const response = await chrome.runtime.sendMessage({ status: "badge" });
    state = response?.state;
    if (state === 'ON') {
        removeShortsLinks();
        removeShortsSections();
        removeShortsThumbnails();
    }
})();

let observer = new MutationObserver(mutations => {
    if (state === 'ON') {
        for (let mutation of mutations) {
            for (let addedNode of mutation.addedNodes) {
                if (addedNode.nodeType === Node.ELEMENT_NODE) {
                    //Icons
                    if (addedNode.classList?.contains("ytd-mini-guide-entry-renderer")) {
                        const title = addedNode.querySelector(".title");
                        if (title?.innerText.toUpperCase().trim() === "SHORTS") {
                            console.log("removed icon link");
                            addedNode.remove();
                        }
                    }
                    // Thumbnails
                    if (addedNode.classList?.contains("ytd-rich-item-renderer")) {
                        const title = addedNode.querySelector("#text");
                        if (title?.innerText.toUpperCase().trim() === "SHORTS") {
                            console.log("removed Thumbnail");
                            addedNode.remove();
                        }
                    }
                    //Sections
                    if (addedNode.classList?.contains("ytd-rich-section-renderer")) {
                        const title = addedNode.querySelector("span.ytd-rich-shelf-renderer");
                        if (title?.innerText.toUpperCase().trim() === "SHORTS") {
                            console.log("removed section", title.innerText.toUpperCase().trim());
                            addedNode.remove();
                        }
                    }

                }
            }
        }
    }
});
observer.observe(document, { childList: true, subtree: true });



// ASIDE LINK SHORT
function removeShortsLinks() {
    const links = document.querySelectorAll("#items a");
    for (const link of links) {
        console.log(link);
        if (link.title.toUpperCase().trim() == "SHORTS") {
            link.remove();
        }
    }
}

function removeShortsSections() {

    // HOME SECTION SHORTs
    const sections = document.querySelectorAll(".ytd-rich-section-renderer");
    for (const section of sections) {

        const title = section.querySelector("#title");
        console.log(title);
        if (title.innerText.toUpperCase().trim() == "SHORTS") {
            section.remove();
        }

    }
}

function removeShortsThumbnails() {
    // Remove SHORTs thumbnails  ytd-rich-item-renderer
    const thumbnails = document.querySelectorAll(".ytd-rich-item-renderer");
    for (const thumbnail of thumbnails) {
        const title = thumbnail.querySelector("#text");
        console.log(title);
        if (title.innerText.toUpperCase().trim() == "SHORTS") {
            thumbnail.remove();
        }
    }
}