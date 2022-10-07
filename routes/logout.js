var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.json({
            loggedin: false
        });
    });
});