const express = require("express")
const app = express();
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const http = require('http')
require('dotenv').config()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json()); // to convert json into JS object
app.use(cookieParser()); // to read cookie when it comes from client



const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const initializeSocket = require("./utils/socket");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


const server = http.createServer(app);

initializeSocket(server)


connectDB().then(() => {
    console.log("database connection established..");
    server.listen(process.env.PORT, () => {
        console.log("server is successfully listening on port 7777...");
    });
    
})
.catch(() => {
    console.error("databse connot be connected!")
})









