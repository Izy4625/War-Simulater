import { createSlice, createAsyncThunk,  PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "../../../types/index"
import { RootState } from "../../store"
import { act } from "react";

interface AuthStateType {
    user: User|null;
    status: string;
    error: string | null;
    token: string | null;
    
  }
  interface responseType {
    message?: string;
    token: string|null;
    user: User|null;
  }


export const registerUser = createAsyncThunk('auth/post',async(user:{userName:string,password:string}):Promise<User>=>{
    console.log("in side register user");
    const response = await axios.post("http://localhost:4000/auth/register",user);
    console.log(response.data);
    return response.data;
    
})
export const loginUser = createAsyncThunk('auth/login',async(user:{userName:string,password:string}):Promise<User>=>{
    console.log("in side login user");
    const response = await axios.post("http://localhost:4000/auth/login",user);
    const token = response.data.token;
    localStorage.setItem('token', token);
    console.log(response.data);
    return response.data;
    
})

const initialState: AuthStateType = {
  user: null,
  status: "idle",
  error: null,
  token: null
 
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";

        // if (action.payload) state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "failed";
        state.error = "can not fetch posts";
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
       console.log(action.payload);
      state.user = action.payload


          console.log('action payload is empty');
         const string = JSON.stringify(action.payload);
          localStorage.setItem('user', string);
       }
      )
      .addCase(loginUser.rejected, (state) => {
        state.status = "failed";
        state.error = "can not fetch posts";
      });
  },
});


export const selectUser = (state: RootState): User | null => state.auth.user;


export default userSlice.reducer;