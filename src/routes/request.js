const express = require("express")
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");



requestRouter.post("/request/send/:status/:toUserId", userAuth, async(req, res) => {
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignored"]
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message: `Invalid status type : ${status}`
            })
        }


        // checking whether toUserId exist in my DB or not
        const toUser = await User.findOne({_id: toUserId})
        if(!toUser){
            return res.status(404).json({ message : "User Not Found" })
        }

     
        // If there is an existing connection request
        
        const existConnectionRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserId: fromUserId, toUserId: toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ],
        })
        
        if(existConnectionRequest){
            return res.status(400).send({message : "Connection Request Already Exists"})
        }

        
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();
        res.json({
            message: req.user.firstName + " is " + status + " in " + toUser.firstName,
            data,
        })
    }

    catch(err){
        res.status(400).send("Error : " + err.message)
    }

})



requestRouter.post("/request/review/:status/:requestId", userAuth, async(req, res) => {

    try{
        const loggedInUser = req.user;
        const {status, requestId} = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send("Status not allowed")
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id: requestId,
            toUserId: loggedInUser,
            status: "interested"
        })
        if(!connectionRequest) {
            return res.status(404).json({ message: "Connection Request Not Found" })
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({message: " Connection Request "+status, data})
    }
    
    catch(err){
        res.status(400).send("Error : " + err.message)
    }
})



module.exports = requestRouter