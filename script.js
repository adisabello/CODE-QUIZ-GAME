
class Question{
    constructor(question, choices, correct){
        this.question = question;
        this.choices = choices;
        this.correct = correct;
    }

    toString() {
        var choices = "";
        for(var i = 0; i < this.choices.length; i++){
            choices+="<button onclick='selectChoice("+(i+1)+")' class='choice'>"+(i+1)+". "+this.choices[i]+"</button><br>";
        }
        return "<p class='question'>"+this.question+"</p>"+choices
    }

    isCorrect(choice){
        choice-=1;
        return this.choices[choice] == this.correct;
    }
}

var questions = []
var currQuestion;

function generateQuestions(){
    questions.push(new Question("Commonly used data types DO NOT include:",["Strings","Booleans","Alerts","Numbers"], "Alerts"))
    questions.push(new Question("Which of the following is not a feature in Javascript:",["Classes","Methods","Refrigeration","Error Handling"], "Refrigeration"))
    questions.push(new Question("Which of the following is not a structure in JavaScript:",["for loop","while loop","if statement","repeat until"], "repeat until"))
    questions.push(new Question("Is it possible to use JavaScript without a seperate '.js' file:",["Yes","No","Maybe","I don't Know"], "Yes"))
    questions.push(new Question("Is JavaScript a front-end language:",["Yes","No","Maybe","I don't Know"], "Yes"))
}

function getQuestion(){
    var index = Math.floor(Math.random() * questions.length);
    currQuestion = questions[index];
    questions.splice(index, 1);
    console.log(currQuestion);
}

function done(){
    var name = prompt("Enter your initials");
    highScores.push([name, score]);
    clearInterval(timer);
    var res = prompt("High Score saved.\nDo you want to play again? (yes/no)");
    res = res.toLowerCase();
    if(res == "yes"){
        startGame();
    }
}

function loadQuestion(){
    document.getElementById("question").innerHTML = currQuestion.toString();
}

function selectChoice(choice){
    if(currQuestion.isCorrect(choice)){
        document.getElementById("result").innerHTML = "Correct";
        score++;
    }else{
        document.getElementById("result").innerHTML = "Incorrect";
        time-=10;
    }
    setTimeout(()=>{
        document.getElementById("result").innerHTML = "--";
    }, 2000);

    if(questions.length > 0){
        getQuestion();
        loadQuestion();
    }else{
        done();
    }
}

var score = 0;
var time = 60;
var highScores = [];
var timer;

function switchDisplay(){
    var txt = document.getElementById("changer").innerHTML;
    if(txt == "View High Scores"){
        loadHighScores();
        document.getElementById("section-2").style.display = "block";
        document.getElementById("section-1").style.display = "none";
        document.getElementById("changer").innerHTML = "Start Game";
    }else{
        document.getElementById("section-2").style.display = "none";
        document.getElementById("section-1").style.display = "block";
        document.getElementById("changer").innerHTML = "View High Scores";
    }
}

function loadHighScores(){
    var str = "";

    for(var i = 0; i < highScores.length; i++){
        str+="<p> "+(i+1)+". "+highScores[i][0]+": "+highScores[i][1]+"</p>";
    }
    document.getElementById("highScores").innerHTML = str;
}

function startGame(){
    score = 0;
    time = 60;
    timer = setInterval(function (){
        time--;
        if(time < 0){
            time = 0;
        }
        document.getElementById("timer").innerHTML = "Timer: "+time;
    }, 1000);

    generateQuestions();
    getQuestion();
    loadQuestion();
    document.getElementById("section-2").style.display = "none";
}

startGame(); 
