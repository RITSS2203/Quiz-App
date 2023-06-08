const questions =  [
    {
        question: "javascript is an ___________ language?",
        answers: [
            { text: "Object-oriented" , correct: true},
            { text: "Object-based" , correct: false},
            { text: "Procedural" , correct: false},
            { text: "None" , correct: false},
        ]
    },
    {
        question: "How can a datatype be decleared to be a constant type?",
        answers: [
            { text: "var" , correct: false},
            { text: "let" , correct: false},
            { text: "constant" , correct: false},
            { text: "const" , correct: true},
        ]

    },
    {
        question: "What does HTML stands for?",
        answers: [
            { text: "Hypertext Machine language." , correct: false},
            { text: "Hypertext and links markup language" , correct: false},
            { text: "Hypertext Markup Language" , correct: true},
            { text: "Hightext machine language" , correct: false},
        ]
    },
    {
        question: "Which of the following HTML element is used for creating an unordered list?",
        answers: [
            { text: "ui" , correct: false},
            { text: "i" , correct: false},
            { text: "em" , correct: false},
            { text: "ul" , correct: true},
        ]
    },
    {
        question: "What is the font-size of the h1 heading tag?",
        answers: [
            { text: "3.5 em" , correct: false},
            { text: "2.17 em" , correct: false},
            { text: "2 em" , correct: true},
            { text: "1.5 em" , correct: false},
        ]
    },
    {
        question: "Which of the following attributes is used to add link to any element?",
        answers: [
            { text: "link" , correct: false},
            { text: "href" , correct: true},
            { text: "ref" , correct: false},
            { text: "newref" , correct: false},
        ]
    },
    {
        question: "How is document type initialized in HTML5.?",
        answers: [
            { text: "/DOCTYPE HTML" , correct: false},
            { text: "/DOCTYPE" , correct: false},
            { text: "!DOCTYPE HTML" , correct: true},
            { text: "/DOCTYPE html" , correct: false},
        ]
    },
    {
        question: "In how many ways can CSS be written in?",
        answers: [
            { text: "1" , correct: false},
            { text: "2" , correct: false},
            { text: "3" , correct: true},
            { text: "4" , correct: false},
        ]
    },
    {
        question: "What type of CSS is generally recommended for designing large web pages?",
        answers: [
            { text: "Inline" , correct: false},
            { text: "Internal" , correct: false},
            { text: "External" , correct: true},
            { text: "None" , correct: false},
        ]
    },
    {
        question: "How can we select an element with a specific Class in CSS?",
        answers: [
            { text: "#" , correct: false},
            { text: "." , correct: true},
            { text: "^" , correct: false},
            { text: "None" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function start(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct == "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        start();
    }
})

start();