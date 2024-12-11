const express = require("express")

const app = express();

app.use("/", (err, req, res, next) => {
    if(err) {
        console.log("error 2");
        
        res.status(500).send("something went wrong 2")
    }
})

app.get("/getUserData" , (req, res, next) => {
    // const flag = false;
    // try{
        // if(flag){
            throw new error("jsbjb")
            res.send("user data is sent")
           
            
        // }
        // else {
        // }
    // }
    // catch(err) {
    //     res.status(500).send("contact support team")
    // }
})


app.use("/", (err, req, res, next) => {
    if(err) {
        console.log("error");
        
        res.status(500).send("something went wrong")
    }
})





app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







