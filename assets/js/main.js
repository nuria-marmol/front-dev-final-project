// ------ Importaciones ------
/* Importamos JSONs con las fotografías. También los iconos para el reverso de las tarjetas */
import { level1Pics, level2Pics, level3Pics, allLevelsIcons } from "./modules/_json-images.js";
import { shufflePics, setLevelIcons } from "./modules/_small-functions.js";

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
    flipCard();
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
            setLevelIcons(cardsBack, allLevelsIcons, 0)
        // Si el array iterado es el del segundo nivel
        } else if (arrayPairs == level2Pairs) {
            // Añadimos el segundo icono
            setLevelIcons(cardsBack, allLevelsIcons, 1)
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
            setLevelIcons(cardsBack, allLevelsIcons, 2)
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
 * Salta al siguiente nivel
 */
function skipLevel() {
    // Si el primer span, el de esta pantalla, indica que estamos en el nivel 1
    if (currentLevel[0].textContent === "1") {
        // Cargamos el nivel 2 y llamamos a la función para poder darle la vuelta a las tarjetas
        renderLevel(level2Pairs);
        flipCard();
    // Si el mismo span indica que estamos en el nivel 2
    } else if (currentLevel[0].textContent === "2") {
        // Cargamos el 3 y llamamos a la función para poder girar las tarjetas
        renderLevel(level3Pairs);
        flipCard();
    }
}

/**
 * Da la vuelta a dos tarjetas y comprueba si coinciden
 */
function flipCard() {
    // Capturamos el reverso de todas las tarjetas
    const allCards = document.querySelectorAll(".all-levels-cards__back");
    allCards.forEach(function(card) {
        // Con cada una, al hacer clic
        card.addEventListener("click", function() {
            // Le añadimos la clase para girarla
            card.classList.add("all-levels-cards__back--turn");
            // Capturamos las tarjetas que aún NO se han adivinado
            const chosenCards = document.querySelectorAll(".all-levels-cards__back--turn:not(.all-levels-cards__back--hidden)");
            // Dentro de las que aún NO se han emparejado, capturamos el anverso
            const chosenPics = document.querySelectorAll(".all-levels-cards__back--turn:not(.all-levels-cards__back--hidden) .all-levels-cards__front .all-levels-cards-front__image");
            // Cuando ya se han seleccionado dos tarjetas
            if (chosenCards.length === 2) {
                // Si su descripción es la misma, es decir, si es la misma fotografía
                if (chosenPics[0].getAttribute("alt") === chosenPics[1].getAttribute("alt")) {
                    setTimeout(function() {
                        chosenPics.forEach(function(card) {
                            // A ambas les añadimos opacidad para que se fundan
                            card.classList.add("all-levels-cards-front__image--opacity");
                        })
                        /* Capturamos las tarjetas que ya tienen opacidad (tiene que estar aquí para que capturen las 2 primeras) */
                        const guessedCards = document.querySelectorAll(".all-levels-cards-front__image--opacity");
                        console.log(guessedCards);
                        chosenCards.forEach(function(card) {
                            // Ocultamos también las caras de atrás correspondientes
                            card.classList.add("all-levels-cards__back--hidden");
                        })
                        // Si todas las tarjetas ya se han emparejado
                        if (guessedCards.length == allCards.length) {
                            setTimeout(function() {
                                // Ocultamos la pantalla actual y mostramos los mensajes
                                levelsSection.classList.add("all-levels--hide");
                                betweenLevelsSection.classList.remove("between-levels--hide");
                            }, 1000)
                        }
                    }, 2000)
                // Si las fotografías NO coinciden
                } else {
                    setTimeout(function() {
                        chosenCards.forEach(function(card) {
                            // Volvemos a girar ambas para que vuelvan a estar tapadas
                            card.classList.remove("all-levels-cards__back--turn");
                        })
                    }, 2000)
                }
            }
        })
    })
}

renderLevel(level1Pairs);
flipCard();

// --- Eventos ---
playButton.addEventListener("click", startGame);
skipButton.addEventListener("click", skipLevel);