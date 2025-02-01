const socket = require("socket.io")
const crypto = require('crypto')

const getSecretRoomId = (userId, targetUserId) => {
   return crypto
        .createHash("sha256")
        .update([userId, targetUserId].sort().join("_"))
        .digest("hex");
}

const initializeSocket = (server) => {

    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    })

    io.on("connection", (socket) => {
        
        socket.on("joinChat", ({firstName, userId, targetUserId}) => {

            const roomId = getSecretRoomId(userId, targetUserId)

            // console.log( firstName + " " + "joining room : "   + roomId);
            
            socket.join(roomId)
        });

        socket.on('sendMessage', ({firstName ,userId, targetUserId, text }) => {

            // whatever message i have got, i have  to send that to the particular room

            const roomId = getSecretRoomId(userId, targetUserId)
            // console.log(firstName + " " + text);
            
            // we transfer the message to the room
            io.to(roomId).emit("messageReceived", {firstName, text})
        });


        socket.on('disconnect', () => {

        }); 


    });
}

module.exports = initializeSocket;