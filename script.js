let timer;
let running = false;
let startTime;
let lapTimes = [];
let lapCounter = 1;

function startStop() {
  if (running) {
    clearInterval(timer);
    document.getElementById("startStop").innerHTML = "Start";
    running = false;
  } else {
    startTime = new Date().getTime();
    timer = setInterval(updateDisplay, 10);
    document.getElementById("startStop").innerHTML = "Stop";
    running = true;
  }
}

function reset() {
  clearInterval(timer);
  document.getElementById("display").innerHTML = "00:00:00";
  document.getElementById("startStop").innerHTML = "Start";
  running = false;
  lapTimes = [];
  lapCounter = 1;
  document.getElementById("lapTimes").innerHTML = "";
}

function recordLap() {
  if (running) {
    let lapTime = formatTime(new Date().getTime() - startTime);
    lapTimes.push({ lap: lapCounter++, time: lapTime });
    updateLapTimes();
  }
}

function updateDisplay() {
  let currentTime = new Date().getTime();
  let elapsedTime = formatTime(currentTime - startTime);
  document.getElementById("display").innerHTML = elapsedTime;
}

function formatTime(ms) {
  let minutes = Math.floor(ms / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);
  let milliseconds = Math.floor((ms % 1000) / 10);

  return (
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (milliseconds < 10 ? "0" : "") + milliseconds
  );
}

function updateLapTimes() {
  let lapsHtml = "";
  lapTimes.forEach(lap => {
    lapsHtml += `<div>Lap ${lap.lap}: ${lap.time}</div>`;
  });
  document.getElementById("lapTimes").innerHTML = lapsHtml;
}
