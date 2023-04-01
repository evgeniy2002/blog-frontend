import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import { IApp } from './types'


const initialState: IApp = {
  theme: 'light'
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    }
  }
})

export const {setMode} = appSlice.actions

export default appSlice.reducer