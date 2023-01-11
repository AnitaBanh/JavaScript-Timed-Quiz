var startScreen = document.getElementById("start");
var startButton = document.getElementById("startButton");
var questionContainer = document.getElementById("questionContainer");
var playAgain = document.getElementById("playAgain");
var questionTitle = document.getElementById("questionTitle");
var answerChoices = document.getElementById("answerChoices");
var postQuizSection = document.getElementById("postQuizDiv")
var viewScoreboardButton = document.getElementById("view-scoreboard");
var saveInitialsButton = document.getElementById("saveInitials");
var correctAnswer = document.getElementById("correctAnswer");
var wrongAnswer = document.getElementById("wrongAnswer");


var scoreboard = 0;
var timeEl = document.getElementById("time");

var secondsLeft = 80; //Set starting length of time

startScreen.style.display = "block";
timeEl.style.display = "none";
questionContainer.style.display = "none";
postQuizSection.style.display = "none";

function init() {
  getScoreboard();
}

// TIMER 
// Set time interval
function startTimer() {
  timeEl.textContent = secondsLeft + " seconds remaining";
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = "Time: " + secondsLeft;
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz()
    }
    }, 1000);
   
}


function startQuiz() {
  startTimer();
  showQuestion();
  console.log(showQuestion);
  console.log(startTimer)
}

startButton.addEventListener("click", startQuiz);
saveInitialsButton.addEventListener('click',saveInitials);
viewScoreboardButton.addEventListener("click", redirectToHighScore);

var quizQuestions = [
  {
    numb: 1,
    question: "Which of these dog breeds is a hound?",
    answer: "Beagle",
    options: ["Poodle", "Beagle", "Australian Shepherd", "Great Dane"],
  },
  {
    numb: 2,
    question: "What colors can dogs see?",
    answer: "Blue and yellow",
    options: [
      "Red and yellow",
      "Red and blue",
      "Blue and white",
      "Blue and yellow",
    ],
  },
  {
    numb: 3,
    question: "The Norwegien Lundehund is bred for hunting what animal?",
    answer: "Puffin",
    options: ["Puffin", "Weasel", "Rabbit", "Duck"],
  },
  {
    numb: 4,
    question:
      "What dog breed can maintain a 35 mph speed for about seven miles?",
    answer: "Greyhound",
    options: ["Dalmation", "Whippet", "Doberman", "Greyhound"],
  },
  {
    numb: 5,
    question:
      "According to the Guinness World Records, the smallest dog ever recorded was what breed?",
    answer: "Chihuahua",
    options: ["Chihuahua", "Bichon", "Pomeranian", "Maltese"],
  },
];

function showQuestion() {
  startScreen.style.display = "none";
  questionContainer.style.display = "block";
  timeEl.style.display = "block";
  showQuiz(currentI);
} 

var currentI = 0;

//  append question
function showQuiz(currentI) {
  if(currentI >= quizQuestions.length) {
    endQuiz ();
    currentI = 0;
  }
  answerChoices.innerHTML = "";
  let currentQ = quizQuestions[currentI].question;
  questionTitle.innerHTML = currentQ;
  var currentO = quizQuestions[currentI].options;
  currentO.forEach(function (i) {
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.innerHTML = i;
    li.appendChild(button);
    answerChoices.appendChild(li);
    button.addEventListener("click", function(event) {
      event.preventDefault();
      var chosen = button.innerHTML;
      if (chosen == quizQuestions[currentI].answer) {
        scoreboard = scoreboard + 20;
        correctAnswer.style.display = "block"
        setTimeout( function(){
          correctAnswer.style.display = "none"
          }, 1000);
      } 
      else {
        secondsLeft = secondsLeft - 15;
        wrongAnswer.style.display = "block"
        setTimeout( function(){
          wrongAnswer.style.display = "none"
          }, 1000);
        if (secondsLeft <= 0) {
          endQuiz()
        }
      }
      currentI++
      showQuiz(currentI)
      console.log(scoreboard)
    });
  });
}

function endQuiz() {
  questionContainer.innerHTML = "QUIZ OVER!! Your score is " + scoreboard + ".  ";
  postQuizSection.style.display = "block";
  timeEl.style.display = "none"
}

var userInitials = document.getElementById ('initials');
function saveInitials() {
  // on submit, localStorage.setItem for initials
  var logToScoreboard = {
    userInitials: userInitials.value,
    scoreboard: scoreboard
  };
  var currentScoreboard = JSON.parse(localStorage.getItem("record"));
  if (!Array.isArray(currentScoreboard)) {
    currentScoreboard = [];
  }
  currentScoreboard.push(logToScoreboard)
  console.log(currentScoreboard)
  localStorage.setItem("record", JSON.stringify(currentScoreboard));
}

// redirect to score page 

function redirectToHighScore() {
  window.location.href = "highScore.html";
}

function reloadQuiz() {
  window.location.reload()
}
playAgain.addEventListener("click", reloadQuiz);
