import { KGSMessageType } from '@/lib/api/types'

import { sendMessage } from '../../../../api/kgs'

export const sendChat = async ({
  channelId,
  text,
}: {
  channelId: number
  text: string
}) => {
  const response = await sendMessage({
    type: KGSMessageType.CHAT,
    text,
    channelId,
  })

  return await response.text()
}
