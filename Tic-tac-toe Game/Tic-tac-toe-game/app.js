let mainBox = document.querySelector("#main");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let sms = document.querySelector("#sms");
let smsContainer = document.querySelector(".smsContainer");
let newGame = document.querySelector(".newGame");

let turn0 = true;//turnX , turn0:
let count = 0;

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Button was clicked!");
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                shoWinner(pos1val);
                return true;
                // box.disabled = true;
            }
        }
    }
};

const shoWinner = (winner) => {
    sms.innerText = `Congratulations, Winner is ${winner}`;
    smsContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
};

newGame.addEventListener("click", () => {
    resetGame();
});
const gameDraw = () => {
    sms.innerText = `Game is Draw.`;
    smsContainer.classList.remove("hide");
    enableBoxes();
};
const resetGame = () => {
    turn0 = true;
    count = 0;
    smsContainer.classList.add("hide");
    enableBoxes();
};