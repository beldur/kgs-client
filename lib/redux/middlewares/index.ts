import { initialize } from './initialize'
import { messageStreamer } from './messageStreamer'

const middlewares = [messageStreamer.middleware, initialize.middleware]

export { middlewares }
