import { sendMessage } from '@/lib/api/kgs'
import { KGSMessageType } from '@/lib/api/types'

import { appSlice } from '../../slices/app/appSlice'
import { selectIsLoggedIn } from '../../slices/auth/selectors'
import type { AppListenerEffect } from '../../store'
import { reset } from '../appListener'

export const checkLoginStatusOnRehydrate: AppListenerEffect = async (
  _,
  { unsubscribe, dispatch, getState },
) => {
  unsubscribe()
  const state = getState()
  const isLoggedIn = selectIsLoggedIn(state)

  try {
    if (isLoggedIn) {
      await sendMessage({
        type: KGSMessageType.WAKE_UP,
      })

      if (location.pathname !== '/kgs/room') {
        location.href = `/kgs/room`
      }
    } else {
      reset(dispatch)
    }
  } catch {
    reset(dispatch)
  }

  dispatch(appSlice.actions.initialized({ isInitialized: true }))
}
