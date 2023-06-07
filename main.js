// GLOBAL VARIABLES

var playerOne, playerTwo, players, currentPlayer, gameboard;

// EVENT LISTENERS

window.onload = game;

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
      this.player =
        this.player === players[0] ? players[1] : players[0];
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

      // compare stringified version of each array to check for a match
      for (var i = 0; i < winConditions.length; i++) {
          if (
            JSON.stringify(winConditions[i]) === JSON.stringify(gameboardState)
          ) {
            return true;
          } else {
            continue;
          }
      }
      return false;
    },
  };
}

function game() {
  playerOne = createPlayer(1, 'X');
  playerTwo = createPlayer(2, 'O');
  players = [playerOne, playerTwo];

  currentPlayer = trackCurrentPlayer(playerOne);

  gameboard = initializeGameboard();
  gameboard.resetBoard();
}

// DOM MANIPULATION
