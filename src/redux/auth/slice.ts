import {createSlice} from '@reduxjs/toolkit'
import { IUser } from '../../types/types'




const initialState: any = {
  data: null
}


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload
    },
    logout: (state) => {
      state.data = null
    } 
  }
})


export const {setUserData,logout} = authSlice.actions

export default authSlice.reducer