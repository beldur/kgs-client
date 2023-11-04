import type { KGSMessage } from './types'
import { KGSMessageType } from './types'

const API_ENDPOINT = '/json-cors'

export const receiveMessages = async (): Promise<KGSMessage[]> => {
  try {
    const response = await fetch(API_ENDPOINT)

    if (response.status === 200) {
      const body = await response.json()

      return body.messages
    }
  } catch {
    throw new Error('Network error')
  }

  throw new Error('Network error')
}

export const sendMessage = async <M extends KGSMessage>(msg: M) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(msg),
    })

    return response
  } catch {
    throw new Error('Network error')
  }
}

export const login = async (name: string, password: string) => {
  const response = await sendMessage({
    locale: 'en_US',
    name,
    password,
    type: KGSMessageType.LOGIN,
  })

  return response
}
