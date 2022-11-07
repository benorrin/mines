const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 1000000
    }
});

UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

/**
* Checks if a given password matches the users registered password
* 
* @param {string} password Password string to be checked for validity.
* 
* @returns {boolean} True is password is valid, False if password is not valid.
*/

UserSchema.methods.isValidPassword = async function(password) {
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
  
    return compare;
}


/**
* Checks if user has sufficient balance for a bet
* 
* @param {integer} bet Bet amount to be placed
* 
* @returns {boolean} True if user has sufficient balance, false if not.
*/

UserSchema.methods.checkBalance = async function(bet) {
    const user = this;
    
    const compare = (user.balance - bet) >= 0 ? true : false;
  
    return compare;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;