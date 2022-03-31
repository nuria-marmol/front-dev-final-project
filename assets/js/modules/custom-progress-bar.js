/**
 * Hace que la barra de progreso crezca cuando se emparejan dos tarjetas
 *
 * @param {NodeListOf} allCards Las tarjetas que haya presentes en el nivel
 * @param {NodeListOf} guessedCards Las tarjetas ya acertadas
 */
export function growProgressFill(allCards, guessedCards) {
    // Capturamos los 2 divs (el relleno de la barra)
    const progressFill = document.querySelectorAll(".level-info__progress-fill");
    // Guardamos el ancho que irá aumentando la barrita cada vez que el jugador acierte
    const progressFillWidthPerPair = getProgressPerPair(allCards);
    /* El relleno del primer div será igual al ancho del relleno actual (en rem y solo con un decimal) + la anchura que le corresponda aumentar */
    progressFill[0].style.width = `${(progressFill[0].clientWidth / 16 + progressFillWidthPerPair).toFixed(1)}rem`;
    /* Para que al crecer la barra por última vez se ajuste perfectamente al borde.
    Si solo faltan 2 tarjetas por emparejar */
    if (guessedCards.length - 2 === allCards.length - 2) {
        // Le damos al relleno la anchura total del borde
        progressFill[0].style.width = `${getProgressBorderWidth()}rem`;
    }
    // El relleno del segundo div (pantalla intermedia) siempre cogerá la anchura total del borde directamente
    progressFill[1].style.width = `${getProgressBorderWidth()}rem`;
}

/**
 * Obtiene el ancho total de la barra de progreso
 *
 * @returns {number} La anchura total
 */
function getProgressBorderWidth() {
    /* Capturamos el div que es el borde de la barrita (con capturar 1 de los 2 basta, ya que solo lo queremos para hacer el cálculo */
    const progressBorder = document.querySelector("#progress-border");
    // Devuelve su anchura convertida a rem (clientWidth nos la da en px)
    return progressBorder.clientWidth / 16;
}

/**
 * Obtiene la anchura que debe ganar la barra de progreso cada vez que el jugador empareja dos tarjetas
 *
 * @param {NodeListOf} allCards Las tarjetas que haya presentes en el nivel
 * @returns {number} Lo que debe crecer la barrita cada vez que se emparejan dos tarjetas
 */
function getProgressPerPair(allCards) {
    // Guardamos la anchura total de la barra
    const progressFullWidth = getProgressBorderWidth();
    // Dividimos esa anchura entre la mitad de las tarjetas (ya que están repetidas)
    return progressFullWidth / (allCards.length / 2);
}