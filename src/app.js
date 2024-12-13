const express = require("express")

const app = express();
const User = require('./models/user')
const connectDB = require("./config/database")

app.post("/signup", async(req, res) => {

    const user = new User({
        firstName: "deepika",
        lastName: "padukon",
        emailId: "deepika@padukom.com",
        password: "deepika@123",
    });

    try{
        await user.save();
        res.send("User added successfully!")
    }
    catch(err){
        res.status(400).send("Error saving the user:" + err.message);
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









