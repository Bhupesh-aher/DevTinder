const express = require("express")

const app = express();
const User = require('./models/user')
const connectDB = require("./config/database")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")

app.use(express.json());
app.use(cookieParser()); // to read cookie when it comes from client

// Sign up API  
app.post("/signup", async(req, res) => {

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

// Login API
app.post("/login", async(req, res) => {

    try{
        const {emailId, password} =req.body;

        const user = await User.findOne({emailId: emailId})
        if(!user){
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(isPasswordValid){
            // Create a JWT Token                            secret key/password which only server knows and user don't know about this it only for server 
            const token = await jwt.sign({_id: user._id}, )
           
            

            // add the token to cookie and send the response back to the user
            res.cookie("token", token)
            res.send("Login successfull !!")
        }
        else{
            throw new Error("Wrong password")
        }
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

app.get("/profile",async (req, res) => {

    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token) {
            throw new Error("Invalid Token")
        }
        console.log(token);
        
    
    
        // validate the token                             signature/ secret key which only server knows and user don't know about this it only for server  
        const decodeMessage = await jwt.verify(token,)
        console.log(decodeMessage);
        
        const {_id} = decodeMessage;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("Please login again")

        }
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
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
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"]
        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        
        if(!isUpdateAllowed){
            throw new Error("Update not allowed")
        }
        if(data?.skills?.length > 10){
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









