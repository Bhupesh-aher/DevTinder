const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl age gender skills about";

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
        res.status(400).send("Error : " + err.message)
    }

})



userRouter.get("/user/connections", userAuth, async(req, res) => {
    try{

        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ],
        }).populate("fromUserId", USER_SAFE_DATA)
          .populate("toUserId", USER_SAFE_DATA)

        const data = connectionRequest.map((row) =>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId
            }
            return row.fromUserId
        
        })
        
        res.json({data})
        
    }
    catch(err){
        res.status(400).send("Error : " + err.message)

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