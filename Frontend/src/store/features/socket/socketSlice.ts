import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import store from "../../store";
import {useSocket} from "../../../hooks/useSocket";
import { io, Socket } from "socket.io-client";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
const SERVER_URL = 'http://localhost:4000';
interface SocketStateType {
    socket: Socket | null,
    status: string | null
    error: string | null,
    connected: boolean,
    rocket: string | null,
    message: string | null,
}
const {socketInstance }= useSocket();


export const sendRocket = createAsyncThunk('attack/post', async ( attack: {room: string ,rocket: string}): Promise<string | null> => {
    console.log("in side sendRocket user");
   
   
    const res = await socketInstance.emit('attack', {attack }, (response: string) => {
        console.log("this is the response", response);
        return response
    });

    return res.toString()
})
export const interceptRocket = createAsyncThunk('intercept/post', async ( status: string): Promise<string | null> => {
    console.log("in side defendRocket user");

        socketInstance.emit('defend', { status}, (response: string) => {
            console.log("this is the response", response);
        
            return response
    });
})      
    

export const joinRoom =  createAsyncThunk('join/post', async (room: string): Promise<string> => {
    console.log("in side joinRoom user");
 

const res =  socketInstance.emit('join', room, (response: string) => {
            console.log("this is the response", response);
            return response
        });
    return res.toString();      
})

export const socketSlice = createSlice({

    name: "socket",
    initialState: {
        socket: io(SERVER_URL),
        status: "idle",
        error: null,
        connected: true,
        rocket: null
    } as SocketStateType,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendRocket.fulfilled, (state, action) => {
            state.status = action.payload
        })
        .addCase(sendRocket.pending, (state) => {
            state.status = "launched"
        })
        .addCase(sendRocket.rejected, (state) => {
            state.status = "failed to launch"
        })
        .addCase(interceptRocket.fulfilled, (state, action) => {
            state.status = action.payload
        })
        .addCase(interceptRocket.pending, (state) => {
            state.status = "pending"
        })
        .addCase(interceptRocket.rejected, (state) => {
            state.status = "failed to intercept"
        })
       .addCase(joinRoom.fulfilled, (state, action) => {
            state.message = action.payload
            console.log('inside fulfilled');
            
        })
        .addCase(joinRoom.pending, (state) => {
            console.log("inside pending");
            
            state.message = "pending"
        })
        .addCase(joinRoom.rejected, (state) => {
            console.log("rejected to coonect to room");
            
            state.message = "failed to join"
        })  

    }                                             
});

export default socketSlice.reducer;