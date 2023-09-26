import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/v1/user/seed');
    return response.data;
  } catch (error) {
    throw error;
  }
});

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  '/register',
  async (userData) => {
    try {
      console.log('Hello fron register thunk')
      const response = await axios.post(
        'http://localhost:5000/api/v1/user/register',
        userData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk('user/login', async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/v1/user/login',
      userData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const userInitialState = {
  isLoggedIn: false,
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    userSignin(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    userRegister(state, action) {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    userLoggedOut(state) {
      state.userInfo = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isLoggedIn = true;

        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isLoggedIn = true;
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(action.payload));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.isLoggedIn = true;
        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(action.payload));
      });
  },
});

export const { userLoggedOut, userSignin, userRegister } = authSlice.actions;

export default authSlice.reducer;
