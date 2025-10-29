const ships = [
    { name: "porta-aviões", size: 5, color: "porta-avioes" },
    { name: "cruzador", size: 4, color: "cruzador" },
    { name: "contratorpedeiro", size: 3, color: "contratorpedeiro" },
    { name: "rebocador", size: 2, color: "rebocador" }
];

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

// Colocar o barco no tabuleiro com a cor
function placeShip(start, size, orientation, color) {
    for (let i = 0; i < size; i++) {
        const index = orientation === 'horizontal'
            ? start + i
            : start + i * boardSize;
        board[index].ship = color;  // Atribuindo a cor do navio
        const cell = document.querySelector(`[data-index="${index}"]`);
        cell.classList.add(color);  // Adicionando a classe com a cor
    }
}
