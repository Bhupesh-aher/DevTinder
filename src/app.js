const express = require("express")

const app = express();



// app.get("/admin/getAllData", (req, res) => {
//     const tokens = "xyzededded";
//     const isAdminAuthorized = tokens === "xyz";
//     if(isAdminAuthorized){
//         res.send("all data send")
//     }
//     else{  
//         res.status(401).send("unauthorized request");
//     }
// })


// app.get("/admin/deleteUser", (req, res) => {
//     const tokens = "xyzwsss";
//     const isAdminAuthorized = tokens === "xyz";
//     if(isAdminAuthorized){
//         res.send("deletd a user")
//     }
//     else{
//         res.status(401).send("unauthorized request");
//     }
    
// })

const {adminAuth, userAuth} = require("./middlewares/auth")


// handle auth middleware for all GET, POST,... requests
app.use("/admin", adminAuth)
// app.use("/user", userAuth);

app.get("/user", userAuth,(req, res) => {
    console.log("user handler");
    
    res.send("user is sent")
})

app.get("/admin/getAllData", (req, res) => {
    console.log("get all data handler");
    
    res.send("all data sent")
})

app.get("/admin/deleteUser", (req, res) => {
    console.log("delete data handler");

    res.send("deleted a user")
})






app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







