import { useRef } from 'react'

import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import { selectJoinedRooms } from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

import JoinRoomDialog from './JoinRoomDialog'

interface JoinedRoomsProps {
  activeRoomID: number | null
}

const JoinedRoomsList = ({ activeRoomID }: JoinedRoomsProps) => {
  const dispatch = useDispatch()
  const joinedRooms = useSelector(selectJoinedRooms)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleJoinRoomClick = () => {
    dialogRef.current?.showModal()
  }

  const handleRoomClick = (roomID: number) => {
    dialogRef.current?.close()
    dispatch(kgsSlice.actions.joinRequest({ channelId: roomID }))
  }

  const handleLeaveRoomClick = (channelId: number) => {
    dispatch(kgsSlice.actions.unjoinRequest({ channelId }))
  }

  const handleSetActiveRoom = (roomID: number) => {
    dispatch(kgsSlice.actions.setActiveRoom({ roomID }))
  }

  return (
    <>
      <ul className="tabs tabs-bordered flex gap-2">
        {joinedRooms.map(room => (
          <li
            className={`tab hover:tab-active ${
              activeRoomID === room.channelId ? 'tab-active' : ''
            }`}
            key={room.channelId}
            onClick={() => handleSetActiveRoom(room.channelId)}
          >
            {room.name}
          </li>
        ))}
        <li>
          <button className="btn btn-xs" onClick={handleJoinRoomClick}>
            Join room
          </button>
        </li>
        {activeRoomID && (
          <li>
            <button
              className="btn btn-xs"
              onClick={() => handleLeaveRoomClick(activeRoomID)}
            >
              Leave room
            </button>
          </li>
        )}
      </ul>
      <JoinRoomDialog ref={dialogRef} onRoomJoinClick={handleRoomClick} />
    </>
  )
}

export default JoinedRoomsList
