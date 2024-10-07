const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173/" });

let onlineUser = [];

io.on("connection", async (socket) => {
  // ...

  await socket.on("addNewUser", (userId) => {
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({
        userId,
        socketId: socket.id,
      });

    io.emit("getOnlineUsers", onlineUser);
  });

  socket.on("sendMessage", (message) => {
    console.log(onlineUser)

    const user = onlineUser.find((item) => {
      console.log(item.userId)
      console.log(message.recipientId)
      if (item.userId.toString() === message.recipientId)
      return item;
    });
    console.log(user);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });

  //disconnect user
});

io.listen(8000);
