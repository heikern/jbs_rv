import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Story, PublicData } from '../types/storyTypes';
import { REST_API_URL } from '../config';

export interface FirebaseState {
  stories: Story[];
  publicData: PublicData;
  loading: boolean;
  error: string | null;
}

const initialState: FirebaseState = {
  stories: [],
  publicData: new Object() as PublicData,
  loading: false,
  error: null,
};


export const searchStories = createAsyncThunk(
  'firebase/searchStories',
  async (params: { numberOfPlayers?: number; rating?: string }, { rejectWithValue }) => {
    try {
      const searchParams: Record<string, string> = {};
      if (params.numberOfPlayers !== undefined) {
        searchParams.numberOfPlayers = params.numberOfPlayers.toString();
      }
      if (params.rating !== undefined) {
        searchParams.rating = params.rating;
      }
      const queryParams = new URLSearchParams(searchParams).toString();
      const response = await fetch(`${REST_API_URL}/firebase/search?${queryParams}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.detail || 'Error fetching search results');
      }
      const data = await response.json();
      return data.stories as Story[];
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchPublicDataByStoryId = createAsyncThunk(
  'firebase/fetchPublicDataByStoryId',
  async (storyId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${REST_API_URL}/firebase/publicData/${storyId}`);
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.detail || 'Error fetching public data');
      }
      const data = await response.json();
      return data as PublicData;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchStories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchStories.fulfilled, (state, action: PayloadAction<Story[]>) => {
      state.loading = false;
      state.stories = action.payload;
    });
    builder.addCase(searchStories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(fetchPublicDataByStoryId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPublicDataByStoryId.fulfilled, (state, action: PayloadAction<PublicData>) => {
      state.loading = false;
      state.publicData = action.payload;
    }); 
    builder.addCase(fetchPublicDataByStoryId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default firebaseSlice.reducer;
