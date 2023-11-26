import { sendMessage } from '@/lib/api/kgs'
import { KGSMessageType } from '@/lib/api/types'

export const roomDescriptionRequest = async ({
  channelId,
}: {
  channelId: number
}) => {
  const response = await sendMessage({
    type: KGSMessageType.ROOM_DESC_REQUEST,
    channelId,
  })

  return await response.text()
}
