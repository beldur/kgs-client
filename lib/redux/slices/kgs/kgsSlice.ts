import type * as KGS from '@/lib/api/types'

import { createSliceWithThunks } from '../../createSliceWithThunks'
import { authSlice } from '../auth/authSlice'
import { automatchPrefs } from './kgsSlice/automatchPrefs'
import { chat } from './kgsSlice/chat'
import { gameJoin } from './kgsSlice/gameJoin'
import { gameList } from './kgsSlice/gameList'
import { gameRemoved } from './kgsSlice/gameRemoved'
import { joinRequest } from './kgsSlice/joinRequest'
import { joinRoom } from './kgsSlice/joinRoom'
import { roomDesc } from './kgsSlice/roomDesc'
import { roomDescriptionRequest } from './kgsSlice/roomDescriptionRequest'
import { roomNames } from './kgsSlice/roomNames'
import { roomNamesRequest } from './kgsSlice/roomNamesRequest'
import { sendChat } from './kgsSlice/sendChat'
import { serverVersion } from './kgsSlice/serverVersion'
import { setActiveRoom } from './kgsSlice/setActiveRoom'
import { unjoin } from './kgsSlice/unjoin'
import { unjoinRequest } from './kgsSlice/unjoinRequest'
import { userAdded } from './kgsSlice/userAdded'
import { userRemoved } from './kgsSlice/userRemoved'
import { userUpdate } from './kgsSlice/userUpdate'

export interface KGSRoomWithCategory extends KGS.KGSRoom {
  category: string
  description: string
}

export interface KGSSliceState {
  // Users
  usersByID: {
    [userID: string]: KGS.KGSUser
  }
  friends: { name: string; friendType: KGS.KGSFriendType; notes?: string }[]

  // Rooms
  roomsByID: {
    [channelID: number]: KGSRoomWithCategory
  }
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

  // Games
  joinedGames: number[]
  joinedGamesByID: { [gameID: number]: KGS.KGSMessage_GameJoin }
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
  joinedGames: [],
  joinedGamesByID: {},
}

export const kgsSlice = createSliceWithThunks({
  name: 'kgs',
  initialState,
  reducers: create => ({
    // Downstream Message reducer
    serverVersion: create.reducer(serverVersion),
    roomNames: create.reducer(roomNames),
    roomDesc: create.reducer(roomDesc),
    joinRoom: create.reducer(joinRoom),
    userAdded: create.reducer(userAdded),
    userUpdate: create.reducer(userUpdate),
    userRemoved: create.reducer(userRemoved),
    gameRemoved: create.reducer(gameRemoved),
    gameList: create.reducer(gameList),
    automatchPrefs: create.reducer(automatchPrefs),
    chat: create.reducer(chat),
    setActiveRoom: create.reducer(setActiveRoom),
    gameJoin: create.reducer(gameJoin),
    unjoin: create.reducer(unjoin),

    // Upstream Message reducer
    unjoinRequest: create.asyncThunk(unjoinRequest),
    joinRequest: create.asyncThunk(joinRequest),
    roomNamesRequest: create.asyncThunk(roomNamesRequest),
    roomDescriptionRequest: create.asyncThunk(roomDescriptionRequest),
    sendChat: create.asyncThunk(sendChat),
    clear: create.reducer(() => initialState),
  }),
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
