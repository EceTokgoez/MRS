// src/store/slices/moviesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axiosInstance';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query = {}, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/movies', { params: query });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (movieId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`/movies/${movieId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/movies/popular');
      return res.data.data; // sadece movie array
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    data: [],
    selected: null,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMovie: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.selected = action.payload.data;
      })
      .addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload; // dikkat: burada pagination yok
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      })
    },
});




export const { clearSelectedMovie } = moviesSlice.actions;
export default moviesSlice.reducer;
