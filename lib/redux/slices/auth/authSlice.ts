import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { sendMessage } from '@/lib/api/kgs'
import {
  type KGSMessage_LoginSuccess,
  KGSMessageType,
  type KGSUser,
} from '@/lib/api/types'

import { createAppAsyncThunk } from '../../createAppAsyncThunk'

interface AuthSliceState {
  isLoggedIn: boolean
  user: KGSUser | null
}

const initialState: AuthSliceState = { isLoggedIn: false, user: null }

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      { payload }: PayloadAction<KGSMessage_LoginSuccess>,
    ) => {
      state.user = payload.you
      state.isLoggedIn = true
    },
    logout: state => {
      state.user = null
      state.isLoggedIn = false
    },
  },
})

export const userLogin = createAppAsyncThunk(
  'auth/userLogin',
  async (
    { name, password }: { name: string; password: string },
    { signal },
  ) => {
    const response = await sendMessage(
      {
        type: KGSMessageType.LOGIN,
        locale: 'en_US',
        name,
        password,
      },
      signal,
    )

    return await response.text()
  },
)
