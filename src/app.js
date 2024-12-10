const express = require("express")

const app = express();





app.get("/user", (req, res) => {
    res.send({
        firstName: "gulu",
        lastName: "singh"
    })
})

app.post("/user", (req, res) => {
    // here we are saving data of user in DB
    res.send("data successfully saved to the database");
})


app.delete("/user", (req, res) => {
    res.send("data deleted");
})


app.use("/user", (req, res) => {
    res.send("HAHAHA")
}) 
// this will match all the http methods(get, post, patch, delete and more) API calls - /test
app.use("/test", (req, res) => {
    res.send("test ")
})






app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});