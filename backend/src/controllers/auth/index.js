const authController = require("./auth.controller")

exports.getUsers = async (req,res) => {
    let users
    try {
        users = await authController.findAll()
    } catch (error) {
        users = error
    }
    res.json(users)
} 

exports.login = async (req,res) => {
    let user
    try {
        user = await authController.login(req.body)
    } catch (error) {
        user = error
    }
    res.json(user)
} 

exports.register = async (req,res) => {
    let user
    try {
        user = await authController.register(req.body)
    } catch (error) {
        user = error
    }
    res.json(user)
} 

exports.deleteOne = async (req,res) => {
    let user 
    try {
        user = await authController.deleteOne(req.params.uuid)
    } catch (err) {
        user = err
    }
    res.json(user)
}