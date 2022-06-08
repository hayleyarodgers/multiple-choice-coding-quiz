var headerEl = document.getElementById("header");
var introductionEl = document.getElementById("introduction");
var quizEl = document.getElementById("quiz");
var questionPromptEl = document.getElementById("question-prompt");
var answer1El = document.getElementById("answer1");
var answer2El = document.getElementById("answer2");
var answer3El = document.getElementById("answer3");
var answer4El = document.getElementById("answer4");
var questionFeedbackEl = document.getElementById("question-feedback");
var submitScoreEl = document.getElementById("submit-score");
var highScoresEl = document.getElementById("high-scores");
var highScoresListEl = document.getElementById("high-scores-list");
var footerEl = document.getElementById("footer");

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

var questionIndex = 0;

var userAnswer;
var correctAnswer;

var userScore;
var userInitials;
var userScoreInitials;
var userScoreEl = document.getElementById("your-score");
var userInitialsEl = document.getElementById("your-initials");
var highScores = [];
var sortedHighScores = [];

var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-score-button");
var submitBackButton = document.getElementById("submit-back-button");
var highScoresBackButton = document.getElementById("high-scores-back-button");
var clearButton = document.getElementById("clear-button");
var highScoresButton = document.getElementById("view-high-scores");

var timeEl = document.getElementById("time");
var time;
var secondsLeft;


// When the start button is clicked, start the quiz
startButton.addEventListener('click', startQuiz)

// When the quiz is started, start the timer and ask questions
function startQuiz() {
    headerEl.setAttribute("style", "display:block");
    quizEl.setAttribute("style", "display:block");
    introductionEl.setAttribute("style", "display:none");
    footerEl.setAttribute("style", "display:none");
    startTimer();
    askQuestion();
    waitForAnswer();
}

// Start the timer and end the quiz if timer runs out 
function startTimer() {
    secondsLeft = 75;
    time = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft

        if (secondsLeft === 0) {
            console.log("hm");
            clearInterval(time);
            showScore();
        }
    
    }, 1000);
  }

// Ask questions
function askQuestion() {
    questionPromptEl.textContent = questions[questionIndex].prompt;
    answer1El.textContent = questions[questionIndex].answers.a;
    answer2El.textContent = questions[questionIndex].answers.b;
    answer3El.textContent = questions[questionIndex].answers.c;
    answer4El.textContent = questions[questionIndex].answers.d;
    correctAnswer = questions[questionIndex].correctAnswer;
}

function waitForAnswer() {
    var answers = [answer1El, answer2El, answer3El, answer4El];
    answers.forEach(answer => answer.addEventListener('click',checkAnswer));
}

function checkAnswer(event) {
    questionFeedbackEl.value = "";

    userAnswer = event.target.innerHTML;

    if (userAnswer == correctAnswer) {
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
        clearInterval(time);
        showScore();
    }
}

// Show the user's score
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
    sortScore();
    saveSortedScores();
    showSortedHighScores();
})

// Create score name
function nameScore() {
    userInitials = userInitialsEl.value;

    if (userInitials === "") {
        return;
    };

    userScoreInitials = userScore + " - " + userInitials;
}

// Add score to list of sorted high scores and clear initials field
function sortScore() {
    localStorage.setItem("sortedHighScores", JSON.stringify(sortedHighScores));

    highScores.push(userScoreInitials);

    sortedHighScores = highScores.sort().reverse();

    userInitialsEl.value = "";
}

// Save score to the list
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
        highScoresListEl.innerHTML = "No high scores to show.";
      }

    for (var i = 0; i < sortedHighScores.length; i++) {
        var highScore = sortedHighScores[i];
        var li = document.createElement("li");
        li.textContent = highScore;
        highScoresListEl.appendChild(li);
    }
}

// Show list of scores when clicked; Retrieve list from local storage... (see 26)
highScoresButton.addEventListener('click', showSortedHighScores);

//FLAG
// Clear high scores --> NEED TO UPDATE MEMORY INSTEAD
clearButton.addEventListener('click', function() {
    highScoresListEl.innerHTML = "No high scores to show.";
    highScores = "";
    sortedHighScores = "";
    localStorage.clear();
})

// Go back to introduction screen when clicked
submitBackButton.addEventListener('click', restartQuiz)

highScoresBackButton.addEventListener('click', restartQuiz)

function restartQuiz() {
    introductionEl.setAttribute("style", "display:block");
    footerEl.setAttribute("style", "display:block");
    submitScoreEl.setAttribute("style", "display:none");
    highScoresEl.setAttribute("style", "display:none");
    questionIndex = 0;
}