import { createSelector } from '@reduxjs/toolkit'

import { sortGameByRankAndType, sortUserByRank } from '@/lib/games'

import type { ReduxState } from '../../store'
import type { KGSRoomWithCategory } from './kgsSlice'

const selectKGS = (state: ReduxState) => state.kgs

export const selectJoinedRoomIds = (state: ReduxState) =>
  selectKGS(state).joinedRooms
const selectRoomsByID = (state: ReduxState) => selectKGS(state).roomsByID
const selectGamesByID = (state: ReduxState) => selectKGS(state).gamesByID
const selectUsersByID = (state: ReduxState) => selectKGS(state).usersByID
const selectRoomGames = (state: ReduxState) => selectKGS(state).roomGames
const selectRoomUsers = (state: ReduxState) => selectKGS(state).roomUsers
const selectRoomOwners = (state: ReduxState) => selectKGS(state).roomOwners
const selectRoomChats = (state: ReduxState) => selectKGS(state).roomChats
const selectActiveGameID = (state: ReduxState) => selectKGS(state).activeGameID

export const selectActiveRoomID = (state: ReduxState) =>
  selectKGS(state).activeRoomID

export const selectJoinedRooms = createSelector(
  selectJoinedRoomIds,
  selectRoomsByID,
  (joinedRoomIDs, roomsByID) => joinedRoomIDs.map(roomID => roomsByID[roomID]),
)

export const selectActiveRoom = createSelector(
  selectActiveRoomID,
  selectRoomsByID,
  (activeRoomID, roomsByID) =>
    activeRoomID !== null ? roomsByID[activeRoomID] : null,
)

export const selectActiveRoomGames = createSelector(
  selectActiveRoomID,
  selectRoomGames,
  selectGamesByID,
  (activeRoomID, roomGames, gamesByID) => {
    const activeRoomGameIDs =
      activeRoomID !== null ? roomGames[activeRoomID] : []

    return activeRoomGameIDs.map(gameID => gamesByID[gameID])
  },
)

export const selectActiveRoomGamesSorted = createSelector(
  selectActiveRoomGames,
  roomGames => roomGames.toSorted(sortGameByRankAndType),
)

export const selectActiveRoomUsers = createSelector(
  selectActiveRoomID,
  selectRoomUsers,
  selectUsersByID,
  (activeRoomID, roomUsers, usersByID) => {
    const activeRoomUserIDs =
      activeRoomID !== null ? roomUsers[activeRoomID] : []

    return activeRoomUserIDs.map(userID => usersByID[userID])
  },
)

export const selectActiveRoomUsersSorted = createSelector(
  selectActiveRoomUsers,
  roomUsers => roomUsers.toSorted(sortUserByRank),
)

export const selectUserByID = createSelector(
  selectUsersByID,
  (_, userID: string) => userID,
  (usersByID, userID) =>
    (usersByID as ReturnType<typeof selectUsersByID>)[userID as string],
)

export const selectRoomOwnersByID = createSelector(
  selectRoomOwners,
  (_, roomID: number) => roomID,
  (roomOwners, roomID) =>
    (roomOwners as ReturnType<typeof selectRoomOwners>)[roomID as number],
)

export const selectActiveRoomChat = createSelector(
  selectActiveRoomID,
  selectRoomChats,
  (activeRoomID, roomChats) =>
    activeRoomID !== null ? roomChats[activeRoomID] : [],
)

export const selectRoomsByCategory = createSelector(
  selectRoomsByID,
  (roomsByID): { [category: string]: KGSRoomWithCategory[] } =>
    // @ts-expect-error `groupBy` is not in the type definition
    Object.groupBy(
      Object.values(roomsByID).toSorted((a, b) => a.name.localeCompare(b.name)),
      (element: KGSRoomWithCategory) => element.category,
    ),
)

export const selectActiveGame = createSelector(
  selectActiveGameID,
  selectGamesByID,
  (activeGameID, gamesByID) =>
    activeGameID !== null ? gamesByID[activeGameID] : null,
)
