'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { reduxStore } from '@/lib/redux/store'

import { appInitializeAction } from './redux/slices/app/appSlice'

export const Providers = (props: React.PropsWithChildren) => {
  useEffect(() => {
    reduxStore.dispatch(appInitializeAction())
  }, [])

  return <Provider store={reduxStore}>{props.children}</Provider>
}
