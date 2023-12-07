import type { PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const gameUpdate = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_GameUpdate>,
) => {
  state.joinedGamesByID[payload.channelId].sgfEvents.push(...payload.sgfEvents)
}
