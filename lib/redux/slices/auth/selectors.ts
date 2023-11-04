import type { ReduxState } from '../../store'

export const selectIsLoggedIn = (state: ReduxState) => state.auth.isLoggedIn
