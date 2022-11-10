var express = require('express');
var router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.js');

router.post('/', async (req, res, next) => {
    try {
        let user = req.user._id;
        let balance = await newGame(user, username, bet);

        res.json({
            balance: balance
        })

    } catch(error){
        next(error);
    }
});

module.exports = router;