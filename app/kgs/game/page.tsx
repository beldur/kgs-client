'use client'

import { useRouter } from 'next/navigation'

import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import { selectActiveGame } from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

const GamePage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const activeGame = useSelector(selectActiveGame)

  const handleGameLeaveClick = () => {
    dispatch(
      kgsSlice.actions.unjoinRequest({
        channelId: activeGame?.channelId as number,
      }),
    )
    router.push(`/kgs/room`)
  }

  if (!activeGame) return null

  return (
    <div className="flex place-content-between">
      <div>game {activeGame.channelId}</div>
      <button className="btn btn-xs" onClick={handleGameLeaveClick}>
        Leave game
      </button>
    </div>
  )
}

export default GamePage
