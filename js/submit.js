document.getElementById("newsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const title = document.getElementById("newsTitle").value;
    const comment = document.getElementById("newsComment").value;

    if (title && comment) {
        alert("News submitted successfully!");
        window.location.href = "index.html"; // Skickar användaren tillbaka till startsidan
    }
});
