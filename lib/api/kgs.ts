import type { KGSMessage } from './types'

const API_ENDPOINT = '/json-cors'

export const receiveMessages = async (): Promise<KGSMessage[]> => {
  try {
    const response = await fetch(API_ENDPOINT)

    if (response.status === 200) {
      const body = await response.json()

      return body.messages || []
    }
  } catch {
    throw new Error('Network error')
  }

  throw new Error('Network error')
}

export const sendMessage = async <M extends KGSMessage>(
  msg: M,
  signal?: AbortSignal,
) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(msg),
      signal,
    })

    if (response.status !== 200) {
      throw new Error('Service error')
    }

    return response
  } catch {
    throw new Error('Network error')
  }
}
