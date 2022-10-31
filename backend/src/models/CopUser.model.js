const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const CopUserSchema = mongoose.Schema({
    uuid:{
        type:String,
        unique:true,
        required:true,
    },
    score:{
        type:Number
    },
    maxscore:{
        type:Number
    }

});
CopUserSchema.plugin(uniqueValidator,{message:"is already taken"})

CopUserSchema.pre("validate",async function (next) {
    this.score = 0
    this.maxscore = 0
    next()
})

CopUserSchema.methods.toScore = function () {
    return {
        user: this.uuid,
        score: this.score,
        maxscore: this.maxscore
    }
}

module.exports = mongoose.model("CopUser", CopUserSchema);