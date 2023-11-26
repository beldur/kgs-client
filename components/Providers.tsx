'use client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, reduxStore } from '@/lib/redux/store'

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={reduxStore}>
      <PersistGate persistor={persistor}>{props.children}</PersistGate>
    </Provider>
  )
}
