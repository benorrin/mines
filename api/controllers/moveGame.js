const GameModel = require('../models/game.js');

/**
 * Proccesses a game move submitted to the server
 * 
 * @param {string} gameID Unique identifier of the game the move will be processed on.
 * @param {string} userID Unique identifier of the user submitting the move request.
 * @param {int} square The square the user has requested to be revealed.
 * 
 * @returns {array} gameBoard The generated gameboard in array form. 1 respresents mines, 0 represents free squares.
 */

async function moveGame(gameID, userID, square) {
    const game = await GameModel.findOne({"game_id": gameID});

    if(game.user_id != userID) {
        const error = new Error('Invalid user');
        throw error;
    }

    let revealed = await game.getRevealed();
    let gameBoard = await game.getGameboard();

    if(game.isRevealed(square)){
        let revealedSquare = gameBoard[square];
        revealed[square] = revealedSquare;

        revealedSquare == 1 ? game_status = 1 : game_status = 0;

        game.moves++;
        game.revealed = JSON.stringify(revealed);
        await game.save();
    }

    return [ game.moves, revealed, game_status]
}

module.exports = moveGame;