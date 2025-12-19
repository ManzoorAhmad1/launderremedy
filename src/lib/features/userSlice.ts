import authService from '@/services/auth.service';
import userService from '@/services/user.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { setCookie, clearCookie } from '@/utils/helpers';
import toast from 'react-hot-toast';

interface UserState {
  user: any;
  token: string;
  isLogin: boolean;
  isLoading: boolean;
  isSignUpSuccess: boolean;
  selectedOrderTab: string;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: '',
  isLogin: false,
  isLoading: false,
  isSignUpSuccess: false,
  selectedOrderTab: 'Dashboard',
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for signup
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone_number: string;
  }, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logout
export const logOutUser = createAsyncThunk(
  'user/logOutUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await authService.logout(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for update profile
export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (userData: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone_number?: string;
    bundles?: any[];
  }, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for delete account
export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await authService.deleteAccount(userId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isLogin = !!action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsSignup: (state, action: PayloadAction<boolean>) => {
      state.isSignUpSuccess = action.payload;
    },
    setSelectedOrderTab: (state, action: PayloadAction<string>) => {
      state.selectedOrderTab = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.token = '';
      state.error = null;
      clearCookie('user_token');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLogin = true;
        setCookie('user_token', action.payload.token, 7); // 7 days
        toast.success(action.payload.message || 'Login successful!');
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.error = action.payload as string || 'Login failed';
        toast.error(action.payload as string || 'Login failed');
      })
      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isSignUpSuccess = false;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSignUpSuccess = true;
        toast.success(action.payload.message || 'Registration successful!');
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSignUpSuccess = false;
        state.error = action.payload as string || 'Registration failed';
        toast.error(action.payload as string || 'Registration failed');
      })
      // Logout cases
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
        state.token = '';
        clearCookie('user_token');
        toast.success(action.payload.message || 'Logged out successfully!');
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Logout failed';
        toast.error(action.payload as string || 'Logout failed');
      })
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        toast.success('Profile updated successfully!');
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Update failed';
        toast.error(action.payload as string || 'Update failed');
      })
      // Delete account cases
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogin = false;
        state.user = null;
        state.token = '';
        clearCookie('user_token');
        toast.success('Account deleted successfully!');
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Delete failed';
        toast.error(action.payload as string || 'Delete failed');
      });
  },
});

export const {
  setUser,
  setLoader,
  setIsSignup,
  setSelectedOrderTab,
  logout,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;