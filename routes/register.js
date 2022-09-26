var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', passport.authenticate('register', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Register successful',
            user: req.user
        });
    }
);

module.exports = router;