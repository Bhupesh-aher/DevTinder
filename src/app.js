const express = require("express")

const app = express();



app.use("/user", 
    (req, res, next) => {
    // request handler 
    console.log("request handler!!!");
    // res.send("1st response")
    next();

}, (req, res, next) => {
    console.log("request handler 2 !!!!!");
    next();
    
}, (req, res, next) => {
    console.log("request handler 3 !!!!!");
    // res.send("3rd response")
    next()
    
}, (req, res, next) => {
    console.log("request handler 4 !!!!!");
    // res.send("4th response")
    next();
    
}, (req, res, next) => {
    console.log("request handler 5 !!!!!");
    // res.send("5th response")
    next();
    
})

// in this way we can create multiple request handlers for one route

// and we can do the same thing for all the http methods as well 
// here we done this with app.use 
// but we can do all this with app.get, post, patch, delete and other methods as well 

// app.use("/user", rh1, rh2, rh3, rh4, rh5)
// app.use("/user", [rh1, rh2, rh3, rh4, rh5])
// app.use("/user", rh1, [rh2, rh3], rh4, rh5)
// app.use("/user", rh1, [rh2], rh3, rh4, rh5)

// they will give the same output 
// there will be no imapct on output

app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







