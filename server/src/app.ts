import  express  from "express";
import dotenv from "dotenv";
import connectDB  from "./config/db"
import authRouter from "./routes/authRouter";

import cookieParser from "cookie-parser";
import cors from "cors"
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const allowedOrigin = 'http://localhost:5173'; // Your frontend URL
export const io = new Server(httpServer, { cors: { origin: "*" ,methods: "*", credentials:true}});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  io.emit("conn")

  socket.on('disconnect', (reason) => {
    console.log(`User disconnected: ${socket.id}, reason: ${reason}`);
  });
});






app.use(cors(
  { origin: allowedOrigin ,methods: "*", credentials:true}
));
 
// app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log('Server running on http://localhost:'+PORT);
});


