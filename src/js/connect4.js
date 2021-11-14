console.log("Welcome to connect 4...");
const NO_ROWS = 7;
const NO_COLS = 7;

const board = []; //Multi-dimensional array
initBoard();
// board.fill([], 0, NO_COLS);
// console.log("board[0][1]: ", board[0][1]);

//Set up board
const boardNode = document.querySelector("#board");
addColumnElement();
const playerNode = document.querySelector("#player");

//Game init
const COUNTER_COLOR_1 = "red";
const COUNTER_COLOR_2 = "yellow";
const PLAYER_1 = 1;
const PLAYER_2 = 2;

let player = 1;
let pieces = 0;
const columns = document.getElementsByClassName("col");
updateTurnInfo();

const reset = document.querySelector("#reset");
reset.onclick = function () {
  console.log("reset...");
  for (let i = 0; i < columns.length; i++) {
    // console.log("element: ", columns[i]);
    removeAllChildren(columns[i]);
  }
  player = PLAYER_1;
  pieces = 0;
  initBoard();
  updateTurnInfo();
};

// console.log("boardNode: ", boardNode);
// console.log("columns: ", columns);
// columns[0].removeChild();
init();

//===============================================
//      Functions
//===============================================

function init() {
  for (let i = 0; i < columns.length; i++) {
    // console.log("element: ", columns[i]);
    removeAllChildren(columns[i]);

    //Column click handler
    columns[i].onclick = function () {
      if (this.childElementCount < NO_ROWS) {
        // addCounter(player, this);
        updateColumn(this, i);
        player++;
        pieces++;

        if (player > PLAYER_2) {
          player = PLAYER_1;
        }
        updateTurnInfo();
      } else {
        console.error(`Column ${i} full`);
      }
    };
  }
}

function initBoard() {
  for (let i = 0; i < NO_COLS; i++) {
    board[i] = [];
  }
}

//Remove all children from a node
function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function addColumnElement() {
  //class = col col-0
  for (let i = 0; i < NO_COLS; i++) {
    const div = document.createElement("div");
    const colNum = "col-" + i;
    const className = "col " + colNum;
    div.classList = [className];
    boardNode.appendChild(div);
  }
}

function addCounter(player, column) {
  //   console.log("add counter...");
  const counter = document.createElement("div");
  counter.classList = ["counter"];

  if (player === PLAYER_1) {
    counter.style.backgroundColor = COUNTER_COLOR_1;
  }
  if (player === PLAYER_2) {
    counter.style.backgroundColor = COUNTER_COLOR_2;
  }

  column.appendChild(counter);
}

function updateTurnInfo() {
  const name = getName();
  playerNode.textContent = name + " Turn";

  if (pieces >= NO_COLS * NO_ROWS) {
    playerNode.textContent = "It's a Tie";
  }
}

function updateColumn(column, index) {
  // console.log("update col...", column);
  removeAllChildren(column);

  //Add piece based on turn
  const piece = getPiece();
  board[index].push(piece);

  //Updated column based on pieces on board
  for (let i = 0; i < board[index].length; i++) {
    const player = getPlayer(board[index][i]);
    addCounter(player, column);
  }
}

function onBoardClick() {
  console.log("Board clicked...");
}

function getPlayer(piece) {
  return piece === "x" ? PLAYER_1 : PLAYER_2;
}

function getPiece() {
  return player === PLAYER_1 ? "x" : "o";
}

function getName() {
  let name = "";
  switch (player) {
    case PLAYER_1:
      name = capitalizeFirst(COUNTER_COLOR_1);
      break;
    case PLAYER_2:
      name = capitalizeFirst(COUNTER_COLOR_2);
      break;
  }
  return name;
}

//===============================================
//      UTILS
//===============================================

function capitalizeFirst(str) {
  if (str.length < 1) return "";
  return str[0].toUpperCase() + str.substring(1);
}

// const str = "mycars is ok";
// console.log("hey ", capitalizeFirst(str));
