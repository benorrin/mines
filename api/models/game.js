const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const GameSchema = new Schema({
  game_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  bet: {
    type: Number,
    required: true
  },
  moves: {
    type: Number,
    required: true
  },
  gameboard: {
    type: String,
    required: true
  },
  revealed: {
    type: String,
    required: true
  }
});

GameSchema.methods.isValidUser = async function(user_id) {
  const game = this;
  
  if(this.user_id == user_id){
    return true;
  } else {
    return false;
  }
}

GameSchema.methods.isValidGame = async function(gameID) {
  const game = this;
  
  if(this.game_id == gameID){
    return true;
  } else {
    return false;
  }
}

GameSchema.methods.isActive = async function() {
  const game = this;
  
  if(this.status == 0){
    return true;
  } else {
    return false;
  }
}

GameSchema.methods.getRevealed = async function() {
  return JSON.parse(this.revealed);
}

GameSchema.methods.getGameboard = async function() {
  return JSON.parse(this.gameboard);
}

GameSchema.methods.isRevealed = async function(square){
  let revealed = JSON.parse(this.revealed);
  if(revealed.hasOwnProperty(square)){
    return true;
  } else{
    return false;
  }
}

const Game = mongoose.model('Game', GameSchema);
module.exports = Game;
