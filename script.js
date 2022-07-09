// select all elements
let start = document.querySelector("#start");
let quiz = document.querySelector("#quiz");
let display = document.querySelector('#time');
let question = document.querySelector("#question");
let choiceA = document.querySelector("#A");
let choiceB = document.querySelector("#B");
let choiceC = document.querySelector("#C");
let scoreDiv = document.querySelector("#scoreContainer");
let leaderList = document.querySelector("#leaderboards");
let restart = document.querySelector("#restart");
let leaderboard = [];
let beginning;

// create our questions
let questions = [
    {
        question : "Welcome! How many new words would you like to learn?",
        choiceA : "not sure",
        choiceB : "2-10",
        choiceC : "as many as I can!",
        correct : "great, let's get you set up"
    },{
        question : "Do you have a preference for language(s)?",
        choiceA : "Two hundred",
        choiceB : "Two hundred and six",
        choiceC : "Too many",
        correct : "B"
    },{
        question : "What was Marilyn Monroe's natural hair colour?",
        choiceA : "Blonde",
        choiceB : "Brunette",
        choiceC : "Ginger",
        correct : "C"
    },{
        question : "What did A.E. Frick invent in 1887, which are now worn by thousands if not millions of people?",
        choiceA : "Contact Lenses",
        choiceB : "The T-shirt",
        choiceC : "Cotton socks",
        correct : "A"
    },{
        question : "What is an irrational fear of trees called?",
        choiceA : "Arborophobia",
        choiceB : "Dendrophobia",
        choiceC : "Treephobia",
        correct : "B"
    },{
        question : "What is the national flower of Wales?",
        choiceA : "Daffodil",
        choiceB : "Rose",
        choiceC : "Marijuana",
        correct : "A"
    },{
        question : "How many bones are there on a Skull & Crossbones flag?",
        choiceA : "1",
        choiceB : "2",
        choiceC : "3",
        correct : "C"
    },{
        question : "Which ocean surrounds the Maldives?",
        choiceA : "Indian",
        choiceB : "Pacific",
        choiceC : "Atlantic",
        correct : "A"
    }
];

// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
let TIMER;
let score = 0;
var timer;


// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    runningQuestion = 0;
    count = 0;
    score = 0;
    renderQuestion();
    quiz.style.display = "block";
    

    
    startTimer(30, display);
}

// timer render
function startTimer(duration, display) {
    timer = duration;
    var minutes;
    var seconds;

    beginning = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(beginning);
            timer = duration;
        }
    }, 1000);
}


// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        
    }else{
        // answer is wrong
        timer -= 3;
        
    }
    count = 0;
    runningQuestion++;
    if(runningQuestion < lastQuestion){
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    quiz.style.display = "none";
    clearInterval(beginning);
    
    const scorePerCent = Math.round(100 * score/questions.length);
    var userName = prompt("Enter your name for the leaderboard.");
     
    leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    if (!leaderboard){
        leaderboard = [];
    }

    leaderboard.push({name: userName, score: scorePerCent});

    leaderboard.sort(function(a, b) {
        return b.score - a.score;
      });

    for (var i = 0;i < leaderboard.length; i++){
        var player = leaderboard[i].name + ": " + leaderboard[i].score +"%";

        var li = document.createElement("li");
        li.textContent = player;
        leaderList.appendChild(li);
    }

    restart.addEventListener("click", function(){
        scoreDiv.style.display = "none";
        startQuiz();
        quiz.style.display = "block";
    })
   
    
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    


}
