function Question(text,choices,answer){
    
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Question.prototype.checkAnswer = function(answer){
    return this.answer === answer;
}
function Quiz(questions){
    
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0
}
Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}
Quiz.prototype.guess = function(answer){
    var question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}


var q1 = new Question("what's the best programming language ?",["C#","javascript","pyhton","asp.net"],"javascript");
var q2 = new Question("what's the most popular programming language ?",["c#","visual basic","nodejs","javascript"],"javascript");
var q3 = new Question("what's the best modern programming language ?",["C#","javascript","pyhton","asp.net"],"javascript");
var q4 = new Question("what's the important programming language ?",["C#","javascript","pyhton","asp.net"],"javascript");

var questions = [q1,q2,q3,q4];

var quiz = new Quiz(questions);

loadQuestion()

const btnFinish = document.getElementById('btnFinish')

btnFinish.addEventListener('click',function(e){

    if(confirm('Are you sure you still have unanswered question')){
        showScore()
    }else{
        e.preventDefault()
    }
})

function loadQuestion(){

    if(quiz.isFinish()){
        showScore()
    }else{
        var question = quiz.getQuestion()
        var choices = question.choices

        document.querySelector('#question').textContent = question.text

        for(var i=0; i<choices.length; i++){
            
            var element = document.querySelector('#choice'+i)
            element.innerHTML = choices[i]

            marked('btn'+i,choices[i])
        }

        showProgress()
    }
}
function marked(id,marked){

    var btn = document.getElementById(id)
    btn.onclick = function(){
        quiz.guess(marked)
        loadQuestion()
    }
}
function showScore(){

    var html = `<h2>SCORE</h2><h4>${quiz.score}<h/4>`
    document.querySelector('.card-body').innerHTML = html

    btnFinish.remove()
}
function showProgress(){

    var totalQuestion = quiz.questions.length
    var questionNumber = quiz.questionIndex+1

    document.querySelector('#progress').innerHTML = 'Question ' + questionNumber + ' of ' + totalQuestion
}