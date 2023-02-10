const message = document.getElementById("message");
const newGamePopup = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");
const background = document.querySelector(".container-message");
const board = document.querySelector(".game-table");

let noOpenCells = 0;
let rows = 10;
let cols = 10;
let placedBombs = [];

function btnState(status) {
    const cellRef = document.querySelectorAll(".cell");
    if (status === 1) {
        cellRef.forEach((cell) => (cell.disabled = true));
    } else {
        cellRef.forEach((cell) => {
            cell.disabled = false;
            cell.innerText = "";
        });
    }
}

function startNewGame() {
    newGamePopup.classList.add("hide");
    message.innerText = "";
    background.style.background = "white";
    background.classList.remove("blur-background");
    board.classList.remove("blur-background");
    background.classList.add("hide");
    btnState(0);
    noOpenCells = 0;
    scatterMines();
}

function setResultText(result) {
    resultText.innerHTML = `<p>${result}</p>`;
}

function endGame() {
    newGamePopup.classList.remove("hide");
    background.classList.add("blur-background");
    board.classList.add("blur-background");
    btnState(1);
    if (noOpenCells === 71) {
        setResultText("YOU WON!!!");
    } else {
        setResultText("YOU LOST!!!");
    }
    return;
}

function setUpdateDisplay(click, clickedCellVal, text, color) {
    click.innerText = clickedCellVal;
    message.innerText = text;
    background.style.background = color;
}

function checkClickedCell(event) {
    let clickedCell = event.currentTarget;
    let rowIndex = clickedCell.parentNode.rowIndex;
    let cellIndex = clickedCell.cellIndex;
    if (placedBombs[rowIndex][cellIndex] === 0) {
        setUpdateDisplay(clickedCell, "0", "You're luky! This is a safe cell!", "green");
        ++noOpenCells;
    } else {
        setUpdateDisplay(clickedCell, "💣", "!!!GAME OVER!!! You detonated the mine!", "red");
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

function createTable() {
    const tableBody = document.getElementById("game-table-body");
    let tableRowCells = "";
    for (let i = 0; i < rows - 1; ++i) {
        tableRowCells += "<tr class='row'>";
        for (let j = 0; j < cols - 1; ++j) {
            tableRowCells += "<td class='cell' onclick='checkClickedCell(event)'></td>";
        }
        tableRowCells += "</tr>";
    }
    tableBody.innerHTML = tableRowCells;
}

window.onload = function() {
    scatterMines();
    createTable();
};