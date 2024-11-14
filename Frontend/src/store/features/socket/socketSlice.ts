import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import useSocket from "../../hooks/useSocket";

interface SocketStateType {
    socket: Socket | null,
    status: string | null
    error: string | null,
    connected: boolean,
    rocket: string | null,
    message: string | null,
}


export const sendRocket = createAsyncThunk('attack/post', async (attck: { name: string, room: string, rocket: string }): Promise<string | null> => {
    console.log("in side sendRocket user");
    const { socket, connected } = useSocket();
    if (!socket || !connected) return null
    const res = await socket.emit('attack', { attck: attck }, (response: string) => {
        console.log("this is the response", response);
        return response
    });

    return res
})
export const interceptRocket = createAsyncThunk('intercept/post', async (defend: { status: string}): Promise<string | null> => {
    console.log("in side defendRocket user");
    const { socket, connected } = useSocket();
    if (!socket || !connected) return null
    const res = await socket.emit('defend', { defend: defend }, (response: string) => {
        console.log("this is the response", response);
        return response
    });

    return res
    
})
export const joinRoom =  createAsyncThunk('join/post', async (join: { name: string, room: string}): Promise<string | null> => {
    console.log("in side joinRoom user");
    const { socket, connected } = useSocket();
    if (!socket || !connected) return null
    const res = await socket.emit('join', { join: join }, (response: string) => {
        console.log("this is the response", response);
        return response
    });

    return res
})

export const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket: null,
        status: "idle",
        error: null,
        connected: true,
        rocket: null
    } as SocketStateType,
    reducers: {},
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
        })
        .addCase(joinRoom.pending, (state) => {
            state.message = "pending"
        })
        .addCase(joinRoom.rejected, (state) => {
            state.message = "failed to join"
        })  

    }                                             
});

export default socketSlice.reducer;