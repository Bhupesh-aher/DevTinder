const express = require("express")

const app = express();



app.use("/user", (req, res, next) => {
    console.log("request handler 2 !!");
    res.send("2nd response")
    next();
    
})

app.use("/user", (req, res, next) => {
    // Route handler 
    console.log("request handler !!");
    // res.send("1st response")
    next();
})







app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







