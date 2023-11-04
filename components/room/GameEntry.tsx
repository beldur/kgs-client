import classNames from 'classnames'
import Link from 'next/link'

import type { KGSGameChannel } from '@/lib/api/types'
import { KGSGameType } from '@/lib/api/types'

import { gameTypeToString } from './gameTypeToString'
import UserName from './UserName'

interface GameEntryProps {
  game: KGSGameChannel
}

const GameEntry = ({ game }: GameEntryProps) => {
  const {
    observers,
    moveNum,
    channelId: gameID,
    over: gameIsOver,
    adjourned: gameIsAdjourned,
  } = game
  let { gameType, size: gameSize } = game
  let playerA
  let playerB

  if (game.gameType === KGSGameType.RANKED) {
    playerA = game.players.black
    playerB = game.players.white
  } else if (game.gameType === KGSGameType.CHALLENGE) {
    playerA = game.players.challengeCreator
    gameType = game.initialProposal.gameType
    gameSize = game.initialProposal.rules.size
  } else if (game.gameType === KGSGameType.FREE) {
    playerA = game.players.black
    playerB = game.players.white
  } else if (game.gameType === KGSGameType.REVIEW) {
    playerA = game.players.owner
  }

  const gameTypeString = gameTypeToString(gameType)

  return (
    <div title={JSON.stringify(game)}>
      <Link
        className={classNames(
          'grid gap-1 grid-cols-[3rem_1fr_1fr_4rem_5rem_5rem]',
          {
            'font-bold': game.gameType === KGSGameType.CHALLENGE,
            'opacity-50': gameIsOver || gameIsAdjourned,
          },
        )}
        href={`/kgs/game/${gameID}`}
      >
        <span className="overflow-hidden">{gameTypeString}</span>
        <span>{playerA && <UserName user={playerA} />}</span>
        <span>{playerB && <UserName user={playerB} />}</span>
        <span>{`${gameSize}x${gameSize}`}</span>
        <span>{moveNum && `Mv ${moveNum}`}</span>
        <span>
          {typeof observers !== 'undefined' && `Ob ${observers || 0}`}
        </span>
      </Link>
    </div>
  )
}

export default GameEntry
