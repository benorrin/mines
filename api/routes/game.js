var express = require('express');
var router = express.Router();
const passport = require('passport');
const newGame = require('../controllers/newGame.js');
const moveGame = require('../controllers/moveGame.js');
const endGame = require('../controllers/endGame.js');


router.post('/new', async (req, res, next) => {
    try {
        let user = req.user._id;
        let username = req.user.username;
        let bet = req.body.bet;
        let game = await newGame(user, username, bet);

        res.json({
            game_id: game.game_id,
            balance: game.balance
        })

    } catch(error){
        next(error);
    }
});


router.post('/move', async (req, res, next) => {
    try {
        let game_id = req.body.game_id;
        let user = req.user._id;
        let square = req.body.square;

        let game = await moveGame(game_id, user, square);

        res.json({
            game_id: game_id,
            moves: game[0],
            revealed: game[1],
            game_status: game[2]
        })

    } catch(error){
        next(error);
    }
});


router.post('/end', async (req, res, next) => {
    try {
        let game_id = req.body.game_id;
        let user = req.user._id;

        let game = await endGame(game_id, user);

        res.json({
            balance: game[0],
            game_status: game[1]
        })

    } catch(error){
        next(error);
    }
});

module.exports = router;