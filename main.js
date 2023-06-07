// GLOBAL VARIABLES

var playerOne, playerTwo, players, currentPlayer

// FUNCTIONS

// Initialization

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

// Track current player

function trackCurrentPlayer() {
  return {
    currentPlayer,

    setCurrentPlayer: function (player) {
      this.currentPlayer = player;
    },

    getCurrentPlayer: function () {
      return this.currentPlayer;
    },

    switchCurrentPlayer: function (players) {
      this.currentPlayer =
        this.currentPlayer === players[0] ? players[1] : players[0];
    },
  };
}

playerOne = createPlayer(1, 'X');
playerTwo = createPlayer(2, 'O');
players = [playerOne, playerTwo];

currentPlayer = trackCurrentPlayer();

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
      return !this.board.includes(null)
    }
  };
}
