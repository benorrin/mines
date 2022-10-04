const passport = require('passport');
const jwt = require('jsonwebtoken');

async function login(){
    try {
        if (err || !user) {
            const error = new Error('An error occurred.');
            return next(error);
        }

        req.login( user, { session: false }, async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, username: user.username };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');

            return res.json({ token });
        });
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