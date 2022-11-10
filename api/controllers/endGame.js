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
    const user = await UserModel.findOne({"_id": userID});

    if(game.user_id != userID) {
        const error = new Error('Invalid user');
        throw error;
    }
    
    if(game.status === 1) {
        const error = new Error('Game already ended');
        throw error;
    }
    
    game.status = 1;
    await game.save();
    
    const winnings = game.bet * game.moves;
    
    const newBalance = user.balance + winnings;
    
    user.balance = newBalance;
    await user.save();

    return [newBalance, game.status];
}

module.exports = endGame;