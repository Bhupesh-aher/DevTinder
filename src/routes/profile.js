const express = require("express")
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation")




profileRouter.get("/profile/view", userAuth, async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})



profileRouter.patch("/profile/edit", userAuth, async(req, res) => {
    

    
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;
        // console.log(loggedInUser);
        Object.keys(req.body).every((key) => loggedInUser[key] = req.body[key])
        // console.log(loggedInUser);
        await loggedInUser.save();
        
        // res.send(`${loggedInUser.firstName}, your profile updated successfully`)
        res.json({message: `${loggedInUser.firstName}, your profile updated successfully`, data: loggedInUser,})

         

         
    }
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})

module.exports = profileRouter
