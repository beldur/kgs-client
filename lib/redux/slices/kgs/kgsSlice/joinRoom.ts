import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const joinRoom = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_RoomJoin>,
) => {
  for (const user of payload.users) {
    state.usersByID[user.name] = user
  }
  state.roomUsers[payload.channelId] = payload.users.map(user => user.name)

  if (payload.games) {
    for (const game of payload.games) {
      state.gamesByID[game.channelId] = game
      state.roomGames[game.roomId].push(game.channelId)
    }
  }

  if (!state.joinedRooms.includes(payload.channelId)) {
    state.joinedRooms.push(payload.channelId)
  }

  state.activeRoomID = payload.channelId
}
