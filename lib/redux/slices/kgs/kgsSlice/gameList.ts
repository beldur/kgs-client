import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const gameList = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_GameList>,
) => {
  for (const game of payload.games) {
    state.gamesByID[game.channelId] = game

    if (!state.roomGames[payload.channelId].includes(game.channelId)) {
      state.roomGames[payload.channelId].push(game.channelId)
    }
  }
}
