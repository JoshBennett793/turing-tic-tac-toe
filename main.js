// GLOBAL VARIABLES

var playerOne, playerTwo, players, currentPlayer, gameboard, winningCombo;

// EVENT LISTENERS

window.onload = () => {
  init();
  console.log(gameboard);
  gameboard.updateBoard(1);
  gameboard.checkForWin();
  gameboard.updateBoard(4);
  gameboard.checkForWin();
  gameboard.updateBoard(3);
  gameboard.checkForWin();
  gameboard.updateBoard(7);
  gameboard.checkForWin();
};

// FUNCTIONS

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

    setPlayerToken: function (token) {
      this.player.token = token;
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

    getCurrentPlayer: function () {
      return this.player;
    },

    switchCurrentPlayer: function () {
      this.player = this.player === players[0] ? players[1] : players[0];
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

    updateBoard: function (move) {
      if (!this.board[move]) {
        this.board[move] = currentPlayer.getCurrentPlayer().getPlayerToken();
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
      var currentPlayerToken = currentPlayer
        .getCurrentPlayer()
        .getPlayerToken();

      // create gameboardState array of index positions occupied by currentPlayer's tokens
      for (var i = 0; i < this.board.length; i++) {
        if (this.board[i] === currentPlayerToken) {
          gameboardState.push(i);
        }
      }

      // evaluate each winCondition against the current gameboard state, return boolean
      // if winning condition is found and assign winningCombo to winning condition
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
  return winningCombo.length === 3;
}

function init() {
  playerOne = createPlayer(1, 'X');
  playerTwo = createPlayer(2, 'O');
  players = [playerOne, playerTwo];

  currentPlayer = trackCurrentPlayer(playerOne);

  gameboard = initializeGameboard();
  gameboard.resetBoard();
}

// DOM MANIPULATION
