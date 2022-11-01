const userController = require("./user.controller")
const copUserController = require("./copuser.controller")

exports.getRankingUsers = async (req,res) => {
    let users
    try {
        users = await userController.findAll()
    } catch (error) {
        users = error
    }
    res.json(users)
} 

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

exports.getRankingCopUsers = async (req,res) => {
    let users
    try {
        users = await copUserController.findAllCop()
    } catch (error) {
        users = error
    }
    res.json(users)
} 

exports.getCopUsers = async (req,res) => {
    let users
    try {
        users = await copUserController.findRanking()
        let user = await copUserController.findOne(req.params.uuid)
        users.push(user)
    } catch (err) {
        users = err
    }
    res.json(users)
}

exports.addCopScore = async (req,res) => {
    let user
    try {
        user = await copUserController.addCopScore(req.params.uuid)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.resetCopScore = async (req,res) => {
    let user
    try {
        user = await copUserController.resetScore(req.params.uuid)
    } catch (err) {
        user = err
    }
    res.json(user)
}