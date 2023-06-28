// QUERY SELECTORS

const gameboardContainer = document.querySelector('.gameboard-grid');
const gameboardCells = document.querySelectorAll('.cell');
const gameboardHeader = document.querySelector('.gameboard-header h1');

// GLOBAL VARIABLES

const store = {
  playerOne: Object,
  playerTwo: Object,
  players: [],
  startingPlayer: Object,
  currentPlayer: Object,
  gameboard: [],
  winningCombo: [],
  gameOver: false,
};

// EVENT LISTENERS

window.onload = init;

gameboardContainer.onmouseover = e => {
  const isValidMove = handleValidityCheck(e);
  if (isValidMove) {
    e.target.classList.add('mouseover');
  }
};

gameboardContainer.onmouseout = e => {
  e.target.classList.remove('mouseover');
};

gameboardContainer.onclick = e => {
  const cellNum = e.target.dataset.cell;
  const isValidMove = handleValidityCheck(e);

  if (isValidMove) {
    handleMove(e, cellNum);
  }

  if (store.gameboard.checkForWin() && !store.gameOver) {
    handleWin();
  } else if (store.gameboard.checkForTie()) {
    handleTieGame();
  } else if (isValidMove) {
    store.currentPlayer.switchCurrentPlayer();
    displayNextTurn();
  }
};

// FUNCTIONS & HANDLERS

// DATA MODEL

// Create and Update Player Object

function createPlayer(num, token) {
  return {
    player: {
      num,
      token,
      wins: 0,
    },

    getPlayerNum() {
      return this.player.num;
    },

    getPlayerToken() {
      return this.player.token;
    },

    getPlayerWins() {
      return this.player.wins;
    },

    increaseWins() {
      this.player.wins += 1;
    },
  };
}

// Track and Update Current Player

function trackCurrentPlayer(player) {
  return {
    player,

    switchCurrentPlayer() {
      this.player =
        this.player === store.players[0] ? store.players[1] : store.players[0];
    },
  };
}

// Initialize and update gameboard and check for win/tie

function initializeGameboard() {
  return {
    board: new Array(9),

    resetBoard() {
      for (let i = 0; i < this.board.length; i++) {
        this.board[i] = null;
      }
    },

    checkIfValidMove(move) {
      return !this.board[move];
    },

    updateBoard(move) {
      if (!this.board[move]) {
        this.board[move] = store.currentPlayer.player.getPlayerToken();
      }
    },

    checkForTie() {
      return !this.board.includes(null);
    },

    checkForWin() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const currentPlayerToken = store.currentPlayer.player.getPlayerToken();
      const isWin = winConditions.find(condition =>
        condition.every(index => this.board[index] === currentPlayerToken),
      );

      if (isWin) {
        store.winningCombo = isWin;
      }

      return isWin;
    },
  };
}

function handleValidityCheck(e) {
  const cellNum = e.target.dataset.cell;
  // returns true if data model gameboard cell that matches UI gameboard
  // cell is null and gameOver is set to false
  return store.gameboard.checkIfValidMove(cellNum) && !store.gameOver;
}

function init() {
  store.playerOne = createPlayer(1, 'X');
  store.playerTwo = createPlayer(2, 'O');
  store.players = [store.playerOne, store.playerTwo];

  store.currentPlayer = trackCurrentPlayer(store.playerOne);
  store.startingPlayer = store.playerOne;

  store.gameboard = initializeGameboard();
  store.gameboard.resetBoard();
}

// DOM MANIPULATION

function renderToken(cellNum) {
  gameboardCells[cellNum].innerText =
    store.currentPlayer.player.getPlayerToken();
}

function displayWinner(winner) {
  gameboardHeader.innerText = `${winner} wins!`;
}

function updateWins(playerNum, playerWins) {
  const playerScore = document.querySelector(`.p${playerNum}-score`);

  switch (playerWins) {
    case 1:
      playerScore.innerText = `${playerWins} win`;
      break;
    default:
      playerScore.innerText = `${playerWins} wins`;
  }
}

function handleWin() {
  const currentPlayerToken = store.currentPlayer.player.getPlayerToken();
  const currentPlayerNum = store.currentPlayer.player.getPlayerNum();

  store.gameOver = true;
  displayWinner(currentPlayerToken);
  displayWinningCombo();
  store.currentPlayer.player.increaseWins();
  updateWins(currentPlayerNum, store.currentPlayer.player.getPlayerWins());
  handleGameReset();
}

function displayTieGame() {
  gameboardHeader.innerText = 'Tie Game!';
}

function handleTieGame() {
  store.gameOver = true;
  displayTieGame();
  handleGameReset();
}

function handleMove(e, cellNum) {
  store.gameboard.updateBoard(cellNum);
  renderToken(cellNum);
  e.target.classList.remove('mouseover');
}

function displayWinningCombo() {
  gameboardCells.forEach(cell => {
    if (store.winningCombo.includes(parseInt(cell.dataset.cell))) {
      cell.classList.add('winner');
    }
  });
}

function displayNextTurn() {
  gameboardHeader.innerText = `It's ${store.currentPlayer.player.getPlayerToken()}'s turn!`;
}

function resetDOM() {
  gameboardCells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('winner');
  });
}

function handleGameReset() {
  setTimeout(() => {
    store.gameOver = false;
    store.gameboard.resetBoard();
    store.currentPlayer.player =
      store.startingPlayer === store.players[0]
        ? store.players[1]
        : store.players[0];
    store.startingPlayer = store.currentPlayer.player;
    displayNextTurn();
    resetDOM();
  }, 3000);
}
