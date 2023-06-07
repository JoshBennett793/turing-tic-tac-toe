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
