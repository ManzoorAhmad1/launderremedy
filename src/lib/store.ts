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
import storage from 'redux-persist/lib/storage' // uses localStorage

import userReducer from './features/userSlice'
import orderReducer from './features/orderSlice'
import themeReducer from './features/themeSlice'

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
