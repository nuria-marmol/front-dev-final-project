// --- Importaciones ---
/* JSONs con las fotografías */
import { level1Pics, level2Pics, level3Pics } from "./modules/images-jsons.js";
// Cargar las tarjetas
import { renderLevel } from "./modules/render.js";
// Girar las tarjetas
import { flipCard } from "./modules/turn-over-cards.js";
// Pequeñas funciones
import { obtainPairs } from "./modules/small-functions.js";
import { definingInterval } from "./modules/timer.js";

// --- Variables ---
/* Concatenamos cada array de fotografías para tenerlas duplicadas */
const level1Pairs = obtainPairs(level1Pics);
const level2Pairs = obtainPairs(level2Pics);
const level3Pairs = obtainPairs(level3Pics);

// Capturamos los elementos necesarios:
/* Nuestra plantilla para las imágenes y su destino, el div que tiene el grid */
const cardsTemplate = document.querySelector("#cards-template").content.firstElementChild;
const templateTarget = document.querySelector("#template-target");
// Las secciones
const gameMenu = document.querySelector("#game-menu");
const main = document.querySelector("#main");
const levelsSection = document.querySelector("#all-levels");
const betweenLevelsSection = document.querySelector("#between-levels");
const footer = document.querySelector("#footer");
// Los dos spans donde se muestra el nivel actual (pantalla del nivel y pantalla intermedia)
const currentLevel = document.querySelectorAll(".level-info__current-level");
// Los botones
const playButton = document.querySelector("#play-button");
const skipButton = document.querySelector("#all-levels-next__button");
const restartButton = document.querySelector("#restart-level");
const nextButton = document.querySelector("#next-level");
const shareButton = document.querySelector("#share-button");
const timerIcon = document.querySelector("#timer-icon");

// --- Funciones ---
/**
 * Reproduce una animación en el icono
 */
function playAnimation() {
    // Si la sección (menú del juego) se muestra
    if (!gameMenu.classList.contains("game-menu--hidden")) {
        // Capturamos el icono y lo animamos
        document.querySelector("#play-image").animate([
            // Fotogramas clave
            { transform: 'scale(1)' },
            { transform: 'scale(1.2)' }
        ],{
            // Opciones de sincronización
            duration: 1500,
            iterations: Infinity,
            direction: "alternate"
        })
    }
}

/**
 * Inicia el juego
 */
