import Link from 'next/link'

import { selectJoinedRooms } from '@/lib/redux/slices/kgs/selectors'
import { useSelector } from '@/lib/redux/store'

interface JoinedRoomsProps {
  activeRoomID: number | null
}

const JoinedRoomsList = ({ activeRoomID }: JoinedRoomsProps) => {
  const joinedRooms = useSelector(selectJoinedRooms)

  return (
    <ul className="tabs tabs-bordered flex gap-2">
      {joinedRooms.map(room => (
        <li
          className={`tab hover:tab-active ${
            activeRoomID === room.channelId ? 'tab-active' : ''
          }`}
          key={room.channelId}
        >
          <Link href={`/kgs/room/${room.channelId}`}>{room.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export default JoinedRoomsList
