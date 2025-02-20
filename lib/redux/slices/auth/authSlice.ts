import type { PayloadAction } from '@reduxjs/toolkit'

import { sendMessage } from '@/lib/api/kgs'
import {
  type KGSMessage_LoginSuccess,
  KGSMessageType,
  type KGSUser,
} from '@/lib/api/types'

import { createSliceWithThunks } from '../../createSliceWithThunks'

interface AuthSliceState {
  isLoggedIn: boolean
  user: KGSUser | null
}

const initialState: AuthSliceState = { isLoggedIn: false, user: null }

export const authSlice = createSliceWithThunks({
  name: 'auth',
  initialState,
  reducers: create => ({
    loginSuccess: create.reducer(
      (state, { payload }: PayloadAction<KGSMessage_LoginSuccess>) => {
        state.user = payload.you
        state.isLoggedIn = true
      },
    ),
    logout: create.reducer(state => {
      state.user = null
      state.isLoggedIn = false
    }),
    clear: create.reducer(() => initialState),
    login: create.asyncThunk(
      async (
        { name, password }: { name: string; password: string },
        { signal },
      ): Promise<string> => {
        const response = await sendMessage(
          { type: KGSMessageType.LOGIN, locale: 'en_US', name, password },
          signal,
        )

        return await response.text()
      },
    ),
  }),
})
