import type { ReduxState } from '../../store'

const selectApp = (state: ReduxState) => state.app

export const selectIsInitialized = (state: ReduxState) =>
  selectApp(state).isInitialized
