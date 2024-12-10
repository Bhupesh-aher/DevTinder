const express = require("express")

const app = express();






// how can you get query param in my req function (route handler or controller)
// we can read query parameter like this -
// /user?userId=3
// how can i read this
// by doing this - 
// console.log(req.query); 
// { userId: '3' }

// app.get("/user", (req, res) => {
//         console.log(req.query);
        
//         res.send({
//             firstName: "gulu",
//             lastName: "singh"
//         })
//     })



// dynamic id in url
// user/102 or user/225
// by doing like this 
///user/:userId", (req, res) => {
//console.log(req.params);
//{ userId: '102' }
// : this means it's a dynamic route

app.get("/user/:userId", (req, res) => {
    console.log(req.params);
    
    res.send({
        firstName: "gulu",
        lastName: "singh"
    })
})


// if we put ? after b then b is optional
// these will work - /abc   /ac     
// these won't work - /ab   /abww / abbbc    
// app.get("/ab?c", (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })


// this means bc is optional
// these will work - /abcd   /ad     
// these won't work - /abc   /abd
// app.get("/a(bc)?d", (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })







// if we put + after b then b can be written as many times you we want
// these will work - /abc   /abbbbbc     
// these won't work - /abeeec   /abbbbccc  

// app.get("/ab+c", (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })



// app.get("/a(bc)+d", (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })




// if we put * after ab and before cd then between ab and cd we can put anything
// these will work - /abcd   /ab25526cd  / abgdge344cd   /abbcd
// these won't work - /ae13cd   /abbd  

// app.get("/ab*cd", (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })




// regex 
// this means in my path if "a" letter is there then path will work
// these will work - /a   /cab /ab / ca
// these won't work - /b       /bc

// app.get(/a/, (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     })
// })


// * means anything in starting and in end fly 
// these will work - /fly /butterfly   /dragonfly
// these won't work - /butterfly1    /fly3

// app.get(/.*fly$/, (req, res) => {
//     res.send({
//         firstName: "gulu",
//         lastName: "singh"
//     }) 
// })


app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});