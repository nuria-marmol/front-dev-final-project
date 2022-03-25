// ------ Importaciones ------
/* JSONs con las fotografías */
import { level1Pics, level2Pics, level3Pics } from "./modules/_images-jsons.js";
// Cargar las tarjetas
import { renderLevel } from "./modules/_render.js";
// Girar las tarjetas
import { flipCard } from "./modules/_turn-over-cards.js";
// Pequeñas funciones
import { obtainPairs } from "./modules/_small-functions.js";

// ------ Variables ------
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
// Los dos spans donde se muestra el nivel actual (pantalla del nivel y pantalla intermedia)
const currentLevel = document.querySelectorAll(".level-info__current-level");
// Los botones
const playButton = document.querySelector("#play-button");
const skipButton = document.querySelector("#all-levels-next__button");
const restartButton = document.querySelector("#restart-level");
const nextButton = document.querySelector("#next-level");

// ------ Funciones ------
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
    flipCard(levelsSection, betweenLevelsSection);
}

/**
 * Salta al siguiente nivel
 */
function skipLevel() {
    // Si el primer span, el de esta pantalla, indica que estamos en el nivel 1
    if (currentLevel[0].textContent === "1") {
        // Cargamos el nivel 2 y llamamos a la función para poder darle la vuelta a las tarjetas
        renderLevel(level2Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    // Si el mismo span indica que estamos en el nivel 2
    } else if (currentLevel[0].textContent === "2") {
        // Cargamos el 3 y llamamos a la función para poder girar las tarjetas
        renderLevel(level3Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    }
}

function restartLevel() {
    // Si el segundo span, el de esta pantalla, indica que estamos en el nivel 1
    if (currentLevel[1].textContent === "1") {
        // Ocultamos la sección actual (mensajes) y mostramos la que toca (nivel)
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos de nuevo el nivel 1 y llamamos a la función para poder darle la vuelta a las tarjetas
        renderLevel(level1Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    // Si el mismo span indica que estamos en el nivel 2
    } else if (currentLevel[1].textContent === "2") {
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos el 2 otra vez y llamamos a la función para poder girar las tarjetas
        renderLevel(level2Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    } else if (currentLevel[1].textContent === "3") {
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos el nivel 3
        renderLevel(level3Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    }
}

function nextLevel() {
    // Si el segundo span, el de esta pantalla, indica que estamos en el nivel 1
    if (currentLevel[1].textContent === "1") {
        // Ocultamos la sección actual (mensajes) y mostramos la que toca (nivel)
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos de nuevo el nivel 1 y llamamos a la función para poder darle la vuelta a las tarjetas
        renderLevel(level2Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
        // Si el mismo span indica que estamos en el nivel 2
    } else if (currentLevel[1].textContent === "2") {
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos el 2 otra vez y llamamos a la función para poder girar las tarjetas
        renderLevel(level3Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
        flipCard(levelsSection, betweenLevelsSection);
    } else if (currentLevel[1].textContent === "3") {
        betweenLevelsSection.classList.add("between-levels--hide");
        levelsSection.classList.remove("all-levels--hide");
        // Cargamos el nivel 3
        renderLevel(level1Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
    }
}

renderLevel(level1Pairs, cardsTemplate, templateTarget, levelsSection, currentLevel, skipButton, level1Pairs, level2Pairs);
flipCard(levelsSection, betweenLevelsSection);

// --- Eventos ---
playButton.addEventListener("click", startGame);
skipButton.addEventListener("click", skipLevel);
restartButton.addEventListener("click", restartLevel);
nextButton.addEventListener("click", nextLevel);