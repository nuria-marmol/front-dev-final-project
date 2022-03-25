// Array de JSONs con los tres iconos del reverso
import { allLevelsIcons } from "./_json-images.js";

/**
 * Redistribuye las fotografías
 *
 * @param {array} arrayPairs El array de objetos a reordenar
 * @returns {array} El mismo array, ya ordenado de nuevo
 */
export function shufflePics(arrayPairs) {
    arrayPairs.sort(function() {
        // Partimos de la posición del medio. Irá distribuyendo adelante o atrás
        return 0.5 - Math.random();
    })
    return arrayPairs;
}

/**
 * Establece los iconos del reverso de las tarjetas
 *
 * @param {HTMLElement} cards La <img> de la parte de atrás de la tarjeta
 * @param {number} position La posición dentro del array de iconos
 */
export function setLevelIcons(cards, position) {
    cards.setAttribute("src", allLevelsIcons[position].name);
    cards.setAttribute("alt", allLevelsIcons[position].description);
}