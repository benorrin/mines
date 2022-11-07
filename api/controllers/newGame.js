const crypto = require('crypto');
const GameModel = require('../models/game.js');
const generateBoard = require('./generateBoard.js');

/**
 * Creates a new game. Generates a random gameboard and creates new document in DB.
 * 
 * @param {string} userID User ID of the player
 * @param {int} numMines The number of mines to be placed on the gameboard.
 * 
 * @returns {string} game_id The unique game ID of the created game.
 */

async function newGame(userID) {
    let game_id = crypto.randomBytes(8).toString('hex');
    let gameboard = await generateBoard(5, 5);

    const game = GameModel.create({
        game_id: game_id,
        user_id: userID,
        status: 0,
        bet: 0,
        moves: 0,
        gameboard: gameboard,
        revealed: "{}"
      });

      return game_id;
}

module.exports = newGame;