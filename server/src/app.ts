import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db"
import authRouter from "./routes/authRouter";
import { getResources } from "./services/dbservice";
import cookieParser from "cookie-parser";
import cors from "cors"
import { createServer } from 'http';
import { Server } from 'socket.io';
import { log } from "console";
import socketsFunction from './socket/socket.io'
import { addUser, removeUser, getUser, getUsersInRoom } from "./socket/users";
const app = express();
const httpServer = createServer(app);
const allowedOrigin = 'http://localhost:5173'; // Your frontend URL
export const io = new Server(httpServer, { cors: { origin: "*", methods: "*", credentials: true } });

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join', (room: string )=> {
    console.log('inside join in sever')

    

    console.log(room)
    console.log('inside function of join')
     
    //  console.log(user)
     console.log(room)
    socket.join(room);
    console.log(room)
    io.to(room).emit("someevent", "a new user joined our room");
    socket.emit('message', { user: 'admin', text: ` welcome to room ${room}.` });
    socket.broadcast.to(room).emit('message', { user: 'admin', text: ` has joined!` });
    console.log('emit roomData')
    // io.to(join.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
   io.emit('roomData', { mess: "hey from server connected to room"});
    
  })
  socket.on('sendMessage', (message:string) => {  console.log(message); }) 
 
  socket.on('attack', (message: { room: string ,rocket: string}) => {
    console.log(message);
    io.emit('rocket',message);
  })

  
})




app.use(cors(
  { origin: allowedOrigin, methods: "*", credentials: true }
));

// app.options('*', cors());
app.use(express.json());
app.use(cookieParser());

connectDB();
app.use("/auth", authRouter);

const PORT = process.env.PORT || 4000;

httpServer.listen(PORT, () => {
  console.log('Server running on http://localhost:' + PORT);
});


