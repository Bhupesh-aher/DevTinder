const express = require("express")

const app = express();
const User = require('./models/user')
const connectDB = require("./config/database")

app.use(express.json());

// Sign up API 
app.post("/signup", async(req, res) => {

    // creating a new instance of the user model
    const user = new User(req.body);
 
    try{
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
    }
    
})


// Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{    
      const user = await User.findOne({emailId: userEmail})
      if(!user) {
        res.status(400).send("cannot find user with this email Id")
      }
      else{
        res.send(user);
      }
      
    }
    catch(err) {
        res.status(400).send("something went wrong ")
    }
})


// Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err) {
        res.status(400).send("something went wrong ")
    }

})

// Delete a user from the database
app.delete("/user", async(req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findOneAndDelete({_id: userId})
        // this below line is a short hand for above line
        // const user = await User.findByIdAndDelete(userId)
        res.send("user deleted succesfully")
    }
    catch{
        res.status(400).send("something went wrong ")
        
    }
})

 
// update data of the user
app.patch("/user/:userId",async (req, res) => {
    
    // const userId = req.body.userId;
    const userId = req.params?.userId;
    const data = req.body;
    

    try{
        const ALLOWED_UPDATES = ["photUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        if(data?.skills.length > 10){
            throw new Error("Skills cannot be more than 10")
        }

        await User.findByIdAndUpdate({_id: userId}, data, {runValidators: true,})   
        res.send("user updated successfully")
    }   
    catch(err) {
        res.send("Update Failed : " + err.message)
    }
})




connectDB().then(() => {
    console.log("database connection established..");
    app.listen(7777, () => {
        console.log("server is successfully listening on port 7777...");
    });
    
})
.catch(() => {
    console.error("databse connot be connected!")
})









