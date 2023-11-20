import type { FormEvent } from 'react'
import { useState } from 'react'

import { sendChat } from '@/lib/redux/slices/kgs/kgsSlice'
import {
  selectActiveRoomChat,
  selectActiveRoomID,
} from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

const RoomChat = () => {
  const dispatch = useDispatch()
  const roomChat = useSelector(selectActiveRoomChat)
  const activeRoomID = useSelector(selectActiveRoomID) as number
  const [chatLine, setChatLine] = useState('')

  const handleChatSubmit = (e: FormEvent<HTMLFormElement>) => {
    const text = chatLine.trim()
    e.preventDefault()

    if (text.length > 0) {
      dispatch(sendChat({ channelId: activeRoomID, text }))
      setChatLine('')
    }
  }

  return (
    <div>
      <ul>
        {roomChat.map((chat, index) => (
          <li key={index} title={chat.timestamp}>
            {chat.username}: {chat.text}
          </li>
        ))}
      </ul>
      <form className="flex join" onSubmit={handleChatSubmit}>
        <input
          type="text"
          placeholder="Chat here"
          className="join-item flex-grow w-full input input-bordered input-sm"
          value={chatLine}
          onChange={e => setChatLine(e.target.value)}
        />
        <button className="join-item btn btn-sm btn-square" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default RoomChat
