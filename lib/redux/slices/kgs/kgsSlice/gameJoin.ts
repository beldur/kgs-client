import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const gameJoin = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_GameJoin>,
) => {
  state.joinedGamesByID[payload.channelId] = payload
  state.activeGameID = payload.channelId
}
