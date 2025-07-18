let data = [];
let currentIndex = 0; // Added variable declaration

const beginBtn = document.getElementById("beginBtn");
const resetBtn = document.getElementById("resetBtn");

beginBtn.addEventListener("click", init);
resetBtn.addEventListener("click", init);

function loadData() {
    console.log("Loading data...");
    const data1 = {
        id: 1,
        content: "Self-centered Emperor Kuzco plans to build his summer palace on a village hilltop, evicting the humble villager Pacha. Meanwhile, his scheming advisor Yzma plots to overthrow him, but her plan to poison Kuzco backfires—turning him into a llama instead!",
        img: "image.jpeg"
    };
    const data2 = {
        id: 2,
        content: "Lost and stranded, Kuzco begrudgingly teams up with Pacha, who agrees to help him return to the palace. Along the way, they face wild jungles, hilarious mix-ups, and Yzma’s ridiculous attempts to stop them. Through the adventure, Kuzco learns empathy, friendship, and how not to be a royal pain.",
        img: "OIP.jpeg"
    };
    data.push(data1, data2);
    console.log("Data loaded:", data);
}

function renderData(data) {
    console.log("Rendering data...");
    data.forEach(articleData => createArticle(articleData));
}

function createArticle(data) {
    const main = document.getElementsByTagName("main")[0];
    const article = document.createElement("article");
    article.id = `article-${data.id}`;
    const img = document.createElement("img");
    img.src = data.img;
    const p = document.createElement("p");
    p.textContent = data.content;
    p.classList.add("noto-sans-egyptian-hieroglyphs-regular");
    p.addEventListener("mouseover", zoomIn);
    p.addEventListener("mouseout", zoomOut);
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "next";
    nextBtn.addEventListener("click", next);
    article.append(img, p, nextBtn);
    main.append(article);
}

function init() {
    reset();
    loadData();
    document.getElementById("resetBtnRow").style.display = "block";
    renderData(data);
    appear(document.getElementById("article-1"));
}

function appear(element) {
    const children = element.children;
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.style.display = "inline-block";
        child.style.opacity = "0";
        child.style.transition = "opacity 1s ease-in-out";
        setTimeout(() => {
            child.style.opacity = "1";
        }, 100 + (i * 200)); // Stagger animations
    }
}

function disappear(element) {
    const children = element.children;
    for (const child of children) {
        child.style.opacity = "1";
        setTimeout(() => {
            child.style.opacity = "0";
            child.style.transition = "opacity 1s ease-in-out";
            child.style.display = "none";
        }, 100); // Small delay to trigger animation
    }
}

function zoomIn(e) {
    e.target.style.fontSize = "2em";
}

function zoomOut(e) {
    e.target.style.fontSize = "1em";
}

function next(e) {
    const target = e.target;

    // Prevent rapid clicking
    if (target.disabled) return;
    target.disabled = true;
    setTimeout(() => target.disabled = false, 1200);

    const parent = target.parentElement;
    const nextElement = parent.nextElementSibling;
    if (nextElement) {
        currentIndex++; // Increment index
        console.log(`Navigating to next article: ${currentIndex + 1}`);
        appear(nextElement);

        const statusDisplay = document.getElementById("statusDisplay");
        statusDisplay.textContent = `You're on page ${currentIndex + 1} of ${data.length}`;
    } else {
         console.log("Reached the end of the articles. Resetting...");
        // If this is the last article, reset the story
        setTimeout(() => {
            reset();
            loadData();
            renderData(data);
            appear(document.getElementById("article-1"));
            currentIndex = 0; // Reset the index after a full rotation
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1000); // Small delay to let user see they reached the end
    }
}

function reset() {
    console.log("Resetting state...");
    data = [];

    document.getElementById("resetBtnRow").style.display = "none";
    const statusDisplay = document.getElementById("statusDisplay");
    statusDisplay.style.display = "none";
    statusDisplay.textContent = "";

    const main = document.getElementsByTagName("main")[0];
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffleData() {
    for (let i = data.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [data[i], data[j]] = [data[j], data[i]];
    }
}

function typeText(element, text) {
    let i = 0;
    element.textContent = "";
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(timer);
    }, 50);
}








