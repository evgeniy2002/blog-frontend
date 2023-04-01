import appSlice  from './app/slice';

import { configureStore } from "@reduxjs/toolkit";
import authSlice  from './auth/slice';

export const store = configureStore({
  reducer: {
   app: appSlice,
   auth: authSlice
  }
})

export type RootState  = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch