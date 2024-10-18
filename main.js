let startButton = document.getElementById("start");
let stopButton = document.getElementById("stop");
let resetButton = document.getElementById("reset");
let saveButton = document.getElementById("save");

let minutesDisplay = document.getElementById("minutes");
let secondsDisplay = document.getElementById("seconds");
let millisecondsDisplay = document.getElementById("milliseconds");

let lapsList = document.getElementById("laps");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;

let interval;
let isRunning = false;

// Start the stopwatch
startButton.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(startTimer, 10);  // Update every 10 milliseconds
    }
});

// Stop the stopwatch
stopButton.addEventListener("click", () => {
    isRunning = false;
    clearInterval(interval);
});

// Reset the stopwatch
resetButton.addEventListener("click", () => {
    isRunning = false;
    clearInterval(interval);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
    clearLaps();
});

// Save the lap time
saveButton.addEventListener("click", () => {
    if (isRunning) {
        saveLap();
    }
});

// Update the time every 10 milliseconds
function startTimer() {
    milliseconds += 1;

    if (milliseconds === 100) {
        milliseconds = 0;
        seconds += 1;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes += 1;
    }

    updateDisplay();
}

// Update the display with leading zeroes
function updateDisplay() {
    minutesDisplay.textContent = padZero(minutes);
    secondsDisplay.textContent = padZero(seconds);
    millisecondsDisplay.textContent = padZero(milliseconds);
}

// Add leading zero to numbers < 10
function padZero(value) {
    return value < 10 ? "0" + value : value;
}

// Save and display lap time
function saveLap() {
    let lapTime = `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
    let lapItem = document.createElement("li");
    lapItem.textContent = `Lap: ${lapTime}`;
    lapsList.appendChild(lapItem);
}

// Clear the lap times
function clearLaps() {
    lapsList.innerHTML = "";
}
