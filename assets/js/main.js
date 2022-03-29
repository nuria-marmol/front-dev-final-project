// --- Importaciones ---
/* JSONs con las fotografías */
import { level1Pics, level2Pics, level3Pics } from "./modules/_images-jsons.js";
// Cargar las tarjetas
import { renderLevel } from "./modules/_render.js";
// Girar las tarjetas
import { flipCard } from "./modules/_turn-over-cards.js";
// Pequeñas funciones
import { obtainPairs } from "./modules/_small-functions.js";

// --- Variables ---
/* Concatenamos cada array de fotografías para tenerlas duplicadas */
const level1Pairs = obtainPairs(level1Pics);
const level2Pairs = obtainPairs(level2Pics);
const level3Pairs = obtainPairs(level3Pics);
//window.level = 1;

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

// --- Funciones ---
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
 * renderiza el nivel que corresponda y llama a la función de girar las tarjetas.
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

renderLevel(level3Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
flipCard(levelsSection, currentLevel, betweenLevelsSection, nextButton, footer, shareButton);

// --- Eventos ---
playButton.addEventListener("click", startGame);
skipButton.addEventListener("click", skipLevel);
restartButton.addEventListener("click", restartLevel);
nextButton.addEventListener("click", nextLevel);
shareButton.addEventListener("click", copyLink);