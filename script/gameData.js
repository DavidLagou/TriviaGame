// global variables to be used within the app
var questionPoolArray = [];
var currScore;
var currQuestion;
// Start button
var startButton = document.getElementById('button');
startButton.addEventListener('click', run);
// reloading the page to restart the game.
var restartButton = document.getElementById('button2');
restartButton.addEventListener('click', function () {
    location.reload();
    return false;
});
// variable that displays the Questions
var displayq = document.getElementById('displayQ');
// variable that stores the currentscore 
var result = document.getElementById('result');
// true variable button
var trueBtn = document.getElementById('true');
// false varial
var falseBtn = document.getElementById('false');
var nextQuestion = document.getElementById('nextQuestion');
var nextQContainer = document.querySelector('.nextQuestionContainer')
nextQuestion.addEventListener('click', nextQues);

// When the user presses startgame button .. this function runs 
function run() {
    var catIndex = document.getElementById('catIndex').value;
    Number.parseInt(catIndex);
    fetch('https://opentdb.com/api.php?amount=10&category='+catIndex+'&difficulty=medium&type=boolean')
        .then(questions => {
            return questions.json();
        })
        .then(initNewGame);
    // displaying the game screen
    document.querySelector('.question_container').style.display = "block";
    // Removing the start screen 
    document.querySelector('.startContainer').style.display = "none";
}
function initNewGame(questions) {
    // This function will return an assosiative array with all the questions / answers as objects
    currQuestion = 0;
    currScore = 0;
    document.getElementById('currQuestion').innerHTML = currQuestion + 1;

    var questionsPool = questions.results;
    for (let i = 0; i < questionsPool.length; i++) {
        questionPoolArray.push(questionsPool[i]);
    }
    document.getElementById('totalQuestions').innerHTML = questionPoolArray.length;
    displayQuestion(currQuestion);
    return questionPoolArray;
}

// Generating question 
function displayQuestion(currQuestion) {
    result.innerHTML = "";
    nextQContainer.style.display = 'none';
    displayq.innerHTML = questionPoolArray[currQuestion].question;
}

// checking to see if the users answer matchets the question in the associative array
function checkAnswer(answer) {
    if (answer === questionPoolArray[currQuestion].correct_answer) {
        // correct answer 
        result.innerHTML = " CORRECT ! ";
        currScore++;
        document.getElementById('currScore').innerHTML = currScore;
        document.querySelector('.question_container').style.border = '2px solid blue';
        result.style.color = 'blue';
    } else {
        // Wrong answer 
        document.querySelector('.question_container').style.border = '2px solid red';
        result.innerHTML = " INCORRECT :(  "
        result.style.color = 'red';
        document.getElementById('currScore').innerHTML = currScore;
    }
    // removing the true or false button to display in nextQues function 
    trueBtn.style.display = 'none';
    falseBtn.style.display = 'none';
    nextQContainer.style.display = 'block';

}
function nextQues() {
    // only call this funcction if the user is next question if the user is not at the end 
    if (currQuestion < questionPoolArray.length - 1) {
        currQuestion++;
        document.getElementById('currQuestion').innerHTML = currQuestion + 1;
        displayQuestion(currQuestion);
        trueBtn.style.display = 'inline';
        falseBtn.style.display = 'inline';
        document.querySelector('.question_container').style.border = '1px solid #5AE9BA';
    } else {
        // Youve reached the end of the game 
        displayFinalSscore();
    }
}
function displayFinalSscore() {
    // Generating the games final score and 
    var finalScore = (currScore / questionPoolArray.length) * 100;
    document.getElementById('finalScore').innerHTML = finalScore;
    // display the final score 
    document.querySelector('.finalScore').style.display = 'block';
    trueBtn.style.display = 'none';
    falseBtn.style.display = 'none';
    result.innerHTML = ""
    displayq.innerHTML = 'Game over !';
    nextQContainer.style.display = 'none';
}