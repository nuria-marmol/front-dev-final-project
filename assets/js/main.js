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

// Capturamos las secciones
const levelsSection = document.querySelector("#all-levels");

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
        // Rellenamos con las fotos del nivel que toque
        cardsFront.setAttribute("src", object.name);
        cardsFront.setAttribute("alt", object.description);

        // Rellenamos con el icono que corresponda para la cara de atrás
        /* Si el array que estamos iterando es el del primer nivel */
        if (arrayPairs == level1Pairs) {
            // Añadimos el icono de la luna al reverso, que está en la primera posición del JSON
            cardsBack.setAttribute("src", allLevelsIcons[0].name);
            cardsBack.setAttribute("alt", allLevelsIcons[0].description);
        // Si el array iterado es el del segundo nivel
        } else if (arrayPairs == level2Pairs) {
            // Añadimos el icono del laberinto (segunda posición del JSON)
            cardsBack.setAttribute("src", allLevelsIcons[1].name);
            cardsBack.setAttribute("alt", allLevelsIcons[1].description);
            // Cambiamos el color de fondo
            levelsSection.classList.add("all-levels--first-change");
            // Grid ...

        // Si es el del tercer nivel
        } else {
            // Añadimos el icono de la flor (tercera posición)
            cardsBack.setAttribute("src", allLevelsIcons[2].name);
            cardsBack.setAttribute("alt", allLevelsIcons[2].description);
            // Volvemos a cambiar el color de fondo
            levelsSection.classList.add("all-levels--second-change");
            // Grid ...

        }

        // Movemos la plantilla a su destino
        templateTarget.appendChild(templateCopy);
    })
}

renderLevel(level1Pairs);


// Eventos


// Inicio