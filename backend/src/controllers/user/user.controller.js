const { User } = require("../../models/index")


exports.findRanking = async () => {
    try {
        const data = await User.find().sort([['score',-1]]).limit(3);
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
