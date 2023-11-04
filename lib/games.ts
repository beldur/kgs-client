import type { KGSGameChannel } from './api/types'
import { KGSGameType } from './api/types'
import { rankToNumber } from './users'

const playersToArray = (players: KGSGameChannel['players']) =>
  Object.values(players)

export const byRankAndType = (gA: KGSGameChannel, gB: KGSGameChannel) => {
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
  const playerGameARank = rankToNumber(highestPlayerFromGameA.rank)
  const playerGameBRank = rankToNumber(highestPlayerFromGameB.rank)

  return playerGameARank >= playerGameBRank ? -1 : 1
}