function startGame() {
    renderLevel(level1Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
    // Ocultamos la pantalla de inicio
    gameMenu.classList.add("game-menu--hide");
    // Mostramos el main
    main.classList.remove("hidden");
    // Del main, mostramos solo la sección de los niveles
    levelsSection.classList.remove("all-levels--hide");
    flipCard(levelsSection, currentLevel, betweenLevelsSection, nextButton, footer, shareButton);
}

/**
 * Salta al siguiente nivel
 */
function skipLevel() {
    switch (currentLevel[0].textContent) {
        // Si el primer span, el de esta pantalla, indica que estamos en el nivel 1
        case "1":
            // Cargamos el nivel 2 y llamamos a la función para poder darle la vuelta a las tarjetas
            renderLevel(level2Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
            flipCard(levelsSection, currentLevel, betweenLevelsSection, nextButton, footer, shareButton);
            break;
        // Si el mismo span indica que estamos en el nivel 2
        case "2":
            // Cargamos el 3
            renderLevel(level3Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
            // Llamamos a la función para poder girar las tarjetas
            flipCard(levelsSection, currentLevel, betweenLevelsSection, nextButton, footer, shareButton);
            break;
    }
}

/**
 * Vuelve a llevar al jugador al nivel que acaba de completar
 */
function restartLevel() {
    switch (currentLevel[1].textContent) {
        // Si el segundo span, el de esta pantalla, indica que estamos en el nivel 1
        case "1":
            hideMessagesShowLevel(level1Pairs);
            break;
        // Si el mismo span indica que estamos en el nivel 2
        case "2":
            hideMessagesShowLevel(level2Pairs);
            break;
        // Si estamos en el 3
        default:
            hideMessagesShowLevel(level3Pairs);
            // Ocultamos de nuevo el footer, que solo se mostrará al terminar el nivel
            footer.classList.add("hidden");
            break;
    }
}

/**
 * Pasa al siguiente una vez se ha terminado un nivel
 */
function nextLevel() {
    switch (currentLevel[1].textContent) {
        // Si el segundo span, el de esta pantalla, indica que estamos en el nivel 1
        case "1":
            hideMessagesShowLevel(level2Pairs);
            break;
        // Si el mismo span indica que estamos en el nivel 2
        case "2":
            hideMessagesShowLevel(level3Pairs);
            break;
        // Si estamos en el 3
        default:
            hideMessagesShowLevel(level1Pairs);
            /* Volvemos a ocultar el footer y el botón de compartir (por si al acabar el tercer nivel el jugador elige regresar al 1) */
            footer.classList.add("hidden");
            shareButton.classList.add("hidden");
            break;
    }
}

/**
 * Oculta la pantalla intermedia, muestra la del nivel,
 * renderiza el nivel que corresponde y llama a la función de girar las tarjetas.
 *
 * @param {Array} arrayPairs El array de tarjetas a cargar
 */
function hideMessagesShowLevel(arrayPairs) {
    // Ocultamos la sección actual (mensajes) y mostramos la que toca (nivel)
    betweenLevelsSection.classList.add("between-levels--hide");
    levelsSection.classList.remove("all-levels--hide");
    // Cargamos el nivel que toque y llamamos a la función para poder darle la vuelta a las tarjetas
    renderLevel(arrayPairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
    flipCard(levelsSection, currentLevel, betweenLevelsSection, nextButton, footer, shareButton);
}

/**
 * Copia el enlace del juego
 */
function copyLink() {
    // Guardamos la url del juego
    const gameUrl = window.location.href;
    // Copiamos la url en el portapapeles
    navigator.clipboard.writeText(gameUrl).then(function() {
        linkCopiedMessage();
    });
}

/**
 * Informa al jugador de que el enlace se ha copiado correctamente
 */
function linkCopiedMessage() {
    // Creamos un nuevo párrafo
    const message = document.createElement("p");
    // Escribimos en él
    message.textContent = "Link copied!";
    // Le añadimos la clase correspondiente
    message.classList.add("between-levels-share__copy-link-message");
    // Lo movemos al body
    document.body.appendChild(message);
    // Tras 1.5 segundos, lo eliminamos
    setTimeout(function() {
        document.body.removeChild(message);
    },1500)
}

/**
 * Controla la interacción con el icono del temporizador
 */
function timerInteraction() {
    // Capturamos el párrafo donde se muestra el tiempo restante
    const timeLeft = document.querySelector("#time-left");
    // Capturamos también el mensaje que le indica al jugador que puede activar el temporizador
    const timerMessage = document.querySelector("#timer-message");
    // Vamos mostrando/ocultando cada uno en lugar del otro
    timeLeft.classList.toggle("hidden");
    timerMessage.classList.toggle("hidden");
    // Si el párrafo del tiempo restante se muestra, llamamos a la función que define el intervalo
    if (timerMessage.classList.contains("hidden")) {
        definingInterval(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel);
    }
}

/**
 * Aplica una animación al icono del temporizador
 */
function timerIconAnimation() {
    timerIcon.animate([
        // Fotogramas clave
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(7deg)' },
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(-7deg)' },
        { transform: 'rotate(0deg)' }
    ], {
        // Opciones de sincronización
        duration: 900,
        iterations: 2
    })
}

/**
 * Reproduce una pequeña animación en el icono para saltar el nivel actual
 */
function skipIconAnimation() {
    document.querySelector("#skip-icon").animate([
        // Fotogramas clave
        { transform: 'translateX(0)' },
        { transform: 'translateX(.4rem)' },
        { transform: 'translateX(0)' }
    ], {
        // Opciones de sincronización
        duration: 1000,
        iterations: 1
    })
}

/**
 * Desenfoca el botón de avanzar de nivel
 */
function blurNextButton() {
    nextButton.style.filter = "blur(.1rem)";
}

/**
 * Vuelve a enfocar el botón anterior
 */
function removeNextButtonBlur() {
    nextButton.removeAttribute("style");
}

/**
 * Desenfoca el botón de reiniciar el nivel
 */
function blurRestartButton() {
    restartButton.style.filter = "blur(.1rem)";
}

/**
 * Enfoca de nuevo el botón anterior
 */
function removeRestartButtonBlur() {
    restartButton.removeAttribute("style");
}

// --- Eventos ---
playButton.addEventListener("click", startGame);
skipButton.addEventListener("click", skipLevel);
skipButton.addEventListener("mouseenter", skipIconAnimation);
restartButton.addEventListener("click", restartLevel);
restartButton.addEventListener("mouseenter", blurNextButton);
restartButton.addEventListener("mouseleave", removeNextButtonBlur);
nextButton.addEventListener("click", nextLevel);
nextButton.addEventListener("mouseenter", blurRestartButton);
nextButton.addEventListener("mouseleave", removeRestartButtonBlur);
shareButton.addEventListener("click", copyLink);
timerIcon.addEventListener("click", timerInteraction);
timerIcon.addEventListener("mouseenter", timerIconAnimation);

// --- Inicio ---
playAnimation();