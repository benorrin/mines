var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', function(req, res, next) {
    passport.authenticate('register', { session: false }, async function(err, user, info) {
        if (err) {
            return next(err);
        }
        res.json({
            message: 'Register successful',
            user: req.user
        });
    })(req, res, next);
  });

module.exports = router;