
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const statusDisplay = document.getElementById('status');
const gameCells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const refreshBtn = document.getElementById('refreshBtn');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

gameCells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartBtn.addEventListener('click', restartGame);
refreshBtn.addEventListener('click', refreshScores);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase()); // Add class for color

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            highlightWinningPattern(a, b, c); // Highlight winning pattern
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `🎉 Player ${currentPlayer} wins! 🎉`;
        updateScore(currentPlayer);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = '🤝 Game ended in a draw! 🤝';
        isGameActive = false;
        return;
    }

    // Fix here: Assign the toggled value to currentPlayer
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
}

function updateScore(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

function restartGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;

    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning'); // Remove classes for colors and winning
    });
}

function refreshScores() {
    scoreX = 0;
    scoreO = 0;
    scoreXDisplay.textContent = scoreX;
    scoreODisplay.textContent = scoreO;
    restartGame();
}

function highlightWinningPattern(a, b, c) {
    gameCells[a].classList.add('winning');
    gameCells[b].classList.add('winning');
    gameCells[c].classList.add('winning');
}

