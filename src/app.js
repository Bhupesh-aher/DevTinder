const express = require("express")

const app = express();
const User = require('./models/user')
const connectDB = require("./config/database")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userAuth} = require("./middlewares/auth")

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






app.get("/profile", userAuth, async (req, res) => {

    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        res.status(400).send("Error : " + err.message);
    }
})

app.post("/sendConnectionRequest", userAuth, async(req, res) => {
    res.send("Connection Request sent")
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









