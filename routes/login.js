var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const login = require('../controllers/login.js');

router.post('/', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        if(err){
            return next(err);
        }
        if(!user){
            const error = new Error('An error occurred.');
            return next(error);
        }
        res.json({
            token: info.token
        });
    })(req, res, next);
});

module.exports = router;
