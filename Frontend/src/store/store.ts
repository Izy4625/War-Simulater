import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/auth/authSlice";
import socketSlice  from "./features/socket/socketSlice";
export const store = configureStore({
    reducer: {
        auth: userSlice,
        socket: socketSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;