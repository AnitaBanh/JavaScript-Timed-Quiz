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
var mainTimerEl = document.querySelector("main-timer");
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
    timeEl.textContent = secondsLeft + " seconds remaining";
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
} // Display question - loop. Hide start page. add hide class by targeting in js.
// console.log(quizQuestions[0].question);

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
  questionContainer.innerHTML = "QUIZ OVER!!";
  postQuizSection.style.display = "block";
  // viewScoreboardButton.style.display = "block";
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

// redirect to score page - localStorage.getItem for initials

function redirectToHighScore() {
  window.location.href = "highScore.html";
}

function reloadQuiz() {
  window.location.reload()
}
playAgain.addEventListener("click", reloadQuiz);


// function to append 


// function setTime() {
//   var timerInterval = setInterval(function() {
//     secondsLeft--;
//     timeEl.textContent = secondsLeft + " seconds left.";

//     if(secondsLeft === 0) {
//       // Stops execution of action at set interval
//       clearInterval(timerInterval);
//       // Calls function to create and append image
//       alert("the end");
//     }

//   }, 1000);
// }

//   if (timerCount >= 0) {
//     // Tests if answer is incorrect
//     if (isWrong && timerCount > 0) {
//       // reduces time as penalty
//       timer-10000;
//     }
//   }
//   // Tests if time has run out
//   if (timerCount === 0) {
//     // Clears interval
//     clearInterval(timer);
//     endGame();
//   }

// getting questions and options from array
// Example: function displayQuestion(index){
//     var questionText = document.querySelector(".questionTitle");
//     //creating a new span and div tag for question and option and passing the value using array index
//     let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
//     + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
//     que_text.innerHTML = que_tag; //adding new span tag inside que_tag
//     option_list.innerHTML = option_tag; //adding new div tag inside option_tag

//     const option = option_list.querySelectorAll(".option");
//     // set onclick attribute to all available options
//     for(i=0; i < option.length; i++){
//         option[i].setAttribute("onclick", "optionSelected(this)");
//     }
// }

// //if user clicked on option
// function optionSelected(answer){
//     clearInterval(counter); //clear counter
//     clearInterval(counterLine); //clear counterLine
//     let userAns = answer.textContent; //get user selected option
//     let correcAns = questions[que_count].answer; //getting correct answer from array
//     const allOptions = option_list.children.length; //getting all option items

//     if(userAns == correcAns){ //if user selected option is equal to array's correct answer
//         userScore += 1; //upgrading score value with 1
//         answer.classList.add("correct"); //adding green color to correct selected option
//         answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
//         console.log("Correct Answer");
//         console.log("Your correct answers = " + userScore);
//     }else{
//         answer.classList.add("incorrect"); //adding red color to correct selected option
//         answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
//         console.log("Wrong Answer");
//         for(i=0; i < allOptions; i++){
//             if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer
//                 option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
//                 option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
//                 console.log("Auto selected correct answer.");
//             }
//         }
//     }
//     for(i=0; i < allOptions; i++){
//         option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
//     }

// add timer forloop for questions, array of objects for questions, functionality for right/wrong and cycle through questions.
