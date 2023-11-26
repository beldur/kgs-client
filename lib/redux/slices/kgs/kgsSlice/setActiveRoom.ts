import { type PayloadAction } from '@reduxjs/toolkit'

import type { KGSSliceState } from '../kgsSlice'

export const setActiveRoom = (
  state: KGSSliceState,
  { payload }: PayloadAction<{ roomID: number }>,
) => {
  state.activeRoomID = payload.roomID
}
