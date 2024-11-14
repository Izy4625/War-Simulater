// import { useState, useEffect } from 'react';
// import { io, Socket } from 'socket.io-client';

// const SERVER_URL = 'http://localhost:4000';

// export function useSocket() {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [connected, setConnected] = useState(false);
//   const [votes,setVotes] = useState<number[]>([])
    
// // socket?.emit()
//   socket?.on("voteupdate",(votesnew)=>{
//     setVotes(votesnew);
//     console.log(votesnew);
    
//   })
//   socket?.on('conn',()=>{
//     console.log("conneted");
    
//   })
  

//   useEffect(() => {
//     const socketInstance = io(SERVER_URL);
//     setSocket(socketInstance);
//     setConnected(true);
//   console.log('connected to the server')
  
//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);
 

//   return { socket, connected };
// }


