import { log } from "console";

interface user{
    id:string
    name: string,
    room: string
}
interface err{
    error: string
}
 const users :user[] = [];

export const addUser = ({ id, name, room }:user) :user | null=> {
 console.log("parameters" ,id, name, room);

  const existingUser = users.find((user) => user.room === room && user.name === name);
  console.log("existing user", existingUser);
//   if(!name || !room) return { error: 'Username and room are required.' };
//   if(existingUser) return { error: 'Username is taken.' };
if(existingUser) return null

  const user:user = { id, name, room };
   console.log(user);
  users.push(user);
  console.log(users);

  return  user ;
}

export const removeUser = (id:string) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

export const getUser = (id:string) => users.find((user) => user.id === id);

export const getUsersInRoom = (room:string) => users.filter((user) => user.room === room);

