/* JS DIRECTORY
    1. =VARIABLES
    2. =START-QUIZ
    3. =DURING-QUIZ
    4. =AFTER-QUIZ
    5. =RESTART-QUIZ
*/


/* ===VARIABLES=== */

// Section element variables
var headerEl = document.getElementById("header");
var timeEl = document.getElementById("time");
var introductionEl = document.getElementById("introduction");
var quizEl = document.getElementById("quiz");
var questionPromptEl = document.getElementById("question-prompt");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var questionFeedbackEl = document.getElementById("question-feedback");
var userScoreEl = document.getElementById("your-score");
var userInitialsEl = document.getElementById("your-initials");
var submitScoreEl = document.getElementById("submit-score");
var highScoresEl = document.getElementById("high-scores");
var highScoresListEl = document.getElementById("high-scores-list");
var footerEl = document.getElementById("footer");

// Button element variables
var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-score-button");
var submitBackButton = document.getElementById("submit-back-button");
var highScoresButton = document.getElementById("view-high-scores");
var highScoresBackButton = document.getElementById("high-scores-back-button");
var clearButton = document.getElementById("clear-button");

// Question-related variables
var questionIndex = 0;
var questions = [
    {
        prompt: "What is NOT a commonly used data type?",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers"
        },
        correctAnswer: "Alerts"
    },

    {
        prompt: "What is the condition in an if/else statement enclosed with?",
        answers: {
            a: "Quotes",
            b: "Curly brackets",
            c: "Parentheses",
            d: "Square brackets"
        },
        correctAnswer: "Parentheses"
    },

    {
        prompt: "What do arrays store in Javascript?",
        answers: {
            a: "Numbers and strings",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "All of the above"
    },

    {
        prompt: "What is a string enclosed with when being assigned to a variable?",
        answers: {
            a: "Commas",
            b: "Curly brackets",
            c: "Quotes",
            d: "Parentheses"
        },
        correctAnswer: "Quotes"
    },
    
    {
        prompt: "Which of the following is a useful debugging tool used during development?",
        answers: {
            a: "Javascript",
            b: "Terminal/Bash",
            c: "For loops",
            d: "Console.log"
        },
        correctAnswer: "Console.log"
    }
];
var userAnswer;
var correctAnswer;

// Timer-related variables
var time;
var secondsLeft;

// Score-related variables
var userScore;
var userInitials;
var userScoreInitials;
var highScores = [];
var sortedHighScores = [];


/* ===START-QUIZ=== */

// When start button is clicked, start quiz
startButton.addEventListener('click', startQuiz)

// When quiz is started, start timer and begin asking questions
function startQuiz() {
    headerEl.setAttribute("style", "display:block");
    quizEl.setAttribute("style", "display:block");
    introductionEl.setAttribute("style", "display:none");
    footerEl.setAttribute("style", "display:none");
    startTimer();
    askQuestion();
    waitForAnswer();
}


/* ===DURING-QUIZ=== */

// Start timer and end quiz if timer runs out 
function startTimer() {
    secondsLeft = 75;
    time = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(time);
            showScore();
        }
    }, 1000);
  }

// Ask a question
function askQuestion() {
    questionPromptEl.textContent = questions[questionIndex].prompt;
    answer1El.textContent = questions[questionIndex].answers.a;
    answer2El.textContent = questions[questionIndex].answers.b;
    answer3El.textContent = questions[questionIndex].answers.c;
    answer4El.textContent = questions[questionIndex].answers.d;
    correctAnswer = questions[questionIndex].correctAnswer;
}

// When user selects an answer, check if their answer is correct
function waitForAnswer() {
    var answers = [answer1El, answer2El, answer3El, answer4El];
    answers.forEach(answer => answer.addEventListener('click',checkAnswer));
}

// Check if user's answer is correct
function checkAnswer(event) {
    questionFeedbackEl.textContent = "";

    userAnswer = event.target.innerHTML;

    if (userAnswer === correctAnswer) {
        questionFeedbackEl.textContent = "Correct!";
    } else {
        questionFeedbackEl.textContent = "Nope!";
        secondsLeft = secondsLeft - 10;
    }

    questionIndex++;
    endQuiz();
}

// Look at how many questions are left to decide whether to continue quiz
function endQuiz() {
    if (questionIndex < questions.length) {
        askQuestion();
    } else {
        questionFeedbackEl.textContent = "";
        clearInterval(time);
        showScore();
    }
}


/* ===AFTER-QUIZ=== */

// Show user their score
function showScore() {
    submitScoreEl.setAttribute("style", "display:block");
    quizEl.setAttribute("style", "display:none");
    headerEl.setAttribute("style", "display:none");

    userScore = secondsLeft;
    userScoreEl.textContent = userScore;
}

// Allow user to save their score
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    nameScore();
    showSortedHighScores();
})

// Create user's score name using their initials and score
function nameScore() {
    userInitials = userInitialsEl.value;

    if (userInitials === "") {
        return;
    } else {
        userScoreInitials = userScore + " - " + userInitials;
        sortScore();
        saveSortedScores();
    };

}

// Add user's score to sorted list of high scores
function sortScore() {
    var storedScores = JSON.parse(localStorage.getItem("sortedHighScores"));

    if (storedScores === null) {
        sortedHighScores = [userScoreInitials];
    } else {
        highScores = storedScores;
        highScores.push(userScoreInitials);
        sortedHighScores = highScores.sort().reverse();
    }

    userInitialsEl.value = "";
}

// Save user's score in list of high scores in local storage
function saveSortedScores() {
    localStorage.setItem("sortedHighScores", JSON.stringify(sortedHighScores));
}

// Show list of high scores
function showSortedHighScores() {
    highScoresEl.setAttribute("style", "display:block");
    introductionEl.setAttribute("style", "display:none");
    headerEl.setAttribute("style", "display:none");
    footerEl.setAttribute("style", "display:none");
    submitScoreEl.setAttribute("style", "display:none");

    var storedScores = JSON.parse(localStorage.getItem("sortedHighScores"));

    highScoresListEl.innerHTML = "";

    if (storedScores !== null) {
        sortedHighScores = storedScores;
      }
      else {
        highScoresListEl.innerHTML = "No scores to show.";
      }

    for (var i = 0; i < sortedHighScores.length; i++) {
        var score = sortedHighScores[i];
        var li = document.createElement("li");
        li.textContent = score;
        highScoresListEl.appendChild(li);
    }
}

// Show list of scores when clicked
highScoresButton.addEventListener('click', showSortedHighScores);

// Clear list of scores when clicked
clearButton.addEventListener('click', function() {
    highScoresListEl.innerHTML = "No scores to show.";
    highScores = "";
    sortedHighScores = "";
    localStorage.clear();
})


/* ===RESTART-QUIZ=== */

submitBackButton.addEventListener('click', restartQuiz)

highScoresBackButton.addEventListener('click', restartQuiz)

function restartQuiz() {
    introductionEl.setAttribute("style", "display:block");
    footerEl.setAttribute("style", "display:block");
    submitScoreEl.setAttribute("style", "display:none");
    highScoresEl.setAttribute("style", "display:none");
    questionIndex = 0;
}