import { log } from "console"
import {io} from "../app"
import { getResources } from "../services/dbservice"

import { addUser, removeUser, getUser, getUsersInRoom } from "../socket/users";


const socketFunction = ()=> {
    io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    io.emit("conn")
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
   if(!user) return callback(error)
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    })})}
export default socketFunction