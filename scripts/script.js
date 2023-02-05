const message = document.getElementById("message");
const newGamePopup = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");
const background = document.querySelector(".container-message");
const cellRef = document.querySelectorAll(".cell");
const board = document.querySelector(".game-table");

let noOpenCells = 0;
let rows = 10;
let cols = 10;
let placedBombs = [];

function disableAllCells() {
    cellRef.forEach((cell) => (cell.disabled = true));
    newGamePopup.classList.remove("hide");
}

function enableAllCells() {
    cellRef.forEach((cell) => {
        cell.disabled = false;
        cell.innerText = "";
    });
    newGamePopup.classList.add("hide");
    message.innerText = "";
    background.style.background = "white";
}

function startNewGame() {
    background.classList.remove("blur-background");
    board.classList.remove("blur-background");
    background.classList.add("hide");
    enableAllCells();
    noOpenCells = 0;
    for (let row = 0; row < rows; ++row) {
        placedBombs[row] = [];
      for (let col = 0; col < cols; ++col) {
        placedBombs[row][col] = 0;
      }
    }
    scatterMines();
}

function endGame() {
    background.classList.add("blur-background");
    board.classList.add("blur-background");
    disableAllCells();
    if (noOpenCells === 71) {
        resultText.innerHTML = "<p>YOU WON!!!</p>";
    } else {
        resultText.innerHTML = "<p>YOU LOST!!!</p>";
    }
    return;
}

function checkClickedCell(event) {
    let clickedCell = event.currentTarget;
    let rowIndex = clickedCell.parentNode.rowIndex;
    let cellIndex = clickedCell.cellIndex;
    if (placedBombs[rowIndex][cellIndex] === 0) {
        clickedCell.innerText = "0";
        message.innerText = "You're luky! This is a safe cell!";
        background.style.background = "green";
        ++noOpenCells;
    } else {
        clickedCell.innerText = "💣";
        message.innerText = "!!!GAME OVER!!! You detonated the mine!";
        background.style.background = "red";
        endGame();
    }
    background.classList.remove("hide");
    clickedCell.disabled = true;
    if (noOpenCells === 71) {
        endGame();
    }
} 

function scatterMines() {
    for (let row = 0; row < rows; ++row) {
        placedBombs[row] = [];
      for (let col = 0; col < cols; ++col) {
        placedBombs[row][col] = 0;
      }
    }

    let noMines = 0;
    while (noMines < 10) {
        let randomRow = Math.floor(Math.random() * rows);
        let randomCol = Math.floor(Math.random() * cols);
        if (placedBombs[randomRow][randomCol] !== "💣") {
            placedBombs[randomRow][randomCol] = "💣";
            ++noMines;
        }
    }
}

window.onload = function() {
    scatterMines();
};