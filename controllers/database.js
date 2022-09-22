require('dotenv').config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI).then(
    () => {
        console.log('Connected to MongoDB');
    },
    err => {
         console.log('Error connecting to MongoDB: ');
         console.log(err);
        }
  );

module.exports = mongoose.connection;