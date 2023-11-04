'use client'

import { useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'

import { selectIsLoggedIn } from '@/lib/redux/slices/auth/selectors'
import { useSelector } from '@/lib/redux/store'

const KGSLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [router, isLoggedIn])

  return <>{children}</>
}

export default KGSLayout
