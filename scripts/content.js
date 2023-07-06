(async () => {
    const response = await chrome.runtime.sendMessage({ status: "badge" });
    if (response?.state === 'ON') {
        // HOME SECTION SHORTs
        const sections = document.querySelectorAll(".ytd-rich-section-renderer ");
        for (const section of sections) {
            const titles = section.querySelectorAll("#title");

            for (const title of titles) {
                if (title.innerHTML == "Shorts") {
                    section.remove();
                }
            }
        }
        // ASIDE LINK SHORT
        const links = document.querySelectorAll("a");
        for (const link of links) {
            if (link.title == "Shorts") {
                link.remove();
            }
        }
    }
})();