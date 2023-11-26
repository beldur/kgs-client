import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const userAdded = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_UserAdded>,
) => {
  const userName = payload.user.name

  state.usersByID[userName] = payload.user

  if (state.roomUsers[payload.channelId]) {
    if (!state.roomUsers[payload.channelId].includes(userName)) {
      state.roomUsers[payload.channelId].push(userName)
    }
  }
}
