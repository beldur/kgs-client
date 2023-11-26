import { receiveMessages } from '@/lib/api/kgs'
import * as KGS from '@/lib/api/types'

import { authSlice } from '../../slices/auth/authSlice'
import { kgsSlice } from '../../slices/kgs/kgsSlice'
import type { AppListenerEffect } from '../../store'

export const messageStreamer: AppListenerEffect = async (
  _,
  { delay, dispatch, subscribe, unsubscribe },
) => {
  unsubscribe()

  loop: while (true) {
    let messages: KGS.KGSMessage[] = []

    try {
      messages = await receiveMessages()
    } catch (e) {
      console.log('Error receiving messages', e)
    }

    for (const message of messages) {
      switch (message.type) {
        case KGS.KGSMessageType.LOGOUT:
        case KGS.KGSMessageType.RECONNECT:
          dispatch(authSlice.actions.logout())
          break loop
        case KGS.KGSMessageType.LOGIN_SUCCESS:
          dispatch(
            authSlice.actions.loginSuccess(
              message as KGS.KGSMessage_LoginSuccess,
            ),
          )
          break
        case KGS.KGSMessageType.HELLO:
          dispatch(
            kgsSlice.actions.serverVersion(message as KGS.KGSMessage_Hello),
          )
          break
        case KGS.KGSMessageType.ROOM_NAMES:
          dispatch(
            kgsSlice.actions.roomNames(message as KGS.KGSMessage_RoomNames),
          )
          break
        case KGS.KGSMessageType.ROOM_DESC:
          dispatch(
            kgsSlice.actions.roomDesc(message as KGS.KGSMessage_RoomDesc),
          )
          break
        case KGS.KGSMessageType.ROOM_JOIN:
          dispatch(
            kgsSlice.actions.joinRoom(message as KGS.KGSMessage_RoomJoin),
          )
          break
        case KGS.KGSMessageType.JOIN_COMPLETE:
          break
        case KGS.KGSMessageType.USER_ADDED:
          dispatch(
            kgsSlice.actions.userAdded(message as KGS.KGSMessage_UserAdded),
          )
          break
        case KGS.KGSMessageType.USER_UPDATE:
          dispatch(
            kgsSlice.actions.userUpdate(message as KGS.KGSMessage_UserUpdate),
          )
          break
        case KGS.KGSMessageType.USER_REMOVED:
          dispatch(
            kgsSlice.actions.userRemoved(message as KGS.KGSMessage_UserRemoved),
          )
          break
        case KGS.KGSMessageType.GAME_CONTAINER_REMOVE_GAME:
          dispatch(
            kgsSlice.actions.gameRemoved(
              message as KGS.KGSMessage_GameContainerRemoveGame,
            ),
          )
          break
        case KGS.KGSMessageType.GAME_LIST:
          dispatch(
            kgsSlice.actions.gameList(message as KGS.KGSMessage_GameList),
          )
          break
        case KGS.KGSMessageType.AUTOMATCH_PREFS:
          dispatch(
            kgsSlice.actions.automatchPrefs(
              message as KGS.KGSMessage_AutomatchPrefs,
            ),
          )
          break
        case KGS.KGSMessageType.CHAT:
          dispatch(kgsSlice.actions.chat(message as KGS.KGSMessage_Chat))
          break
        case KGS.KGSMessageType.GAME_JOIN:
          dispatch(
            kgsSlice.actions.gameJoin(message as KGS.KGSMessage_GameJoin),
          )
          break
        case KGS.KGSMessageType.UNJOIN:
          dispatch(kgsSlice.actions.unjoin(message as KGS.KGSMessage_Unjoin))
          break
        default:
          console.log('Unhandled message', message)
          break
      }
    }

    await delay(2000)
  }

  subscribe()
}
