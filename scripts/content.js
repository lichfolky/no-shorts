console.log("content");
const sections = document.querySelectorAll(".ytd-rich-section-renderer ");
for (const section of sections) {
    const titles = section.querySelectorAll("#title");

    for (const title of titles) {

        if (title.innerHTML == "Shorts") {
            section.remove();
            //     console.log(title.innerHTML);


        }
    }
}

// title link shorts title=Shorts
const links = document.querySelectorAll("a");
for (const link of links) {
    if (link.title == "Shorts") {
        link.remove();
    }
}

/*
const items = document.querySelectorAll(".ytd-rich-item-renderer");
for (const item of items) {
    const shorts = item.querySelectorAll(".ytd-thumbnail span#text");
    for (const short of shorts) {
        if (short.innerText.toUpperCase() == "SHORTS") {
            item.remove();
        }
    }
}
*/