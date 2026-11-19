
// ========================================
// ESTRELLAS DEL FONDO
// ========================================

const sky = document.createElement("div");
sky.classList.add("stars");
document.body.prepend(sky);

for (let i = 0; i < 100; i++) {
    const star = document.createElement("span");

    star.classList.add("star");

    if (Math.random() > 0.85) {
        star.classList.add("bright");
    }

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";

    star.style.setProperty(
        "--duration",
        (2 + Math.random() * 4) + "s"
    );

    star.style.setProperty(
        "--delay",
        (Math.random() * 5) + "s"
    );

    sky.appendChild(star);
}


// ========================================
// ELEMENTOS DE LA PÁGINA
// ========================================

const welcome = document.getElementById("welcome");
const enterButton = document.getElementById("enterButton");

const secondScreen = document.getElementById("secondScreen");
const envelope = document.getElementById("envelope");
const envelopeHint = document.getElementById("envelopeHint");

const letterText = document.getElementById("letterText");
const finalHeart = document.getElementById("finalHeart");



 // ========================================
 // MÚSICA Y REPRODUCTOR
 // ========================================

const music = new Audio("./audio/princesa.mp3");

music.loop = true;
music.volume = 0.35;

const musicPlayer = document.getElementById("musicPlayer");
const playPauseButton = document.getElementById("playPauseButton");
const musicSeek = document.getElementById("musicSeek");
const volumeControl = document.getElementById("volumeControl");
const currentTimeDisplay = document.getElementById("currentTime");
const durationDisplay = document.getElementById("duration");

function formatTime(seconds) {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function startMusic() {
    music.currentTime = 10;

    music.play().then(() => {
        musicPlayer.classList.add("visible");
        playPauseButton.textContent = "Ⅱ";
    }).catch((error) => {
        console.log("No se pudo reproducir la música:", error);
    });
}

// Reproducir y pausar

playPauseButton.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});

music.addEventListener("play", () => {
    playPauseButton.textContent = "Ⅱ";
});

music.addEventListener("pause", () => {
    playPauseButton.textContent = "▶";
});

// Actualizar duración y tiempo

music.addEventListener("loadedmetadata", () => {
    musicSeek.max = music.duration;
    durationDisplay.textContent = formatTime(music.duration);
});

music.addEventListener("timeupdate", () => {
    musicSeek.value = music.currentTime;
    currentTimeDisplay.textContent = formatTime(music.currentTime);
});

// Adelantar o retroceder canción

musicSeek.addEventListener("input", () => {
    music.currentTime = Number(musicSeek.value);
});

// Control de volumen

volumeControl.addEventListener("input", () => {
    music.volume = Number(volumeControl.value);
});




// ========================================
// BOTÓN DE BIENVENIDA
// ========================================

enterButton.addEventListener("click", () => {

    startMusic();

    welcome.classList.add("fade-out");

    setTimeout(() => {

        welcome.style.display = "none";
        secondScreen.style.display = "flex";

        requestAnimationFrame(() => {
            secondScreen.style.opacity = "1";
        });

    }, 1000);

});


// ========================================
// TEXTO DE LA CARTA
// ========================================

const letterMessage = `Lala,

Antes que nada, quiero que sepas que estoy tan agradecido con la vida por haber coincidido contigo, porque cuando yo me quería ir del mundo, apareciste tú, bajando del cielo, para convencerme de que este mundo puede ser un paraíso simplemente con mirarte a los ojos.

Eres un pensamiento constante en mi cabeza, la motivación que me hacía falta para seguir, la compañera que tanto le rogué a Dios y, sobre todo, la mujer que tiene mi corazón en sus manos.

Quiero hacerte sentir especial, así como tú me haces sentir enamorado a mí, o sea, mucho. Eres tan hermosa que ninguna palabra puede describirte. Cualquiera diría que eres una en un millón, pero como yo te veo, para mí eres un tiburón nadando entre delfines.

Para no hacerla tan larga, solo quiero decirte que me encantas y te quiero sin límites. Y si tuviera que ponerle un número para limitarlo, sería un googolplex (una magnitud numérica tan descomunal que supera cualquier capacidad de representación física del universo observable, jejeje).

No es más, te quiero, flaca. ❤️`;


// ========================================
// EFECTO DE ESCRITURA
// ========================================

let letterStarted = false;

function writeLetter() {

    if (letterStarted) return;

    letterStarted = true;

    let index = 0;

    function writeNext() {

        if (index < letterMessage.length) {

            letterText.textContent += letterMessage[index];

            index++;

            const delay =
                letterMessage[index - 1] === "\n" ? 180 : 32;

            setTimeout(writeNext, delay);

        } else {

            // Mostrar el corazón cuando termine la carta

            setTimeout(() => {

                if (finalHeart) {
                    finalHeart.classList.add("show");
                }

            }, 800);

        }
    }

    writeNext();
}


// ========================================
// ABRIR EL SOBRE
// ========================================

envelope.addEventListener("click", () => {

    if (envelope.classList.contains("open")) return;

    envelope.classList.add("open");

    secondScreen.classList.add("expanded");

    envelopeHint.textContent = "Un pequeño detalle para ti ♡";

    // Esperar a que el sobre se abra antes de escribir

    setTimeout(writeLetter, 1800);

});
