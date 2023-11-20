import type { KGSGameChannel, KGSUser } from './api/types'
import { KGSGameType } from './api/types'
import { rankToNumber } from './users'

const playersToArray = (players: KGSGameChannel['players']) =>
  Object.values(players)

export const sortGameByRankAndType = (
  gA: KGSGameChannel,
  gB: KGSGameChannel,
) => {
  if (
    (gA.gameType === KGSGameType.CHALLENGE &&
      gB.gameType !== KGSGameType.CHALLENGE) ||
    (gA.gameType !== KGSGameType.CHALLENGE &&
      gB.gameType === KGSGameType.CHALLENGE)
  ) {
    return gA.gameType === KGSGameType.CHALLENGE ? -1 : 1
  }

  if ((gA.over && !gB.over) || (!gA.over && gB.over)) {
    return gA.over ? 1 : -1
  }

  if ((gA.adjourned && !gB.adjourned) || (!gA.adjourned && gB.adjourned)) {
    return gA.adjourned ? 1 : -1
  }

  const highestPlayerFromGameA = playersToArray(gA.players).reduce((a, b) =>
    rankToNumber(a.rank) > rankToNumber(b.rank) ? a : b,
  )
  const highestPlayerFromGameB = playersToArray(gB.players).reduce((a, b) =>
    rankToNumber(a.rank) > rankToNumber(b.rank) ? a : b,
  )

  return sortUserByRank(highestPlayerFromGameA, highestPlayerFromGameB)
}

export const sortUserByRank = (uA: KGSUser, uB: KGSUser) => {
  const playerARank = rankToNumber(uA.rank)
  const playerBRank = rankToNumber(uB.rank)

  return playerARank >= playerBRank ? -1 : 1
}
