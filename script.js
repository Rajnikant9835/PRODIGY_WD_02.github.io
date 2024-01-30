const board = document.getElementById('board');
const cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', cellClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function cellClick() {
    if (!gameActive) return;

    const index = this.getAttribute('data-index');

    if (cells[index].textContent === '') {
        cells[index].textContent = currentPlayer;
        cells[index].classList.add(`player${currentPlayer}`);

        if (checkWinner()) {
            displayWinner();
            playWinSound();
            gameActive = false;
        } else if (isBoardFull()) {
            displayDraw();
            playDrawSound();
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    }
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent !== '' &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent;
    });
}

function isBoardFull() {
    return cells.every(cell => cell.textContent !== '');
}

function displayWinner() {
    document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
}

function displayDraw() {
    document.getElementById('message').textContent = 'It\'s a draw!';
}

function updateTurnIndicator() {
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
}

function playWinSound() {
    const winSound = document.getElementById('win-sound');
    winSound.play();
}

function playDrawSound() {
    const drawSound = document.getElementById('draw-sound');
    drawSound.play();
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('playerX', 'playerO');
    });
    updateTurnIndicator();
    document.getElementById('message').textContent = '';
}

createBoard();
updateTurnIndicator();
