// WELCOME

/*
 
Button (see 13)
Can have welcome written in HTML and then get fields to clear when function for quiz starts?

*/

// QUESTIONS 

/* 

Timer interval running at the top right (see 9)
Question = heading, answers = list items = buttons (see 8)
Use data attributes to show which answer is correct (see 20)
Line break and response (see 13) 
Wrong answer = decrease time by 10 seconds

*/

// SUBMIT SCORE 

/* 

HTML form with inputs (see 13)
Add to local storage object? (see 23)
Actually add to local storage list (see 26)

*/

// VIEW SCORES 

/* 

Retrieve list from local storage... (see 26)

*/




var introductionEl = document.getElementById("introduction");
var quizEl = document.getElementById("quiz");
var submitScoreEl = document.getElementById("submit-score");
var highScoresEl = document.getElementById("high-scores");
var highScoresListEl = document.getElementById("high-scores-list");

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
        correctAnswer: "Square brackets"
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

var userScore;
var userInitials;
var userScoreInitials;
var userScoreEl = document.getElementById("your-score");
var userInitialsEl = document.getElementById("your-initials");
var highScores = [];
var sortedHighScores = [];

var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-score-button");
var backButton = document.getElementById("back-button");
var clearButton = document.getElementById("clear-button");
var highScoresButton = document.getElementById("view-high-scores");

var timeEl = document.getElementById("time");
var time;
var secondsLeft;

// When the start button is clicked, start the quiz
startButton.addEventListener('click', startQuiz)

// When the quiz is started, start the timer, create the question framework and give questions
function startQuiz() {
    introductionEl.setAttribute("style", "display:none")
    startTimer();
    showQuestion();
}

// Start the timer and end the quiz if timer runs out 
function startTimer() {
    secondsLeft = 75;
    time = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft
      }, 1000);
    
    if (secondsLeft === 0) {
        showScore();
    }
  }

// Create the question framework
var questionPromptEl;
var listEl;
var answer1El;
var answer2El;
var answer3El;
var answer4El;
var messageEl;

function createQuestionFramework() {
    questionPromptEl = document.createElement("p");
    listEl = document.createElement("ol");
    answer1El = document.createElement("li");
    answer2El = document.createElement("li");
    answer3El = document.createElement("li");
    answer4El = document.createElement("li");
    messageEl = document.createElement("p");
    
    quizEl.appendChild(questionPromptEl);
    quizEl.appendChild(listEl);
    quizEl.appendChild(messageEl);
    listEl.appendChild(answer1El);
    listEl.appendChild(answer2El);
    listEl.appendChild(answer3El);
    listEl.appendChild(answer4El);
    
    answer1El.setAttribute("class", "glow");
    answer2El.setAttribute("class", "glow");
    answer3El.setAttribute("class", "glow");
    answer4El.setAttribute("class", "glow");
}

// Show question
function showQuestion() {
    for (var i = 0; i < questions.length; i++) {
        quizEl.innerHTML = "";
        createQuestionFramework();
        questionPromptEl.textContent = questions[i].prompt;
        answer1El.textContent = questions[i].answers.a;
        answer2El.textContent = questions[i].answers.b;
        answer3El.textContent = questions[i].answers.c;
        answer4El.textContent = questions[i].answers.d;
        correctAnswer = questions[i].correctAnswer;
    }

    var answers = [answer1El, answer2El, answer3El, answer4El]

    answers.forEach.addEventListener('click',checkAnswer());
}

function checkAnswer(event) {
    userAnswer = event.target;
    console.log(userAnswer);
    if (userAnswer == correctAnswer) {
        correctAnswerMessage();
    } else {
        incorrectAnswerMessage();
        secondsLeft = secondsLeft - 10;
    }
}


// Message to display when answer is correct
function correctAnswerMessage() {
    messageEl.textContent = "";
    messageEl.textContent = "Correct!";
}

// Message to display when answer is incorrect
function incorrectAnswerMessage() {
    messageEl.textContent = "";
    messageEl.textContent = "Nope!";
}

// Show the user's score
function showScore() {
    userScore = secondsLeft;
    userScoreEl.textContent = userScore;
}

// Allow user to save their score
submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    userInitials = userInitialsEl.value;
    userScoreInitials = userScore.concat(" - ",userInitials);

    if (userInitials === "") {
        return;
    }
    
    highScores.push(userScoreInitials);
    sortedHighScores = highScores.sort();
    userInitialsEl.value = "";

    saveScore();
    showSortedHighScores();
})

// Save score
function saveScore () {
    localStorage.setItem("sortedHighScores", JSON.stringify(sortedHighScores));
}

// Show list of high scores
function showSortedHighScores() {
    highScoresListEl.innerHTML = "";

    for (var i = 0; i < sortedHighScores.length; i++) {
        var highScore = sortedHighScores[i];

        var li = document.createElement("li");
        li.textContent = highScore;
        highScoresListEl.appendChild(li);
    }
}

// Show list of scores when clicked
highScoresButton.addEventListener('click', showSortedHighScores);

// Clear high scores
clearButton.addEventListener('click', function(event) {
    highScores = "";
    sortedHighScores = "";
})

// Go back to introduction screen when clicked

