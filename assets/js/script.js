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

var questions = [
    {
        prompt: "What is NOT a commonly used data type?",
        answers: {
            a: "Strings",
            b: "Booleans",
            c: "Alerts",
            d: "Numbers"
        },
        correctAnswer: "c"
    },

    {
        prompt: "What is the condition in an if/else statement enclosed with?",
        answers: {
            a: "Quotes",
            b: "Curly brackets",
            c: "Parentheses",
            d: "Square brackets"
        },
        correctAnswer: "c"
    },

    {
        prompt: "What do arrays store in Javascript?",
        answers: {
            a: "Numbers and strings",
            b: "Other arrays",
            c: "Booleans",
            d: "All of the above"
        },
        correctAnswer: "d"
    },

    {
        prompt: "What is a string enclosed with when being assigned to a variable?",
        answers: {
            a: "Commas",
            b: "Curly brackets",
            c: "Quotes",
            d: "Parentheses"
        },
        correctAnswer: "c"
    },
    
    {
        prompt: "Which of the following is a useful debugging tool used during development?",
        answers: {
            a: "Javascript",
            b: "Terminal/Bash",
            c: "For loops",
            d: "Console.log"
        },
        correctAnswer: "d"
    }
];

var userAnswer;
var score;

var startButton = document.getElementById("start-button");
var submitButton = document.getElementById("submit-score-button");
var backButton = document.getElementById("back-button");
var clearButton = document.getElementById("clear-button");

var timeEl = document.getElementById("time");
var timer;
var secondsLeft;

// When the start button is clicked, start the quiz
startButton.addEventListener('click', startQuiz)

startQuiz()

// When the quiz is started, start the timer, create the question framework and give questions
function startQuiz() {
    introductionEl.setAttribute("style", "display:none")
    startTime();
    createQuestionFramework();
    giveQuestions();
}

// Start the timer
function startTime() {
    secondsLeft = 75;
    timer = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft
      }, 1000);
  }

// Create the question framework
var questionPromptEl;
var listEl;
var li1El ;
var li2El;
var li3El;
var li4El;
var answer1El;
var answer2El;
var answer3El;
var answer4El;

function createQuestionFramework() {
    questionPromptEl = document.createElement("h2");
    listEl = document.createElement("ol");
    li1El = document.createElement("li");
    li2El = document.createElement("li");
    li3El = document.createElement("li");
    li4El = document.createElement("li");
    answer1El = document.createElement("button");
    answer2El = document.createElement("button");
    answer3El = document.createElement("button");
    answer4El = document.createElement("button");
    
    quizEl.appendChild(questionPromptEl);
    quizEl.appendChild(listEl);
    listEl.appendChild(li1El);
    listEl.appendChild(li2El);
    listEl.appendChild(li3El);
    listEl.appendChild(li4El);
    li1El.appendChild(answer1El);
    li2El.appendChild(answer2El);
    li3El.appendChild(answer3El);
    li4El.appendChild(answer4El);
}

// Give questions
function giveQuestions() {
    for (var i = 0; i < questions.length; i++) {
        questionPromptEl.textContent = questions[i].prompt;
        answer1El.textContent = questions[i].answers.a;
        answer2El.textContent = questions[i].answers.b;
        answer3El.textContent = questions[i].answers.c;
        answer4El.textContent = questions[i].answers.d;
        //FLAG
        var correctAnswerKey = questions[i].correctAnswer;
        var correctAnswerWritten = questions[i].answers.indexOf(correctAnswerKey);
        var correctAnswer = questions[i].answers[correctAnswerWritten];
        quizEl.addEventListener('click', function(event, secondsLeft) {
            userAnswer = event.target;
            if (userAnswer == correctAnswer) {
                correctAnswerMessage();
            } else {
                incorrectAnswerMessage();
                secondsLeft = secondsLeft - 10;
            }
        });
    }
}

// Message to display when answer is correct
function correctAnswerMessage() {
    var dividerEl = document.createElement("hr");
    var messageEl = document.createElement("p");
    quizEl.appendChild(dividerEl);
    quizEl.appendChild(messageEl);
    messageEl.textContent = "Correct!";
}

// Message to display when answer is incorrect
function incorrectAnswerMessage() {
    var dividerEl = document.createElement("hr");
    var messageEl = document.createElement("p");
    quizEl.appendChild(dividerEl);
    quizEl.appendChild(messageEl);
    messageEl.textContent = "Nope!";
}