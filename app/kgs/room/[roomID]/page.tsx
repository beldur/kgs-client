'use client'

import { useEffect } from 'react'

import JoinedRoomsList from '@/components/room/JoinedRooms'
import RoomChat from '@/components/room/RoomChat'
import { RoomDescription } from '@/components/room/RoomDescription'
import RoomGameList from '@/components/room/RoomGameList'
import RoomUserList from '@/components/room/RoomUserList'
import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import { selectActiveRoom } from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

interface RoomPageProps {
  params: { roomID: string }
}

const RoomPage = ({ params }: RoomPageProps) => {
  const roomID = params.roomID
  const activeRoomID = parseInt(roomID)
  const dispatch = useDispatch()
  const activeRoom = useSelector(selectActiveRoom)

  useEffect(() => {
    dispatch(kgsSlice.actions.setActiveRoom({ roomID: activeRoomID }))
  }, [dispatch, activeRoomID])

  if (!activeRoom) return null

  return (
    <>
      <JoinedRoomsList activeRoomID={activeRoomID} />
      <div className="grid grid-cols-room gap-2">
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
