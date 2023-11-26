import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const unjoin = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_Unjoin>,
) => {
  state.joinedRooms = state.joinedRooms.filter(
    roomID => roomID !== payload.channelId,
  )
  delete state.roomGames[payload.channelId]
  delete state.roomUsers[payload.channelId]
  delete state.roomChats[payload.channelId]

  state.activeRoomID = state.joinedRooms[state.joinedGames.length - 1] ?? null
}
