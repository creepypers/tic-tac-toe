let circleTurn;
let selectedSymbol;
let cellElements;
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const WINNING_COMBINATION = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
const WINNING_COMBINATION_4x4 = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12],
];
const WINNING_COMBINATION_5x5 = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
];

const restartButton = document.getElementById("restartButton");
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');

restartButton.addEventListener('click', startGame);

function envoyerFormulaire(event) {
    event.preventDefault(); 
    document.getElementById("difficulteSection").style.display = "block";
    document.getElementById("inscriptionSection").style.display = "none";
}


function commencerJeu(event) {
    event.preventDefault(); 
    document.getElementById("jeuSection").style.display = "block";
    document.getElementById("difficulteSection").style.display = "none";

    const symboleRadios = document.getElementsByName("symbole");
    for (const radio of symboleRadios) {
        if (radio.checked) {
            selectedSymbol = radio.value;
            break;
        }
    }

    startGame(selectedSymbol);
}
function abandonnerJeu() {
    document.getElementById("jeuSection").style.display = "none";
    document.getElementById("scoreSection").style.display = "block";
}

function displayPlayerTurn() {
    document.querySelectorAll('.player-turn-messages').forEach(element => element.remove());

    const playerTurnMessages = document.createElement('div');
    playerTurnMessages.classList.add('player-turn-messages');
    document.getElementById('jeuSection').insertBefore(playerTurnMessages, document.getElementById('board'));

    const turnMessageElement = document.createElement('div');
    turnMessageElement.classList.add('player-turn-message');
    
    if (circleTurn) {
        turnMessageElement.innerText = "C'est le tour de X";
    } else {
        turnMessageElement.innerText = "C'est le tour de O";
    }

    playerTurnMessages.appendChild(turnMessageElement);
}


var difficulte;
function startGame(startingSymbol) {
    circleTurn = startingSymbol === 'o';

    const difficultySelect = document.getElementById("difficulty");
    const selectedDifficulty = parseInt(difficultySelect.value, 10);
    let winningCombinations;
    switch (selectedDifficulty) {
        case 4:
            winningCombinations = WINNING_COMBINATION_4x4;
            difficulte="Moyen"
            break;
        case 5:
            winningCombinations = WINNING_COMBINATION_5x5;
            difficulte="Difficile"
            break;
        default:
            winningCombinations = WINNING_COMBINATION;
            difficulte="Facile"
    }

    const numCells = selectedDifficulty * selectedDifficulty;

    board.innerHTML = '';

    for (let i = 0; i < numCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.cell = '';
        board.appendChild(cell);
    }
    board.style.gridTemplateColumns = `repeat(${selectedDifficulty}, 1fr)`;

    cellElements = document.querySelectorAll('[data-cell]');

    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });

    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    displayPlayerTurn();

}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw) {
    if (draw) {
        sauvegarderResultat(difficulte, 'nulle');
    } else {
        sauvegarderResultat(difficulte, 'gagné');
    }
    window.location.href = 'resultats.html';
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
    displayPlayerTurn();
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) board.classList.add(CIRCLE_CLASS);
    else board.classList.add(X_CLASS);

}

function checkWin(currentClass) {
    const currentWinningCombinations = getWinningCombinations();
    return currentWinningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function getWinningCombinations() {
    const difficultySelect = document.getElementById("difficulty");
    const selectedDifficulty = parseInt(difficultySelect.value, 10);

    switch (selectedDifficulty) {
        case 4:
            return WINNING_COMBINATION_4x4;
        case 5:
            return WINNING_COMBINATION_5x5;
        default:
            return WINNING_COMBINATION;
    }
}
document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    form.addEventListener('submit', function(event) {
        var nom = document.getElementById('nom').value.trim();
        var prenom = document.getElementById('prenom').value.trim();
        var sexe = document.querySelector('input[name="sexe"]:checked');
    });
});
function sauvegarderResultat(difficulte, resultat) {
    localStorage.setItem('difficulte', difficulte);
    localStorage.setItem('resultat', resultat);
}

