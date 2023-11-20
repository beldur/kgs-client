import { selectActiveRoomUsersSorted } from '@/lib/redux/slices/kgs/selectors'
import { useSelector } from '@/lib/redux/store'

import UserName from './UserName'

const RoomUserList = () => {
  const userList = useSelector(selectActiveRoomUsersSorted)

  return (
    <ul>
      {userList.map(user => (
        <li key={user.name}>
          <UserName user={user} />
        </li>
      ))}
    </ul>
  )
}

export default RoomUserList
