
const firstModal = document.querySelector(".firstModal");
const secondModal = document.querySelector(".secondModal");
const play = document.querySelector(".playButton");
const restart = document.querySelector(".restartButton");
const back = document.querySelector(".backButton");
const resultText = document.querySelector(".resultText");
const tryAgain = document.querySelector(".cardButton");
const choice = document.querySelectorAll(".choiceButton");
const possitions = document.querySelectorAll(".gridChild");
let board = [[], [], []];
let playerSymbol = "X";
let computerSymbol = "O";
let moves = 0;
let maxmoves = 8;

choice.forEach(button => {
    button.addEventListener("change", () => {
        [playerSymbol, computerSymbol] = [computerSymbol, playerSymbol];
    })
})

play.addEventListener("click", () => {
    firstModal.style.display = "none";

    firstComputerMove();

    possitions.forEach(button => {
        button.addEventListener("click", () => {
            let row = Math.floor(Number(button.classList[0]) / 3);
            let column = button.classList[0] - Math.floor(Number(button.classList[0]) / 3) * 3;

            if (board[row][column] == undefined) {
                board[row][column] = playerSymbol;
                button.textContent = playerSymbol;
                moves++;
                if (winVerfy()) {
                    secondModal.style.display = "flex";
                    resultText.textContent = "You Won!"
                }

                if (moves < maxmoves && !winVerfy()) {
                    let row = getRandomInt(3);
                    let column = getRandomInt(3);
                    while (board[row][column] != undefined) {
                        row = getRandomInt(3);
                        column = getRandomInt(3);
                    }
                    board[row][column] = computerSymbol;
                    possitions[column + row * 3].textContent = computerSymbol;
                    moves++;
                    if (winVerfy()) {
                        secondModal.style.display = "flex";
                        resultText.textContent = "Computer Won!"
                    }
                }

                if(moves == 9)
                {
                    if(winVerfy())
                    {
                        secondModal.style.display = "flex";
                        resultText.textContent = "You Won!"
                    }
                    else{
                        secondModal.style.display = "flex";
                        resultText.textContent = "You Made a Draw!"
                    }
                }
            }
        });
    });
});

restart.addEventListener("click", () => {
    clearBoard();
    moves = 0;
    firstComputerMove();
});

back.addEventListener("click", () => {
    clearBoard();
    moves = 0;
    firstModal.style.display = "flex";
});

tryAgain.addEventListener("click", () => {
    clearBoard();
    moves = 0;
    secondModal.style.display = "none";
    firstComputerMove()
})


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function clearBoard() {
    possitions.forEach(button => {
        button.textContent = "";
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] != undefined) {
                    board[i][j] = undefined;
                }
            }
        }
    });
}

function firstComputerMove(){
    if (playerSymbol == "O") {
        maxmoves = 9;
        let row = getRandomInt(3);
        let column = getRandomInt(3);
        board[row][column] = computerSymbol;
        possitions[column + row * 3].textContent = computerSymbol;
        moves++;
    }
}

function winVerfy() {
    for (let i = 0; i < 3; i++) {
        if (board[i][0] != undefined && board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            return true;
        }
    }

    for (let j = 0; j < 3; j++) {
        if (board[0][j] != undefined && board[0][j] == board[1][j] && board[1][j] == board[2][j]) {
            return true;
        }
    }

    if (board[0][0] != undefined && board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        return true;
    }

    if (board[0][2] != undefined && board[0][2] == board[1][1] && board[1][1] == board[2][0]) {
        return true;
    }
    return false;
}