const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");



const userRouter = express.Router();

// Get all the pending connection request for the loggedIn user

userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    try{
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "skills", "about"]);

    //  }).populate("fromUserId", "firstName lastName photoUrl age gender skills");

        if(connectionRequest.length === 0) {
            return res.status(400).send("No Connection Request Pending")
        }


        res.json({
            message: "You have got connection requests from these people",
            data: connectionRequest,
        })





    }

    catch(err){
        res.json({message: " Connection Request "+status, data})
    }





})


module.exports = userRouter;





    // connectionRequest.forEach(doc => {
        //     User.findOne({
        //         _id: doc.fromUserId
        //     }).then((req) => {
        //         console.log(req);
                
        //     })
        // });