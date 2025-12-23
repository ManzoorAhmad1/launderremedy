import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import userReducer from './features/userSlice'
import orderReducer from './features/orderSlice'
import themeReducer from './features/themeSlice'

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value)
    },
    removeItem(_key: string) {
      return Promise.resolve()
    },
  }
}

// Use noop storage during SSR, real storage on client
const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage()

// 1️⃣ Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  order: orderReducer,
  theme: themeReducer,
})

// 2️⃣ Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'theme', 'order'], // only these reducers will persist
  // blacklist: ['order'], // optional
}

// 3️⃣ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 4️⃣ Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 5️⃣ Persistor
export const persistor = persistStore(store)

// Types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
