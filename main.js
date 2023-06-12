// QUERY SELECTORS

var gameboardCells = document.querySelectorAll('.cell');
var gameboardHeader = document.querySelector('.gameboard-header h1');

// GLOBAL VARIABLES

var store = {
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

window.onload = () => {
  init();

  for (var i = 0; i < gameboardCells.length; i++) {
    gameboardCells[i].onmouseover = (e) => {
      var isValidMove = handleValidityCheck(e);
      if (isValidMove) {
        e.target.classList.add('mouseover');
      }
    };

    gameboardCells[i].onmouseout = (e) => {
      e.target.classList.remove('mouseover');
    };

    gameboardCells[i].onclick = (e) => {
      var cellNum = e.target.dataset.cell;
      var isValidMove = handleValidityCheck(e);

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

    getPlayerNum: function () {
      return this.player.num;
    },

    getPlayerToken: function () {
      return this.player.token;
    },

    getPlayerWins: function () {
      return this.player.wins;
    },

    increaseWins: function () {
      this.player.wins += 1;
    },
  };
}

// Track and Update Current Player

function trackCurrentPlayer(player) {
  return {
    player,

    switchCurrentPlayer: function () {
      this.player =
        this.player === store.players[0] ? store.players[1] : store.players[0];
    },
  };
}

// Initialize and update gameboard and check for win/tie

function initializeGameboard() {
  return {
    board: new Array(9),
    
    resetBoard: function () {
      for (var i = 0; i < this.board.length; i++) {
        this.board[i] = null;
      }
    },

    checkIfValidMove: function (move) {
      return !this.board[move];
    },

    updateBoard: function (move) {
      if (!this.board[move]) {
        this.board[move] = store.currentPlayer.player.getPlayerToken();
      }
    },

    checkForTie: function () {
      return !this.board.includes(null);
    },

    checkForWin: function () {
      var winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      var gameboardState = [];
      var currentPlayerToken = store.currentPlayer.player.getPlayerToken();

      // create gameboardState array of index positions occupied by currentPlayer's tokens
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] === currentPlayerToken) {
          gameboardState.push(i);
        }
      }

      // evaluate each winCondition against the current gameboard state, return boolean
      // if winning condition is found and assign winning condition to winningCombo
      for (var i = 0; i < winConditions.length; i++) {
        var isWin = evaluateWinCondition(gameboardState, winConditions[i]);
        if (isWin) {
          winningCombo = winConditions[i];
          return true;
        } else {
          continue;
        }
      }
      return false;
    },

  };
}

function evaluateWinCondition(state, condition) {
  var winningCombo = [];
  for (var i = 0; i < state.length; i++) {
    if (condition.includes(state[i])) {
      winningCombo.push(state[i]);
    }
  }
  // return true if all 3 win condition elements were found in player's gameboardState
  return winningCombo.length === 3;
}

function handleValidityCheck(e) {
  var cellNum = e.target.dataset.cell;
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
  for (var i = 0; i < store.gameboard.board.length; i++) {
    gameboardCells[cellNum].innerText =
      store.currentPlayer.player.getPlayerToken();
  }
}

function displayWinner(winner) {
  gameboardHeader.innerText = `${winner} wins!`;
}

function updateWins(playerNum, playerWins) {
  var playerScore = document.querySelector(`.p${playerNum}-score`);
  
  if (playerWins === 1) {
    playerScore.innerText = `${playerWins} win`;
  } else {
    playerScore.innerText = `${playerWins} wins`;
  }
}

function handleWin() {
  var currentPlayerToken = store.currentPlayer.player.getPlayerToken();
  var currentPlayerNum = store.currentPlayer.player.getPlayerNum();

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
  for (var i = 0; i < gameboardCells.length; i++) {
    if (winningCombo.includes(parseInt(gameboardCells[i].dataset.cell))) {
      gameboardCells[i].classList.add('winner');
    }
  }
}

function displayNextTurn() {
  gameboardHeader.innerText = `It's ${store.currentPlayer.player.getPlayerToken()}'s turn!`;
}

function resetDOM() {
  for (var i = 0; i < gameboardCells.length; i++) {
    gameboardCells[i].innerText = '';
    gameboardCells[i].classList.remove('winner');
  }
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
    displayNextTurn()
    resetDOM();
  }, 3000);
}
