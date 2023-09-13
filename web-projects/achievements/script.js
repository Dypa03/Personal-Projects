// Esempio di funzione per il pulsante di scroll
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Aggiungi questa variabile globale per tenere traccia dello stato del pulsante e dell'ultima posizione dello scroll
var isBackToTopVisible = false;
var lastScrollPosition = 0;

window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('back-to-top');
    var footer = document.querySelector('footer');
    
    if (window.scrollY >= 500 && !isBackToTopVisible) {
        backToTopButton.style.opacity = '1';
        isBackToTopVisible = true;
    } else if (window.scrollY < 500 && isBackToTopVisible) {
        backToTopButton.style.opacity = '0';
        isBackToTopVisible = false;
    }
    
    // Calcola la distanza tra la fine della pagina e il footer
    var distanceToFooter = footer.getBoundingClientRect().top - window.innerHeight;

    // Se si è raggiunto il footer, sposta il pulsante un po' più in alto
    if (distanceToFooter <= 0) {
        backToTopButton.style.bottom = (Math.abs(distanceToFooter) + 20) + 'px';
    } else {
        // Altrimenti, ripristina la posizione del pulsante
        backToTopButton.style.bottom = '20px';
    }

    // Aggiorna l'ultima posizione dello scroll
    lastScrollPosition = window.scrollY;
});


/*
// Esempio di funzione per il toggle del lettore musicale
function toggleMusicPlayer() {
    var musicPlayer = document.querySelector("#music-player iframe");
    var toggleButton = document.getElementById("toggle-music");

    if (musicPlayer.getAttribute("src")) {
        musicPlayer.removeAttribute("src");
        toggleButton.textContent = "Play Music";
    } else {
        musicPlayer.setAttribute("src", "...");
        toggleButton.textContent = "Pause Music";
    }
}


// Esempio di interattività al passaggio del mouse
var achievements = document.querySelectorAll(".success-list ul li");
achievements.forEach(function (achievement) {
    achievement.addEventListener("mouseover", function () {
        this.style.color = "var(--h3-color)";
    });
    achievement.addEventListener("mouseout", function () {
        this.style.color = "initial";
    });
});
*/

