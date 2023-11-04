import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type * as KGS from '@/lib/api/types'
import { KGSMessageType } from '@/lib/api/types'

import { authSlice } from '../auth/authSlice'

interface KGSSliceState {
  roomsByID: {
    [channelID: number]: KGS.KGSRoom & {
      category: string
      description: string
    }
  }
  usersByID: {
    [userID: string]: KGS.KGSUser
  }
  friends: { name: string; friendType: KGS.KGSFriendType; notes?: string }[]
  roomCategoriesByID: { [roomCategoryID: number]: string }
  roomUsers: { [channelID: number]: string[] }
  roomOwners: { [channelID: number]: string[] }
  roomGames: { [channelID: number]: number[] }
  roomChats: {
    [channelID: number]: {
      text: string
      username: string
      type: 'chat' | 'announcement' | 'moderaterChat'
      timestamp: string
    }[]
  }
  joinedRooms: number[]
  activeRoomID: null | number
  gamesByID: { [gameID: number]: KGS.KGSGameChannel }
  automatchPrefs: null | KGS.KGSAutomatchPrefs
  serverVersion: null | KGS.KGSServerVersion
}

const initialState: KGSSliceState = {
  roomsByID: {},
  usersByID: {},
  friends: [],
  roomCategoriesByID: {},
  roomGames: {},
  roomUsers: {},
  roomOwners: {},
  roomChats: {},
  joinedRooms: [],
  activeRoomID: null,
  gamesByID: {},
  automatchPrefs: null,
  serverVersion: null,
}

export const kgsSlice = createSlice({
  name: 'kgs',
  initialState,
  reducers: {
    serverVersion: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_Hello>,
    ) => {
      state.serverVersion = payload
    },
    roomNames: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_RoomNames>,
    ) => {
      for (const room of payload.rooms) {
        state.roomsByID[room.channelId] = {
          ...state.roomsByID[room.channelId],
          ...room,
        }
        state.roomUsers[room.channelId] = []
        state.roomGames[room.channelId] = []
        state.roomChats[room.channelId] = []
      }
    },
    roomDesc: (state, { payload }: PayloadAction<KGS.KGSMessage_RoomDesc>) => {
      state.roomsByID[payload.channelId].description = payload.description

      if (payload.owners) {
        state.roomOwners[payload.channelId] = payload.owners.map(
          user => user.name,
        )
      }
    },
    joinRoom: (state, { payload }: PayloadAction<KGS.KGSMessage_RoomJoin>) => {
      for (const user of payload.users) {
        state.usersByID[user.name] = user
      }
      state.roomUsers[payload.channelId] = payload.users.map(user => user.name)

      if (payload.games) {
        for (const game of payload.games) {
          state.gamesByID[game.channelId] = game
          state.roomGames[game.roomId].push(game.channelId)
        }
      }

      if (!state.joinedRooms.includes(payload.channelId)) {
        state.joinedRooms.push(payload.channelId)
      }

      if (!state.activeRoomID) {
        state.activeRoomID = payload.channelId
      }
    },
    userAdded: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_UserAdded>,
    ) => {
      const userName = payload.user.name

      state.usersByID[userName] = payload.user

      if (!state.roomUsers[payload.channelId].includes(userName)) {
        state.roomUsers[payload.channelId].push(userName)
      }
    },
    userUpdate: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_UserUpdate>,
    ) => {
      state.usersByID[payload.user.name] = payload.user
    },
    userRemoved: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_UserRemoved>,
    ) => {
      state.roomUsers[payload.channelId] = state.roomUsers[
        payload.channelId
      ].filter(username => username !== payload.user.name)
    },
    gameRemoved: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_GameContainerRemoveGame>,
    ) => {
      delete state.gamesByID[payload.gameId]
      state.roomGames[payload.channelId] = state.roomGames[
        payload.channelId
      ].filter(g => g !== payload.gameId)
    },
    gameList: (state, { payload }: PayloadAction<KGS.KGSMessage_GameList>) => {
      for (const game of payload.games) {
        state.gamesByID[game.channelId] = game

        if (!state.roomGames[payload.channelId].includes(game.channelId)) {
          state.roomGames[payload.channelId].push(game.channelId)
        }
      }
    },
    automatchPrefs: (
      state,
      { payload }: PayloadAction<KGS.KGSMessage_AutomatchPrefs>,
    ) => {
      state.automatchPrefs = payload
    },
    chat: (state, { payload }: PayloadAction<KGS.KGSMessage_Chat>) => {
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
    },
    setActiveRoom: (state, { payload }: PayloadAction<{ roomID: number }>) => {
      state.activeRoomID = payload.roomID
    },
  },
  extraReducers: builder => {
    builder.addCase(authSlice.actions.loginSuccess, (state, { payload }) => {
      for (const room of payload.rooms) {
        state.roomsByID[room.channelId] = {
          name: '',
          description: '',
          channelId: room.channelId,
          category: room.category,
        }
      }

      for (const friend of payload.friends) {
        state.usersByID[friend.user.name] = friend.user
        state.friends.push({
          name: friend.user.name,
          friendType: friend.friendType,
          notes: friend.notes,
        })
      }

      state.roomCategoriesByID = Object.entries(
        payload.roomCategoryChannelIds,
      ).reduce((acc, item) => ({ ...acc, [item[1]]: item[0] }), {})
    })
  },
})

export default kgsSlice.reducer
