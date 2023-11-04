import type { KGSRoom } from '@/lib/api/types'

interface JoinedRoomsProps {
  joinedRooms: KGSRoom[]
  activeRoomID: number | null
  onRoomClick: (roomID: number) => void
}

const JoinedRooms = ({
  joinedRooms,
  activeRoomID,
  onRoomClick,
}: JoinedRoomsProps) => (
  <ul className="tabs flex gap-2">
    {joinedRooms.map(room => (
      <li
        className={`tab tab-bordered cursor-pointer ${
          activeRoomID === room.channelId ? 'tab-active' : ''
        }`}
        key={room.channelId}
        onClick={() => onRoomClick(room.channelId)}
      >
        {room.name}
      </li>
    ))}
  </ul>
)

export default JoinedRooms
