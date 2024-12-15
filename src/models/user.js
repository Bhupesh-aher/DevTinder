const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        minLength: 2,
        maxLengh: 50,
    },
    lastName: {
        type: String, 
        minLength: 2,
        maxLengh: 50,
    },
    emailId :{
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        minLength: 2,
        maxLengh: 50,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address : " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        maxLengh: 50,
        validate(value){
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password : " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        },
    },
    photoUrl: { 
        type: String,
        default: "https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo URL : " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is a default about of the user"
    },
    skills: {
        type: [String],
    },
}, 
    {
        timestamps: true,
    }
)



module.exports = mongoose.model("User", userSchema);