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


userRouter.get("/feed", userAuth, async(req, res) => {
    try{
        // find all connection request which i have send or received
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1)*limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id },
            ]
        }).select("fromUserId toUserId")

        //   .populate("fromUserId", "firstName")
        //   .populate("toUserId", "firstName")

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            hideUsersFromFeed.add(req.fromUserId.toString())
            hideUsersFromFeed.add(req.toUserId.toString())
        })
        // console.log(hideUsersFromFeed);  // these are the people whom i want to hide from my feed
        
        const users = await User.find({
            $and: [
                {_id: { $nin: Array.from(hideUsersFromFeed) }  },
                {_id: { $ne: loggedInUser._id }}
            ] ,  
        }).select("firstName lastName photoUrl skills about").skip(skip).limit(limit)
    //    .select(USER_SAFE_DATA)
        // console.log(users);
        
        res.json({data: users})
    }
    catch(err){
        res.status(400).json({message: err.message})
    } 
})


module.exports = userRouter;



















// User should see all the user cards except 
// 1. his own card
// 2. his connections
// 3. ignored people
// 4. already sent the connection request to the user

// Array.from(hideUsersFromFeed) 
// so hideUsersFromFeed is a set 
// and to covert that set into an array 
// i have used the Array.from 
// Array.from(hideUsersFromFeed) like this
 

// {_id: { $nin: Array.from(hideUsersFromFeed) }  },
// {_id: { $ne: loggedInUser._id }}

// $nin - not in (not in this array)
// $ne - not equal to


