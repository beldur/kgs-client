import { selectActiveRoomGamesSorted } from '@/lib/redux/slices/kgs/selectors'
import { useSelector } from '@/lib/redux/store'

import GameEntry from './GameEntry'

const RoomGameList = () => {
  const roomGames = useSelector(selectActiveRoomGamesSorted)

  return (
    <table className="table table-xs">
      <thead>
        <tr>
          <th>Games</th>
        </tr>
      </thead>
      <tbody>
        {roomGames.map(game => (
          <GameEntry game={game} key={game.channelId} />
        ))}
      </tbody>
    </table>
  )
}

export default RoomGameList
