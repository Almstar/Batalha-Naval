const boardSize = 10;
const ships = [
    { name: "porta-aviões", size: 5, color: "porta-avioes" },
    { name: "cruzador", size: 4, color: "cruzador" },
    { name: "contratorpedeiro", size: 3, color: "contratorpedeiro" },
    { name: "rebocador", size: 2, color: "rebocador" }
];

let board = [];
let shots = [];
let hits = 0;
let misses = 0;
const waterSound = document.getElementById('water-sound');

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
                placeShip(start, ship.size, orientation, ship.color);
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

// Colocar o barco no tabuleiro com a cor
function placeShip(start, size, orientation, color) {
    for (let i = 0; i < size; i++) {
        const index = orientation === 'horizontal'
            ? start + i
            : start + i * boardSize;
        board[index].ship = color;
        const cell = document.querySelector(`[data-index="${index}"]`);
        // Deixe a célula invisível inicialmente, sem cor
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
        event.target.classList.add(board[index].ship);  // Revela o tipo de navio
        hits++;
    } else {
        event.target.classList.add('miss');
        misses++;

        // Tocar o som de erro
        waterSound.play();
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
