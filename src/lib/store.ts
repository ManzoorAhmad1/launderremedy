import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import orderReducer from './features/orderSlice'
import themeReducer from './features/themeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    theme: themeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch