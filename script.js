const boardSize = 10;
const ships = [
    { name: "Navio de Guerra", size: 5 },
    { name: "Cruzador", size: 4 },
    { name: "Submarino", size: 3 },
    { name: "Destroier", size: 3 },
    { name: "Lancha", size: 2 }
];

let board = [];
let shots = [];
let hits = 0;
let misses = 0;

// Função para criar o tabuleiro
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
        board.push({ ship: null, hit: false });
    }
}

// Função para posicionar os barcos aleatoriamente
function placeShips() {
    ships.forEach(ship => {
        let placed = false;
        while (!placed) {
            const orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            const start = Math.floor(Math.random() * (boardSize * boardSize));
            if (canPlaceShip(start, ship.size, orientation)) {
                placeShip(start, ship.size, orientation);
                placed = true;
            }
        }
    });
}

// Verificar se é possível colocar o barco
function canPlaceShip(start, size, orientation) {
    const startRow = Math.floor(start / boardSize);
    const startCol = start % boardSize;
    for (let i = 0; i < size; i++) {
        const index = orientation === 'horizontal'
            ? start + i
            : start + i * boardSize;
        if (index < 0 || index >= boardSize * boardSize || board[index].ship) {
            return false;
        }
    }
    return true;
}

// Colocar o barco no tabuleiro
function placeShip(start, size, orientation) {
    const startRow = Math.floor(start / boardSize);
    const startCol = start % boardSize;
    const shipName = ships.find(s => s.size === size).name;

    for (let i = 0; i < size; i++) {
        const index = orientation === 'horizontal'
            ? start + i
            : start + i * boardSize;
        board[index].ship = shipName;
    }
}

// Função para lidar com o clique do usuário
function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (board[index].hit || shots.includes(index)) return;

    shots.push(index);
    if (board[index].ship) {
        board[index].hit = true;
        event.target.classList.add('hit');
        hits++;
    } else {
        event.target.classList.add('miss');
        misses++;
    }

    checkGameStatus();
}

// Verificar se o jogo acabou
function checkGameStatus() {
    if (hits === ships.reduce((total, ship) => total + ship.size, 0)) {
        document.getElementById('result').textContent = 'Você venceu!';
    } else if (misses === 50) {
        document.getElementById('result').textContent = 'Você perdeu!';
    }
}

// Inicializar o jogo
createBoard();
placeShips();
