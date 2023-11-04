'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import type { LoginFormProps } from '@/components/LoginForm'
import { LoginForm } from '@/components/LoginForm'
import { userLogin } from '@/lib/redux/slices/auth/authSlice'
import { selectIsLoggedIn } from '@/lib/redux/slices/auth/selectors'
import { useDispatch, useSelector } from '@/lib/redux/store'

export const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/kgs')
    }
  }, [router, isLoggedIn])

  const handleLoginSubmit: LoginFormProps['onSubmit'] = async ({
    username,
    password,
  }) => {
    dispatch(userLogin({ username, password }))
  }

  return <LoginForm onSubmit={handleLoginSubmit} />
}

export default Home
