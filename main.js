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

  return resetBoard;
}

function trackCurrentPlayer() {
  var currentPlayer;

  function setCurrentPlayer(player) {
    currentPlayer = player;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  return {
    currentPlayer,
    setCurrentPlayer,
    getCurrentPlayer,
  };
}

var playerOne = createPlayer(1, 'X');
var playerTwo = createPlayer(2, 'O');
console.log('playerOne: ', playerOne.player);
console.log('playerTwo: ', playerTwo.player);
var currentPlayer = trackCurrentPlayer();
currentPlayer.setCurrentPlayer(playerTwo.player.num)
console.log(currentPlayer.getCurrentPlayer());