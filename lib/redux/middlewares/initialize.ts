import { createListenerMiddleware } from '@reduxjs/toolkit'

import { appInitializeAction } from '../slices/app/appSlice'

export const initialize = createListenerMiddleware()

initialize.startListening({
  actionCreator: appInitializeAction,
  effect: async (action, { unsubscribe }) => {
    unsubscribe()

    console.log('initialize')
  },
})
