const mongoose = require("mongoose");
const Document = require("./Document");
const defaultValue = "";

const mongodbUrl =
  "mongodb+srv://IlariaRefaat:JBunPjlx2Cg8ENqL@cluster0.0sabb.mongodb.net/google-docs-clone?retryWrites=true&w=majority";

mongoose
  .connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((err) => console.log(err));
const port = process.env.PORT || 3001;
const io = require("socket.io")(port, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//every time our client connects this function is executed
io.on("connection", (socket) => {
  socket.on("get-document", async (documentID) => {
    const document = await findOrCreateDocument(documentID);
    socket.join(documentID);
    socket.emit("load-document", document.data);
    //listening to changes from the client
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentID).emit("receive-changes", delta);
    });
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentID, { data });
    });
  });
});
async function findOrCreateDocument(id) {
  if (id == null);
  const document = await Document.findById(id);
  if (document) return document;
  return await Document.create({ _id: id, data: defaultValue });
}
