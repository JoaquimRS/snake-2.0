const { Promise } = require("mongoose");
const { User } = require("../../models/index")

exports.findAll = async () => {
    try {
        const data = await User.find().sort([['maxscore',-1]]);
        return data.map(user => user.toScore());
    } catch (err) {
        return err;
    }
  };


exports.findRanking = async () => {
    try {
        const data = await User.find().sort([['maxscore',-1]]).limit(3);
        return data.map(user => user.toScore());
    } catch (err) {
        return err;
    }
  };

exports.findOne = async (uuid) => {
    try {
        const data = await User.findOne({uuid:uuid})
        return data.toScore()
    } catch (err) {
        return err
    }
}

exports.addScore = async (uuid) => {
    try {
        const data = await User.findOneAndUpdate({uuid:uuid},{$inc:{score:1}})
        
        if ( data.score >= data.maxscore) {
            data = await User.findOneAndUpdate({uuid:uuid},{$set:{maxscore:data.score+1}})
            
        }
        return data
    } catch (err) {
        return err
    }
}

exports.resetScore = async (uuid) => {
    try {
        const data = await User.findOneAndUpdate({uuid:uuid},{$set:{score:0}})
        return data
    } catch (err) {
        return err
    }
}
