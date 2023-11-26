'use client'

import { useRouter } from 'next/navigation'

import type { LoginFormProps } from '@/components/LoginForm'
import { LoginForm } from '@/components/LoginForm'
import { authSlice } from '@/lib/redux/slices/auth/authSlice'
import { useDispatch } from '@/lib/redux/store'

const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLoginSubmit: LoginFormProps['onSubmit'] = async ({
    username,
    password,
  }) => {
    await dispatch(authSlice.actions.login({ name: username, password }))
    router.push('/kgs/room')
  }

  return <LoginForm onSubmit={handleLoginSubmit} />
}

export default Home
