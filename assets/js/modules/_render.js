import { setLevelIcons, shufflePics } from "./_small-functions.js";
import { renderClasses } from "./_classes.js";

/**
 * Genera las imágenes de las tarjetas. Llama a la función que obtiene los iconos
 *
 * @param {array} arrayPairs Las fotografías que cogeremos para el nivel correspondiente
 * @param {HTMLElement} template La plantilla que usaremos para generar las tarjetas
 * @param {HTMLElement} target El destino de nuestra plantilla
 * @param {HTMLElement} section La sección del nivel
 * @param {HTMLElement} spans Donde se muestra el nivel actual
 * @param {HTMLElement} button Botón para saltar el nivel
 * @param {array} level1 Primer array de parejas de tarjetas
 * @param {array} level2 Segundo array de parejas
 */
export function renderLevel(arrayPairs, template, target, section, spans, button, level1, level2) {
    // Guardamos el array reordenado para iterarlo luego
    const shuffledImages = shufflePics(arrayPairs);
    /* Vaciamos el contenido del destino de la plantilla para que no se vayan acumulando las tarjetas del nivel anterior */
    target.textContent = "";
    shuffledImages.forEach(function(object) {
        // Clonamos la plantilla
        const templateCopy = template.cloneNode(true);
        // Capturamos dentro de ella
        const cardsBack = templateCopy.querySelector("#cards-back");
        const cardsFront = templateCopy.querySelector("#cards-front");
        // Rellenamos con las fotos del nivel que toque
        cardsFront.setAttribute("src", object.name);
        cardsFront.setAttribute("alt", object.description);
        // Obtenemos los iconos de las tarjetas, que se verán cuando aún no estén destapadas
        getIcons(arrayPairs, template, templateCopy, target, section, cardsBack, spans, button, level1, level2);
        // Movemos la plantilla a su destino!
        target.appendChild(templateCopy);
    })
}

/**
 * Obtiene los iconos del reverso de las tarjetas. Llama a agregar estilos
 *
 * @param {array} arrayPairs Las fotografías que cogeremos para el nivel correspondiente
 * @param {HTMLElement} template La plantilla que usaremos para generar las tarjetas
 * @param {HTMLElement} templateCopy La copia de nuestra plantilla
 * @param {HTMLElement} target El destino de nuestra plantilla
 * @param {HTMLElement} section La sección del nivel
 * @param {HTMLElement} cardsBack Parte de detrás de las tarjetas
 * @param {HTMLElement} spans Donde se muestra el nivel actual
 * @param {HTMLElement} button Botón para saltar el nivel
 * @param {array} level1 Primer array de parejas de tarjetas
 * @param {array} level2 Segundo array de parejas
 */
function getIcons(arrayPairs, template, templateCopy, target, section, cardsBack, spans, button, level1, level2) {
    // Rellenamos con el icono que corresponda para la cara de atrás
    /* Si el array que estamos iterando es el del primer nivel */
    if (arrayPairs === level1) {
        // Añadimos el primer icono al reverso
        setLevelIcons(cardsBack, 0)
        // Si el array iterado es el del segundo nivel
    } else if (arrayPairs === level2) {
        // Añadimos el segundo icono
        setLevelIcons(cardsBack, 1)
        // Cambiamos varios estilos para este nivel
        additionalLevelStyles(0, 2, section, target, templateCopy, spans)
        // Si es el del tercer nivel
    } else {
        // Añadimos el tercer icono
        setLevelIcons(cardsBack, 2)
        // Personalizamos varios estilos para este nivel
        additionalLevelStyles(1, 3, section, target, templateCopy, spans)
        button.classList.add("all-levels--next__button--hide");
    }
}

/**
 * Personaliza el nivel
 *
 * @param {number} position La posición dentro del array de JSONs
 * @param {number} text El nivel actual
 * @param {HTMLElement} section La sección del nivel
 * @param {HTMLElement} target El destino de nuestra plantilla
 * @param {HTMLElement} templateCopy La copia de nuestra plantilla
 * @param {HTMLElement} spans Donde se muestra el nivel actual
 */
function additionalLevelStyles(position, text, section, target, templateCopy, spans) {
    // Cambiamos el color de fondo
    section.classList.add(renderClasses[position].sectionColour);
    // Modificamos el grid
    target.classList.add(renderClasses[position].grid);
    // Cambiamos el color de fondo del reverso de la tarjeta
    templateCopy.classList.add(renderClasses[position].backCardColour);
    // El primer span del array mostrará el nivel que corresponda
    spans[0].textContent = text;
}