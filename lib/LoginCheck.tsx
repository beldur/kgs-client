'use client'

import { usePathname, useRouter } from 'next/navigation'
import type { PropsWithChildren } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectIsLoggedIn } from './redux/slices/auth/selectors'

export const LoginCheck = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const pathname = usePathname()
  const hasAccess = pathname.startsWith('/kgs') ? isLoggedIn : true

  useEffect(() => {
    if (!hasAccess) {
      router.push('/')
    }
  }, [router, hasAccess])

  return hasAccess && children
}
