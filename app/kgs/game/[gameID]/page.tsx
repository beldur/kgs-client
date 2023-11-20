'use client'

import { useEffect } from 'react'

import { joinRequest } from '@/lib/redux/slices/kgs/kgsSlice'
import { useDispatch } from '@/lib/redux/store'

interface GamePageProps {
  params: { gameID: string }
}

const GamePage = ({ params }: GamePageProps) => {
  const gameID = params.gameID
  const activeGameID = parseInt(gameID)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(joinRequest({ channelId: activeGameID }))
  }, [dispatch, activeGameID])

  return <>game {activeGameID}</>
}

export default GamePage
