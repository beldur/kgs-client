import type {
  Action,
  ListenerEffect,
  ThunkAction,
  TypedStartListening,
  UnknownAction,
} from '@reduxjs/toolkit'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from 'react-redux'
import { PERSIST, persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { appListener } from './middlewares/appListener'
import { appSlice } from './slices/app/appSlice'
import { authSlice } from './slices/auth/authSlice'
import { kgsSlice } from './slices/kgs/kgsSlice'

const reducer = combineReducers({
  auth: authSlice.reducer,
  kgs: kgsSlice.reducer,
  app: appSlice.reducer,
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    version: 1,
    blacklist: ['app'],
  },
  reducer,
)

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActions: [PERSIST] },
    }).concat([appListener.middleware]),
})
export const useDispatch = () => useReduxDispatch<ReduxDispatch>()
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector
export const persistor = persistStore(reduxStore)

/* Types */
export type ReduxStore = typeof reduxStore
export type ReduxState = ReturnType<typeof reduxStore.getState>
export type ReduxDispatch = typeof reduxStore.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>
export type AppStartListening = TypedStartListening<ReduxState, ReduxDispatch>
export type AppListenerEffect = ListenerEffect<
  UnknownAction,
  ReduxState,
  ReduxDispatch
>
