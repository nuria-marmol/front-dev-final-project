// Importamos JSONs con las fotografías. También los iconos para el reverso de las tarjetas
import { level1Pics, level2Pics, level3Pics, allLevelsIcons } from "./modules/_json-images.js";

// Variables
/* Concatenamos cada array de fotografías para tenerlas duplicadas */
const level1Pairs = level1Pics.concat(level1Pics);
const level2Pairs = level2Pics.concat(level2Pics);
const level3Pairs = level3Pics.concat(level3Pics);

// Capturamos nuestra plantilla para las imágenes y su destino, el div que tiene el grid
const cardsTemplate = document.querySelector("#cards-template").content.firstElementChild;
const templateTarget = document.querySelector("#template-target");

// Funciones
function shufflePics(arrayPairs) {
    arrayPairs.sort(function() {
        // Partimos de la posición del medio. Irá distribuyendo adelante o atrás
        return 0.5 - Math.random();
    })
    return arrayPairs;
}

function renderLevel(arrayPairs) {
    const shuffledImages = shufflePics(arrayPairs);
    shuffledImages.forEach(function(object) {
        // Clonamos la plantilla
        const templateCopy = cardsTemplate.cloneNode(true);
        // Capturamos dentro de ella
        const cardsBack = templateCopy.querySelector("#cards-back");
        const cardsFront = templateCopy.querySelector("#cards-front");
        // Rellenamos
        cardsFront.setAttribute("src", object.name);
        cardsFront.setAttribute("alt", object.description);
        // Movemos la plantilla a su destino
        templateTarget.appendChild(templateCopy);
    })
}

renderLevel(level1Pairs);


// Eventos


// Inicio