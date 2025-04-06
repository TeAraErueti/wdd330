const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

let timeLeft = 10;
let countdownInterval;

startButton.addEventListener("click", () => {
  clearInterval(countdownInterval); // Clear any existing interval
  timeLeft = 10; // Reset the timer
  countdownInterval = setInterval(() => {
    if (timeLeft >= 0) {
      countdownDisplay.textContent = timeLeft;
      timeLeft -= 1;
    } else {
      clearInterval(countdownInterval); // Stop the countdown
      countdownDisplay.textContent = "Time's up!"; // Display a message
    }
  }, 1000);
});
