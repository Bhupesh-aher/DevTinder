const express = require("express")

const app = express();


app.use("/api", (req, res) => {
    res.send("api ");
    
});

app.use("/hello", (req, res) => {
    res.send("hello ");
    
});



app.use("/", (req, res) => {
    res.send("this is the front page ");
    
});



app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});