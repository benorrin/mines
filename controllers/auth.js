require('dotenv').config();
const passport = require('passport');
const register = require('../controllers/register.js');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/user.js');

passport.use('register', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await register.registerUser(username, password);
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }
));

passport.use('login', new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    async (username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });

            if (!user) {
                return done(null, false, { message: 'User not found' });
            }

            const validate = await user.isValidPassword(password);

            if (!validate) {
                return done(null, false, { message: 'Wrong Password' });
            }

            return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
            return done(error);
        }
    }
));

passport.use(new JWTstrategy({
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
        try {
            return done(null, token.user);
        } catch (error) {
            done(error);
        }
    }
)
);