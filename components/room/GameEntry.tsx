import classNames from 'classnames'
import { useRouter } from 'next/navigation'

import type { KGSGameChannel } from '@/lib/api/types'
import { KGSGameType } from '@/lib/api/types'

import { gameTypeToString } from '../../lib/gameTypeToString'
import GameEntryScore from './GameEntryScore'
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
  const gameIsChallenge = game.gameType === KGSGameType.CHALLENGE
  const router = useRouter()

  let { gameType, size: gameSize } = game
  let playerA
  let playerB

  if (game.gameType === KGSGameType.RANKED) {
    playerA = game.players.black
    playerB = game.players.white
  } else if (gameIsChallenge) {
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

  const handleRowClick = () => {
    router.push(`/kgs/game/${gameID}`)
  }

  return (
    <tr
      title={JSON.stringify(game)}
      className={classNames('hover cursor-pointer', {
        'font-bold': game.gameType === KGSGameType.CHALLENGE,
        'opacity-50': gameIsOver || gameIsAdjourned,
      })}
      onClick={handleRowClick}
    >
      <td className="overflow-hidden">{gameTypeString}</td>
      <td>{playerA && <UserName user={playerA} />}</td>
      <td>{playerB && <UserName user={playerB} />}</td>
      <td colSpan={gameIsChallenge ? 3 : undefined}>{`${gameSize}x${gameSize}${
        gameIsChallenge && game.name ? `, ${game.name}` : ''
      }`}</td>
      {!gameIsChallenge && (
        <>
          {gameIsOver && game.score ? (
            <td>
              <GameEntryScore score={game.score} />
            </td>
          ) : (
            <td>{moveNum && `Mv ${moveNum}`}</td>
          )}
          <td>{typeof observers !== 'undefined' && `Ob ${observers || 0}`}</td>
        </>
      )}
    </tr>
  )
}

export default GameEntry
