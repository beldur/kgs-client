'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { kgsSlice } from '@/lib/redux/slices/kgs/kgsSlice'
import { selectActiveRoomID } from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

interface GamePageProps {
  params: { gameID: string }
}

const GamePage = ({ params }: GamePageProps) => {
  const gameID = params.gameID
  const activeGameID = parseInt(gameID)
  const dispatch = useDispatch()
  const router = useRouter()
  const activeRoomID = useSelector(selectActiveRoomID)
  // const game = useSeleector(selectG)

  useEffect(() => {
    dispatch(kgsSlice.actions.joinRequest({ channelId: activeGameID }))
  }, [dispatch, activeGameID])

  const handleGameLeaveClick = () => {
    dispatch(kgsSlice.actions.unjoinRequest({ channelId: activeGameID }))
    router.push(`/kgs/room/${activeRoomID}`)
  }

  return (
    <div className="flex place-content-between">
      <div>game {activeGameID}</div>
      <button className="btn btn-xs" onClick={handleGameLeaveClick}>
        Leave game
      </button>
    </div>
  )
}

export default GamePage
