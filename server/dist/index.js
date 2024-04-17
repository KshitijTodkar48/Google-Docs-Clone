"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const documentController_1 = require("./controllers/documentController");
const PORT = Number(process.env.PORT || 3000);
/** Connect to MongoDB */
mongoose_1.default.connect(process.env.DATABASE_URL || "", { dbName: "Google-Docs" })
    .then(() => { console.log("Database connected."); })
    .catch((error) => { console.log("DB connection failed. " + error); });
const io = new socket_io_1.Server(PORT, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
io.on("connection", socket => {
    console.log("A client connected..!");
    socket.on("get-all-documents", () => __awaiter(void 0, void 0, void 0, function* () {
        const allDocuments = yield (0, documentController_1.getAllDocuments)();
        socket.emit("all-documents", allDocuments);
    }));
    socket.on("get-document", (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        socket.join(documentId);
        const document = yield (0, documentController_1.findOrCreateDocument)(documentId);
        if (document)
            socket.emit("load-document", document.data);
        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta);
        });
        socket.on("save-document", (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, documentController_1.updateDocument)(documentId, { data });
        }));
    }));
});
