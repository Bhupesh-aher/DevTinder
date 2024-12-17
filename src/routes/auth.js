const express = require("express")
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation")
const User = require('../models/user')
const bcrypt = require("bcrypt");






authRouter.post("/signup", async(req, res) => {

    try{
        // validation of data
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10)

        // creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
 
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

authRouter.post("/login", async(req, res) => {

    try{
        const {emailId, password} =req.body;
        const user = await User.findOne({emailId: emailId})

        if(!user){
            throw new Error("Invalid credentials");
        }                                             // passwordInputByUser
        const isPasswordValid = await user.validatePassword(password)

        if(isPasswordValid){
            const token = await user.getJWT();
            res.cookie("token", token)
            res.send("Login successfull !!")
        }

        else {
            throw new Error("Wrong password")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})



module.exports = authRouter