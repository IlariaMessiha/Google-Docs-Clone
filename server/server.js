const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
//every time our client connects this function is executed
io.on("connection", (socket) => {
  //listening to changes from the client
  socket.on("send-changes", (delta) => {
    socket.broadcast.emit("receive-changes", delta);
  });
});
