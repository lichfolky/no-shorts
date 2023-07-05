console.log("content");
const sections = document.querySelectorAll(".ytd-rich-section-renderer");
for (const section of sections) {
    const titles = section.querySelectorAll("#title");

    for (const title of titles) {

        if (title.innerHTML == "Shorts") {
            section.remove();
            //     console.log(title.innerHTML);


        }
    }
}