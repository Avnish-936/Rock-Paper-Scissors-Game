//Initial scores of users & computer
let userScore = 0;
let compScore = 0;
let drawScore = 0;

//Access all attributes
let msg = document.querySelector("#msg")
let choices = document.querySelectorAll(".choice");
let userScorePara = document.querySelector("#user-score");
let compScorePara = document.querySelector("#comp-score");
let drawScorePara = document.querySelector("#draw-score");
let newGame = document.querySelector("#new-game");

//Available options 
const options = ["Rock", "Paper", "Scissors"];

//Generate computer's choice
const genrateCompChoice = () => {
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

//Generate user's choice
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})

//Game draw status. 
const gameDraw = (userChoice, compChoice) => {
    drawScorePara.innerText = drawScore;
    msg.innerText = (`It's a draw! You both picked ${userChoice}.`);
    msg.style.backgroundColor = "#081b31";
}

//Update score of the user & computer. 
const updateScore = (userWin) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
    }
    else {
        compScore++;
        compScorePara.innerText = compScore;
    }
}

//show winner-msg 
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        msg.innerText = `User won! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else {
        msg.innerText = `User lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

//Decide winner of the round
const playGame = (userChoice) => {
    const compChoice = genrateCompChoice();

    //Draw game.
    if ((userChoice === compChoice)) {
        drawScore++;
        gameDraw(userChoice, compChoice);
    }
    else {
        let userWin = true;
        //Winning cases.
        if (userChoice === "Rock") {
            //comp can choose "Paper" or "Scissors" only. 
            userWin = compChoice === "Paper" ? false : true;
        }
        else if (userChoice === "Paper") {
            //comp can choose "Scissors" or "Rock" only. 
            userWin = compChoice === "Scissors" ? false : true;
        }
        else if (userChoice === "Scissors") {
            //comp can choose "Rock" or "Paper" only. 
            userWin = compChoice === "Rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
        updateScore(userWin);
    }
}

newGame.addEventListener("click", () => {
    const confirmReset = confirm("Are you sure you want to start a new game? This will reset all scores.");

    if (confirmReset) {
        userScore = 0;
        compScore = 0;
        drawScore = 0;

        userScorePara.innerText = 0;
        compScorePara.innerText = 0;
        drawScorePara.innerText = 0;

        msg.innerText = "Play Your Move";
        msg.style.backgroundColor = "#081b31";
    }
})