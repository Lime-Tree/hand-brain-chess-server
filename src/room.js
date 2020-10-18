const { Chess } = require("chess.js");

module.exports = class Room {
  constructor(id) {
    this.id = id;
    this.game = new Chess();
    this.phase = "lobby";
    this.players = new Map();
    this.currentPlayer = 0;
    this.lastMove = {};
    this.gameState = "";
  }

  chooseRole(userId, role) {
    // 0 wb, 1 wh, 2 bb, 3 wh
    if (this.phase !== "lobby") {
      return;
    }
    this.players.delete(userId);
    this.players.set(userId, role);
    console.log(this.players);
  }

  validatePlayers() {
    let roles  = new Set();
    for (let value of this.players.values()) {
      if (roles.add(value) === false) {
        return false;
      }
    }
    if (roles.size != 4) {
      return false;
    }
    this.phase = "game";
    return true;
  }
}