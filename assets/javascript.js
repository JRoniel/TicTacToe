let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playerXScore = 0;
let playerOScore = 0;

const cells = document.getElementsByClassName('cell');
const statusElement = document.getElementById('status');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');

function makeMove(cellIndex) {
    if (gameActive && gameBoard[cellIndex] === '') {
        gameBoard[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;

        if (checkWin()) {
            endGame(`Jogador ${currentPlayer} venceu!`);
            updateScore(currentPlayer);
        } else if (!gameBoard.includes('')) {
            endGame('Empate!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus(`É a vez do jogador ${currentPlayer}`);
        }
    }
}

function checkWin() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

function updateScore(player) {
    if (player === 'X') {
        playerXScore++;
    } else if (player === 'O') {
        playerOScore++;
    }

    playerXScoreElement.textContent = `Jogador X: ${playerXScore}`;
    playerOScoreElement.textContent = `Jogador O: ${playerOScore}`;
}

function updateStatus(message) {
    statusElement.textContent = message;
}

function endGame(message) {
    updateStatus(message);
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    updateStatus('É a vez do jogador X');

    for (const cell of cells) {
        cell.textContent = '';
    }
}

resetGame();
