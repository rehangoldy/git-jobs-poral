import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  email: string;
  name: string;
  picture?: string;
}

interface AuthState {
  isAunthenticated: boolean;
  user: UserData | null;
}

const savedAuth = localStorage.getItem('auth');
const initialState: AuthState = savedAuth
  ? JSON.parse(savedAuth)
  : {
      isAunthenticated: false,
      user: null,
    };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.isAunthenticated = true;
      state.user = action.payload;
      localStorage.setItem('auth', JSON.stringify({
        isAunthenticated: true,
        user: action.payload
      }));
    },
    logout: (state) => {
      state.isAunthenticated = false;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;