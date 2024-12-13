const express = require("express")

const app = express();



app.get("/user", (req, res) => {
    try{
        const flag =false; 
        // here write logic about DB call and other and get the data 
        // if the DB get the data then it will go to else conditon 
        // otherwise it will go to if condition and it will throght an error
        if(!flag){
            // if from DB we doesn't get the data then just throw an error
            throw new error("err") // this will go to catch stament and will throgh an error
        }
        else{
            // here just send the data back to client
            res.send("data")
        }
        
        
    }catch(err) {
        res.status(500).send("some error contact support team")
        
    }
})




app.listen(7777, () => {
    console.log("server is successfully listening on port 7777...");
});







