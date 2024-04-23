let timer;
let isTimerStarted = false;
let attempts = 0;
let answer = Math.floor(Math.random() * 101);

function startTimer() {
  let startTime = Date.now();
  timer = setInterval(() => {
    let elapsedTime = (Date.now() - startTime) / 1000;
    document.getElementById("timer").innerText =
      "已經過了 " + elapsedTime.toFixed(2) + " 秒";
  }, 50); // 更新频率为每50毫秒一次，以确保小数点后两位
}

function stopTimer() {
  clearInterval(timer);
}

function checkGuess() {
  console.log("答案是：" + answer);

  if (!isTimerStarted) {
    startTimer();
    isTimerStarted = true;
  }
  let guess = parseInt(document.getElementById("guess").value);
  if (isNaN(guess) || guess < 0 || guess > 100) {
    document.getElementById("hint").innerText =
      "請輸入介於 0 和 100 之間的數字";
    return;
  }

  attempts++;

  if (guess === answer) {
    let elapsedTime = document.getElementById("timer").innerText;
    stopTimer();
    alert("恭喜！你猜對了！總共猜了 " + attempts + " 次。耗時：" + elapsedTime);
    addRecord(attempts, elapsedTime);
    // 更新答案為新的隨機數字
    answer = Math.floor(Math.random() * 101);
    attempts = 0;
    isTimerStarted = false; // 重置计时器状态
    document.getElementById("timer").innerText = ""; // 清空计时器
  } else if (guess < answer) {
    document.getElementById("hint").innerText = "太小了，再大一點";
  } else {
    document.getElementById("hint").innerText = "太大了，再小一點";
  }
}

function addRecord(attempts, elapsedTime) {
  let record = document.createElement("li");
  let currentTime = new Date().toLocaleTimeString();
  record.innerText =
    "次數: " + attempts + ", 耗時: " + elapsedTime + ", 時間: " + currentTime;
  document.getElementById("records").appendChild(record);
}
