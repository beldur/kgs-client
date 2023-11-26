import { KGSMessageType } from '@/lib/api/types'

import { sendMessage } from '../../../../api/kgs'

export const unjoinRequest = async ({ channelId }: { channelId: number }) => {
  const response = await sendMessage({
    type: KGSMessageType.UNJOIN_REQUEST,
    channelId,
  })

  return await response.text()
}
