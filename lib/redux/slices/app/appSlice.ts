import { createSlice } from '@reduxjs/toolkit'

interface AuthSliceState {
  isInitialized: boolean
}

const initialState: AuthSliceState = { isInitialized: false }

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialized: (state, { payload }) => {
      state.isInitialized = payload.isInitialized
    },
  },
})
