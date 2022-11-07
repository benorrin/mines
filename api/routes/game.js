var express = require('express');
var router = express.Router();
const passport = require('passport');
const newGame = require('../controllers/newGame.js');

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

module.exports = router;