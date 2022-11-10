const UserModel = require('../models/user.js');

async function user(userID) {
    try {
        const user = await UserModel.findOne({"_id": userID});

        return user.balance;
    } catch (error){
        throw error;
    }
}

module.exports = user;