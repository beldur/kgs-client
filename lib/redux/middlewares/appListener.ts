import { createListenerMiddleware } from '@reduxjs/toolkit'
import { REHYDRATE } from 'redux-persist'

import isServer from '@/lib/isServer'

import { authSlice } from '../slices/auth/authSlice'
import { selectIsLoggedIn } from '../slices/auth/selectors'
import { kgsSlice } from '../slices/kgs/kgsSlice'
import type { AppStartListening, ReduxDispatch } from '../store'
import { checkLoginStatusOnRehydrate } from './effects/checkLoginStatusOnRehydrate'
import { messageStreamer } from './effects/messageStreamer'

export const appListener = createListenerMiddleware()
export const appListenerStartListening =
  appListener.startListening as AppStartListening

export const reset = (dispatch: ReduxDispatch) => {
  dispatch(kgsSlice.actions.clear())
  dispatch(authSlice.actions.clear())

  if (!isServer() && location.pathname !== '/') {
    location.href = '/'
  }
}

appListenerStartListening({
  predicate: action => action.type === REHYDRATE,
  effect: checkLoginStatusOnRehydrate,
})

appListenerStartListening({
  actionCreator: authSlice.actions.logout,
  effect: async (_, { dispatch }) => {
    reset(dispatch)
  },
})

appListenerStartListening({
  predicate: (action, currentState) =>
    action.type === authSlice.actions.login.fulfilled.type ||
    selectIsLoggedIn(currentState),
  effect: messageStreamer,
})
