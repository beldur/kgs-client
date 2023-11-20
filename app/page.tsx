'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import type { LoginFormProps } from '@/components/LoginForm'
import { LoginForm } from '@/components/LoginForm'
import { userLogin } from '@/lib/redux/slices/auth/authSlice'
import { selectIsLoggedIn } from '@/lib/redux/slices/auth/selectors'
import { selectActiveRoomID } from '@/lib/redux/slices/kgs/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

export const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const activeRoomID = useSelector(selectActiveRoomID)

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/kgs/room/${activeRoomID}`)
    }
  }, [router, isLoggedIn, activeRoomID])

  const handleLoginSubmit: LoginFormProps['onSubmit'] = async ({
    username,
    password,
  }) => {
    dispatch(userLogin({ name: username, password }))
  }

  return <LoginForm onSubmit={handleLoginSubmit} />
}

export default Home
