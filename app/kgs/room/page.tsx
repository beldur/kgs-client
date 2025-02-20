'use client'

import JoinedRoomsList from '@/components/room/JoinedRooms'
import RoomChat from '@/components/room/RoomChat'
import { RoomDescription } from '@/components/room/RoomDescription'
import RoomGameList from '@/components/room/RoomGameList'
import RoomUserList from '@/components/room/RoomUserList'
import { selectActiveRoom } from '@/lib/redux/slices/kgs/selectors'
import { useSelector } from '@/lib/redux/store'

const RoomPage = () => {
  const activeRoom = useSelector(selectActiveRoom)

  if (!activeRoom) return null

  return (
    <>
      <JoinedRoomsList activeRoomID={activeRoom.channelId} />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <RoomGameList />
          <RoomDescription text={activeRoom.description} />
          <RoomChat />
        </div>
        <RoomUserList />
      </div>
    </>
  )
}

export default RoomPage
