import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const automatchPrefs = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_AutomatchPrefs>,
) => {
  state.automatchPrefs = payload
}
