'use client'

import GameEntry from '@/components/room/GameEntry'
import JoinedRooms from '@/components/room/JoinedRooms'
import UserName from '@/components/room/UserName'
import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import {
  selectActiveRoomGamesSorted,
  selectActiveRoomID,
  selectActiveRoomUsers,
  selectJoinedRooms,
} from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

export const KGS = () => {
  const dispatch = useDispatch()
  const joinedRooms = useSelector(selectJoinedRooms)
  const activeRoomID = useSelector(selectActiveRoomID)
  const activeRoomGames = useSelector(selectActiveRoomGamesSorted)
  const activeRoomUsers = useSelector(selectActiveRoomUsers)

  const handleRoomClick = (roomID: number) => {
    dispatch(kgsSlice.actions.setActiveRoom({ roomID }))
  }

  return (
    <div className="">
      <JoinedRooms
        joinedRooms={joinedRooms}
        activeRoomID={activeRoomID}
        onRoomClick={handleRoomClick}
      />
      <div className="grid grid-cols-room gap-2">
        <div>
          <ul className="">
            {activeRoomGames.map(game => (
              <li key={game.channelId}>
                <GameEntry game={game} />
              </li>
            ))}
          </ul>
        </div>
        <ul className="">
          {activeRoomUsers.map(user => (
            <li key={user.name}>
              <UserName user={user} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default KGS
