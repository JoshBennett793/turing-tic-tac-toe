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

function initializeGameboard() {
  var board = new Array(9);

  function resetBoard() {
    for (var i = 0; i < board.length; i++) {
      board[i] = null;
    }
    return board;
  }

  return {
    board,
    resetBoard,
  };
}
