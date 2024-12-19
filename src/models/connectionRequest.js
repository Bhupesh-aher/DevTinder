const mongoose = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",    // refernce to the user collection
        required: true
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true 
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incoorect status type`,
        }
    }
}, 
    {
        timestamps: true
    }
)


// Compound index
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });


// it is like a middleware and before schema save it in DB. it will be called
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself")
    }
    // after this always call next() because it is like a middleware
    // if we you don't call next() then our code will not move ahead
    next(); 
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequest;