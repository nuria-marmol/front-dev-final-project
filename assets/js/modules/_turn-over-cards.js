/**
 * Da la vuelta solo a dos tarjetas. Llama a la función de comprobar tarjetas
 *
 * @param {HTMLElement} currentSection La pantalla del nivel
 * @param {HTMLElement} messagesSection Pantalla intermedia
 */
export function flipCard(currentSection, messagesSection) {
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
                // Comprobamos si son iguales
                checkCards(chosenPics, chosenCards, allCards, currentSection, messagesSection);
            // Para que no se giren más de 2 tarjetas
            } else if (chosenCards.length > 2) {
                card.classList.remove("all-levels-cards__back--turn");
            }
        })
    })
}

/**
 * Verifica si las dos tarjetas que se han destapado son iguales
 *
 * @param {HTMLElement} chosenPics El anverso de las tarjetas que se han girado, pero aún no se han acertado
 * @param {HTMLElement} chosenCards El reverso de las tarjetas que se han girado, pero aún no se han acertado
 * @param {HTMLElement} allCards Todas las tarjetas, todavía sin girar
 * @param {HTMLElement} currentSection La pantalla del nivel
 * @param {HTMLElement} messagesSection Pantalla intermedia
 */
function checkCards(chosenPics, chosenCards, allCards, currentSection, messagesSection) {
    // Si su descripción es la misma, es decir, si es la misma fotografía
    if (chosenPics[0].getAttribute("alt") === chosenPics[1].getAttribute("alt")) {
        setTimeout(function() {
            chosenPics.forEach(function(card) {
                // A ambas les añadimos opacidad para que se fundan
                card.classList.add("all-levels-cards-front__image--opacity");
            })
            /* Capturamos las tarjetas que ya tienen opacidad (tiene que estar aquí para que capturen las 2 primeras) */
            const guessedCards = document.querySelectorAll(".all-levels-cards-front__image--opacity");
            chosenCards.forEach(function(card) {
                // Ocultamos también las caras de atrás correspondientes
                card.classList.add("all-levels-cards__back--hidden");
            })
            // Si todas las tarjetas ya se han emparejado
            if (guessedCards.length === allCards.length) {
                setTimeout(function() {
                    // Ocultamos la pantalla actual y mostramos los mensajes
                    currentSection.classList.add("all-levels--hide");
                    messagesSection.classList.remove("between-levels--hide");
                }, 1000)
            }
        }, 1500)
        // Si las fotografías NO coinciden
    } else {
        setTimeout(function() {
            chosenCards.forEach(function(card) {
                // Volvemos a girar ambas para que vuelvan a estar tapadas
                card.classList.remove("all-levels-cards__back--turn");
            })
        }, 1500)
    }
}