let timerInterval = undefined;
let minutes = 1;
let seconds = 13;

/**
 * Establece el intervalo en el que se ejecutará la función del temporizador
 *
 * @param timeLeft {HTMLElement} El párrafo donde se muestra el tiempo restante
 */
export function definingInterval(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel) {
    timerInterval = setInterval(startTimer, 1000, timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel);
}

/**
 * Inicia el temporizador
 *
 * @param timeLeft {HTMLElement} El párrafo donde se muestra el tiempo restante
 */
function startTimer(timeLeft, timerMessage, levelsSection, betweenLevelsSection, restartButton, nextButton, currentLevel) {
    minutes = minutes - 1;
    seconds = seconds - 1;
    if (timeLeft.classList.contains("hidden")) {
        stopTimer();
        timeLeft.textContent = "01:00";
    } else if (minutes === 1) {
        timeLeft.textContent = "01:00";
    } else if (minutes <= 0) {
        minutes = 0;
        timeLeft.textContent = `0${minutes}:${seconds}`;
        if (seconds <= 9) {
            timeLeft.textContent = `0${minutes}:0${seconds}`;
            if (seconds === 0 || timeLeft.classList.contains("hidden")) {
                stopTimer(timeLeft);
                setTimeout(function() {
                    timeLeft.textContent = "01:00";
                    timeLeft.classList.add("hidden");
                    timerMessage.classList.remove("hidden");
                    levelsSection.classList.add("all-levels--hide");
                    betweenLevelsSection.classList.remove("between-levels--hide");
                    if (currentLevel[1].textContent == "2") {
                        betweenLevelsSection.classList.add("between-levels--first-change");
                    } else if (currentLevel[1].textContent == "3") {
                        betweenLevelsSection.classList.add("between-levels--second-change");
                        // Cambiamos el contenido textual del botón para pasar al siguiente nivel, ya que en esta pantalla nos lleva al nivel 1 otra vez
                        //button.textContent = "Play again";
                        // Mostramos el footer y el botón de compartir
                        //footer.classList.remove("hidden");
                        //shareButton.classList.remove("hidden");
                    } else {
                        // Por si el jugador inicia de nuevo el juego tras acabar el tercer nivel"
                        betweenLevelsSection.classList.remove("between-levels--first-change");
                        betweenLevelsSection.classList.remove("between-levels--second-change");
                    }
                    const inBetweenLevelsText = document.querySelector("#in-between-text");
                    const inBetweenLevelsSecondText = document.querySelector("#in-between-second-text");
                    inBetweenLevelsText.textContent = "You ran out of time.";
                    inBetweenLevelsSecondText.textContent = "But you'll do better next time.";
                    restartButton.textContent = "Try again";
                    nextButton.textContent = "Just move on";
                }, 1000)
            }
        }
    }
}

/**
 * Para el intervalo que habíamos establecido para el temporizador
 */
function stopTimer() {
    clearInterval(timerInterval);
    minutes = 1;
    seconds = 13;
}