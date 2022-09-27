
function registerUser(username, password){

}

/**
* Checks if a given username is valid
* 
* @param {string} username Username string to be checked for validity.
* 
* @returns {boolean} True is username is valid. Will throw an error if the username is invalid.
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

function validatePassword(password){

}

function createUser(username, password){

}

module.exports = { registerUser, validateUsername, validatePassword, createUser };