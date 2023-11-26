import { KGSMessageType } from '@/lib/api/types'

import { sendMessage } from '../../../../api/kgs'

export const joinRequest = async ({ channelId }: { channelId: number }) => {
  const response = await sendMessage({
    type: KGSMessageType.JOIN_REQUEST,
    channelId,
  })

  return await response.text()
}
