import  express  from "express";
import dotenv from "dotenv";
import connectDB  from "./config/db"
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
export const io = new Server(httpServer, { cors: { origin: "*" ,methods: "*", credentials:true}});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    io.emit("conn")
    socket.on('join', ({ name, room }) => {
        console.log(name,room)
      const  user  = addUser({ id: socket.id, name, room });
     console.log('inside function of join')
//       if(error) return callback(error);
//    if(!user) return callback(error)
   console.log(user)
     if(!user) return
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
    
    })})







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


