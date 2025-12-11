import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface User {
  _id: string
  name: string
  email: string
  phone: string
}

interface UserState {
  user: User | null
  isLogin: boolean
  loading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isLogin: false,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials: { email: string; password: string }) => {
    const response = await axios.post('/api/auth/login', credentials)
    return response.data
  }
)

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: { name: string; email: string; password: string; phone: string }) => {
    const response = await axios.post('/api/auth/register', userData)
    return response.data
  }
)

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (userId: string) => {
    await axios.post('/api/auth/logout', { userId })
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLogin = true
    },
    clearUser: (state) => {
      state.user = null
      state.isLogin = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.isLogin = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Login failed'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isLogin = false
      })
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer