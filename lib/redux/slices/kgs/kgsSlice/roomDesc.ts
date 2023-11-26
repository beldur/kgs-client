import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const roomDesc = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_RoomDesc>,
) => {
  state.roomsByID[payload.channelId].description = payload.description

  if (payload.owners) {
    state.roomOwners[payload.channelId] = payload.owners.map(user => user.name)
  }
}
