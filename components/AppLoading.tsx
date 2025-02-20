'use client'

import type { PropsWithChildren } from 'react'

import { useSelector } from '@/lib/redux/store'

// interface AppLoadingProps extends PropsWithChildren {}

export const AppLoading = ({ children }: PropsWithChildren) => {
  const isInitialized = useSelector(state => state.app.isInitialized)

  return isInitialized ? (
    children
  ) : (
    <div className="h-screen flex justify-center items-center">
      <span className="loading loading-ring loading-lg" />
    </div>
  )
}
