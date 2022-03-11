// ------ Importaciones ------
/* Importamos JSONs con las fotografías. También los iconos para el reverso de las tarjetas */
import { level1Pics, level2Pics, level3Pics, allLevelsIcons } from "./modules/_json-images.js";

// ------ Variables ------
/* Concatenamos cada array de fotografías para tenerlas duplicadas */
const level1Pairs = level1Pics.concat(level1Pics);
const level2Pairs = level2Pics.concat(level2Pics);
const level3Pairs = level3Pics.concat(level3Pics);

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

// ------ Funciones ------
/**
 * Redistribuye las fotografías
 *
 * @param {array} arrayPairs El array de objetos a reordenar
 * @returns {array} El mismo array, ya ordenado de nuevo
 */
function shufflePics(arrayPairs) {
    arrayPairs.sort(function() {
        // Partimos de la posición del medio. Irá distribuyendo adelante o atrás
        return 0.5 - Math.random();
    })
    return arrayPairs;
}

/**
 * Genera las imágenes de las tarjetas, así como el icono de su reverso, y personaliza el nivel
 *
 * @param {array} arrayPairs El array que cogeremos para el nivel correspondiente
 */
function renderLevel(arrayPairs) {
    // Guardamos el array reordenado para iterarlo luego
    const shuffledImages = shufflePics(arrayPairs);
    /* Vaciamos el contenido del destino de la plantilla para que no se vayan acumulando las tarjetas del nivel anterior */
    templateTarget.textContent = "";
    shuffledImages.forEach(function(object) {
        // Clonamos la plantilla
        const templateCopy = cardsTemplate.cloneNode(true);
        // Capturamos dentro de ella
        const cardsBack = templateCopy.querySelector("#cards-back");
        const cardsFront = templateCopy.querySelector("#cards-front");
        // Rellenamos con las fotos del nivel que toque
        cardsFront.setAttribute("src", object.name);
        cardsFront.setAttribute("alt", object.description);

        // Rellenamos con el icono que corresponda para la cara de atrás
        /* Si el array que estamos iterando es el del primer nivel */
        if (arrayPairs == level1Pairs) {
            // Añadimos el primer icono al reverso
            setLevelIcons(cardsBack, 0)
        // Si el array iterado es el del segundo nivel
        } else if (arrayPairs == level2Pairs) {
            // Añadimos el segundo icono
            setLevelIcons(cardsBack, 1)
            // Cambiamos el color de fondo
            levelsSection.classList.add("all-levels--colour-change");
            // Modificamos el grid
            templateTarget.classList.add("all-levels__cards--grid2");
            // Cambiamos el color de fondo del reverso de la tarjeta
            templateCopy.classList.add("all-levels-cards__back--colour-change");

            // El primer span del array mostrará un 2
            currentLevel[0].textContent = "2";
        // Si es el del tercer nivel
        } else {
            // Añadimos el tercer icono
            setLevelIcons(cardsBack, 2)
            // Volvemos a cambiar el color de fondo
            levelsSection.classList.add("all-levels--another-colour-change");
            // Modificamos el grid
            templateTarget.classList.add("all-levels__cards--grid3");
            // Cambiamos el color de fondo del reverso
            templateCopy.classList.add("all-levels-cards__back--another-colour-change");
            // El primer span del array mostrará un 3
            currentLevel[0].textContent = "3";
            // Ocultamos el botón para saltar el nivel, ya que es el último
            skipButton.classList.add("all-levels--next__button--hide");
        }
        // Movemos la plantilla a su destino!
        templateTarget.appendChild(templateCopy);
    })
}

/**
 * Establece los iconos del reverso de las tarjetas
 *
 * @param {HTMLElement} cards La <img> de la parte de atrás de la tarjeta
 * @param {number} position La posición dentro del array de iconos
 */
function setLevelIcons(cards, position) {
    // El array de iconos siempre será el mismo
    cards.setAttribute("src", allLevelsIcons[position].name);
    cards.setAttribute("alt", allLevelsIcons[position].description);
}

/**
 * Inicia el juego
 */
function startGame() {
    renderLevel(level1Pairs);
    // Ocultamos la pantalla de inicio
    gameMenu.classList.add("game-menu--hide");
    // Mostramos el main
    main.classList.remove("hidden");
    // Del main, mostramos solo la sección de los niveles
    levelsSection.classList.remove("all-levels--hide");
}

/**
 * Salta al siguiente nivel
 */
function skipLevel() {
    if (currentLevel[0].textContent == "1") {
        renderLevel(level2Pairs);
    } else if (currentLevel[0].textContent === "2") {
        renderLevel(level3Pairs);
    }
}

// --- Eventos ---
playButton.addEventListener("click", startGame);
skipButton.addEventListener("click", skipLevel);