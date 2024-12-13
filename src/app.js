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







connectDB().then(() => {
    console.log("database connection established..");
    app.listen(7777, () => {
        console.log("server is successfully listening on port 7777...");
    });
    
})
.catch(() => {
    console.error("databse connot be connected!")
})









