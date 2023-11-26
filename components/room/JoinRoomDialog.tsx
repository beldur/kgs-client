import classNames from 'classnames'
import type { ChangeEvent, MouseEvent } from 'react'
import { forwardRef, useMemo, useState } from 'react'

import type { KGSRoomWithCategory } from '@/lib/redux/slices/kgs/kgsSlice'
import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import {
  selectRoomOwnersByID,
  selectRoomsByCategory,
} from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

export interface JoinRoomDialogProps {
  onRoomJoinClick: (roomID: number) => void
}

const getRoomByID = (
  roomID: number | undefined,
  roomGroups: { [category: string]: KGSRoomWithCategory[] },
) =>
  Object.values(roomGroups)
    .flat()
    .find(room => room.channelId === roomID)

const JoinRoomDialog = forwardRef<HTMLDialogElement, JoinRoomDialogProps>(
  ({ onRoomJoinClick }, ref) => {
    const dispatch = useDispatch()
    const roomGroups = useSelector(selectRoomsByCategory)
    const [activeCategory, setActiveCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [selectedRoomID, setSelectedRoomID] = useState<number>()
    const roomOwners = useSelector(state =>
      selectRoomOwnersByID(state, selectedRoomID),
    )

    const sortedRoomGroups = useMemo(
      () => Object.entries(roomGroups).sort(([a], [b]) => a.localeCompare(b)),
      [roomGroups],
    )

    const selectedRoom = useMemo(
      () => getRoomByID(selectedRoomID, roomGroups),
      [selectedRoomID, roomGroups],
    )

    const handleCategoryChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const newCategory = e.target.value
      const roomIDsWithMissingName = roomGroups[newCategory]
        .filter(room => !room.name)
        .map(room => room.channelId)

      setActiveCategory(newCategory)

      if (roomIDsWithMissingName.length === 0) return

      setIsLoading(true)
      dispatch(
        kgsSlice.actions.roomNamesRequest({ rooms: roomIDsWithMissingName }),
      ).then(() => setIsLoading(false))
    }

    const onRoomClick = (e: MouseEvent<HTMLLIElement>) => {
      const roomID = parseInt(e.currentTarget.dataset.roomId ?? '')

      if (roomID === selectedRoomID) {
        onRoomJoinClick(roomID)
        return
      }

      setSelectedRoomID(roomID)

      if (!getRoomByID(roomID, roomGroups)?.description) {
        dispatch(kgsSlice.actions.roomDescriptionRequest({ channelId: roomID }))
      }
    }

    return (
      <dialog className="modal" ref={ref}>
        <div className="modal-box h-full">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg h-7">Join room</h3>
          <div className="overflow-y-scroll h-[calc(100%-5rem-1.75rem)]">
            {sortedRoomGroups.map(([category, rooms]) => (
              <div className="collapse collapse-arrow" key={category}>
                <input
                  type="radio"
                  onChange={handleCategoryChange}
                  value={category}
                  checked={category === activeCategory}
                />
                <div className="collapse-title">{category}</div>
                <div className="collapse-content relative">
                  <ul>
                    {rooms.map(room => (
                      <li
                        className={classNames('link', {
                          'font-bold': room.channelId === selectedRoomID,
                        })}
                        key={room.channelId}
                        data-room-id={room.channelId}
                        onClick={onRoomClick}
                      >
                        {room.name}
                      </li>
                    ))}
                  </ul>
                  {isLoading && (
                    <span className="loading loading-ring absolute top-5 left-[50%]"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-5 h-20">
            <div className="flex-grow">
              <h5>Owners</h5>
              <ul>
                {roomOwners &&
                  roomOwners.map(owner => <li key={owner}>{owner}</li>)}
              </ul>
            </div>
            <div className="flex-grow overflow-scroll">
              <h5>Description</h5>
              {selectedRoom && selectedRoom.description}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  },
)

JoinRoomDialog.displayName = 'JoinRoomDialog'

export default JoinRoomDialog
