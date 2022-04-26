let timerInterval = undefined;
let minutes = 1;
let seconds = 60;

/**
 * Establece el intervalo en el que se ejecutará la función del temporizador
 *
 * @param timeLeft {HTMLElement} El párrafo donde se muestra el tiempo restante
 * @param timerMessage {HTMLElement} El párrafo donde se le indica al jugador que puede activar el temporizador
 * @param levelsSection {HTMLElement} La pantalla del nivel
 * @param betweenLevelsSection {HTMLElement} La pantalla entre niveles
 * @param restartButton {HTMLElement} Botón para reiniciar el nivel
 * @param nextButton {HTMLElement} Botón para avanzar al siguiente nivel
 * @param currentLevel {HTMLElement} Span donde se muestra el nivel actual
 */
export function definingInterval(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel) {
    // Cada segundo, llamará a esta función
    timerInterval = setInterval(startTimer, 1000, timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel);
}

/**
 * Inicia el temporizador
 *
 * @param timeLeft {HTMLElement} El párrafo donde se muestra el tiempo restante
 * @param timerMessage {HTMLElement} El párrafo donde se le indica al jugador que puede activar el temporizador
 * @param levelsSection {HTMLElement} La pantalla del nivel
 * @param betweenLevelsSection {HTMLElement} La pantalla entre niveles
 * @param restartButton {HTMLElement} Botón para reiniciar el nivel
 * @param nextButton {HTMLElement} Botón para avanzar al siguiente nivel
 * @param currentLevel {HTMLElement} Span donde se muestra el nivel actual
 */
function startTimer(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel) {
    // Vamos restando 1 cada segundo
    minutes = minutes - 1;
    seconds = seconds - 1;
    // Si NO se muestra el párrafo del tiempo restante
    if (timeLeft.classList.contains("hidden")) {
        // Para el intervalo y resetea el texto del párrafo
        stopTimer();
        timeLeft.textContent = "01:00";
    } else if (minutes === 1) {
        // Para que NO se muestre 01:60
        timeLeft.textContent = "01:00";
    } else if (minutes <= 0) {
        // Para que no veamos números negativos
        minutes = 0;
        // Para que aparezca un 0 delante de los minutos
        timeLeft.textContent = `0${minutes}:${seconds}`;
        if (seconds <= 9) {
            // Por debajo de los 10 segundos, necesitamos también un 0 delante de los segundos en cuestión
            timeLeft.textContent = `0${minutes}:0${seconds}`;
            // Si los segundos llegan a 0
            if (seconds === 0) {
                // Paramos el intervalo
                stopTimer(timeLeft);
                outOfTimeMessage(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel);
            }
        }
    }
}

/**
 * Para el intervalo que habíamos establecido para el temporizador
 */
export function stopTimer() {
    clearInterval(timerInterval);
    // Restablecemos las variables
    minutes = 1;
    seconds = 60;
}

/**
 * Lleva a la pantalla que muestra el mensaje de tiempo agotado
 *
 * @param timeLeft {HTMLElement} El párrafo donde se muestra el tiempo restante
 * @param timerMessage {HTMLElement} El párrafo donde se le indica al jugador que puede activar el temporizador
 * @param levelsSection {HTMLElement} La pantalla del nivel
 * @param betweenLevelsSection {HTMLElement} La pantalla entre niveles
 * @param restartButton {HTMLElement} Botón para reiniciar el nivel
 * @param nextButton {HTMLElement} Botón para avanzar al siguiente nivel
 * @param currentLevel {HTMLElement} Span donde se muestra el nivel actual
 */
function outOfTimeMessage(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel) {
    setTimeout(function() {
        // Restablecemos el texto del párrafo
        timeLeft.textContent = "01:00";
        // Lo ocultamos
        timeLeft.classList.add("hidden");
        // Mostramos de nuevo el otro párrafo en su lugar
        timerMessage.classList.remove("hidden");
        // Ocultamos la pantalla del nivel y mostramos la intermedia
        levelsSection.classList.add("all-levels--hide");
        betweenLevelsSection.classList.remove("between-levels--hide");
        // Cambiamos la imagen de fondo
        if (currentLevel[1].textContent == "2") {
            betweenLevelsSection.classList.add("between-levels--first-change");
        } else if (currentLevel[1].textContent == "3") {
            betweenLevelsSection.classList.add("between-levels--second-change");
        } else {
            // Por si el jugador inicia de nuevo el juego tras acabar el tercer nivel
            betweenLevelsSection.classList.remove("between-levels--first-change");
            betweenLevelsSection.classList.remove("between-levels--second-change");
        }
        // Capturamos y cambiamos el h1 y el p donde se informa al jugador de que se ha agotado el tiempo
        const inBetweenLevelsText = document.querySelector("#in-between-text");
        const inBetweenLevelsSecondText = document.querySelector("#in-between-second-text");
        inBetweenLevelsText.textContent = "You ran out of time.";
        inBetweenLevelsSecondText.textContent = "But you'll do better next time.";
        // Modificamos también el contenido textual de los botones
        restartButton.textContent = "Try again";
        nextButton.textContent = "Just move on";
    }, 1000)
}