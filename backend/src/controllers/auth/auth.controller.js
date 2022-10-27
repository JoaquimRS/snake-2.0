const { User } = require("../../models/index")


exports.findAll = async () => {
    try {
        const data = await User.find();
        return data;
    } catch (err) {
        return err;
    }
  };

exports.login = async (userInfo) => {
    try {
        const data = await User.findOne({user:userInfo.user});
        
        if (await data.validatePassword(userInfo.password)) {
            return data.toJSONFor()
        } else {
            return {msg: "User or password incorrects"};
        }
    } catch (err) {
        return err;
    }
};

exports.register = async (userInfo) => {
    try {
        const data = await User.create(userInfo)
        return data.toJSONFor()
    } catch (err) {
        return err
    }
}

exports.deleteOne = async (uuid) => {
    try {
        const data = await User.findOneAndDelete({"uuid":uuid})
        return {msg:"User removed correctly", data:data};
    } catch (err) {
        return err;
    }
}