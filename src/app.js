const express = require("express")

const app = express();





app.use("/user", 
    (req, res, next) => {
    // Route handler 
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







//  "/user",   this is called as router/route
// and this is router handler - this function is known as route handler
// (req, res, next) => {
        // route handler
//     console.log("request handler 2 !!!!!");
//     next();
    
// }

// one route can also have multuiple route handlers
// in this way we can create multiple route handlers for one route


// and we can do the same thing for all the http methods as well 
// here we did this with app.use 
// but we can do all this with app.get, post, patch, delete and other methods as well 

// app.use("/user", rh1, rh2, rh3, rh4, rh5)
// app.use("/user", [rh1, rh2, rh3, rh4, rh5])
// app.use("/user", rh1, [rh2, rh3], rh4, rh5)
// app.use("/user", rh1, [rh2], rh3, rh4, rh5)

// they will give the same output 
// there will be no impact on output they will behave in same way as they use to

app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







