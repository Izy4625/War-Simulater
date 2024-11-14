import { useSelector, UseSelector } from "react-redux";
import { useState,useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { RootState } from "../store/store";
import { socketSlice } from "../store/features/socket/socketSlice";
const SERVER_URL = 'http://localhost:4000';
export function useSocket() {
   


  
      const socketInstance = io(SERVER_URL);
  
    
    console.log('connected to the server')
    
     

   
  
    return { socketInstance };
  }