const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');


/**
* Handles user login. Checks username/password and returns a session token.
* 
* @param {string} username Username to login
* @param {string} password Password of given username
* 
* @returns {object} Returns token session object if success. Throws error if fails.
*/

async function login(username, password){
    try {
        const user = this.checkLogin(username, password);
        const token = this.getToken(user);
        return token;
    } catch (error) {
        return next(error);
    }
}


/**
* Returns a user object for a given username
* 
* @param {string} username Username of user to retrieve
* 
* @returns {object} Returns user object if success. Will throw an error if user does not exist, or if retrieval failed.
*/

async function getUser(username){
    try{
        const user = await UserModel.findOne({ username });

        if (!user) {
            const error = new Error('User not found');
            throw error;
        }

        return user;
    } catch(error){
        throw error;
    }
}


/**
* Checks if a given password is valid for a given user object
* 
* @param {object} user User object to check the password against
* @param {string} password Password to check for validity.
* 
* @returns {boolean} Returns true if password is correct. Will throw an error if password is incorrect.
*/

async function checkPassword(user, password){
    const validPassword = await user.isValidPassword(password);

    if (!validPassword) {
        const error = new Error('Invalid password');
        throw error;
    }
    return true;
}


/**
* Checks if a given username and password are valid
* 
* @param {string} username Username to be checked
* @param {string} password Password to checked
* 
* @returns {object} Returns user object if login is correct. Will throw an error if login is incorrect.
*/

async function checkLogin(username, password){
    try{
        const user = await this.getUser(username);
        if(this.checkPassword(user, password)){
            return user;
        }
    } catch(error){
        throw error;
    }
}


/**
* Generates a session token for a user
* 
* @param {object} user User object to generate session token for
* 
* @returns {object} Returns token session object if success. Throws error if fails.
*/

async function getToken(user){
    try{
        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');
        return token;
    } catch(error){
        throw error;
    }
}

module.exports = { login, getUser, checkPassword, checkLogin, getToken };