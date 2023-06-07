// FUNCTIONS

// Initialization

function createPlayer(num, token) {
  var player = {
    num,
    token,
    wins: 0,
  };

  function getPlayerNum() {
    return player.num;
  }

  function getPlayerToken() {
    return player.token;
  }

  function setPlayerToken(token) {
    player.token = token;
  }

  function increaseWins() {
    player.wins += 1;
  }

  return {
    player,
    getPlayerNum,
    getPlayerToken,
    setPlayerToken,
    increaseWins,
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

var currentPlayer = trackCurrentPlayer();

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
  };
}
