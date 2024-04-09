const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizsection = document.querySelector('.quiz-section');
const quizBox=document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const popupInfoo = document.querySelector('.popup-infoo');


startBtn.onclick=()=>{
    popupInfoo.classList.add("active")
    main.classList.add("active")
}
exitBtn.onclick=()=>{
    popupInfo.classList.remove("active")
    main.classList.remove("active")
}

continueBtn.onclick=()=>{
    quizsection.classList.add("active");
    popupInfo.classList.remove("active")
    main.classList.remove("active")
    quizBox.classList.add("active")

    showQuestions(0);
    questionCounter(1);
    headerScore();
}


startBtn.onclick=()=>{
    popupInfo.classList.add("active")
    main.classList.add("active")
}
exitBtn.onclick=()=>{
    popupInfo.classList.remove("active")
    main.classList.remove("active")
}

continueBtn.onclick=()=>{
    quizsection.classList.add("active");
    popupInfo.classList.remove("active")
    main.classList.remove("active")
    quizBox.classList.add("active")

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

tryAgainBtn.onclick=()=>{
    quizBox.classList.add("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
    
}

goHomeBtn.onclick=()=>{
    quizsection.classList.remove("active");
    nextBtn.classList.remove("active");
    resultBox.classList.remove("active");

    questionCount=0;
    questionNumb=1;
    userScore=0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
}

let questionCount = 0;
let questionNumb=1;
let userScore=0;

// Check if local storage already contains data
var existingData = localStorage.getItem("quizData");
var csvContent;

// Check if local storage already contains data
var existingData = localStorage.getItem("quizData");
var csvContent;

// Next Button Used To Go to another question and questioncount is greater than or question.length.
const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        // Move to the next question
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove("active");
    } else {
        // Generate CSV content with user's score
        let resultData = `User Score: ${userScore} / ${questions.length}\n`;

        if (existingData) {
            // If there is existing data, append to it
            csvContent = existingData +`\n${resultData}`;
        } else {
            // If no existing data, create new
            csvContent = `${resultData}`;
        }

        // Store the updated data in local storage
        localStorage.setItem("quizData", csvContent);

        // Create a download link for the CSV file
        var link = document.createElement("a");
        link.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
        link.setAttribute("download", "quiz_data.csv");
        document.body.appendChild(link);

        // Trigger the click event on the download link
        link.click();

        // Remove the download link from the document
        document.body.removeChild(link);

        // Show the result box after generating the CSV file
        showResultBox();
    }
};
    


const optionList=document.querySelector(".option-list")

//getting  questions and options from array

function showQuestions(index){
    const questionText=document.querySelector(".question-text")
    questionText.textContent=`${questions[index].numb}. ${questions[index].question}`;

    let optionTag=`<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll(".option");
    for (let i=0; i<option.length; i++) {
        option[i].setAttribute("onclick","optionSelected(this)");
    }
}

function optionSelected(answer) {
    let userAnswer= answer.textContent;
    let correctAnswer=questions[questionCount].answer;
    let allOptions=optionList.children.length;

    if (userAnswer==correctAnswer){
        answer.classList.add("correct")
        userScore += 1;
        headerScore()
    }
    else{
       answer.classList.add("incorrect");

       //if answer incorrect,auto selected correct answer

       for(let i=0; i<allOptions; i++){
        if(optionList.children[i].textContent==correctAnswer){
            optionList.children[i].setAttribute("class","option correct");

        }
       }
    }

    // if user has selected,disabled all options
    for(let i=0; i<allOptions;i++) {
        optionList.children[i].classList.add("disabled");
    }

    nextBtn.classList.add("active")
}

function questionCounter(index){
    const questionTotal=document.querySelector(".question-total");
    questionTotal.textContent=`${index} of ${questions.length} Questions`;
}

function headerScore(){
    const headerScoreText=document.querySelector(".header-score");
    headerScoreText.textContent= `Score:${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove("active");
    resultBox.classList.add("active");

    const scoreText= document.querySelector(".score-text");
    scoreText.textContent=`Your Score ${userScore} out of ${questions.length}`;

    const circularProgress=document.querySelector(".circular-progress");
    const progressValue=document.querySelector(".progress-value");
    let progressStartValue=-1;
    let progressEndValue=(userScore / questions.length) *100;
    let speed=20;

    let progress=setInterval(()=>{
        progressStartValue++;
        //console.log(progressStartValue);
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(#c40094 ${progressStartValue *3.6}deg, rgba(255,255,255, .1) 0deg)`;

        if(progressStartValue==progressEndValue) {
            clearInterval(progress);

        }


    },speed);


}