import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const userRemoved = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_UserRemoved>,
) => {
  if (state.roomUsers[payload.channelId]) {
    state.roomUsers[payload.channelId] = state.roomUsers[
      payload.channelId
    ].filter(username => username !== payload.user.name)
  }
}
