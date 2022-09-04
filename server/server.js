const cors = require("cors");
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://127.0.0.1:5500", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("send-message", (message, room) => {
    /**
     * 
     *  // send to others except the sender
    socket.broadcast.emit("receive-message", message);
*/

    // rooms
    if (!room) {
      socket.broadcast.emit("receive-message", message);
    }
    socket.to(room).emit("receive-message", message);
  });

  //   joining rooms
  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`You joined ${room}`);
  });
});

instrument(io, { auth: false });
