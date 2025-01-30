const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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
        enum: {
            values: ["male", "female", "other"],
            message: `{VALUE} is not a valid gender type`
        },
        // validate(value) {
        //     if(!["male", "female", "others"].includes(value)){
        //         throw new Error("Gender data is not valid")
        //     }
        // },
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

// compound index
// we use comppound index in case where we want to serach on 2 fields of doc
// and in case of one field we can give index directly - 
// by doing index : 1
// userSchema.index({firstName: 1, lastName: 1}) 

// user.find({
//     firstName: "akshay",
//     lastName: "singh"
// }) 
// comppound index will make such serach query very fast 



userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id},  process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash)
    return isPasswordValid;
} 


module.exports = mongoose.model("User", userSchema);