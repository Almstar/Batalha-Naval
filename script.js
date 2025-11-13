const boardSize = 10;
const maxMoves = 30;
let movesLeft = maxMoves;
let hits = 0;
let totalShipCells = 0;

const board = document.getElementById("board");
const movesDisplay = document.getElementById("moves");
const messageDisplay = document.getElementById("message");

const ships = [
  { size: 5, count: 1, shape: "T" }, // Porta-aviões
  { size: 4, count: 1 },
  { size: 3, count: 2 },
  { size: 2, count: 3 },
  { size: 1, count: 4 },
];

let grid = Array(boardSize)
  .fill(null)
  .map(() => Array(boardSize).fill(0));

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => handleClick(i));
    board.appendChild(cell);
  }
}

function placeShips() {
  ships.forEach((ship) => {
    for (let i = 0; i < ship.count; i++) {
      placeShip(ship);
    }
  });
}

function placeShip(ship) {
  let placed = false;
  while (!placed) {
    let row = Math.floor(Math.random() * boardSize);
    let col = Math.floor(Math.random() * boardSize);
    let direction = Math.random() < 0.5 ? "horizontal" : "vertical";

    let shapeCells = [];

    if (ship.shape === "T") {
      // Porta-aviões em T
      shapeCells = [
        [row, col],
        [row, col + 1],
        [row, col + 2],
        [row + 1, col + 1],
        [row + 2, col + 1],
      ];
    } else if (direction === "horizontal") {
      shapeCells = Array.from({ length: ship.size }, (_, j) => [row, col + j]);
    } else {
      shapeCells = Array.from({ length: ship.size }, (_, j) => [row + j, col]);
    }

    // Verificar se cabe no campo
    if (
      shapeCells.every(
        ([r, c]) =>
          r >= 0 &&
          r < boardSize &&
          c >= 0 &&
          c < boardSize &&
          grid[r][c] === 0 &&
          isAreaFree(r, c)
      )
    ) {
      shapeCells.forEach(([r, c]) => (grid[r][c] = ship.size));
      totalShipCells += ship.size;
      placed = true;
    }
  }
}

function isAreaFree(r, c) {
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      let nr = r + dr;
      let nc = c + dc;
      if (nr >= 0 && nr < boardSize && nc >= 0 && nc < boardSize) {
        if (grid[nr][nc] !== 0) return false;
      }
    }
  }
  return true;
}

function handleClick(index) {
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;
  const cell = board.children[index];

  if (cell.classList.contains("hit") || cell.classList.contains("miss")) return;

  movesLeft--;
  movesDisplay.textContent = `Jogadas restantes: ${movesLeft}`;

  if (grid[row][col] !== 0) {
    cell.classList.add("hit");
    cell.textContent = grid[row][col];
    hits++;
    if (hits === totalShipCells) {
      messageDisplay.textContent = "VOCÊ VENCEU!!! 🎉";
      board.style.pointerEvents = "none";
    }
  } else {
    cell.classList.add("miss");
  }

  if (movesLeft === 0 && hits < totalShipCells) {
    messageDisplay.textContent = "VOCÊ PERDEU!!! 😢";
    board.style.pointerEvents = "none";
  }
}

createBoard();
placeShips();
