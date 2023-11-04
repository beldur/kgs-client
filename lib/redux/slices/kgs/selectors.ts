import { createSelector } from '@reduxjs/toolkit'

import { byRankAndType } from '@/lib/games'

import type { ReduxState } from '../../store'

const selectKGS = (state: ReduxState) => state.kgs

const selectJoinedRoomIds = (state: ReduxState) => selectKGS(state).joinedRooms
const selectRoomsByID = (state: ReduxState) => selectKGS(state).roomsByID
const selectGamesByID = (state: ReduxState) => selectKGS(state).gamesByID
const selectUsersByID = (state: ReduxState) => selectKGS(state).usersByID
const selectRoomGames = (state: ReduxState) => selectKGS(state).roomGames
const selectRoomUsers = (state: ReduxState) => selectKGS(state).roomUsers

export const selectActiveRoomID = (state: ReduxState) =>
  selectKGS(state).activeRoomID

export const selectJoinedRooms = createSelector(
  selectJoinedRoomIds,
  selectRoomsByID,
  (joinedRoomIDs, roomsByID) => joinedRoomIDs.map(roomID => roomsByID[roomID]),
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
  roomGames => roomGames.toSorted(byRankAndType),
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

export const selectUserByID = createSelector(
  selectUsersByID,
  (_, userID: string) => userID,
  (usersByID, userID) =>
    (usersByID as ReturnType<typeof selectUsersByID>)[userID as string],
)
