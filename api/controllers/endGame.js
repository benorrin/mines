const GameModel = require('../models/game.js');
const UserModel = require('../models/user.js');

/**
 * Ends a specific game submitted to the server
 * 
 * @param {string} gameID Unique identifier of the game the move will be processed on.
 * @param {string} userID Unique identifier of the user submitting the move request.
 * 
 * @returns {array} gameBoard The generated gameboard in array form. 1 respresents mines, 0 represents free squares.
 */

async function endGame(gameID, userID) {
    const game = await GameModel.findOne({"game_id": gameID});
    const user = await UserModel.findone({"_id": userID});

    return [500, 1];
}

module.exports = endGame;