import { sendMessage } from '@/lib/api/kgs'
import { KGSMessageType } from '@/lib/api/types'

export const roomNamesRequest = async ({ rooms }: { rooms: number[] }) => {
  const response = await sendMessage({
    type: KGSMessageType.ROOM_NAMES_REQUEST,
    rooms,
  })

  return await response.text()
}
