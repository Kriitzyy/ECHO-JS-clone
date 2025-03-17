// Väntar på att sidan ska laddas innan koden körs
// Detta säkerställer att alla element finns tillgängliga innan scriptet körs
document.addEventListener("DOMContentLoaded", function () {
    // Hämtar referenser till HTML-element
    const form = document.getElementById("newsForm");
    const newsList = document.getElementById("newsList");
    const newsTitle = document.getElementById("newsTitle");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Hanterar formulärinmatning och lägger till nyheter i listan
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Förhindrar att sidan laddas om vid inskick
    
        // Hämtar värden från formuläret
        const title = document.getElementById("newsTitle").value;
        const comment = document.getElementById("newsComment").value;
    
        // Skapar en ny nyhetsartikel
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
            <h3>${title}</h3>
            <p>${comment.length > 60 ? comment.substring(0, 60) + "..." : comment}</p>
            <small>${new Date().toLocaleTimeString()}</small>
            <div class="comments-list"></div>
            <button class="comment-btn">Comment</button>
        `;
    
        // Lägger till den nya nyheten överst i listan
        newsList.prepend(newsItem);
        form.reset(); // Återställer formuläret efter inskick
    });

    // Uppdaterar rubriken och laddar rätt typ av nyheter (Top News eller Latest News)
    function updateNewsType(newsType) {
        document.getElementById("newsheader").textContent = newsType === "top" ? "Top News" : "Latest News";
        updateNewsList(newsType);
    }

    // Lyssnar på klick i menyn och uppdaterar nyhetstypen endast för Top, Latest och Random
    navLinks.forEach(link => {
        const newsType = link.getAttribute("data-news-type");

        if (newsType === "top" || newsType === "latest" || newsType === "random") {
            link.addEventListener("click", function (event) {
                event.preventDefault(); // Förhindrar standardladdning av sidan för dessa länkar
                
                if (newsType === "random") {
                    showRandomNews(); // Hanterar random-knappen separat
                } else {
                    updateNewsType(newsType);
                }
            });
        }
    });

    // Uppdaterar nyhetslistan med exempelnyheter
    function updateNewsList(newsType) {
        newsList.innerHTML = ""; // Rensar befintliga nyheter
    
        let exampleNews = [
            { title: "Breaking: Major Updates today!", comment: "AI is evolving really fast!", time: new Date().toLocaleTimeString() },
            { title: "Tech News", comment: "JavaScript is evolving pretty fast!", time: new Date().toLocaleTimeString() },
        ];
    
        // Skapar och lägger till exempelnyheter i listan
        exampleNews.forEach(news => {
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.innerHTML = `<h3>${news.title}</h3><p>${news.comment}</p><small>${news.time}</small>`;
            newsList.appendChild(newsItem);
        });
    }

    // Hämtar nyhetskategori från URL-parametrar och laddar rätt nyheter vid sidladdning
    const params = new URLSearchParams(window.location.search);
    const newsType = params.get("news") || "latest";
    updateNewsType(newsType);

    // Hanterar slumpad nyhet
    const randomButton = document.querySelector('[data-news-type="random"]');

    function fetchRandomNews() {
        let exampleNews = [
            { title: "Breaking: Major Update!", comment: "AI may take over programming!", time: new Date().toLocaleTimeString() },
            { title: "Tech News", comment: "JavaScript is evolving really fast!", time: new Date().toLocaleTimeString() },
            { title: "E-Sports Update", comment: "Irelia is getting buffed!!!", time: new Date().toLocaleTimeString() },
            { title: "World News", comment: "Major wars are going on in the world.", time: new Date().toLocaleTimeString() },
            { title: "Frontend news", comment: "CSS is powerful if used correctly!", time: new Date().toLocaleTimeString() }
        ];

        let randomIndex = Math.floor(Math.random() * exampleNews.length);
        return exampleNews[randomIndex];
    }

    randomButton.addEventListener("click", function (event) {
        event.preventDefault();
        newsList.innerHTML = ""; // Rensar tidigare nyheter

        document.getElementById("newsheader").textContent = "Random News"; // Uppdaterar rubriken

        let randomNews = fetchRandomNews();
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `
            <h3>${randomNews.title}</h3>
            <p>${randomNews.comment}</p>
            <small>${randomNews.time}</small>
        `;

        newsList.appendChild(newsItem);
    });
});

// Hanterar kommentarer på nyheter
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("comment-btn")) {
        const commentText = prompt("Skriv din kommentar:");
        if (commentText) {
            const commentList = event.target.previousElementSibling; // Hittar .comments-list
            const newComment = document.createElement("p");
            newComment.textContent = commentText;
            commentList.appendChild(newComment);
        }
    }
});
