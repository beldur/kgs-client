import authSliceReducer from './slices/auth/authSlice'
import kgsSliceReducer from './slices/kgs/kgsSlice'

export const reducer = {
  auth: authSliceReducer,
  kgs: kgsSliceReducer,
}
