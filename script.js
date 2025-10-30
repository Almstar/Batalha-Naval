const boardSize = 10;
const totalShips = {
  "Porta-aviões": 1,
  "Acorazados": 2,
  "Destruidores": 3,
  "Submarinos": 4
};

const shipSizes = {
  "Porta-aviões": 4,
  "Acorazados": 3,
  "Destruidores": 2,
  "Submarinos": 1
};

const ships = [];
let chances = 30;
let hits = 0;

function initializeBoard() {
  const board = document.getElementById("game-board");
  board.innerHTML = "";

  for (let i = 0; i < boardSize * boardSize; i++) {
    const square = document.createElement("div");
    square.dataset.index = i;
    square.addEventListener("click", handleClick);
    board.appendChild(square);
  }
}

function generateShips() {
  for (const [shipType, count] of Object.entries(totalShips)) {
    for (let i = 0; i < count; i++) {
      placeShip(shipType);
    }
  }
}

function placeShip(type) {
  const size = shipSizes[type];
  const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
  let placed = false;

  while (!placed) {
    const randomIndex = Math.floor(Math.random() * boardSize * boardSize);
    const startRow = Math.floor(randomIndex / boardSize);
    const startCol = randomIndex % boardSize;
    let positions = [];

    for (let i = 0; i < size; i++) {
      const row = direction === "horizontal" ? startRow : startRow + i;
      const col = direction === "vertical" ? startCol : startCol + i;

      if (row >= boardSize || col >= boardSize) break;
      positions.push({ row, col });

      if (i === size - 1) {
        ships.push({ type, positions });
        placed = true;
        positions.forEach(({ row, col }) => {
          const index = row * boardSize + col;
          const square = document.querySelector(`#game-board div[data-index="${index}"]`);
          if (type === "Porta-aviões") square.classList.add("orange");
          if (type === "Acorazados") square.classList.add("green");
          if (type === "Destruidores") square.classList.add("yellow");
          if (type === "Submarinos") square.classList.add("purple");
        });
      }
    }
  }
}

function handleClick(event) {
  const square = event.target;
  const index = square.dataset.index;
  const row = Math.floor(index / boardSize);
  const col = index % boardSize;

  if (square.classList.contains("hit") || square.classList.contains("miss")) return;

  let hit = false;

  ships.forEach(ship => {
    ship.positions.forEach(({ row: shipRow, col: shipCol }) => {
      if (row === shipRow && col === shipCol) {
        hit = true;
        hits++;
        square.classList.add("hit");
      }
    });
  });

  if (!hit) {
    square.classList.add("miss");
  }

  chances--;
  document.getElementById("chances").textContent = chances;

  if (hits === 10) {
    alert("Você ganhou!");
  } else if (chances === 0) {
    alert("VOCÊ PERDEU");
  }
}

initializeBoard();
generateShips();
