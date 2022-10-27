const userController = require("./user.controller")

exports.getUsers = async (req,res) => {
    let users
    try {
        users = await userController.findRanking()
        let user = await userController.findOne(req.params.uuid)
        users.push(user)
    } catch (error) {
        users = error
    }
    res.json(users)
} 

exports.addScore = async (req,res) => {
    let user
    try {
        user = await userController.addScore(req.params.uuid)
    } catch (error) {
        user = error
    }
    res.json(user)
} 

exports.resetScore = async (req,res) => {
    let user
    try {
        user = await userController.resetScore(req.params.uuid)
    } catch (error) {
        user = error
    }
    res.json(user)
} 