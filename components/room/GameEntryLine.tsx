import classNames from 'classnames'
import Link from 'next/link'

import type { KGSUser } from '@/lib/api/types'
import type { KGSGameType } from '@/lib/api/types'

import { gameTypeToString } from './gameTypeToString'
import UserName from './UserName'

export interface GameEntryLineProps {
  gameID: number
  gameType: KGSGameType
  playerA?: KGSUser
  playerB?: KGSUser
  moveNum: number
  observers?: number
  isChallenge: boolean
}

const GameEntryLine = ({
  gameID,
  gameType,
  playerA,
  playerB,
  moveNum,
  observers,
  isChallenge,
}: GameEntryLineProps) => {
  const gameTypeString = gameTypeToString(gameType)

  return (
    <Link
      className={classNames('grid gap-1 grid-cols-[3rem_1fr_1fr_5rem_5rem]', {
        'font-semibold': isChallenge,
      })}
      href={`/kgs/game/${gameID}`}
    >
      <span className="overflow-hidden">{gameTypeString}</span>
      <span>{playerA && <UserName user={playerA} />}</span>
      <span>{playerB && <UserName user={playerB} />}</span>
      <span>{moveNum && `Mv ${moveNum}`}</span>
      <span>{typeof observers !== 'undefined' && `Ob ${observers || 0}`}</span>
    </Link>
  )
}

export default GameEntryLine
