import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const userUpdate = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_UserUpdate>,
) => {
  state.usersByID[payload.user.name] = payload.user
}
