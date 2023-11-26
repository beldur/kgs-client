import { type PayloadAction } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'
import { KGSMessageType } from '@/lib/api/types'

import type { KGSSliceState } from '../kgsSlice'

export const chat = (
  state: KGSSliceState,
  { payload }: PayloadAction<KGS.KGSMessage_Chat>,
) => {
  if (!state.roomChats[payload.channelId]) {
    state.roomChats[payload.channelId] = []
  }

  state.roomChats[payload.channelId].push({
    text: payload.text,
    username: payload.user.name,
    timestamp: new Date().toUTCString(),
    type:
      payload.type === KGSMessageType.CHAT
        ? 'chat'
        : payload.type === KGSMessageType.ANNOUNCE
          ? 'announcement'
          : 'moderaterChat',
  })
}
