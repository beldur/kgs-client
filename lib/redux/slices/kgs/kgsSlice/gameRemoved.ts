import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const gameRemoved = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_GameContainerRemoveGame>,
) => {
  delete state.gamesByID[payload.gameId]
  state.roomGames[payload.channelId] = state.roomGames[
    payload.channelId
  ].filter(g => g !== payload.gameId)
}
