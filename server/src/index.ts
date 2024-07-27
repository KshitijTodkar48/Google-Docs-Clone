import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { getAllDocuments, findOrCreateDocument, updateDocument } from "./controllers/documentController" ;

const PORT = Number(process.env.PORT || 3000) ;

/** Connect to MongoDB */
mongoose.connect(process.env.DATABASE_URL || "", { dbName: "Google-Docs" })
.then(() => { console.log("Database connected.");})
.catch((error) => { console.log("DB connection failed. " + error);}) ;

const io = new Server(PORT, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", socket => {
  
    socket.on("get-all-documents", async () => {
      const allDocuments = await getAllDocuments() ;
      allDocuments.reverse() ; // To get most recent docs first.
      socket.emit("all-documents", allDocuments) ;
    })

    socket.on("get-document", async ( { documentId, documentName } ) => {
      socket.join(documentId) ;
      const document = await findOrCreateDocument({ documentId, documentName }) ;

      if(document)
        socket.emit("load-document", document.data) ;

      socket.on("send-changes", delta => {
        socket.broadcast.to(documentId).emit("receive-changes", delta) ;
      });

      socket.on("save-document", async (data) => {
        await updateDocument(documentId, { data }) ;
      })

    })

})