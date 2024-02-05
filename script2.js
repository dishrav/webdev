//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "In The Matrix, which colour pill does neo take?",
        options: ["Blue", "Red", "Yellow", "Green"],
        correct: "Red",
    },
    {
        id: "1",
        question: "In Mean Girls, Cady moves to Illinois from which continent?",
        options: ["Asia", "Australia", "Africa", "Antartica"],
        correct: "Africa",
    },
    {
        id: "2",
        question: "What is the first rule of Fight Club?",
        options: ["There are no rules", "You do not talk about Fight Club", "Only one fight at a time", "No shirts, no shoes"],
        correct: "You do not talk about Fight Club",
    },
    {
        id: "3",
        question: "What is the name of the fictional land where Frozen takes place?",
        options: ["Arendelle", "Zootopia", "Neverland", "France"],
        correct: "Arendelle",
    },
    {
        id: "4",
        question: "Which movie is this quote from: What's in the box?",
        options: ["Harry Potter", "se7en", "John Wick", "Hunger Games"],
        correct: "se7en",
    },
    {
        id: "5",
        question: "What is the name of Rapunzel's pet chameleon in tangled? ",
        options: ["Picasso", "Pesto", "Pint", "Pascal"],
        correct: "Pascal",
    }, {
        id: "6",
        question: "What job does Will Hunting have in Good Will Hunting?",
        options: ["Carpenter", "Bartender", "Janitor", "Store clerk"],
        correct: "Janitor",
    },
    {
        id: "7",
        question: "What does Miguel want to be when he grows up in Coco?",
        options: ["Doctor", "Musician", "Painter", "Teacher"],
        correct: "Musician",
    },
    {
        id: "8",
        question: "What is the name od Jessie's horse in Toy Story 2?",
        options: ["Longshot", "Gallop", "Bullseye", "Dart"],
        correct: "Bullseye",
    },
    {
        id: "9",
        question: "What is at the back of Ryan Gosling's jacket in Drive ?",
        options: ["A chicken", "A lizard", "A dragon", "A scorpion"],
        correct: "A scorpion",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};


//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};