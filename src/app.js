const express = require("express")
const app = express();
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser()); // to read cookie when it comes from client



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter)




connectDB().then(() => {
    console.log("database connection established..");
    app.listen(7777, () => {
        console.log("server is successfully listening on port 7777...");
    });
    
})
.catch(() => {
    console.error("databse connot be connected!")
})









