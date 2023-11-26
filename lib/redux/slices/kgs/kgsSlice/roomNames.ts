import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const roomNames = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_RoomNames>,
) => {
  for (const room of payload.rooms) {
    state.roomsByID[room.channelId] = {
      ...state.roomsByID[room.channelId],
      ...room,
    }
    state.roomUsers[room.channelId] = []
    state.roomGames[room.channelId] = []
    state.roomChats[room.channelId] = []
  }
}
