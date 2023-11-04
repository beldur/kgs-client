import { KGSGameType } from '@/lib/api/types'

export const gameTypeToString = (gameType: KGSGameType) => {
  switch (gameType) {
    case KGSGameType.RANKED:
      return 'R'
    case KGSGameType.DEMONSTRATION:
      return 'D'
    case KGSGameType.FREE:
      return 'F'
    case KGSGameType.REVIEW:
      return 'D'
    default:
      return gameType
  }
}
