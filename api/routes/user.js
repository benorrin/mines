var express = require('express');
var router = express.Router();
const passport = require('passport');
const user = require('../controllers/user.js');

router.post('/', async (req, res, next) => {
    try {
        let userID = req.user._id;
        let balance = await user(userID);

        res.json({
            balance: balance
        })

    } catch(error){
        next(error);
    }
});

module.exports = router;