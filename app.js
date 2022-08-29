const scoreDigitEl = document.querySelector("#score-digit");
const num1El = document.querySelector(".num1");
const num2El = document.querySelector(".num2");
const operatorEl = document.querySelector(".operator");
const answerEl = document.querySelector("#answer");
const submitEl = document.querySelector(".btn");
const difficultyEl = document.querySelector(".difficulty");
const easyEl = document.querySelector(".easy");
const mediumEl = document.querySelector(".medium");
const hardEl = document.querySelector(".hard");
const popupEl = document.querySelector(".popup");
const timerEl = document.querySelector(".timer");
const resetEl = document.querySelector(".reset");
const startEl = document.querySelector(".start");
const stopEl = document.querySelector(".stop");

const operatorArr = ["+ ", "X ", "- ", "+ ", "X ", "- ", "+ ", "X ", "- "];

var difficulty = 1;
let num1,
  num2,
  correctAns,
  userAns,
  scoreDigit = 0,
  operator;

var sec = 10;
var timeInterval;

startEl.addEventListener("click", () => {
  timeInterval = setInterval(myTimer, 1000);
  submitEl.classList.remove("unactive");
  resetEl.classList.remove("unactive");
  answerEl.classList.remove("unactive");
  answerEl.focus();
  startEl.classList.add("unactive");
  newQuestion();
});

stopEl.addEventListener("click", () => {
  clearInterval(timeInterval);
  sec = 0;
  timerEl.innerText = "";

  setSecond();
  submitEl.classList.add("unactive");
  resetEl.classList.remove("unactive");
  answerEl.classList.add("unactive");
  startEl.classList.remove("unactive");
});

function setSecond() {
  if (difficulty == 1) {
    sec = 10;
  } else if (difficulty == 2) {
    sec = 20;
  } else {
    sec = 25;
  }
}

resetEl.addEventListener("click", () => {
  scoreDigit = 0;
  scoreDigitEl.innerText = scoreDigit;
  localStorage.setItem("scoreDigit", scoreDigit);
});

function setNumber() {
  if (difficulty == 1) {
    num1 = Math.ceil(Math.random() * 10 + 1);
    num2 = Math.ceil(Math.random() * 10 + 1);
    timer = 10;
  } else if (difficulty == 2) {
    num1 = Math.ceil(Math.random() * 30 + 1);
    num2 = Math.ceil(Math.random() * 30 + 1);
    timer = 20;
  } else {
    num1 = Math.ceil(Math.random() * 40 + 10);
    num2 = Math.ceil(Math.random() * 40 + 10);
    timer = 30;
  }
}

function myTimer() {
  timerEl.innerText = sec;
  sec--;
  if (sec == -1) {
    clearInterval(timeInterval);
    newQuestion();
    scoreDigit--;
    scoreDigitEl.innerText = scoreDigit;
    localStorage.setItem("scoreDigit", scoreDigit);
    setSecond();
    console.log("second", sec);
    timeInterval = setInterval(myTimer, 1000);
  }
}

try {
  scoreDigit = localStorage.getItem("scoreDigit");
  scoreDigitEl.innerText = scoreDigit;
} catch (error) {}

// newQuestion();

difficultyEl.addEventListener("click", (e) => {
  const selectedElement = e.target;
  if (selectedElement.classList[0] == "easy") {
    difficulty = 1;
    easyEl.classList.add("active");
    mediumEl.classList.remove("active");
    hardEl.classList.remove("active");
    clearInterval(timeInterval);

    sec = 0;
    timerEl.innerText = "";
    setSecond();

    if (startEl.classList[2] == "unactive") {
      timeInterval = setInterval(myTimer, 1000);
    }
  } else if (selectedElement.classList[0] == "medium") {
    difficulty = 2;
    easyEl.classList.remove("active");
    mediumEl.classList.add("active");
    hardEl.classList.remove("active");
    clearInterval(timeInterval);
    sec = 0;
    timerEl.innerText = "";

    setSecond();

    if (startEl.classList[2] == "unactive") {
      timeInterval = setInterval(myTimer, 1000);
    }
  } else {
    difficulty = 3;
    easyEl.classList.remove("active");
    mediumEl.classList.remove("active");
    hardEl.classList.add("active");
    clearInterval(timeInterval);
    sec = 0;
    timerEl.innerText = "";

    setSecond();

    console.log(startEl.classList);

    if (startEl.classList[2] == "unactive") {
      timeInterval = setInterval(myTimer, 1000);
    }
  }

  newQuestion();
});

function submitEvent() {
  clearInterval(timeInterval);
  sec = 0;
  timerEl.innerText = "";

  setSecond();

  timeInterval = setInterval(myTimer, 1000);

  if (operator == "+ ") {
    correctAns = num1 + num2;
  } else if (operator == "X ") {
    correctAns = num1 * num2;
  } else if (operator == "- ") {
    correctAns = num1 - num2;
  }

  userAns = answerEl.value;
  if (userAns == correctAns) {
    popupEl.innerText = "Correct!!! 😄";
    popupEl.classList.add("correct");
    popupEl.classList.remove("incorrect");
    scoreDigitEl.innerText = ++scoreDigit;
  } else {
    popupEl.innerText = "Incorrect 😶";
    popupEl.classList.add("incorrect");
    popupEl.classList.remove("correct");
    scoreDigitEl.innerText = --scoreDigit;
  }

  localStorage.setItem("scoreDigit", scoreDigit);
  newQuestion();
  answerEl.value = "";
  answerEl.focus();
  setTimeout(() => {
    popupEl.style.opacity = 0;
  }, 1000);
  popupEl.style.opacity = 1;
}

submitEl.addEventListener("click", (event) => {
  submitEvent();
});

answerEl.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    submitEvent();
  }
});

function newQuestion() {
  let timer;
  setNumber();

  operator = operatorArr[Math.floor(Math.random() * 8)];

  num1El.innerText = num1;
  num2El.innerText = num2;
  operatorEl.innerText = operator;
}
