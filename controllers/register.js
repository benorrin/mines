
function registerUser(username, password){

}

/**
* Checks if a given username is valid
* 
* @param {string} username Username string to be checked for validity.
* 
* @returns {boolean} Returns true if username is valid. Will throw an error if the username is invalid.
*/

function validateUsername(username){
    if(!username || username === ""){
        const error = Error("Username field is empty");
        throw error;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(username)){
        const error = Error("Username is not a valid email address");
        throw error;
    }

    return true;
}

/**
* Checks if a given password is valid
* 
* @param {string} password Password string to be checked for validity.
* 
* @returns {boolean} Returns true if password is valid. Will throw an error if the password is invalid.
*/

function validatePassword(password){
    if(!password || password === ""){
        const error = Error("Password field is empty");
        throw error;
    }

    if(password.length < 8){
        const error = Error("Password must be more than 8 characters");
        throw error;
    }

    const numRegex = /\d/;
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if(!numRegex.test(password)){
        const error = Error("Password must contain a number");
        throw error;
    }

    if(!symbolRegex.test(password)){
        const error = Error("Password must contain a symbol");
        throw error;
    }

    return true;
}

function createUser(username, password){

}

module.exports = { registerUser, validateUsername, validatePassword, createUser };