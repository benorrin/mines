const crypto = require('crypto');
const GameModel = require('../models/game.js');
const UserModel = require('../models/user.js');
const generateBoard = require('./generateBoard.js');
const login = require('../controllers/login.js');


/**
 * Creates a new game. Generates a random gameboard and creates new document in DB.
 * 
 * @param {string} userID User ID of the player
 * @param {int} numMines The number of mines to be placed on the gameboard.
 * 
 * @returns {string} game_id The unique game ID of the created game.
 */

async function newGame(userID, username, bet) {

    const user = await UserModel.findOne({ username });

    if (!user) {
        const error = new Error('User not found');
        throw error;
    }

    const sufficientBalance = await user.checkBalance(bet);

    if(!sufficientBalance) {
        const error = new Error('Insufficient balance');
        throw error;
    }

    const userBalance = await user.deductBalance(bet);

    try {
        let game_id = crypto.randomBytes(8).toString('hex');
        let gameboard = await generateBoard(5, 5);

        const game = GameModel.create({
            game_id: game_id,
            user_id: userID,
            status: 0,
            bet: bet,
            moves: 0,
            gameboard: gameboard,
            revealed: "{}"
        });

        return {game_id: game_id, balance: userBalance};

    } catch(error){
        throw error;
    }
}

module.exports = newGame;