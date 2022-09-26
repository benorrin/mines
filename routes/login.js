var express = require('express');
var router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const login = require('../controllers/login.js');

router.post('/', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        await login(err, user);
    })(req, res, next);
});

module.exports = router;
