const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var argon2 = require('argon2')

const UserSchema = mongoose.Schema({
    uuid:{
        type:String,
        unique:true
    },
    user:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:3
        
    },
    img:{
        type:String,
    },
    score:{
        type:Number
    },
    maxscore:{
        type:Number
    }

});
UserSchema.plugin(uniqueValidator,{message:"is already taken"})

UserSchema.pre("validate",async function (next) {
    if (!this.uuid) {
        this.uuidGenerate()
    }
    if (!this.img) {
        this.img = "https://avatars.dicebear.com/api/avataaars/"+ this.user +".svg"
    }
    this.score = 0
    this.maxscore = 0
    this.password = await this.hashPassword()
    next()
})

UserSchema.methods.hashPassword = async function() {
    return await argon2.hash(this.password)
}

UserSchema.methods.validatePassword = async function(password) {
    return await argon2.verify(this.password,password)
}

UserSchema.methods.uuidGenerate = function () {
    this.uuid = 
        'snake2.0|' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

UserSchema.methods.toJSONFor = function () {
    return {
        uuid: this.uuid,
        user: this.user,
        img: this.img,
        score: this.score,
        maxscore: this.maxscore
    }
}

UserSchema.methods.toScore = function () {
    return {
        user: this.user,
        img: this.img,
        score: this.score,
        maxscore: this.maxscore
    }
}

module.exports = mongoose.model("User", UserSchema);