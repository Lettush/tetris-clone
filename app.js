const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div"));
const scoreDisplay = document.querySelector("#score");
const startBtn = document.querySelector("#start-button");
const width = 10;

// Tetriminos
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

// const zTetromino = [
//   [width + 1, width + 2, width * 2, width * 2 + 1],
//   [0, width, width + 1, width * 2 + 1],
//   [width + 1, width + 2, width * 2, width * 2 + 1],
//   [0, width, width + 1, width * 2 + 1],
// ];

const sTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominoes = [
  lTetromino,
  sTetromino,
  tTetromino,
  oTetromino,
  iTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

// randomly select a Tetromino and its first rotation
let random = Math.floor(Math.random() * theTetrominoes.length);
let current = theTetrominoes[random][0];

// draw the tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

// undraw the Tetromino
function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove("tetromino");
  });
}

// make tetrominoes move down every second
timerId = setInterval(moveDown, 1000);
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// assign functions to keyCodes
function control(e) {
  if (e.keyCode === 37) moveLeft();
  if (e.keyCode === 38) rotate();
  if (e.keyCode === 39) moveRight();
  if (e.keyCode === 40) moveDown();
}

document.addEventListener("keydown", control);

// if tetromino hits bottom
async function freeze() {
  if (
    current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    )
  ) {
    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );

    // start a new tetromino falling
    random = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw();
  }
}

// move the tetromino left, unless is at the edge or theres a barrier
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some(
    (index) => (currentPosition + index) % width == 0
  );

  if (
    !isAtLeftEdge &&
    !current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  )
    currentPosition -= 1;

  draw();
}

// move the tetromino right, unless is at the edge or theres a barrier
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width == width - 1
  );

  if (
    !isAtRightEdge &&
    !current.some((index) =>
      squares[currentPosition + index].classList.contains("taken")
    )
  )
    currentPosition += 1;

  draw();
}

function rotate() {
  undraw();
  currentRotation++;

  if (currentRotation === current.length) currentRotation = 0;

  current = theTetrominoes[random][currentRotation];
  draw();
}
