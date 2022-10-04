require('dotenv').config();
const passport = require('passport');
const register = require('../controllers/register.js');
const login = require('../controllers/login.js');
const localStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

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
            const user = await login.checkLogin(username, password);
            const token = await login.getToken(user);
            return done(null, user, { token: token });
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