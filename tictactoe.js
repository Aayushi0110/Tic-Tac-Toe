let buttons = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newButton = document.querySelector("#new");
let message = document.querySelector("#message");
let messageContainer = document.querySelector(".message-container");
let draw = document.querySelector("#draw");

//2D arrays
// eg - 
/* let arr = [
 ["games", "toys"], 
 ["nose", "ears"], 
 ["bottle", "plate"]
 ]; */

let count = 0;
let turnO = true;

// these are the winning patterns which we have to think of before and this is also the main logical part 
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

//to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableGame();
    messageContainer.classList.add("hide");
};

buttons.forEach((box)=> {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        checkWinner();
    });
});

const disableGame = () => {
    for (let button of buttons){
        button.disabled = true;
    }
};

const enableGame = () => {
    for (let button of buttons){
        button.disabled = false;
        button.innerText = "";
    }
};

const showWinner = (winner) => {
    message.innerText = `Yayyyy!!! The winner is ${winner}`;
    messageContainer.classList.remove("hide");
    disableGame();
};
const showDraw = () => {
    message.innerText = "The game is draw";
    messageContainer.classList.remove("hide");
    disableGame();
};


const checkWinner = () => {
    let winnerFound = false;
    for (let pattern of winPatterns) {
        let pos1Val = buttons[pattern[0]].innerText;
        let pos2Val = buttons[pattern[1]].innerText;
        let pos3Val = buttons[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val){
                winnerFound = true;
                showWinner(pos1Val);
            }
        }
    }
    if(!winnerFound && count === 9){
        showDraw();
    }
}

resetButton.addEventListener("click", resetGame);
newButton.addEventListener("click", resetGame);