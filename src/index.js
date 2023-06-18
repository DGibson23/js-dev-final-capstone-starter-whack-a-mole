const holes = document.querySelectorAll('.hole');
const dragons = document.querySelectorAll('.dragon');
const startButton = document.querySelector('#start');
const score = document.querySelector("#score"); // Use querySelector() to get the score element
const timerDisplay = document.querySelector("#timer"); // use querySelector() to get the timer element.
const easyButton = document.querySelector('#easySelector'); // use quarySelector() to get the easy buttom element.
const normalButton = document.querySelector('#normalSelector'); // use quarySelector() to get the normal buttom element
const hardButton = document.querySelector('#hardSelector'); // use quarySelector() to get the hard buttom element

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "easy";

// Generates a random integer within a range.
 function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Sets the time delay given a difficulty parameter.
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

//Chooses a random hole from a list of holes.
function chooseHole(holes) {
  let hole = null;
  let index = null;

  while (hole === null || hole === lastHole) {
    index = randomInteger(0, 8);
    hole = holes[index];
  }

  lastHole = hole;
  return hole;
}
 
//Calls the showUp function if time > 0 and stops the game if time = 0.
function gameOver() {
  let gameStopped;
  if (time > 0) {
    let timeoutID = showUp();
    return timeoutID;
  } else {
    gameStopped = stopGame();
  }
  return gameStopped;
}


// Calls the showAndHide() function with a specific delay and a hole.
function showUp() {
  let delay = setDelay(difficulty); // TODO: Update so that it uses setDelay()
  const hole = chooseHole(holes);  // TODO: Update so that it use chooseHole()
  return showAndHide(hole, delay);
}

function showAndHide(hole, delay){
  // TODO: call the toggleVisibility function so that it adds the 'show' class.
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    // TODO: call the toggleVisibility function so that it removes the 'show' class when the timer times out.
    toggleVisibility(hole);
    gameOver();
  }, delay); // TODO: change the setTimeout delay to the one provided as a parameter
   return timeoutID;
}

// Adds or removes the 'show' class that is defined in styles.css to a given hole. It returns the hole.
function toggleVisibility(hole){
  hole.classList.toggle("show")
  return hole;
}

//Score Functions
function updateScore() {
  points += 1;
   score.textContent = points;
  return points;
}

function clearScore() {
   points = 0;
   score.textContent = points;
  return points;
}

//Timer functions
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
 }


function startTimer() {
  // TODO: Write your code here
  timer = setInterval(updateTimer, 1000);
  return timer;
}


function whack(event) {
  // TODO: Write your code here.
  console.log("Whack!");
  // call updateScore()
  updateScore();  
  return points;
}

function setEventListeners(){
  dragons.forEach(dragon => dragon.addEventListener("click", whack));
  return dragons;
}

function setDuration(duration) {
  time = duration;
  return time;
}

function stopGame(){
  stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

function startGame(){
  clearScore();
  setDuration(10);
  startTimer();
  showUp();
  setEventListeners();
  play();
  return "game started";
}

startButton.addEventListener("click", startGame);

//Difficulty selector

function setDifficulty(selectedDifficulty) {
  difficulty = selectedDifficulty;
}

function difficultyEventListener() {
  easyButton.addEventListener("click", function() {
    setDifficulty("easy");
  });

  normalButton.addEventListener("click", function() {
    setDifficulty("normal");
  });

  hardButton.addEventListener("click", function() {
    setDifficulty("hard");
  });
}

difficultyEventListener();

// audio function 

const audioHit = new Audio("https://github.com/gabrielsanchez/erddiagram/blob/main/hit.mp3?raw=true");
const song = new Audio("https://github.com/DGibson23/js-dev-final-capstone-starter-whack-a-mole/blob/main/assets/molesong.mp3?raw=true");

function playAudio(audioObject) {
  audioObject.play();
}

function loopAudio(audioObject) {
  audioObject.loop = true;
  playAudio(audioObject);
}

function stopAudio(audioObject) {
  audioObject.pause();
}

function play(){
  playAudio(song);
}



// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
