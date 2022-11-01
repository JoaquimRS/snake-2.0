const { Promise } = require("mongoose");
const { CopUser } = require("../../models/index")

exports.findAllCop = async () =>{
    try {
        const data = await CopUser.find().sort([['maxscore',-1]]);
        return data.map(user => user.toScore());
    } catch (err) {
        return err;
    }
}

exports.findRanking = async () => {
    try {
        const data = await CopUser.find().sort([['maxscore',-1]]).limit(3);
        return data.map(user => user.toScore());
    } catch (err) {
        return err;
    }
  };


exports.findOne = async (uuid) => {
    try {
        const data = await CopUser.findOne({uuid:uuid})
        return data.toScore()
    } catch (err) { 
        return err;
    }
}

exports.addCopScore = async (uuid) => {
    try {
        if (!await CopUser.findOne({uuid:uuid})) {
            await CopUser.create({uuid:uuid})
        }
        const data = await CopUser.findOneAndUpdate({uuid:uuid},{$inc:{score:1}})
        if ( data.score >= data.maxscore) {
            data = await CopUser.findOneAndUpdate({uuid:uuid},{$set:{maxscore:data.score+1}})
        }
        return data.toScore()
    } catch (err) {
        return err;
    }
}

exports.resetScore = async (uuid) => {
    try {
        const data = await CopUser.findOneAndUpdate({uuid:uuid},{$set:{score:0}})
        return data
    } catch (err) {
        return err
    }
}